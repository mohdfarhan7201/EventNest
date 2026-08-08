import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'src', 'assets', 'Event');

async function convertImages() {
  try {
    const files = await fs.promises.readdir(directoryPath);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
    });

    console.log(`Found ${imageFiles.length} images to convert.`);

    for (const file of imageFiles) {
      const inputPath = path.join(directoryPath, file);
      const parsed = path.parse(file);
      const safeName = parsed.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const outputPath = path.join(directoryPath, `${safeName}.webp`);

      console.log(`Converting ${file} -> ${safeName}.webp...`);
      
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
    }
    
    console.log('All images converted successfully!');
  } catch (err) {
    console.error('Error processing directory:', err);
  }
}

convertImages();
