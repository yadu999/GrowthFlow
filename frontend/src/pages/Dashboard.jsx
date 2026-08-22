import { useState, useEffect } from "react";

import Layout from "../components/Layout";
import MetricCard from "../components/MetricCard";
import RevenueChart from "../components/RevenueChart";
import AnalysisPanel from "../components/AnalysisPanel";
import CustomerTable from "../components/CustomerTable";
import AgentTimeline from "../components/AgentTimeline";
import MerchantCard, { customers } from "../components/MerchantCard";
import CopilotPanel from "../components/CopilotPanel";
import LiveFeed from "../components/LiveFeed";

export default function Dashboard() {
  const [index, setIndex] = useState(0);
  const [copilotOpen, setCopilotOpen] = useState(false);

  const customer = customers[index];

  const form = {
    cart_value: customer.cart,
    time_spent: customer.time,
    coupon_used: customer.coupon,
  };

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(-1);

  const [metrics, setMetrics] = useState({
    revenue: 320000,
    conversion: 5.8,
    abandoned: 143,
    recovered: 37,
  });

  // Live dashboard animation
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => ({
        revenue: prev.revenue + Math.floor(Math.random() * 500),
        conversion: Number(
          (prev.conversion + (Math.random() * 0.04 - 0.02)).toFixed(2)
        ),
        abandoned: prev.abandoned + (Math.random() > 0.85 ? 1 : 0),
        recovered: prev.recovered + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextCustomer = () => {
    setIndex((prev) => (prev + 1) % customers.length);
    setResult(null);
    setStep(-1);
  };

  // Analyze current customer
  const analyze = async () => {
    setLoading(true);
    setResult(null);
    setStep(0);

    try {
      await new Promise((r) => setTimeout(r, 600));
      setStep(1);

      await new Promise((r) => setTimeout(r, 600));
      setStep(2);

      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`Backend returned ${res.status}`);
      }

      const data = await res.json();

      setStep(3);
      setResult(data);
    } catch (err) {
      console.error(err);
      setStep(-1);
      alert("Failed to contact backend.");
    } finally {
      setLoading(false);
    }
  };

  // Demo Mode
  const demoMode = async () => {
    for (let i = 0; i < customers.length; i++) {
      setIndex(i);
      setResult(null);
      setStep(0);

      await new Promise((r) => setTimeout(r, 600));
      setStep(1);

      await new Promise((r) => setTimeout(r, 600));
      setStep(2);

      const current = customers[i];

      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_value: current.cart,
          time_spent: current.time,
          coupon_used: current.coupon,
        }),
      });

      const data = await res.json();

      setResult(data);
      toast.success(
`Recovered ₹${current.cart.toLocaleString("en-IN")} cart`
);
      setStep(4);

      await new Promise((r) => setTimeout(r, 2500));
    }

    setStep(-1);
  };

  return (
    <Layout>
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 -left-40 w-[420px] h-[420px] rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-fuchsia-600/15 blur-[160px]" />
      </div>

      <div className="space-y-8">
        {/* Hero */}
        <div className="flex justify-between items-center flex-wrap gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
              GrowthFlow AI
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              Autonomous Commerce Growth Agent
            </p>

            <p className="text-gray-500 mt-1 max-w-2xl">
              Analyze customer behavior, predict purchase intent, and recover
              abandoned carts using AI-powered offers and merchant automation.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-xl">
            <p className="text-gray-500 text-sm">Live AI Engine</p>

            <div className="flex items-center gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="font-medium">Online • Mumbai</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={demoMode}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:scale-105 transition font-semibold shadow-lg"
          >
            ▶ Demo Mode
          </button>

          <button
            onClick={nextCustomer}
            className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500 transition backdrop-blur-xl"
          >
            Next Customer
          </button>
        </div>

        {/* Live Metrics */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <MetricCard
            title="Revenue Today"
            value={`₹${metrics.revenue.toLocaleString("en-IN")}`}
            change="+18% vs yesterday"
          />

          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversion}%`}
            change="+1.2%"
            color="text-green-400"
          />

          <MetricCard
            title="Abandoned Carts"
            value={metrics.abandoned}
            change="Live tracking"
            color="text-yellow-400"
          />

          <MetricCard
            title="AI Recovery Rate"
            value={`${metrics.recovered}%`}
            change="+12%"
            color="text-purple-400"
          />
        </div>

        {/* Merchant + AI Analysis */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-5">
            <MerchantCard customer={customer} onNext={nextCustomer} />

            <button
              onClick={analyze}
              disabled={loading}
              className="w-full rounded-2xl py-4 text-lg font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? "AI is analyzing..." : "Analyze Customer"}
            </button>
          </div>

          <AnalysisPanel result={result} loading={loading} />
        </div>

        {/* Workflow + Customer Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <AgentTimeline step={step} />
          <CustomerTable />
        </div>

        {/* Revenue + Live Feed */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <RevenueChart />
          <LiveFeed />
        </div>
      </div>

      {/* Floating AI Assistant */}
      <button
        onClick={() => setCopilotOpen(!copilotOpen)}
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-2xl text-2xl md:text-3xl hover:scale-110 transition z-50"
      >
        🤖
      </button>

      {/* Slide-out Copilot */}
      <div
        className={`fixed bottom-24 right-5 md:bottom-28 md:right-8 w-[90vw] max-w-[380px] transition-all duration-300 z-40 ${
          copilotOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <CopilotPanel />
      </div>
    </Layout>
  );
}