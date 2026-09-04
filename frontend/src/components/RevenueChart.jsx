import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp } from "lucide-react";

export default function RevenueChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // Fetch Revenue Data
  // ----------------------------
  useEffect(() => {
    let cancelled = false;

    const loadRevenue = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/analytics/revenue");

        if (!res.ok) throw new Error("Failed to fetch revenue");

        const revenueData = await res.json();

        if (!cancelled) {
          setData(revenueData);
        }
      } catch (err) {
        console.error("Revenue fetch failed:", err);

        if (!cancelled) {
          // Fallback if backend has no data yet
          setData([
            { day: "Mon", revenue: 22000 },
            { day: "Tue", revenue: 27000 },
            { day: "Wed", revenue: 31000 },
            { day: "Thu", revenue: 28000 },
            { day: "Fri", revenue: 39000 },
            { day: "Sat", revenue: 45000 },
          ]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    // Initial fetch
    loadRevenue();

    // Refresh every 30 seconds
    const interval = setInterval(loadRevenue, 30000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // ----------------------------
  // Analytics
  // ----------------------------
  const { growth, average, peak, bestDay } = useMemo(() => {
    if (!data.length) {
      return {
        growth: "0.0",
        average: 0,
        peak: 0,
        bestDay: "-",
      };
    }

    const first = data[0].revenue;
    const last = data[data.length - 1].revenue;

    const growthValue =
      first === 0 ? 0 : ((last - first) / first) * 100;

    const avg = Math.round(
      data.reduce((sum, item) => sum + item.revenue, 0) / data.length
    );

    const maxRevenue = Math.max(...data.map((d) => d.revenue));

    const topDay =
      data.find((d) => d.revenue === maxRevenue)?.day || "-";

    return {
      growth: growthValue.toFixed(1),
      average: avg,
      peak: maxRevenue,
      bestDay: topDay,
    };
  }, [data]);

  if (loading) {
    return (
      <div className="h-[380px] flex items-center justify-center text-gray-500">
        Loading revenue analytics...
      </div>
    );
  }

  return (
    <section className="py-2">
      {/* Header */}
      <div className="flex items-start justify-between pb-6 border-b border-gray-200">
        <div>
          <p className="text-sm text-gray-500">Revenue Analytics</p>

          <h2 className="text-2xl font-semibold mt-1 text-gray-900">
            Live Revenue Trend
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Real-time revenue performance from your MySQL database.
          </p>
        </div>

        <div className="flex items-center gap-2 text-green-600">
          <TrendingUp size={18} />
          <span className="font-semibold">
            {growth.startsWith("-") ? growth : `+${growth}`}%
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="pt-6">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#5B3FD8" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#5B3FD8" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#6B7280"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#6B7280"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
            />

            <Tooltip
              cursor={{
                stroke: "#5B3FD8",
                strokeWidth: 1,
              }}
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                color: "#111827",
                boxShadow: "0 8px 24px rgba(0,0,0,.08)",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              fill="url(#revenueGradient)"
              stroke="none"
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#5B3FD8"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#5B3FD8",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#5B3FD8",
                stroke: "#FFFFFF",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Peak Revenue
          </p>

          <p className="text-lg font-semibold text-gray-900 mt-1">
            ₹{Math.round(peak / 1000)}k
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Average
          </p>

          <p className="text-lg font-semibold text-gray-900 mt-1">
            ₹{Math.round(average / 1000)}k
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Best Day
          </p>

          <p className="text-lg font-semibold text-gray-900 mt-1">
            {bestDay}
          </p>
        </div>
      </div>
    </section>
  );
}