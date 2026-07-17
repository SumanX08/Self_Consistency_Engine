import Groq from "groq-sdk";
import { config } from "../config/config.js";
import { buildAnswerPrompt } from "../prompts/answerPrompt.js";
import { SYSTEM_PROMPT } from "../prompts/systemPrompt.js";

const client = new Groq({
  apiKey: config.groq.apiKey,
});

export async function generateGroqResponse(question) {
  const start = Date.now();

  try {
    const response = await client.chat.completions.create({
      model: config.groq.model,

      messages: [
        {
          role: "system",
          content:SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: buildAnswerPrompt(question),
        },
      ],

      temperature: config.generation.temperature,
      max_tokens: config.generation.maxTokens,
    });

    return {
      provider: "Groq",
      model:config.groq.model,
      success: true,
      answer: response.choices[0].message.content,
      latency: Date.now() - start,
    };
  } catch (error) {
    return {
      provider: "Groq",
      success: false,
      latency: Date.now() - start,
      error: error.message,
    };
  }
}