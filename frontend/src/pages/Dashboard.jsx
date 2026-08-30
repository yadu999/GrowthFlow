import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { Play, Workflow, Activity, Sparkles } from "lucide-react";


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
    const toggle = (e) => setCopilotOpen(e.detail?.open ?? false);

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
  let socket = null;
  let reconnectTimer = null;
  let intentionallyClosed = false;

  const connect = () => {
    socket = new WebSocket("ws://127.0.0.1:8000/ws/dashboard");

    socket.onopen = () => {
      console.log("Dashboard WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "dashboard") {
        setMetrics(data.metrics);
        return;
      }

      if (data.type === "new_customer") {
        setLiveCustomers((prev) => {
          const exists = prev.some((c) => c.id === data.customer.id);

          if (exists) return prev;

          return [data.customer, ...prev].slice(0, 20);
        });

        toast.success(
          `New customer: ${data.customer.name} • ₹${Number(
            data.customer.cart_value
          ).toLocaleString("en-IN")}`
        );
      }
    };

    socket.onerror = () => {
      console.log("WebSocket error");
    };

    socket.onclose = () => {
      if (!intentionallyClosed) {
        console.log("WebSocket disconnected. Reconnecting...");
        reconnectTimer = setTimeout(connect, 3000);
      }
    };
  };

  connect();

  return () => {
    intentionallyClosed = true;

    if (reconnectTimer) clearTimeout(reconnectTimer);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close(1000, "Dashboard closed");
    }
  };
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
    <>
      <div className="space-y-10">

                {/* ---------------- HERO ---------------- */}

        <section className="border-b border-border pb-10">
          <div className="grid xl:grid-cols-[1.7fr_0.9fr] gap-10 items-stretch">

            {/* Left */}
            <div className="flex flex-col justify-between h-full py-2">

              <div>
                <p className="text-sm text-muted mb-4">
  Commerce Intelligence Platform
</p>

<h1 className="text-5xl font-bold tracking-tight text-gray-900">
  GrowthFlow
</h1>

<p className="text-muted text-xl leading-8 mt-5 max-w-2xl">
  Analyze customer conversion behaviour, recover abandoned carts, and
  generate intelligent AI-powered recovery workflows in real time.
</p>
              </div>

              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={demoMode}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5B3FD8] text-white font-medium hover:bg-[#4B32B5] transition shadow-sm"
                >
                  <Play size={18} />
                  Run Demo
                </button>

                <button
                  onClick={() =>
                    workflowRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition"
                >
                  <Workflow size={18} />
                  View Workflows
                </button>

                <button
                  onClick={nextCustomer}
                  className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition"
                >
                  Next Customer
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm flex flex-col justify-between h-full">

              <div>
                <p className="text-sm text-muted mb-6">
                  Real-Time Engine
                </p>

                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 mt-2 animate-pulse"></span>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Operational
                    </h3>

                    <p className="text-gray-600 mt-1">
                      Live AI + WebSocket processing enabled.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-200 space-y-4">

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Live Customers
                  </span>

                  <span className="text-lg font-semibold">
                    {liveCustomers.length}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    WebSocket
                  </span>

                  <span className="font-semibold text-green-600">
                    Connected
                  </span>
                </div>

              </div>

            </div>

          </div>
        </section>

       {/* ---------------- METRICS ---------------- */}

<section className="bg-[#F3F4F6] border border-[#D0D5DD] rounded-2xl overflow-hidden">

  <div className="grid md:grid-cols-2 xl:grid-cols-4">

    <div className="p-6 xl:border-r border-[#C7CCD4]">
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
    </div>

    <div className="p-6 xl:border-r border-[#C7CCD4]">
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
    </div>

    <div className="p-6 xl:border-r border-[#C7CCD4]">
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
    </div>

    <div className="p-6">
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
    </div>

  </div>

</section>

        {/* ---------------- CUSTOMER + ANALYSIS ---------------- */}

<section
  ref={workflowRef}
  className="grid xl:grid-cols-[1fr_1fr] gap-8 border-t border-border pt-10 items-start"
>
  {/* Left Panel */}
  <div className="bg-white rounded-2xl border border-border p-6 shadow-sm h-full flex flex-col">
    <MerchantCard customer={customer} onNext={nextCustomer} />

    <button
      onClick={analyze}
      disabled={loading}
      className="mt-6 w-full h-12 rounded-xl bg-[#5B3FD8] text-white font-medium hover:bg-[#4B32B5] disabled:opacity-50 transition"
    >
      {loading ? "Generating Workflow..." : "Generate Workflow"}
    </button>
  </div>

  {/* Right Panel */}
  <div className="bg-white rounded-2xl border border-border p-6 shadow-sm h-full">
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

      {copilotOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
            onClick={() => setCopilotOpen(false)}
          />

          <div className="fixed top-20 right-6 bottom-6 w-[420px] max-w-[calc(100vw-32px)] z-50">
            <CopilotPanel
              open={copilotOpen}
              onClose={() => setCopilotOpen(false)}
            />
          </div>
        </>
      )}
    </>
  );
}
