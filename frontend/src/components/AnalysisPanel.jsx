import ConfidenceRing from "./ConfidenceRing";
import SkeletonCard from "./SkeletonCard";

function Info({ title, value }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-4">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-xl font-semibold mt-1">{value}</h3>
    </div>
  );
}

function AnalysisPanel({ result, loading }) {
  if (loading) {
    return <SkeletonCard />;
  }

  if (!result) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <h2 className="text-2xl font-semibold">AI Recovery Plan</h2>
        <p className="text-gray-400 mt-6">
          Analyze a customer to generate AI recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 space-y-5">

      <h2 className="text-2xl font-semibold">
        AI Recovery Plan
      </h2>

      <Info
        title="Customer Intent"
        value={result.ai_analysis.intent}
      />

      <Info
        title="Next Best Action"
        value={result.ai_analysis.action}
      />

      {/* Confidence Ring */}
      <div className="bg-gray-800 rounded-2xl p-5">
        <p className="text-gray-400 text-sm mb-3">
          AI Confidence
        </p>

        <ConfidenceRing
          value={result.ai_analysis.confidence}
        />
      </div>

      {/* WhatsApp Message */}
      <div className="bg-gray-800 rounded-2xl p-4 border border-blue-500/20">
        <p className="text-gray-400 text-sm">
          Suggested WhatsApp Message
        </p>

        <p className="mt-3 leading-7">
          {result.ai_analysis.message}
        </p>
      </div>

    </div>
  );
}

export default AnalysisPanel;