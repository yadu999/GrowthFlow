import { TrendingUp } from "lucide-react";

function MetricCard({
  title,
  value,
  change,
  color = "text-blue-400",
}) {
  return (
    <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:border-violet-500 hover:-translate-y-1 transition-all duration-300">

      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-violet-500/20 blur-3xl" />

      <p className="text-gray-400 text-sm">{title}</p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>

      <div className="flex items-center gap-2 mt-4 text-green-400 text-sm font-medium">
        <TrendingUp size={16} />
        {change}
      </div>
    </div>
  );
}

export default MetricCard;