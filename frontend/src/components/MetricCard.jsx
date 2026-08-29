import { TrendingUp } from "lucide-react";

function MetricCard({
  title,
  value,
  change,
  color = "text-text",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left py-5 border-b border-border hover:border-accent transition-all duration-200 group"
    >
      {/* Metric Title */}
      <p className="text-sm text-muted font-medium tracking-wide">
        {title}
      </p>

      {/* Metric Value */}
      <h2
        className={`text-[32px] font-semibold tracking-tight mt-2 ${color}`}
      >
        {value}
      </h2>

      {/* Trend Indicator */}
      <div className="mt-3 flex items-center gap-2 text-sm text-muted">
        <TrendingUp
          size={15}
          className="text-success group-hover:text-accent transition-colors"
        />
        <span>{change}</span>
      </div>
    </button>
  );
}

export default MetricCard;