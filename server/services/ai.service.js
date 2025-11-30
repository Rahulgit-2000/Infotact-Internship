const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

class AIService {
  async generateIdeas(prompt) {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("Missing GOOGLE_API_KEY");
    }

    const model = genAI.getGenerativeModel({
      model: process.env.GENERATIVE_MODEL || "gemini-2.5-flash"
    });

    const template = `
You are an idea generation assistant.

Generate **3 concise ideas** based on this input: "${prompt}"

Return **strict JSON only**, no explanation, no markdown.

Format:
{
"ideas": [
  { "title": "", "summary": "", "details": "", "tags": [] }
]
}
`;

    const response = await model.generateContent(template);
    const rawText = (await response.response?.text())?.trim();

    try {
      return JSON.parse(rawText);
    } catch (e) {
      // If model fails JSON formatting → simple fallback
      return {
        ideas: [
          { title: prompt, summary: rawText.slice(0, 200), details: rawText, tags: [] }
        ]
      };
    }
  }
}

module.exports = new AIService();
