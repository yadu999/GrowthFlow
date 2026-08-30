import { useState } from "react";
import { Sparkles, ShoppingCart } from "lucide-react";

export default function UpsellCard() {
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState("Samsung Smart TV");

  const demoProducts = [
    "Samsung Smart TV",
    "LG OLED TV",
    "Sony WH-1000XM5",
    "Apple Watch Series 9",
  ];

  // -----------------------------
  // Generate AI Bundle
  // -----------------------------
  const generateBundle = async (randomize = false) => {
    setLoading(true);

    try {
      let product = currentProduct;

      if (randomize) {
        const available = demoProducts.filter((p) => p !== currentProduct);
        product = available[Math.floor(Math.random() * available.length)];
        setCurrentProduct(product);
      }

      const res = await fetch("http://127.0.0.1:8000/upsell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
        }),
      });

      const data = await res.json();
      console.log("Upsell API Response:", data);

      setBundle(data);
    } catch (err) {
      console.error(err);
      alert("Unable to generate bundle.");
    }

    setLoading(false);
  };

  // -----------------------------
  // Razorpay Checkout
  // -----------------------------
  const acceptBundle = async () => {
    try {
      const total =
        bundle.grand_total ??
        bundle.total_amount ??
        bundle.original_total ??
        0;

      const orderRes = await fetch(
        "http://127.0.0.1:8000/razorpay/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            customer: "Demo Merchant",
          }),
        }
      );

      const order = await orderRes.json();

      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "GrowthFlow AI",
        description: "AI Bundle Checkout",
        order_id: order.order_id,

        handler: async function (response) {
          const verify = await fetch(
            "http://127.0.0.1:8000/razorpay/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            }
          );

          if (verify.ok) {
            alert("Payment Successful!");
          } else {
            alert("Payment Verification Failed.");
          }
        },

        prefill: {
          name: "Demo Merchant",
          email: "demo@growthflow.ai",
          contact: "9876543210",
        },

        theme: {
          color: "#5B3FD8",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Unable to start Razorpay Checkout.");
    }
  };

  // Safe values
  const originalTotal = Number(bundle?.original_total ?? bundle?.total_amount ?? 0);
  const discount = Number(bundle?.discount ?? 0);
  const grandTotal = Number(
    bundle?.grand_total ??
      bundle?.total_amount ??
      originalTotal - discount
  );

  return (
    <div className="bg-card rounded-2xl p-6 border border-border w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Sparkles size={22} />
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            AI Bundle Recommendation
          </h3>

          <p className="text-sm text-muted">
            Autonomous Upsell & Cross-Sell powered by GrowthFlow AI.
          </p>
        </div>
      </div>

      {/* Initial Button */}
      {!bundle ? (
        <button
          onClick={() => generateBundle(false)}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-[#5B3FD8] text-white font-medium hover:bg-[#4B32B5] transition disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Bundle"}
        </button>
      ) : (
        <div className="space-y-4">
          {/* Selected Product */}
          <div className="rounded-xl border border-border p-4">
            <p className="text-xs text-muted uppercase">
              Selected Product
            </p>

            <h4 className="font-semibold mt-1">
              {bundle.product?.name || "Selected Product"}
            </h4>

            <p className="text-sm text-muted">
              ₹{Number(bundle.product?.price || 0).toLocaleString("en-IN")}
            </p>
          </div>

          {/* Recommendations */}
          <div className="rounded-xl border border-border p-4">
            <p className="text-xs text-muted uppercase mb-3">
              AI Recommended Bundle
            </p>

            <div className="space-y-3">
              {bundle.recommendations?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>

                    <p className="text-xs text-muted">
                      {item.reason || "AI recommendation"}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-xl border border-border p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted">Original Total</span>

              <span>₹{originalTotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Bundle Discount</span>

              <span>-₹{discount.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between pt-3 border-t border-border font-bold text-lg">
              <span>Total</span>

              <span>₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Razorpay Button */}
          <button
            onClick={acceptBundle}
            className="w-full h-12 rounded-xl bg-[#5B3FD8] text-white hover:bg-[#4B32B5] transition flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Pay with Razorpay
          </button>

          {/* Generate Another Bundle */}
          <button
            onClick={() => generateBundle(true)}
            disabled={loading}
            className="w-full h-12 rounded-xl border border-border hover:bg-gray-50 transition disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Another Bundle"}
          </button>
        </div>
      )}
    </div>
  );
}