import { useState } from "react";

function CopilotPanel() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!question.trim()) return;

    setLoading(true);

    try {

      const res = await fetch("http://localhost:8000/copilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question
        })
      });

      const data = await res.json();

      setAnswer(data.answer);

    } catch (err) {

      setAnswer("Unable to reach AI Copilot.");

    }

    setLoading(false);

  };

  const suggestions = [
    "Why are carts being abandoned today?",
    "Should I offer free shipping?",
    "Which customers should I target first?"
  ];

  return (

    <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">

      <h2 className="text-2xl font-semibold">
        Merchant Copilot
      </h2>

      <p className="text-gray-400 mt-1">
        Ask GrowthFlow AI about your store.
      </p>

      <div className="flex flex-wrap gap-2 mt-4">

        {suggestions.map((q) => (

          <button
            key={q}
            onClick={() => setQuestion(q)}
            className="px-3 py-2 text-sm rounded-full bg-gray-800 hover:bg-gray-700 transition"
          >
            {q}
          </button>

        ))}

      </div>

      <textarea
        rows="3"
        className="w-full mt-5 p-4 rounded-2xl bg-gray-800 resize-none"
        placeholder="Ask GrowthFlow AI..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 rounded-2xl py-3 font-semibold transition disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (

        <div className="mt-5 bg-gray-800 rounded-2xl p-4 border border-blue-500/30">

          <p className="text-blue-300 text-sm mb-2">
            GrowthFlow AI
          </p>

          <p>{answer}</p>

        </div>

      )}

    </div>

  );

}

export default CopilotPanel;