import { Sparkles } from "lucide-react";

const PromptBox = ({
  prompt,
  setPrompt,
  onGenerate,
  loading,
}) => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="rounded-3xl border border-white/10 bg-[#111113] p-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              onGenerate();
            }
          }}
          placeholder="Ask anything..."
          className="h-20 w-full resize-none bg-transparent text-lg text-white outline-none"
        />

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-5">
          <p className="text-sm text-zinc-500">
          Click to generate
          </p>

          <button
            onClick={onGenerate}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            <Sparkles size={18} />

            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptBox;