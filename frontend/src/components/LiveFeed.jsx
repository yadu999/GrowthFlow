import { useEffect, useState } from "react";
import {
  Activity,
  ShoppingCart,
  Brain,
  Gift,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const events = [
  {
    icon: ShoppingCart,
    text: "High-value cart abandoned",
    detail: "₹6,999 cart detected",
    color: "text-danger",
  },
  {
    icon: Brain,
    text: "Behavior analysis completed",
    detail: "Purchase intent evaluated",
    color: "text-accent",
  },
  {
    icon: Gift,
    text: "Offer optimizer selected",
    detail: "Free Shipping recommended",
    color: "text-info",
  },
  {
    icon: MessageSquare,
    text: "Recovery message generated",
    detail: "WhatsApp message ready",
    color: "text-accent",
  },
  {
    icon: CheckCircle2,
    text: "Purchase completed",
    detail: "Customer recovered successfully",
    color: "text-success",
  },
];

export default function LiveFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      setFeed((prev) => [
        {
          ...events[index % events.length],
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...prev,
      ].slice(0, 5));

      index++;
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-2">
      {/* Header */}
      <div className="flex items-start justify-between pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Activity size={22} className="text-accent" />

          <div>
            <p className="text-sm text-muted">Activity Log</p>

            <h2 className="text-2xl font-semibold mt-1 text-text">
              Live Recovery Feed
            </h2>

            <p className="text-sm text-muted mt-2">
              Real-time AI recovery events and customer actions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-success text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
          Live
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pt-6">
        <div className="absolute left-4 top-8 bottom-8 w-px bg-border"></div>

        {feed.length === 0 ? (
          <div className="py-16 text-center text-muted">
            <Activity size={34} className="mx-auto mb-3 animate-pulse" />
            Waiting for live events...
          </div>
        ) : (
          <div className="space-y-7">
            {feed.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="relative flex gap-5">
                  {/* Timeline Icon */}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-background flex items-center justify-center">
                    <Icon size={18} className={item.color} />
                  </div>

                  {/* Event */}
                  <div className="flex-1 pb-6 border-b border-border last:border-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${item.color}`}>
                        {item.text}
                      </h3>

                      <span className="text-xs text-muted">
                        {item.time}
                      </span>
                    </div>

                    <p className="text-sm text-muted mt-2 leading-6">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-border flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">
            Feed Status
          </p>

          <p className="text-sm font-medium text-text mt-1">
            Live Monitoring
          </p>
        </div>

        <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
      </div>
    </section>
  );
}