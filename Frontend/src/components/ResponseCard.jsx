import { useState } from "react";
import {ChevronDown,ChevronUp,Copy,Clock3,FileText,} from "lucide-react";
import ProviderIcon from "./ProviderIcon";

const ResponseCard = ({
  provider,
  model,
  response,
  latency,
  tokens,
  icon,
}) => {
  const [expanded, setExpanded] = useState(false);

  console.log(response)

  if (response.loading) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111113] p-6">
      <h2 className="text-lg font-semibold text-white">
        {response.provider}
      </h2>

      <p className="mt-4 text-zinc-400 animate-pulse">
        ⏳ Generating response...
      </p>
    </div>
  );
}

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111113] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 border border-white/10">
              <ProviderIcon provider={response.provider} />

          </div>

          <div>
            <h3 className="font-semibold text-lg text-white">{response.provider}</h3>

            <span className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
              {response.model}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-zinc-400">
            <Clock3 size={16} />
            {response.latency}
          </div>

          <div className="flex items-center gap-1 text-sm text-zinc-400">
            <FileText size={16} />
            {response.tokens}
          </div>

          <button className="flex text-white items-center gap-2 rounded-lg border border-white/10 px-4 py-2 hover:bg-zinc-900">
            <Copy size={16} />
            Copy
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-lg border border-white/10 p-2 hover:bg-zinc-900"
          >
            {expanded ? (
              <ChevronUp size={18} className="text-white" />
            ) : (
              <ChevronDown size={18} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Body */}

      <div
        className={`transition-all duration-300 ${
          expanded ? "max-h-175" : "max-h-0"
        } overflow-hidden`}
      >
        <div className="border-t border-white/10 px-6 py-6 text-zinc-300 whitespace-pre-wrap leading-8">
          {response.answer}
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;