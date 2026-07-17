import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Clock3, FileText, } from "lucide-react";
import ProviderIcon from "./ProviderIcon";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { AnimatePresence, motion } from "framer-motion";

const ResponseCard = ({
  provider,
  model,
  response,
  latency,
  tokens,
  icon,
}) => {
  const [expanded, setExpanded] = useState(false);

 

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

      <AnimatePresence initial={false}>
  {expanded && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="border-t border-white/10 px-6 py-6">
        <div className="prose prose-invert max-w-none text-white">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {response.answer}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default ResponseCard;