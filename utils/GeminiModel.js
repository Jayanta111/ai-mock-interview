import { GoogleGenerativeAI } from '@google/genai';
import formidable from 'formidable';
import fs from 'fs/promises';
import pdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ error: 'Form parsing failed' });
    }

    const jobPosition = fields.jobPosition?.[0];
    const jobDescription = fields.jobDescription?.[0];
    const jobExperience = fields.jobExperience?.[0];
    const resumePath = files.resume?.[0]?.filepath;

    let resumeText = '[No resume content]';

    try {
      const buffer = await fs.readFile(resumePath);
      const parsed = await pdfParse(buffer);
      resumeText = parsed.text;
    } catch (e) {
      console.error('PDF parsing error:', e);
      resumeText = '[Failed to read PDF resume]';
    }

    const prompt = `
      You are an AI that creates mock interview questions.
      Based on the following inputs:

      - Job Position: ${jobPosition}
      - Job Description: ${jobDescription}
      - Experience Required: ${jobExperience} years

      Resume Content:
      ${resumeText}

      Generate 5 technical interview questions along with short model answers. Format your output as JSON with keys: "question" and "answer".
    `;

    try {
      const ai = new GoogleGenerativeAI({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API,
      });

      const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text;

      res.status(200).json({ questions: text });
    } catch (error) {
      console.error('Gemini error:', error);
      res.status(500).json({ error: 'Failed to generate questions' });
    }
  });
}
