import {
  CheckCircle2,
  Brain,
  MessageSquare,
  Target,
  ArrowUpRight,
} from "lucide-react";
import ConfidenceRing from "./ConfidenceRing";

function Info({ title, value, icon: Icon }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <Icon size={17} className="text-muted" />

        <div>
          <p className="text-xs uppercase tracking-wider text-muted">
            {title}
          </p>
        </div>
      </div>

      <span className="font-medium text-text text-right">
        {value}
      </span>
    </div>
  );
}

export default function AnalysisPanel({ result, loading }) {
  if (loading) {
    return (
      <section className="py-2">
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div>
            <p className="text-sm text-muted">Model Analysis</p>
            <h2 className="text-2xl font-semibold mt-1 text-text">
              Recovery Workflow
            </h2>
          </div>

          <span className="text-sm text-accent animate-pulse">
            Analyzing...
          </span>
        </div>

        <div className="space-y-5 pt-6 animate-pulse">
          <div className="h-10 bg-surface rounded-md" />
          <div className="h-10 bg-surface rounded-md" />
          <div className="h-10 bg-surface rounded-md" />
          <div className="h-24 bg-surface rounded-md" />
        </div>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="py-2">
        <div className="flex items-center gap-3 pb-6 border-b border-border">
          <Brain size={22} className="text-accent" />

          <div>
            <p className="text-sm text-muted">Model Analysis</p>
            <h2 className="text-2xl font-semibold text-text">
              Recovery Workflow
            </h2>
          </div>
        </div>

        <div className="py-12 text-center">
          <Brain size={40} className="mx-auto text-muted mb-4" />

          <p className="text-text font-medium">
            No prediction available
          </p>

          <p className="text-muted mt-2 max-w-md mx-auto">
            Generate a workflow to view customer intent, recovery probability,
            and personalized recommendations.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-2">

      {/* Header */}

      <div className="flex items-start justify-between pb-6 border-b border-border">

        <div>
          <p className="text-sm text-muted">Model Analysis</p>

          <h2 className="text-2xl font-semibold mt-1 text-text">
            Recovery Workflow
          </h2>
        </div>

        <div className="text-center">
          <ConfidenceRing confidence={result.intent.confidence} />
          <p className="text-xs text-muted mt-2">Confidence</p>
        </div>

      </div>

      {/* Key Insights */}

      <div className="pt-3">

        <Info
          title="Customer Intent"
          value={result.intent.intent}
          icon={Target}
        />

        <Info
          title="Next Best Offer"
          value={result.offer.offer}
          icon={CheckCircle2}
        />

        <Info
          title="Recovery Probability"
          value={`${result.recovery.probability}%`}
          icon={ArrowUpRight}
        />

        <Info
          title="Priority"
          value={result.recovery.priority}
          icon={Brain}
        />

      </div>

      {/* AI Reasoning */}

      <div className="pt-8 border-t border-border">

        <div className="flex items-center gap-2 mb-5">
          <Brain size={18} className="text-accent" />
          <h3 className="font-semibold text-text">
            Prediction Factors
          </h3>
        </div>

        <div className="space-y-4">

          {result.intent.reasoning.map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />

              <p className="text-muted leading-7">
                {item}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* Offer Explanation */}

      <div className="pt-8 border-t border-border">

        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 size={18} className="text-accent" />
          <h3 className="font-semibold text-text">
            Why this offer
          </h3>
        </div>

        <p className="text-muted leading-7">
          {result.offer.why}
        </p>

      </div>

      {/* WhatsApp Preview */}

      <div className="mt-8 rounded-xl border border-border bg-surface p-5">

        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={18} className="text-accent" />
          <h3 className="font-semibold text-text">
            Customer Message
          </h3>
        </div>

        <div className="border-l-2 border-accent pl-4">
          <p className="text-text leading-7">
            {result.message.message}
          </p>
        </div>

      </div>

    </section>
  );
}