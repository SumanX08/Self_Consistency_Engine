import ResponseCard from "./ResponseCard";


const ResponseSection = ({ responses }) => {
  return (
    <div className="max-w-5xl mx-auto mt-12 space-y-5">

      <div className="flex items-center gap-4">
        <h2 className="text-sm font-semibold tracking-widest text-zinc-400">
          MODEL RESPONSES
        </h2>

        <div className="h-px flex-1 bg-white/10"></div>
      </div>

      {responses.map((response) => (
        <ResponseCard
          key={response.provider}
          response={response}
        />
      ))}
    </div>
  );
};

export default ResponseSection