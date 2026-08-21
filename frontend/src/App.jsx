
import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    cart_value: 4999,
    time_spent: 780,
    coupon_used: false,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeCustomer = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Backend not running.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      <h1 className="text-5xl font-bold">
        GrowthFlow AI
      </h1>

      <p className="text-gray-400 mt-2">
        Autonomous Commerce Growth Agent
      </p>

      <div className="grid md:grid-cols-4 gap-5 mt-10">

        <Card title="Revenue" value="₹3.2L" />

        <Card title="Conversion" value="5.8%" />

        <Card title="Abandoned" value="143" />

        <Card title="Recovered" value="37%" />

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <div className="bg-gray-900 rounded-3xl p-6">

          <h2 className="text-2xl font-semibold">
            Analyze Customer
          </h2>

          <div className="mt-6 space-y-4">

            <Input
              label="Cart Value"
              value={form.cart_value}
              onChange={(v) =>
                setForm({
                  ...form,
                  cart_value: Number(v),
                })
              }
            />

            <Input
              label="Time Spent (seconds)"
              value={form.time_spent}
              onChange={(v) =>
                setForm({
                  ...form,
                  time_spent: Number(v),
                })
              }
            />

            <div>
              <label className="text-gray-300">
                Coupon Used
              </label>

              <select
                className="w-full mt-2 p-3 rounded-xl bg-gray-800"
                value={form.coupon_used}
                onChange={(e) =>
                  setForm({
                    ...form,
                    coupon_used:
                      e.target.value === "true",
                  })
                }
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <button
              onClick={analyzeCustomer}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
            >
              {loading
                ? "Analyzing..."
                : "Analyze Customer"}
            </button>

          </div>

        </div>

        <div className="bg-gray-900 rounded-3xl p-6">

          <h2 className="text-2xl font-semibold">
            AI Recovery Plan
          </h2>

          {!result ? (
            <p className="text-gray-400 mt-6">
              Run an analysis to see AI recommendations.
            </p>
          ) : (
            <div className="space-y-5 mt-6">

              <ResultCard
                title="Next Best Offer"
                value={result.recommended_offer}
              />

              <ResultCard
                title="Customer Intent"
                value={result.ai_analysis.intent}
              />

              <ResultCard
                title="Recommended Action"
                value={result.ai_analysis.action}
              />

              <div className="bg-gray-800 rounded-2xl p-4">
                <p className="text-sm text-gray-400">
                  WhatsApp Message
                </p>

                <p className="mt-2">
                  {result.ai_analysis.message}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-5">
      <p className="text-gray-400">{title}</p>
      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="text-gray-300">
        {label}
      </label>

      <input
        className="w-full mt-2 p-3 rounded-xl bg-gray-800"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}

function ResultCard({ title, value }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-4">
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h3 className="text-xl font-semibold mt-1">
        {value}
      </h3>
    </div>
  );
}

export default App;