import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-6 mt-8">
      <div className="flex items-center justify-center gap-3 text-sm text-zinc-500">
        <span>Built with</span>

        <span className="font-medium text-zinc-300">OpenAI</span>

        <span className="text-zinc-600">•</span>

        <span className="font-medium text-zinc-300">Gemini</span>

        <span className="text-zinc-600">•</span>

        <span className="font-medium text-zinc-300">
          Meta <span className="text-zinc-500">(Llama)</span>
        </span>
      </div>
    </footer>
  );
}