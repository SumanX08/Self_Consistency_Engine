export function buildAnswerPrompt(question) {
  return `
Answer the following question as accurately as possible.

Question:
${question}
`;
}