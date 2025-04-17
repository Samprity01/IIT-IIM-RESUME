// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Initialize Express
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));

// // Default route
// app.get('/', (req, res) => {
//   res.send('Authentication API is running');
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { MongoClient } from 'mongodb';
import multer from 'multer';
import { copyTemplateFiles } from './latex-cv-generator/dist/utils/setup.js';
import { extractTextFromPDF } from './latex-cv-generator/dist/utils/pdf-extractor.js';
import { compileLaTeX, cleanupFiles } from './latex-cv-generator/dist/utils/latex-compiler.js';
import { generateLatexFromCV, storeInMongoDB } from './latex-cv-generator/dist/latex-generator.js';;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { fileURLToPath } from 'url';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure directories and template files exist
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

copyTemplateFiles();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    cb(null, `${timestamp}_${file.originalname}`);
  }
});
const upload = multer({ storage });

// Routes for `server.js` functionality
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the unified backend server!' });
});

// Routes for `latex-cv-generator` functionality
app.post('/latex/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }

    const templateChoice = req.body.template || 'software';
    const templatePath = path.join(__dirname, `latex-cv-generator/templates/${templateChoice}_template.tex`);
    const latexTemplate = fs.readFileSync(templatePath, 'utf-8');

    const cvText = await extractTextFromPDF(req.file.path);
    const latexCode = await generateLatexFromCV(cvText, latexTemplate, templateChoice);
    const docId = await storeInMongoDB(cvText, latexCode, templateChoice);

    res.status(200).json({
      status: 'success',
      message: `LaTeX CV generated using ${templateChoice} template`,
      document_id: docId,
      latex: latexCode
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Start the unified server
app.listen(PORT, () => {
  console.log(`Unified server running on port ${PORT}`);
});