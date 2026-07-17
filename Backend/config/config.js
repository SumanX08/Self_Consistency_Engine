import dotenv from "dotenv"

dotenv.config()

export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4.1-mini",
  },

  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-3.1-flash-lite",
  },

  groq: {
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
  },

  generation: {
    temperature: 0.7,
    maxTokens: 1000,
  },

  evaluator: {
    model: "gpt-4.1",
  },
};