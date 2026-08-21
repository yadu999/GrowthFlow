function AgentTimeline({ step }) {
  const agents = [
    "Intent Agent",
    "Offer Agent",
    "Message Agent",
    "Recovery Plan"
  ];

  return (
    <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">

      <h2 className="text-xl font-semibold mb-6">
        AI Workflow
      </h2>

      <div className="space-y-4">

        {agents.map((agent, index) => (
          <div
            key={agent}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
              step >= index
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            <div className="text-xl">
              {step > index ? "✓" : step === index ? "⏳" : "○"}
            </div>

            <div>{agent}</div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default AgentTimeline;