import type { NextApiRequest, NextApiResponse } from 'next';
import { extractPagesFromPDF } from '@/utils/pdfProcessor';
import { runOCR } from '@/utils/ocr';
import { gradeWithAI } from '@/utils/gptPrompt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    const { pdfBuffer, rubric, sampleAnswer, instructions } = req.body;

    const pages = await extractPagesFromPDF(pdfBuffer);
    const results = [];

    for (const page of pages) {
      const text = await runOCR(page);
      const graded = await gradeWithAI(text, rubric, sampleAnswer, instructions);
      results.push(graded);
    }

    res.status(200).json({ results });
  } catch (err) {
    console.error('Grading Error:', err);
    res.status(500).json({ error: 'Grading failed' });
  }
}
