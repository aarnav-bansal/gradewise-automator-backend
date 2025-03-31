import Tesseract from 'tesseract.js';

export async function runOCR(imageBuffer: Buffer): Promise<string> {
  const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');
  return text;
}
