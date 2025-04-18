"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyTemplateFiles = copyTemplateFiles;
// import fs from 'fs';
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function copyTemplateFiles() {
    const templatesDir = path_1.default.join(__dirname, '../templates');
    const uploadsDir = path_1.default.join(__dirname, '../uploads');
    if (!fs_1.default.existsSync(uploadsDir)) {
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    }
    fs_1.default.readdirSync(templatesDir).forEach((file) => {
        const srcPath = path_1.default.join(templatesDir, file);
        const destPath = path_1.default.join(uploadsDir, file);
        if (!fs_1.default.existsSync(destPath)) {
            fs_1.default.copyFileSync(srcPath, destPath);
        }
    });
}
