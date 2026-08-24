import ConfidenceRing from "./ConfidenceRing";
import SkeletonCard from "./SkeletonCard";

function Info({ title, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-xl font-semibold mt-1">{value}</h3>
    </div>
  );
}

export default function AnalysisPanel({ result, loading }) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <h2 className="text-2xl font-bold mb-6">AI Recovery Plan</h2>

        <div className="space-y-4 animate-pulse">
          <div className="h-24 rounded-2xl bg-white/10" />
          <div className="h-20 rounded-2xl bg-white/10" />
          <div className="h-20 rounded-2xl bg-white/10" />
          <div className="h-32 rounded-2xl bg-white/10" />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <h2 className="text-2xl font-bold">AI Recovery Plan</h2>
        <p className="text-gray-400 mt-6">
          Analyze a customer to generate AI recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-5">
      <h2 className="text-2xl font-bold">AI Recovery Plan</h2>

      <Info title="Customer Intent" value={result.intent.intent} />

      <Info title="Next Best Offer" value={result.offer.offer} />

      <Info title="Confidence" value={`${result.intent.confidence}%`} />

      <Info
        title="Recovery Probability"
        value={`${result.recovery.probability}%`}
      />

      <Info title="Priority" value={result.recovery.priority} />

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-gray-400 text-sm mb-3">AI Reasoning</p>

        <ul className="space-y-2">
          {result.intent.reasoning.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-violet-400">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-gray-400 text-sm">Offer Explanation</p>
        <p className="mt-2">{result.offer.why}</p>
      </div>

      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/20 rounded-2xl p-4">
        <p className="text-gray-300 text-sm mb-2">WhatsApp Recovery Message</p>
        <p className="text-white">{result.message.message}</p>
      </div>
    </div>
  );
}