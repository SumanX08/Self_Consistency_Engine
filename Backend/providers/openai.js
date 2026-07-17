import OpenAI from "openai";
import { config } from "../config/config.js";
import { buildAnswerPrompt } from "../prompts/answerPrompt.js";
import { SYSTEM_PROMPT } from "../prompts/systemPrompt.js";

const client = new OpenAI({
  apiKey: config.openai.apiKey,
});

export async function generateOpenAIResponse(question) {
  const start = Date.now();

  try {
    const response = await client.chat.completions.create({
      model: config.openai.model,

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
      provider: "OpenAI",
      model:config.openai.model,
      success: true,
      answer: response.choices[0].message.content,
      latency: Date.now() - start,
      error: null,
    };
  } catch (error) {
    return {
      provider: "OpenAI",
      success: false,
      answer: null,
      latency: Date.now() - start,
      error: error.message,
    };
  }
}