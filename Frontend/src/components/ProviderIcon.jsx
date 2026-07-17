import {  SiGooglegemini, SiMeta } from "react-icons/si";
import { BsOpenai } from "react-icons/bs";
import { Cpu } from "lucide-react";

export default function ProviderIcon({ provider }) {
  switch (provider) {
    case "OpenAI":
      return <BsOpenai className="text-xl text-white" />;

    case "Gemini":
      return <SiGooglegemini className="text-xl text-blue-400" />;

    case "Groq":
      return <SiMeta className="text-xl text-blue-500" />;

    default:
      return <Cpu className="text-white" />;
  }
}