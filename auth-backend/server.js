import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { MongoClient, ObjectId } from 'mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { exec } from 'child_process';
import util from 'util';
// Change the way we import pdf-parse
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

dotenv.config();
const execPromise = util.promisify(exec);

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB configuration
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cv_database';

// Initialize Google AI
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const templatesDir = path.join(__dirname, 'latex-cv-generator', 'templates');
fs.mkdirSync(uploadsDir, { recursive: true });

// Copy template files function
function copyTemplateFiles() {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  fs.readdirSync(templatesDir).forEach((file) => {
    const srcPath = path.join(templatesDir, file);
    const destPath = path.join(uploadsDir, file);
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Ensure template files are copied
copyTemplateFiles();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    cb(null, `${timestamp}_${file.originalname}`);
  },
});
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// PDF text extraction function
// PDF text extraction function
// Instead of pdf-parse, use a more direct approach
async function extractTextFromPDF(filePath) {
  try {
    // Use pdf.js-extract instead of pdf-parse
    const { PDFExtract } = await import('pdf.js-extract');
    const pdfExtract = new PDFExtract();
    const options = {}; // See the docs for options
    
    const data = await pdfExtract.extract(filePath, options);
    
    // Join all the text content from all pages
    const text = data.pages
      .map(page => page.content.map(item => item.str).join(' '))
      .join('\n');
      
    return text;
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    throw new Error("Failed to extract text from PDF: " + error.message);
  }
}

// LaTeX generation function
async function generateLatexFromCV(cvText, templateText, templateName = "Software") {
  const prompt = `
    I need to convert this CV text into a professional LaTeX CV using the provided template. Please create a complete, compilable LaTeX document that:

1. Extracts all relevant information from my CV text.
2. Formats it using the provided LaTeX template.
3. Ensures clean, professional formatting with no errors.
4. Optimizes vertical spacing between elements for a compact but readable layout.

CRITICAL FORMATTING REQUIREMENTS:

- SECTION INDEPENDENCE: Ensure each section and subsection is properly closed.
  * Prevent nested content from appearing inside previous sections.
  * Maintain proper section hierarchy throughout the document.
  * Close all environments and sections before starting new ones.

- CONTENT INTEGRITY: Keep related information together on the same page.
  * Force sections to start on a new page if they won't fit completely.
  * Use \\pagebreak, \\nopagebreak, or minipage environments as needed.

- PREVENT OVERLAP AND OVERFLOW:
  * Optimize vertical spacing between elements (\\vspace, \\baselineskip).
  * Ensure text stays within page margins using appropriate line breaks.
  * Use \\sloppy, proper hyphenation, or font adjustments for long content.
  * Implement \\samepage or similar commands for critical content blocks.

- SPACE OPTIMIZATION:
  * Reduce excessive whitespace while maintaining readability.
  * Adjust vertical spacing for compact presentation.
  * Handle single-column, multi-column, and rule-based layouts appropriately.
  * Properly manage tables and images if present.

- ERROR HANDLING:
  * Ensure that the TeX code compiles with no errors.

Here's my CV text:
${cvText}

Here's the LaTeX template I want to use:
${templateText}

Please provide only the complete, compilable LaTeX code incorporating my information into this template.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

// Store in MongoDB function
async function storeInMongoDB(originalText, latexCode, templateName) {
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    const db = client.db('cv_database');
    const collection = db.collection('latex_cvs');
    
    const doc = {
      cv_text: originalText,
      latex: latexCode,
      template: templateName,
      created_at: new Date()
    };
    
    const result = await collection.insertOne(doc);
    return result.insertedId.toString();
  } finally {
    await client.close();
  }
}

// LaTeX compilation function
async function compileLaTeX(texFilePath) {
  try {
    const directory = path.dirname(texFilePath);
    const { stdout, stderr } = await execPromise(
      `pdflatex -interaction=nonstopmode -output-directory=${directory} ${texFilePath}`,
      { timeout: 30000 } // 30 seconds timeout
    );
    
    const basename = path.basename(texFilePath, '.tex');
    const pdfPath = path.join(directory, `${basename}.pdf`);
    
    if (fs.existsSync(pdfPath)) {
      return {
        success: true,
        outputPath: pdfPath,
        stdout,
        stderr
      };
    } else {
      return {
        success: false,
        error: 'PDF was not generated',
        stdout,
        stderr
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stdout: error.stdout,
      stderr: error.stderr
    };
  }
}

// Cleanup files function
async function cleanupFiles(basename, directory) {
  const extensions = ['.tex', '.pdf', '.aux', '.log'];
  
  for (const ext of extensions) {
    const filePath = path.join(directory, `${basename}${ext}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to LaTeX CV Generator API' });
});

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }
    
    // Get template choice from request
    const templateChoice = (req.body.template || 'software').toLowerCase();
    const templateMap = {
      'software': 'software_template.tex',
      'iit': 'iit_template.tex',
      'iim': 'iim_template.tex',
      'nontech': 'nontech_template.tex',
      'marketing': 'marketing_template.tex'
    };
    
    const templateFile = templateMap[templateChoice];
    if (!templateFile) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid template: ${templateChoice}`
      });
    }
    
    // Read template file
    const templatePath = path.join(templatesDir, templateFile);
    if (!fs.existsSync(templatePath)) {
      return res.status(400).json({
        status: 'error',
        message: `Template file not found: ${templateFile}`
      });
    }
    
    const latexTemplate = fs.readFileSync(templatePath, 'utf-8');
    
    // Extract text from PDF
    const cvText = await extractTextFromPDF(req.file.path);
    
    // Generate LaTeX code
    const latexCode = await generateLatexFromCV(
      cvText,
      latexTemplate,
      templateChoice.charAt(0).toUpperCase() + templateChoice.slice(1)
    );
    
    // Store in MongoDB
    const docId = await storeInMongoDB(cvText, latexCode, templateChoice);
    
    return res.status(200).json({
      status: 'success',
      message: `LaTeX CV generated using ${templateChoice} template`,
      template_used: templateChoice,
      document_id: docId,
      latex: latexCode
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
      error: error.message
    });
  }
});

// Download LaTeX route
app.get('/download/latex', async (req, res) => {
  const docId = (req.query.doc_id || '').trim();
  if (!docId) {
    return res.status(400).json({
      status: 'error',
      message: 'Document ID is required'
    });
  }
  
  const client = new MongoClient(MONGO_URI);
  
  try {
    await client.connect();
    const db = client.db('cv_database');
    const collection = db.collection('latex_cvs');
    
    const doc = await collection.findOne({ _id: new ObjectId(docId) });
    
    if (!doc) {
      return res.status(404).json({
        status: 'error',
        message: 'Document not found'
      });
    }
    
    // Save .tex file
    const filename = `${docId}_cv.tex`;
    const filepath = path.join(uploadsDir, filename);
    
    fs.writeFileSync(filepath, doc.latex, 'utf-8');
    
    return res.download(filepath, filename, (err) => {
      if (err) {
        console.error('Download error:', err);
      }
      
      // Clean up file after download
      try {
        fs.unlinkSync(filepath);
      } catch (unlinkErr) {
        console.error('File cleanup error:', unlinkErr);
      }
    });
  } catch (error) {
    console.error('LaTeX download error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Download failed',
      error: error.message
    });
  } finally {
    await client.close();
  }
});

// Download PDF route
app.get('/download/pdf', async (req, res) => {
  const docId = (req.query.doc_id || '').trim();
  if (!docId) {
    return res.status(400).json({
      status: 'error',
      message: 'Document ID is required'
    });
  }
  
  const client = new MongoClient(MONGO_URI);
  
  try {
    // Check if pdflatex is available
    try {
      await execPromise('pdflatex --version');
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'pdflatex not found. Please install LaTeX distribution.',
        solution: 'Install TeX Live or MiKTeX on the server'
      });
    }
    
    await client.connect();
    const db = client.db('cv_database');
    const collection = db.collection('latex_cvs');
    
    const doc = await collection.findOne({ _id: new ObjectId(docId) });
    
    if (!doc) {
      return res.status(404).json({
        status: 'error',
        message: 'Document not found'
      });
    }
    
    // Create unique filenames
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const basename = `${docId}_${timestamp}_cv`;
    const texFile = `${basename}.tex`;
    const pdfFile = `${basename}.pdf`;
    
    const texPath = path.join(uploadsDir, texFile);
    const pdfPath = path.join(uploadsDir, pdfFile);
    
    // Write .tex file with error handling
    try {
      fs.writeFileSync(texPath, doc.latex, 'utf-8');
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to write LaTeX file',
        error: error.message
      });
    }
    
    // Compile LaTeX
    const compilationResult = await compileLaTeX(texPath);
    
    if (!compilationResult.success) {
      return res.status(500).json({
        status: 'error',
        message: 'LaTeX compilation failed',
        latex_error: compilationResult.stderr,
        latex_output: compilationResult.stdout
      });
    }
    
    // Return PDF file
    return res.download(pdfPath, pdfFile, async (err) => {
      if (err) {
        console.error('PDF download error:', err);
      }
      
      // Clean up files after download
      try {
        await cleanupFiles(basename, uploadsDir);
      } catch (cleanupErr) {
        console.error('File cleanup error:', cleanupErr);
      }
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'PDF generation failed',
      error: error.message
    });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;