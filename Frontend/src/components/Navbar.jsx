import { Brain } from "lucide-react";

const Navbar = () => {
  return (
    <header className=" max-w-5xl mx-auto ">
      <div className="max-w-6xl border border-white/40 shadow-xs shadow-white mx-auto flex items-center gap-4 py-4 rounded-xl px-72 mt-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
          <Brain className="h-6 w-6 text-white" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-white">
            Self Consistency Answer Engine
          </h1>

          <p className="text-sm text-zinc-400">
            Compare multiple AI models and synthesize the best answer.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;