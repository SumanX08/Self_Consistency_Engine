export function buildEvaluatorPrompt(question, responses) {
  const formattedResponses = responses
    .map(
      (response) => `
Provider: ${response.provider}
Model: ${response.model}

Answer:
${response.answer}
`
    )
    .join("\n-----------------------\n");

  return `
You are an expert AI evaluator.

The user asked:

"${question}"

Below are responses from three different AI models.

${formattedResponses}

Your job:

1. Read every answer carefully.
2. Compare factual correctness.
3. Identify strengths and weaknesses.
4. Merge the strongest ideas.
5. Produce one refined answer.

Then determine:

- Which model provided the strongest overall response.
- Which models contributed useful information.
- How much the three answers agree with each other.

Return ONLY valid JSON.

{
  "primarySource":"Gemini",
  "contributors":["OpenAI","Grok"],
  "consensusScore":94,
  "confidence":9.7,
  "reason":"Gemini had the clearest structure. OpenAI added security best practices. Grok added implementation details.",
  "finalAnswer":"..."
}

Rules:

- primarySource must be one of:
  OpenAI
  Gemini
  Grok

- contributors must be an array.

- consensusScore must be between 0 and 100.

- confidence must be between 1 and 10.

Return only JSON.
`;
}