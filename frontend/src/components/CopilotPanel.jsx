import { useState, useRef, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  Copy,
  Sparkles,
  Megaphone,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

export default function CopilotPanel() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      type: "chat",
      title: "Merchant Copilot",
      answer:
        "Welcome back. I'm Merchant Copilot. I can explain customer behaviour, identify revenue opportunities, create campaigns, generate AI bundles, and build checkouts.",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const suggestions = [
    "Why are carts being abandoned today?",
    "Create a WhatsApp campaign",
    "Bundle Samsung TV",
    "Generate checkout for LG TV",
  ];

  const askAI = async () => {
    if (!question.trim()) return;

    const q = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: q,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/copilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          ...data,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          type: "chat",
          title: "Connection Error",
          answer: "Unable to reach Merchant Copilot.",
        },
      ]);
    }

    setLoading(false);
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-full min-h-0 flex flex-col overflow-hidden">

      {/* Header */}

      <div className="px-6 py-5 border-b border-gray-200 shrink-0">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#5B3FD8] flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                AI Assistant
              </p>

              <h2 className="text-2xl font-semibold text-gray-900">
                Merchant Copilot
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-green-600">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online
          </div>

        </div>
      </div>

      {/* Suggestions */}

      <div className="px-6 py-3 border-b border-gray-200 shrink-0">
        <div className="flex flex-wrap gap-2">

          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuestion(s)}
              className="px-3 py-2 text-xs rounded-full border border-gray-300 hover:border-[#5B3FD8] hover:bg-[#F3F1FE] transition"
            >
              {s}
            </button>
          ))}

        </div>
      </div>

      {/* Chat */}

      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5 space-y-6">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            {msg.role === "assistant" && (
              <div className="w-9 h-9 rounded-xl bg-[#5B3FD8] flex items-center justify-center shrink-0">
                <Bot size={16} className="text-white" />
              </div>
            )}

            <div
              className={`max-w-[88%] rounded-2xl px-4 py-4 ${
                msg.role === "user"
                  ? "bg-[#5B3FD8] text-white"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >

              {/* User Bubble */}

              {msg.role === "user" && (
                <p className="text-sm leading-7 text-white whitespace-pre-wrap">
                  {msg.text}
                </p>
              )}

              {/* Assistant */}

              {msg.role === "assistant" && (
                <div className="space-y-3">

                  <div className="flex items-center gap-2">
                    <Sparkles size={15} className="text-[#5B3FD8]" />
                    <span className="font-semibold text-gray-900">
                      {msg.title || "Merchant Copilot"}
                    </span>
                  </div>

                  {/* Chat */}

                  {msg.type === "chat" && (
                    <p className="text-sm leading-7 text-gray-800 whitespace-pre-wrap">
                      {msg.answer}
                    </p>
                  )}

                  {/* Campaign Card */}

                  {msg.type === "campaign" && (
                    <div className="space-y-3">

                      <div className="flex items-center gap-2 text-[#5B3FD8] font-medium">
                        <Megaphone size={18} />
                        Campaign Created
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">

                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-gray-500 text-xs">Audience</p>
                          <p className="font-semibold">
                            {msg.data.audience}
                          </p>
                        </div>

                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-gray-500 text-xs">Channel</p>
                          <p className="font-semibold">
                            {msg.data.channel}
                          </p>
                        </div>

                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-gray-500 text-xs">Recovery</p>
                          <p className="font-semibold">
                            {msg.data.predicted_recovery}%
                          </p>
                        </div>

                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-gray-500 text-xs">Status</p>
                          <p className="font-semibold text-orange-500">
                            {msg.data.status}
                          </p>
                        </div>

                      </div>

                      <div className="bg-white rounded-lg p-3 border">
                        <p className="text-xs text-gray-500 mb-1">
                          AI Message
                        </p>

                        <p className="text-sm">
                          {msg.data.message}
                        </p>
                      </div>

                    </div>
                  )}

                  {/* Bundle Card */}

                  {msg.type === "bundle" && (
                    <div className="space-y-3">

                      <div className="flex items-center gap-2 text-[#5B3FD8] font-medium">
                        <ShoppingBag size={18} />
                        {msg.data.product.name}
                      </div>

                      <div className="space-y-2">

                        {msg.data.recommended.map((item) => (
                          <div
                            key={item.sku}
                            className="flex justify-between bg-white rounded-lg p-3 border"
                          >
                            <div>
                              <p className="font-medium">
                                {item.name}
                              </p>

                              <p className="text-xs text-gray-500">
                                {item.category}
                              </p>
                            </div>

                            <span>
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}

                      </div>

                      <div className="bg-white rounded-lg p-3 border">

                        <div className="flex justify-between">
                          <span>Additional Revenue</span>

                          <span className="font-semibold text-green-600">
                            ₹{msg.data.additional_value.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="flex justify-between mt-2 text-lg font-semibold">
                          <span>New Order Value</span>

                          <span>
                            ₹{msg.data.grand_total.toLocaleString("en-IN")}
                          </span>
                        </div>

                      </div>

                      <div className="bg-[#F3F1FE] rounded-lg p-3 text-sm text-gray-700 border border-[#D8D0FF]">
                        {msg.data.reason}
                      </div>

                    </div>
                  )}

                  {/* Checkout Card */}

                  {msg.type === "checkout" && (
                    <div className="space-y-3">

                      <div className="flex items-center gap-2 text-[#5B3FD8] font-medium">
                        <CreditCard size={18} />
                        Checkout Ready
                      </div>

                      <div className="bg-white rounded-lg p-3 border space-y-2">

                        <div className="flex justify-between">
                          <span>Customer</span>
                          <span>{msg.data.customer}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>Total</span>

                          <span className="font-semibold">
                            ₹{msg.data.total_amount.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Status</span>

                          <span className="text-green-600">
                            {msg.data.checkout_status}
                          </span>
                        </div>

                      </div>

                      <button
                        onClick={() =>
                          window.open(
                            msg.data.payment_link,
                            "_blank"
                          )
                        }
                        className="w-full py-3 rounded-xl bg-[#5B3FD8] text-white hover:bg-[#4B32B5] transition"
                      >
                        Open Payment Link
                      </button>

                    </div>
                  )}

                  {/* Footer */}

                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center">

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Sparkles size={13} className="text-[#5B3FD8]" />
                      Merchant Insight
                    </div>

                    <button
                      onClick={() =>
                        copyMessage(
                          msg.answer ||
                            msg.text ||
                            JSON.stringify(msg.data)
                        )
                      }
                      className="text-gray-500 hover:text-[#5B3FD8] transition"
                    >
                      <Copy size={15} />
                    </button>

                  </div>

                </div>
              )}

            </div>

            {msg.role === "user" && (
              <div className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center shrink-0">
                <User size={16} className="text-white" />
              </div>
            )}

          </div>
        ))}

        {loading && (
          <div className="flex gap-3">

            <div className="w-9 h-9 rounded-xl bg-[#5B3FD8] flex items-center justify-center">
              <Bot size={16} className="text-white animate-pulse" />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-500">
              Thinking...
            </div>

          </div>
        )}

        <div ref={bottomRef}></div>

      </div>

      {/* Input */}

      <div className="border-t border-gray-200 p-4 bg-white shrink-0">

        <div className="flex gap-3">

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && askAI()
            }
            placeholder="Ask Merchant Copilot..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#5B3FD8] transition"
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="w-12 h-12 rounded-xl bg-[#5B3FD8] hover:bg-[#4B32B5] text-white flex items-center justify-center disabled:opacity-50 transition"
          >
            <Send size={18} />
          </button>

        </div>

        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send
        </p>

      </div>

    </div>
  );
}