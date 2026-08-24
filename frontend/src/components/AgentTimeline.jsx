export default function AgentTimeline({ step }) {
  const steps = [
    "Intent Agent",
    "Offer Agent",
    "Message Agent",
    "Recovery Agent",
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      <h2 className="text-2xl font-bold mb-6">AI Workflow</h2>

      <div className="space-y-4">
        {steps.map((item, i) => (
          <div
            key={item}
            className={`rounded-2xl p-4 transition-all duration-500 ${
              step > i
                ? "bg-gradient-to-r from-violet-600 to-fuchsia-600"
                : step === i
                ? "bg-violet-600/40 animate-pulse"
                : "bg-white/5"
            }`}
          >
            {step > i ? "✓" : step === i ? "⌛" : "○"} {item}
          </div>
        ))}
      </div>
    </div>
  );
}