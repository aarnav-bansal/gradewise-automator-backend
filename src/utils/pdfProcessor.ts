import { PDFDocument } from 'pdf-lib';

export async function extractPagesFromPDF(buffer: Buffer): Promise<Buffer[]> {
  const pdfDoc = await PDFDocument.load(buffer);
  const pageBuffers: Buffer[] = [];

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const newDoc = await PDFDocument.create();
    const [copiedPage] = await newDoc.copyPages(pdfDoc, [i]);
    newDoc.addPage(copiedPage);
    const newPdfBytes = await newDoc.save();
    pageBuffers.push(Buffer.from(newPdfBytes));
  }

  return pageBuffers;
}
