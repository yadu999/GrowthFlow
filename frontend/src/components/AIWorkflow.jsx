import { Bot, Search, Gift, MessageCircle, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Intent Agent",
    desc: "Analyzes customer behavior to predict purchase intent.",
    icon: Search,
  },
  {
    title: "Offer Agent",
    desc: "Chooses the best recovery offer.",
    icon: Gift,
  },
  {
    title: "Message Agent",
    desc: "Generates a personalized WhatsApp message.",
    icon: MessageCircle,
  },
  {
    title: "Merchant Approval",
    desc: "Every AI action is explainable and requires approval.",
    icon: ShieldCheck,
  },
];

export default function AIWorkflow() {
  return (
    <div className="rounded-xl border border-border p-6 bg-surface">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="text-blue-500" />
        <h2 className="text-xl font-semibold">Agentic Commerce Workflow</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="text-blue-500" size={18} />
                <span className="font-medium">{step.title}</span>
              </div>
              <p className="text-sm text-muted">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}