import { useState } from "react";
import { Sparkles, ShoppingCart } from "lucide-react";

export default function UpsellCard() {
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate AI Bundle
  const generateBundle = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/upsell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: "Samsung Smart TV",
        }),
      });

      const data = await res.json();
      setBundle(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // Accept Bundle & Create Checkout
  const acceptBundle = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/bundle/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: bundle.product.name,
          customer: "Demo Merchant",
        }),
      });

      const data = await res.json();

      alert(
        `Bundle Ready!\n\n` +
          `Total: ₹${data.total_amount.toLocaleString("en-IN")}\n\n` +
          `Payment Link Created`
      );
    } catch (err) {
      console.error(err);
      alert("Failed to create bundle checkout.");
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Sparkles size={22} />
        </div>

        <div>
          <h3 className="font-semibold">AI Bundle Recommendation</h3>

          <p className="text-sm text-muted">
            Autonomous Upsell & Cross-Sell
          </p>
        </div>
      </div>

      {/* Generate Bundle Button */}
      {!bundle && (
        <button
          onClick={generateBundle}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-primary text-white hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Bundle"}
        </button>
      )}

      {/* Bundle Results */}
      {bundle && (
        <div className="space-y-5">

          {/* Selected Product */}
          <div className="rounded-xl bg-surface p-4 border border-border">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{bundle.product.name}</h4>
                <p className="text-sm text-muted">Base Product</p>
              </div>

              <span className="font-semibold">
                ₹{bundle.product.price.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Recommended Products */}
          <div>
            <h4 className="text-sm font-semibold mb-3">
              Recommended Add-ons
            </h4>

            <div className="space-y-3">
              {bundle.recommended.map((item) => (
                <div
                  key={item.sku}
                  className="flex justify-between rounded-lg bg-surface p-3 border border-border"
                >
                  <div>
                    <p>{item.name}</p>
                    <p className="text-xs text-muted">
                      {item.category}
                    </p>
                  </div>

                  <span>
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Summary */}
          <div className="rounded-xl bg-surface p-4 border border-border">

            <div className="flex justify-between mb-2">
              <span>Additional Revenue</span>

              <span className="font-semibold text-green-500">
                ₹{bundle.additional_value.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between text-lg font-semibold">
              <span>New Order Value</span>

              <span>
                ₹{bundle.grand_total.toLocaleString("en-IN")}
              </span>
            </div>

          </div>

          {/* AI Reasoning */}
          <div className="rounded-xl bg-surface p-4 border border-border">

            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-primary" />

              <span className="font-semibold">AI Reasoning</span>
            </div>

            <p className="text-sm text-muted">
              {bundle.reason}
            </p>

          </div>

          {/* Accept Bundle */}
          <button
            onClick={acceptBundle}
            className="w-full py-3 rounded-xl bg-primary text-white flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <ShoppingCart size={18} />
            Accept Bundle
          </button>

        </div>
      )}

    </div>
  );
}