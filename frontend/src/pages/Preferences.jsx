import Layout from "../components/Layout";
import { useState } from "react";

export default function Preferences() {

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [copilot, setCopilot] = useState(true);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold">Preferences</h1>
          <p className="text-muted mt-2">
            Customize your workspace experience.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">

          <Toggle
            title="Notifications"
            desc="Receive workflow alerts"
            value={notifications}
            onChange={setNotifications}
          />

          <Toggle
            title="Dark Mode"
            desc="Enterprise dark theme"
            value={darkMode}
            onChange={setDarkMode}
          />

          <Toggle
            title="AI Copilot"
            desc="Enable assistant panel"
            value={copilot}
            onChange={setCopilot}
          />

        </div>

      </div>
    </Layout>
  );
}

function Toggle({ title, desc, value, onChange }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-border last:border-none">

      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted text-sm">{desc}</p>
      </div>

      <button
        onClick={() => onChange(!value)}
        className={`w-14 h-8 rounded-full transition ${
          value ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full transition m-1 ${
            value ? "translate-x-6" : ""
          }`}
        />
      </button>

    </div>
  );
}