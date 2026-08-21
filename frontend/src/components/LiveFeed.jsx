import { useEffect, useState } from "react";

const events = [
  "🔔 High-value cart abandoned — ₹6,999",
  "🤖 Behavior Analysis triggered",
  "🎯 Offer Optimizer selected Free Shipping",
  "💬 Recovery Messenger generated WhatsApp message",
  "✅ Customer completed purchase",
];

function LiveFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      setFeed((prev) => [
        {
          text: events[index % events.length],
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ].slice(0, 5));

      index++;
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">

      <h2 className="text-xl font-semibold mb-5">
        Live AI Recovery Feed
      </h2>

      <div className="space-y-3">

        {feed.map((item, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-2xl p-4 animate-pulse"
          >
            <p>{item.text}</p>
            <p className="text-xs text-gray-400 mt-1">
              {item.time}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default LiveFeed;