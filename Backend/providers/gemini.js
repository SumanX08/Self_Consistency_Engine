import { GoogleGenAI } from "@google/genai";
import { config } from "../config/config.js";
import { buildAnswerPrompt } from "../prompts/answerPrompt.js";

const client = new GoogleGenAI({
  apiKey: config.gemini.apiKey,
});

export async function generateGeminiResponse(question) {
  const start = Date.now();

  try {
    const response = await client.models.generateContent({
      model: config.gemini.model,
      contents: buildAnswerPrompt(question),
      config: {
        temperature: config.generation.temperature,
        maxOutputTokens: config.generation.maxTokens,
      },
    });

    return{
      provider: "Gemini",
      model:config.gemini.model,
      success: true,
      answer: response.text,
      latency: Date.now() - start,
    };
  } catch (error) {
    return {
      provider: "Gemini",
      success: false,
      latency: Date.now() - start,
      error: error.message,
    };
  }
}