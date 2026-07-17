import { generateGeminiResponse } from "./providers/gemini.js";
import { generateOpenAIResponse } from "./providers/openai.js";
import { generateGroqResponse } from "./providers/groq.js";
import { evaluateResponses } from "./services/answerEvaluator.js";

export async function orchestrate(question, callbacks = {}) {
  const overallStart = Date.now();

  const {
    onStart = () => {},
    onModelStart = () => {},
    onModelComplete = () => {},
    onEvaluationStart = () => {},
    onEvaluationComplete = () => {},
    onError = () => {},
  } = callbacks;

  onStart();

  async function runProvider(provider, providerFn) {
    onModelStart(provider);

    try {
      const result = await providerFn(question);

      onModelComplete(result);

      return result;
    } catch (error) {
      const failedResponse = {
        provider,
        model: null,
        success: false,
        answer: null,
        latency: 0,
        error: error.message,
      };

      onError(failedResponse);

      return failedResponse;
    }
  }

  // Run all providers concurrently
  const responses = await Promise.all([
    runProvider("Gemini", generateGeminiResponse),
    runProvider("OpenAI", generateOpenAIResponse),
    runProvider("Groq", generateGroqResponse),
  ]);

  const successfulResponses = responses.filter(
    (response) => response.success
  );

  onEvaluationStart();

  const finalAnswer = await evaluateResponses(
    question,
    successfulResponses
  );

  onEvaluationComplete(finalAnswer);

  const totalTime = Date.now() - overallStart;

  return {
    question,
    responses,
    successfulResponses,
    finalAnswer,
    totalTime,
  };
}