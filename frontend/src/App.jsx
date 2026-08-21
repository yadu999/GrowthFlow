import { useState, useEffect } from "react";

import MetricCard from "./components/MetricCard";
import RevenueChart from "./components/RevenueChart";
import AnalysisPanel from "./components/AnalysisPanel";
import CustomerTable from "./components/CustomerTable";
import AgentTimeline from "./components/AgentTimeline";
import MerchantCard, { customers } from "./components/MerchantCard";
import CopilotPanel from "./components/CopilotPanel";
import LiveFeed from "./components/LiveFeed";

function App() {
  // Merchant Simulator
  const [index, setIndex] = useState(0);
  const [copilotOpen, setCopilotOpen] = useState(false);

  const customer = customers[index];

  const form = {
    cart_value: customer.cart,
    time_spent: customer.time,
    coupon_used: customer.coupon,
  };

  // AI Analysis
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(-1);

  // Live Dashboard Metrics
  const [metrics, setMetrics] = useState({
    revenue: 320000,
    conversion: 5.8,
    abandoned: 143,
    recovered: 37,
  });

  // Live metric animation
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

      await new Promise((r) => setTimeout(r, 700));
      setStep(1);

      await new Promise((r) => setTimeout(r, 700));
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
      setStep(3);

      await new Promise((r) => setTimeout(r, 2000));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
        GrowthFlow AI
      </h1>

      <p className="text-gray-400 mt-3 text-lg">
        Autonomous Commerce Growth Agent
      </p>

      <p className="text-gray-500 mt-1 max-w-xl">
        Analyze customer behavior, predict purchase intent, and recover
        abandoned carts with AI-driven offers.
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6 flex-wrap">
        <button
          onClick={demoMode}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
        >
          ▶ Demo Mode
        </button>

        <button
          onClick={nextCustomer}
          className="bg-gray-800 px-6 py-3 rounded-2xl hover:bg-gray-700 transition"
        >
          Next Customer
        </button>
      </div>

      {/* Live Metrics */}
      <div className="grid md:grid-cols-4 gap-5 mt-10">
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
      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        <div className="space-y-5">
          <MerchantCard customer={customer} onNext={nextCustomer} />

          <button
            onClick={analyze}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-2xl py-4 text-lg font-semibold transition"
          >
            {loading ? "AI is analyzing..." : "Analyze Customer"}
          </button>
        </div>

        <AnalysisPanel result={result} />
      </div>

      {/* Workflow + Customer Activity */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <AgentTimeline step={step} />
        <CustomerTable />
      </div>

      {/* Revenue + Live Feed */}
      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <RevenueChart />
        <LiveFeed />
      </div>

      {/* Floating AI Assistant */}
      <button
        onClick={() => setCopilotOpen(!copilotOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-2xl text-3xl transition z-50"
      >
        🤖
      </button>

      {/* Slide-out Copilot */}
      <div
        className={`fixed bottom-28 right-8 w-[380px] max-w-[90vw] transition-all duration-300 z-40 ${
          copilotOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <CopilotPanel />
      </div>
    </div>
  );
}

export default App;