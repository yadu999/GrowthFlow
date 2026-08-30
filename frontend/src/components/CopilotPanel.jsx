import { useEffect, useRef, useState } from "react";
import { Bot, Sparkles, Send, Copy, X } from "lucide-react";

export default function CopilotPanel({ open, onClose }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const suggestions = [
    "Why are carts being abandoned today?",
    "Create a WhatsApp campaign",
    "Bundle Samsung TV",
    "Generate checkout for LG TV",
  ];

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      title: "Merchant Copilot",
      answer:
        "Welcome back. I can explain customer behaviour, identify revenue opportunities, create campaigns, generate AI bundles, and build Razorpay checkouts.",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const copyMessage = (text) => navigator.clipboard.writeText(text);

  const askAI = async () => {
    if (!question.trim()) return;

    const prompt = question;

    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/copilot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: prompt }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          title: "Merchant Insight",
          answer: data.answer || data.response || "No response received.",
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          title: "Connection Error",
          answer: "Unable to reach Merchant Copilot.",
        },
      ]);
    }

    setLoading(false);
  };

  // Correct prop check
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Right Drawer */}
      <div className="absolute right-0 top-0 h-screen w-full sm:w-[560px] bg-white border-l border-gray-200 shadow-2xl flex flex-col animate-[slideIn_.25s_ease-out]">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#5B3FD8] flex items-center justify-center">
              <Bot className="text-white" size={22} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                AI Assistant
              </p>

              <h2 className="text-2xl font-bold text-gray-900">
                Merchant Copilot
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Online
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="px-5 py-3 border-b border-gray-200 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => setQuestion(item)}
                className="px-4 py-2 rounded-full border border-gray-300 hover:border-[#5B3FD8] hover:bg-[#F3F1FE] text-sm transition whitespace-nowrap"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } gap-3`}
            >
              {msg.role === "assistant" && (
                <div className="w-10 h-10 rounded-xl bg-[#5B3FD8] flex items-center justify-center shrink-0">
                  <Bot className="text-white" size={18} />
                </div>
              )}

              <div
                className={`max-w-[88%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-[#5B3FD8] text-white"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                {msg.role === "user" ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={16}
                        className="text-[#5B3FD8]"
                      />
                      <span className="font-semibold">{msg.title}</span>
                    </div>

                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {msg.answer}
                    </p>

                    <button
                      onClick={() => copyMessage(msg.answer)}
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#5B3FD8]"
                    >
                      <Copy size={15} />
                      Copy
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5B3FD8] flex items-center justify-center">
                <Bot className="text-white animate-pulse" size={18} />
              </div>

              <div className="bg-gray-100 rounded-2xl px-5 py-4">
                Thinking...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-5">
          <div className="flex gap-3">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askAI()}
              placeholder="Ask Merchant Copilot..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5B3FD8]"
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

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}