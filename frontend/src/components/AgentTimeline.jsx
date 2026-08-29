import {
  Brain,
  Gift,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Circle,
} from "lucide-react";

export default function AgentTimeline({ step }) {
  const steps = [
    {
      name: "Intent Analysis",
      description: "Evaluating purchase behaviour and customer signals.",
      icon: Brain,
    },
    {
      name: "Offer Selection",
      description: "Choosing the highest-impact recovery incentive.",
      icon: Gift,
    },
    {
      name: "Message Generation",
      description: "Creating a personalized customer message.",
      icon: MessageSquare,
    },
    {
      name: "Recovery Decision",
      description: "Finalizing the recovery workflow.",
      icon: ShieldCheck,
    },
  ];

  const getStatus = (i) => {
    if (step > i)
      return {
        label: "Completed",
        color: "text-success",
      };

    if (step === i)
      return {
        label: "Running",
        color: "text-accent",
      };

    return {
      label: "Pending",
      color: "text-muted",
    };
  };

  return (
    <section className="py-2">
      {/* Header */}
      <div className="pb-6 border-b border-border">
        <p className="text-sm text-muted">Workflow Execution</p>

        <h2 className="text-2xl font-semibold mt-1 text-text">
          AI Processing Pipeline
        </h2>

        <p className="text-sm text-muted mt-2">
          The workflow progresses through four decision-making stages before
          generating a recovery recommendation.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative pt-6">
        <div className="absolute left-4 top-8 bottom-8 w-px bg-border"></div>

        <div className="space-y-8">
          {steps.map((item, i) => {
            const Icon = item.icon;
            const completed = step > i;
            const active = step === i;
            const status = getStatus(i);

            return (
              <div key={item.name} className="relative flex gap-5">
                {/* Timeline Icon */}
                <div className="relative z-10 w-8 h-8 rounded-full bg-background flex items-center justify-center">
                  {completed ? (
                    <CheckCircle2 size={20} className="text-success" />
                  ) : active ? (
                    <Loader2 size={20} className="text-accent animate-spin" />
                  ) : (
                    <Icon size={18} className="text-muted" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6 border-b border-border last:border-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-text">{item.name}</h3>

                    <span className={`text-sm font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  <p className="text-sm text-muted mt-2 leading-6">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-border flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">
            Pipeline Status
          </p>

          <p className="text-sm font-medium text-text mt-1">
            {step === -1
              ? "Waiting to start"
              : step >= steps.length
              ? "Workflow Completed"
              : "Processing"}
          </p>
        </div>

        <Circle
          size={10}
          className={`${
            step >= steps.length
              ? "text-success"
              : step === -1
              ? "text-muted"
              : "text-accent"
          }`}
          fill="currentColor"
        />
      </div>
    </section>
  );
}