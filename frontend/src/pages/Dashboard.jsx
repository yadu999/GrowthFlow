import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { Play, Workflow, Activity } from "lucide-react";

import Layout from "../components/Layout";
import MetricCard from "../components/MetricCard";
import RevenueChart from "../components/RevenueChart";
import AnalysisPanel from "../components/AnalysisPanel";
import CustomerTable from "../components/CustomerTable";
import AgentTimeline from "../components/AgentTimeline";
import MerchantCard, { customers } from "../components/MerchantCard";
import LiveFeed from "../components/LiveFeed";
import CopilotPanel from "../components/CopilotPanel";

export default function Dashboard() {
  const [index, setIndex] = useState(0);
  const [copilotOpen, setCopilotOpen] = useState(false);

  const workflowRef = useRef(null);
  const revenueRef = useRef(null);
  const customerRef = useRef(null);

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

  /* ---------------- COPILOT ---------------- */

  useEffect(() => {
    const handler = () => setCopilotOpen((prev) => !prev);

    window.addEventListener("toggle-copilot", handler);

    return () =>
      window.removeEventListener("toggle-copilot", handler);
  }, []);

  /* ---------------- KEYBOARD SHORTCUTS ---------------- */

  useEffect(() => {
    const handler = (e) => {
      if (e.key.toLowerCase() === "n") nextCustomer();

      if (e.key.toLowerCase() === "c")
        window.dispatchEvent(new Event("toggle-copilot"));

      if (e.key === "Escape") {
        setResult(null);
        setStep(-1);
      }
    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener("keydown", handler);
  }, []);

  /* ---------------- LIVE METRICS ---------------- */

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

  /* ---------------- ACTIONS ---------------- */

  const nextCustomer = () => {
    setIndex((prev) => (prev + 1) % customers.length);
    setResult(null);
    setStep(-1);
  };

  const analyze = async () => {
    setLoading(true);
    setResult(null);
    setStep(0);

    try {
      await new Promise((r) => setTimeout(r, 500));
      setStep(1);

      await new Promise((r) => setTimeout(r, 500));
      setStep(2);

      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      setResult(data);
      setStep(4);

      toast.success(
        `Workflow generated for ₹${customer.cart.toLocaleString("en-IN")}`
      );
    } catch (err) {
      console.error(err);
      setStep(-1);
      toast.error("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  const demoMode = async () => {
    toast.loading("Running demo...", { id: "demo" });

    for (const current of customers) {
      setIndex(customers.indexOf(current));
      setResult(null);
      setStep(0);

      await new Promise((r) => setTimeout(r, 500));
      setStep(1);

      await new Promise((r) => setTimeout(r, 500));
      setStep(2);

      try {
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
        setStep(4);

        toast.success(
          `Recovered ₹${current.cart.toLocaleString("en-IN")}`,
          { id: "demo" }
        );
      } catch {
        toast.error("Demo failed", { id: "demo" });
      }

      await new Promise((r) => setTimeout(r, 2200));
    }

    toast.success("Demo completed", { id: "demo" });
  };

  return (
    <Layout>
      <div className="space-y-10">

        {/* HERO */}

        <section className="grid xl:grid-cols-[1.6fr_0.8fr] gap-8 items-center">

          <div className="space-y-5">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-sm text-muted">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              Commerce Platform
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Commerce Overview
            </h1>

            <p className="text-muted max-w-2xl text-lg leading-relaxed">
              Monitor customer journeys, recover abandoned carts,
              and automate commerce workflows from one dashboard.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">

              <button
                onClick={demoMode}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-medium hover:bg-slate-100 transition"
              >
                <Play size={18}/>
                Run Demo
              </button>

              <button
                onClick={() =>
                  workflowRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border hover:border-slate-500 transition"
              >
                <Workflow size={18}/>
                View Workflows
              </button>

              <button
                onClick={nextCustomer}
                className="px-5 py-3 rounded-xl bg-surface border border-border hover:border-slate-500 transition"
              >
                Next Customer
              </button>

            </div>

          </div>

          {/* STATUS CARD */}

          <div className="bg-surface border border-border rounded-2xl p-6">

            <p className="text-sm text-muted">
              Real-Time Engine
            </p>

            <div className="flex items-center gap-3 mt-5">

              <span className="w-3 h-3 rounded-full bg-success animate-pulse"></span>

              <div>

                <p className="font-semibold">
                  Operational
                </p>

                <p className="text-sm text-muted">
                  Processing commerce workflows in real time.
                </p>

              </div>

            </div>

            <div className="mt-6 pt-5 border-t border-border space-y-3">

              <div className="flex justify-between text-sm">
                <span className="text-muted">Workflows today</span>
                <span className="font-semibold">1,284</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted">Response time</span>
                <span className="font-semibold">142 ms</span>
              </div>

            </div>

          </div>

        </section>

        {/* METRICS */}

        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

          <MetricCard
            title="Revenue Today"
            value={`₹${metrics.revenue.toLocaleString("en-IN")}`}
            change="+18% this week"
            onClick={() =>
              revenueRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />

          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversion}%`}
            change="+1.2%"
            color="text-white"
            onClick={() =>
              customerRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />

          <MetricCard
            title="Abandoned Carts"
            value={metrics.abandoned}
            change="Live tracking"
            color="text-white"
            onClick={() =>
              workflowRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />

          <MetricCard
            title="Recovery Rate"
            value={`${metrics.recovered}%`}
            change="+12%"
            color="text-white"
            onClick={() =>
              workflowRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />

        </section>

        {/* MERCHANT + ANALYSIS */}

        <section
          ref={workflowRef}
          className="grid xl:grid-cols-2 gap-8 items-start"
        >

          <div className="space-y-5">

            <MerchantCard
              customer={customer}
              onNext={nextCustomer}
            />

            <button
              onClick={analyze}
              disabled={loading}
              className="w-full rounded-xl py-4 bg-white text-black font-semibold hover:bg-slate-100 disabled:opacity-50 transition"
            >
              {loading ? "Generating Workflow..." : "Generate Workflow"}
            </button>

          </div>

          <AnalysisPanel
            result={result}
            loading={loading}
          />

        </section>

        {/* WORKFLOW + CUSTOMERS */}

        <section
          ref={customerRef}
          className="grid xl:grid-cols-2 gap-8 items-start"
        >

          <AgentTimeline step={step}/>

          <CustomerTable/>

        </section>

        {/* REVENUE */}

        <section
          ref={revenueRef}
          className="grid xl:grid-cols-2 gap-8 items-start"
        >

          <RevenueChart/>

          <LiveFeed/>

        </section>

        {/* ACTIVITY */}

        <section className="rounded-2xl border border-border bg-surface p-6">

          <div className="flex items-center gap-2 mb-6">

            <Activity size={20}/>

            <h2 className="text-xl font-semibold">
              Commerce Activity
            </h2>

          </div>

          <div className="space-y-4">

            {[
              {
                title: "Recovery workflow generated",
                time: "2 min ago",
              },
              {
                title: "Customer intent updated",
                time: "8 min ago",
              },
              {
                title: "Campaign automation executed",
                time: "14 min ago",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 border-b border-border last:border-none"
              >

                <div>

                  <p className="font-medium">
                    {item.title}
                  </p>

                  <p className="text-sm text-muted">
                    {item.time}
                  </p>

                </div>

                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new Event("toggle-copilot")
                    )
                  }
                  className="px-4 py-2 rounded-lg border border-border hover:bg-surface-secondary transition text-sm"
                >
                  View Workflow
                </button>

              </div>
            ))}

          </div>

        </section>

      </div>

      {/* COPILOT */}

      <div
        className={`fixed top-20 right-0 h-[calc(100vh-80px)] w-[380px] max-w-[90vw]
        bg-surface border-l border-border transition-transform duration-300 z-40
        ${copilotOpen ? "translate-x-0" : "translate-x-full"}`}
      >

        <CopilotPanel/>

      </div>

    </Layout>
  );
}