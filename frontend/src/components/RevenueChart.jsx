import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip
} from "recharts";

const data = [
  { day: "Mon", revenue: 22000 },
  { day: "Tue", revenue: 27000 },
  { day: "Wed", revenue: 31000 },
  { day: "Thu", revenue: 28000 },
  { day: "Fri", revenue: 39000 },
  { day: "Sat", revenue: 45000 },
];

function RevenueChart() {
  return (
    <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
      <h2 className="text-xl font-semibold mb-4">
        Revenue Trend
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;