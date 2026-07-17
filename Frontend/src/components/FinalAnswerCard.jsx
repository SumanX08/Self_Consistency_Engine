import { Copy, Sparkles, Check } from "lucide-react";
import { useState } from "react";

const FinalAnswerCard = ({ finalAnswer }) => {
  const [copied, setCopied] = useState(false);
  console.log(finalAnswer)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(finalAnswer.answer);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="rounded-2xl border border-blue-500/30 bg-[#111113] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                Final Synthesized Answer
              </h2>

              <p className="text-sm text-zinc-400">
                Generated after comparing all model responses
              </p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900 transition"
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-3 gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Primary Source
            </p>
            <p className="mt-1 font-medium text-white">
              {finalAnswer.primarySource}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Confidence
            </p>
            <p className="mt-1 font-medium text-white">
              {finalAnswer.confidence}/10
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Consensus
            </p>
            <p className="mt-1 font-medium text-white">
              {finalAnswer.consensusScore}%
            </p>
          </div>
        </div>

        {/* Answer */}
        <div className="px-6 py-6 border-b border-white/10">
          <p className="whitespace-pre-wrap leading-8 text-zinc-300">
            {finalAnswer.finalAnswer}
          </p>
        </div>
        <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-zinc-500 text-lg">REASON</h1>
          <p className="whitespace-pre-wrap leading-8 text-zinc-300">
            {finalAnswer.reason}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalAnswerCard;