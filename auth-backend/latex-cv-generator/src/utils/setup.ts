// import fs from 'fs';
import path from 'path';
import fs from 'fs';


export function copyTemplateFiles() {
  const templatesDir = path.join(__dirname, '../templates');
  const uploadsDir = path.join(__dirname, '../uploads');

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