import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function gradeWithAI(
  studentAnswer: string,
  rubric: string,
  sampleAnswer: string,
  instructions: string
) {
  const prompt = `
You are an expert math grader. Based on the following:

Rubric: ${rubric}
Sample Answer: ${sampleAnswer}
Grading Instructions: ${instructions}

Grade this student's answer:

${studentAnswer}

Provide:
- Score (out of total)
- Explanation
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
}
