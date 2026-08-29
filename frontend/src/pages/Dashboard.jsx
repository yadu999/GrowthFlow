import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { Play, Workflow, Activity, Sparkles } from "lucide-react";

import Layout from "../components/Layout";
import MetricCard from "../components/MetricCard";
import RevenueChart from "../components/RevenueChart";
import AnalysisPanel from "../components/AnalysisPanel";
import CustomerTable from "../components/CustomerTable";
import AgentTimeline from "../components/AgentTimeline";
import MerchantCard, { customers } from "../components/MerchantCard";
import LiveFeed from "../components/LiveFeed";
import CopilotPanel from "../components/CopilotPanel";
import UpsellCard from "../components/UpsellCard";

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
    revenue: 0,
    conversion: 0,
    abandoned: 0,
    recovery_rate: 0,
  });

  const [liveCustomers, setLiveCustomers] = useState([]);

  /* ---------------- Copilot Toggle ---------------- */

  useEffect(() => {
    const toggle = () => setCopilotOpen((p) => !p);

    window.addEventListener("toggle-copilot", toggle);

    return () => window.removeEventListener("toggle-copilot", toggle);
  }, []);

  /* ---------------- Keyboard Shortcuts ---------------- */

  useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName;

      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }

      if (e.key.toLowerCase() === "n") {
        nextCustomer();
      }

      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        window.dispatchEvent(new Event("toggle-copilot"));
      }

      if (e.key === "Escape") {
        setResult(null);
        setStep(-1);
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ---------------- Load Dashboard Metrics ---------------- */

  useEffect(() => {
    fetch("http://localhost:8000/dashboard")
      .then((r) => r.json())
      .then(setMetrics)
      .catch(() => {});
  }, []);

  /* ---------------- WebSocket Live Updates ---------------- */

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/dashboard");

    socket.onopen = () => {
      socket.send("connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "new_customer") {
        setLiveCustomers((prev) => [data.customer, ...prev]);

        setMetrics((prev) => ({
          ...prev,
          abandoned: prev.abandoned + 1,
        }));

        toast.success(
          `New customer: ${data.customer.name} • ₹${data.customer.cart_value.toLocaleString("en-IN")}`
        );
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => socket.close();
  }, []);

  const nextCustomer = () => {
    setIndex((prev) => (prev + 1) % customers.length);
    setResult(null);
    setStep(-1);
  };

  /* ---------------- Analyze ---------------- */

  const analyze = async () => {
    setLoading(true);
    setResult(null);
    setStep(0);

    try {
      await new Promise((r) => setTimeout(r, 400));
      setStep(1);

      await new Promise((r) => setTimeout(r, 400));
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
    } catch {
      setStep(-1);
      toast.error("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Demo Mode ---------------- */

  const demoMode = async () => {
    toast.loading("Running demo...", { id: "demo" });

    for (const current of customers) {
      setIndex(customers.indexOf(current));
      setResult(null);
      setStep(0);

      await new Promise((r) => setTimeout(r, 400));
      setStep(1);

      await new Promise((r) => setTimeout(r, 400));
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

      await new Promise((r) => setTimeout(r, 1800));
    }

    toast.success("Demo completed", { id: "demo" });
  };

  return (
    <Layout>
      <div className="space-y-10">

        {/* ---------------- HERO ---------------- */}

        <section className="border-b border-border pb-10">
          <div className="grid xl:grid-cols-[1.6fr_0.8fr] gap-12">
            <div>
              <p className="text-sm text-muted mb-4">
                My Models • Sales Conversion Model • Version 1
              </p>

              <h1 className="text-4xl font-semibold tracking-tight">
                Model Status
              </h1>

              <p className="text-muted text-lg mt-4 max-w-2xl">
                Analyze customer conversion behaviour and generate intelligent
                recovery workflows using AI.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <button
                  onClick={demoMode}
                  className="flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-white hover:bg-blue-600"
                >
                  <Play size={17} />
                  Run Demo
                </button>

                <button
                  onClick={() =>
                    workflowRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="flex items-center gap-2 px-5 py-3 rounded-md border border-border hover:bg-surface"
                >
                  <Workflow size={17} />
                  View Workflows
                </button>

                <button
                  onClick={nextCustomer}
                  className="px-5 py-3 rounded-md border border-border hover:bg-surface"
                >
                  Next Customer
                </button>
              </div>
            </div>

            <div className="panel p-6">
              <p className="text-sm text-muted">Real-Time Engine</p>

              <div className="flex items-center gap-3 mt-5">
                <span className="w-3 h-3 rounded-full bg-success animate-pulse"></span>

                <div>
                  <p className="font-semibold">Operational</p>

                  <p className="text-sm text-muted">
                    Live AI + WebSocket processing enabled.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Live Customers</span>

                  <span className="font-semibold">
                    {liveCustomers.length}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted">WebSocket</span>

                  <span className="font-semibold text-success">
                    Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- METRICS ---------------- */}

        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          <MetricCard
            title="Revenue Today"
            value={`₹${Number(metrics.revenue).toLocaleString("en-IN")}`}
            change="Live"
            onClick={() =>
              revenueRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />

          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversion}%`}
            change="Live"
            onClick={() =>
              customerRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />

          <MetricCard
            title="Abandoned Carts"
            value={metrics.abandoned}
            change="Live"
            onClick={() =>
              workflowRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />

          <MetricCard
            title="Recovery Rate"
            value={`${metrics.recovery_rate}%`}
            change="AI"
            onClick={() =>
              workflowRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />
        </section>

        {/* ---------------- CUSTOMER + ANALYSIS ---------------- */}

        <section
          ref={workflowRef}
          className="grid xl:grid-cols-[1fr_1fr] gap-10 items-start border-t border-border pt-10"
        >
          <div className="flex flex-col gap-5 self-start">
            <MerchantCard customer={customer} onNext={nextCustomer} />

            <button
              onClick={analyze}
              disabled={loading}
              className="w-full h-12 rounded-md bg-accent text-white font-medium hover:bg-blue-600 disabled:opacity-50 transition"
            >
              {loading ? "Generating Workflow..." : "Generate Workflow"}
            </button>
          </div>

          <div className="self-start">
            <AnalysisPanel result={result} loading={loading} />
          </div>
        </section>

        {/* ---------------- WORKFLOW ---------------- */}

        <section
          ref={customerRef}
          className="grid xl:grid-cols-2 gap-10 border-t border-border pt-10"
        >
          <AgentTimeline step={step} />

          <CustomerTable />
        </section>

        {/* ---------------- ANALYTICS ---------------- */}

        <section
          ref={revenueRef}
          className="grid xl:grid-cols-2 gap-10 border-t border-border pt-10"
        >
          <RevenueChart />

          <LiveFeed />
        </section>

        {/* ---------------- LIVE CUSTOMER FEED ---------------- */}

        <section className="border-t border-border pt-10">
          <div className="flex items-center gap-2 mb-8">
            <Activity size={20} />

            <h2 className="text-xl font-semibold">
              Live Customer Sessions
            </h2>
          </div>

          <div className="space-y-4">
            {liveCustomers.length === 0 ? (
              <div className="text-sm text-muted">
                Waiting for live customers...
              </div>
            ) : (
              liveCustomers.slice(0, 6).map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between items-center border-b border-border pb-4"
                >
                  <div>
                    <p className="font-medium">{c.name}</p>

                    <p className="text-sm text-muted">
                      {c.id} • ₹{c.cart_value.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <span className="text-sm text-accent">
                    {c.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ---------------- AI BUNDLE RECOMMENDATION ---------------- */}

        <section className="border-t border-border pt-10">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles size={20} className="text-accent" />

            <h2 className="text-xl font-semibold">
              AI Bundle Recommendation
            </h2>
          </div>

          <p className="text-muted mb-6">
            Autonomous Upsell & Cross-Sell powered by GrowthFlow AI.
          </p>

          <UpsellCard />
        </section>

      </div>

      {/* ---------------- FLOATING COPILOT ---------------- */}

      {copilotOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
            onClick={() => setCopilotOpen(false)}
          />

          <div className="fixed top-20 right-4 bottom-4 md:top-24 md:right-6 md:bottom-6 w-[420px] max-w-[calc(100vw-24px)] z-50 animate-in slide-in-from-right duration-300">
            <CopilotPanel />
          </div>
        </>
      )}
    </Layout>
  );
}