import { TrendingUp } from "lucide-react";

function MetricCard({
  title,
  value,
  change,
  color = "text-white",
}) {
  return (
    <div className="bg-surface border border-border rounded-[20px] p-6 hover:border-slate-600 transition-all duration-200">
      {/* Header */}
      <p className="text-muted text-sm font-medium">{title}</p>

      {/* Main Value */}
      <h2 className={`text-[32px] font-bold tracking-tight mt-3 ${color}`}>
        {value}
      </h2>

      {/* Trend */}
      <div className="mt-5 flex items-center gap-2 text-sm text-muted">
        <TrendingUp size={15} className="text-success" />
        <span>{change}</span>
      </div>

      {/* Bottom Divider */}
      <div className="mt-5 border-t border-border pt-4">
        <div className="h-1 w-full rounded-full bg-slate-700 overflow-hidden">
          <div className="h-full w-3/5 rounded-full bg-accent"></div>
        </div>
      </div>
    </div>
  );
}

export default MetricCard;