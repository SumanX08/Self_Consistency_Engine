import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import PromptBox from "../components/PromptBox";
import ResponseSection from "../components/ResponseSection";
import FinalAnswerCard from "../components/FinalAnswerCard";
import axios from "axios";
import Footer from "../components/Footer";


export default function Home() {
    const clientId = useRef(crypto.randomUUID());
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const [finalAnswer, setFinalAnswer] = useState(null);

  useEffect(() => {
  const eventSource = new EventSource(
  `http://localhost:3000/api/generate/stream?clientId=${clientId.current}`
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case "connected":
      console.log("SSE Connected");
      break;

    case "model_start":
      console.log(`${data.provider} started`);
      break;

    case "model_complete":
      setResponses((prev) =>
        prev.map((item) =>
          item.provider === data.response.provider
            ? {
                ...data.response,
                loading: false,
              }
            : item
        )
      );
      break;

    case "evaluation_start":
      console.log("Synthesizing...");
      break;

    case "evaluation_complete":
      setFinalAnswer(data.answer);
      break;

    case "error":
      console.error(data.error);
      break;

    default:
      break;
  }
};

  return () => eventSource.close();
}, []);

 const handleGenerate = async () => {
  if (!prompt.trim()) return;

  setLoading(true);

  setFinalAnswer(null);

  setResponses([
    {
      provider: "OpenAI",
      loading: true,
    },
    {
      provider: "Gemini",
      loading: true,
    },
    {
      provider: "Groq",
      loading: true,
    },
  ]);

  try {
    await axios.post("http://localhost:3000/api/generate", {
      question: prompt,
      clientId: clientId.current,
    });
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col">
      <Navbar />

      <main className="flex-1">
         <PromptBox
        prompt={prompt}
        setPrompt={setPrompt}
        onGenerate={handleGenerate}
        loading={loading}
      />

      {responses.length > 0 && (
        <ResponseSection responses={responses} />
      )}

      {finalAnswer && (
    <FinalAnswerCard finalAnswer={finalAnswer} />
)}

      </main>
     

      <Footer/>
    </div>
  );
}