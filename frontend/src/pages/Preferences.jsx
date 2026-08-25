import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-hot-toast";

export default function Preferences() {

  const [settings, setSettings] = useState({
    notifications: true,
    copilot: true,
    liveFeed: true,
    analytics: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("growthflow-settings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const toggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    localStorage.setItem("growthflow-settings", JSON.stringify(updated));
    toast.success(`${key} updated`);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold">Preferences</h1>
          <p className="text-muted mt-2">
            Customize your GrowthFlow workspace.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">

          {[
            ["notifications", "Notifications", "Workflow alerts"],
            ["copilot", "AI Copilot", "Assistant availability"],
            ["liveFeed", "Live Feed", "Real-time activity stream"],
            ["analytics", "Advanced Analytics", "Enhanced dashboard insights"],
          ].map(([key, title, desc]) => (
            <Toggle
              key={key}
              title={title}
              desc={desc}
              value={settings[key]}
              onClick={() => toggle(key)}
            />
          ))}

        </div>

      </div>
    </Layout>
  );
}

function Toggle({ title, desc, value, onClick }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-border last:border-none">

      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted">{desc}</p>
      </div>

      <button
        onClick={onClick}
        className={`w-14 h-8 rounded-full transition ${
          value ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full bg-white m-1 transition ${
            value ? "translate-x-6" : ""
          }`}
        />
      </button>

    </div>
  );
}