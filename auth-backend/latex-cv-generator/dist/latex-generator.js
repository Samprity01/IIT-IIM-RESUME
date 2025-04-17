"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLatexFromCV = generateLatexFromCV;
exports.storeInMongoDB = storeInMongoDB;
// src/latex-generator.ts
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const generative_ai_1 = require("@google/generative-ai");
dotenv_1.default.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cv_database';
// Initialize Google AI
const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
{text}

Here's the LaTeX template I want to use:
{template}

Please provide only the complete, compilable LaTeX code incorporating my information into this template.
  `;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
}
async function storeInMongoDB(originalText, latexCode, templateName) {
    const client = new mongodb_1.MongoClient(MONGO_URI);
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
    }
    finally {
        await client.close();
    }
}
