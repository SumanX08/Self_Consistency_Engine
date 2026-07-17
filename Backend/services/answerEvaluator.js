import OpenAI from "openai";
import { config } from "../config/config.js";
import { buildEvaluatorPrompt } from "../prompts/evaluatorPrompt.js";

const client = new OpenAI({
  apiKey: config.openai.apiKey,
});

export async function evaluateResponses(question, responses) {
  try {
    const prompt = buildEvaluatorPrompt(question, responses);

    const completion = await client.chat.completions.create({
      model: "gpt-4.1",

      messages: [
        {
          role: "system",
          content:
            "You are an expert evaluator that creates the best possible answer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.2,
    });
    const output =
completion.choices[0].message.content;

const evaluation = JSON.parse(output);

return evaluation;
} catch (error) {
    throw new Error(error.message);
  }
}