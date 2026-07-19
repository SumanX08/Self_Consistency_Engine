# Self-Consistency Answer Engine

A GenAI application that improves answer quality by generating responses from multiple AI models and synthesizing them into a single, high-quality final answer using the **self-consistency** technique.

## How the Project Works

1. The user enters a question through the web interface.
2. The backend sends the same prompt to multiple AI models **in parallel**.
3. Each model independently generates its own response.
4. All successful responses are collected.
5. An evaluator model compares the responses, identifies areas of agreement, resolves conflicts, and generates a final synthesized answer.
6. The frontend displays:
   - Individual responses from each model
   - The final synthesized answer
   - Metadata such as latency, confidence, and consensus score

---

## Project Type

This project is **UI-based**.

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express
- **Communication:** REST APIs with Server-Sent Events (SSE) for real-time response streaming

---

## Models / Providers Used

- **OpenAI** – GPT-4.1 Mini
- **Google Gemini** – Gemini Flash
- **Groq** – Llama 3.3 70B Versatile
- **Evaluator** – GPT-4.1 (used to synthesize the final answer)

---

## Self-Consistency Flow

```text
User Question
      │
      ▼
Generate responses in parallel
      │
      ├── OpenAI
      ├── Gemini
      └── Meta(Llama)
      │
      ▼
Collect successful responses
      │
      ▼
Evaluator compares responses
      │
      ▼
Generate Final Synthesized Answer
      │
      ▼
Display individual responses + final answer
```

The application follows the **self-consistency prompting** approach, where multiple independent responses are generated for the same query. Instead of relying on a single model's output, the evaluator analyzes all responses, identifies common reasoning patterns, and synthesizes the most accurate and comprehensive final answer.

---

