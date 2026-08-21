function MetricCard({ title, value, change, color = "text-blue-400" }) {
  return (
    <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">
      <p className="text-gray-400 text-sm">{title}</p>

      <h2 className={`text-4xl font-bold mt-2 ${color}`}>
        {value}
      </h2>

      <p className="text-green-400 text-sm mt-3">
        {change}
      </p>
    </div>
  );
}

export default MetricCard;