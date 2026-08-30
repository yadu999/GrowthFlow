import { useState } from "react";
import {
  Bot,
  MessageSquare,
  CreditCard,
  Bell,
  ShieldCheck,
  Save,
  Settings as SettingsIcon,
} from "lucide-react";

export default function Settings() {
  const [threshold, setThreshold] = useState(70);
  const [autoRecovery, setAutoRecovery] = useState(true);
  const [whatsapp, setWhatsapp] = useState(true);
  const [email, setEmail] = useState(true);

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-6 rounded-full transition ${
        value ? "bg-[#5B3FD8]" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full transition ${
          value ? "translate-x-6" : "translate-x-0.5"
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="mb-2">
        <div className="flex items-start gap-4">
          <div className="mt-1 text-[#5B3FD8]">
            <SettingsIcon size={42} strokeWidth={2} />
          </div>

          <div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              Merchant Settings
            </h1>

            <p className="mt-3 text-xl leading-9 text-gray-600 max-w-3xl">
              Configure AI recovery behavior, payment integrations, automation
              preferences, and notification settings for your GrowthFlow
              workspace.
            </p>
          </div>
        </div>
      </div>

      {/* Top Grid */}
      <div className="grid lg:grid-cols-2 gap-7">
        {/* AI Configuration */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="text-[#5B3FD8]" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                AI Configuration
              </p>
              <h2 className="font-semibold text-2xl">Recovery Engine</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-500">AI Provider</label>

              <select className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#5B3FD8] outline-none">
                <option>Groq</option>
                <option>Gemini</option>
                <option>OpenAI</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Confidence Threshold</span>

                <span className="font-semibold text-[#5B3FD8]">
                  {threshold}%
                </span>
              </div>

              <input
                type="range"
                min="40"
                max="95"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-full accent-[#5B3FD8]"
              />

              <p className="text-xs text-gray-500 mt-2">
                Customers above this confidence score automatically receive AI
                recovery recommendations.
              </p>
            </div>

            <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4">
              <div>
                <p className="font-medium">Auto Recovery</p>
                <p className="text-sm text-gray-500">
                  Trigger campaigns automatically.
                </p>
              </div>

              <Toggle value={autoRecovery} onChange={setAutoRecovery} />
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="text-[#5B3FD8]" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Payments
              </p>
              <h2 className="font-semibold text-2xl">
                Razorpay Integration
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-500">Status</span>

              <span className="text-green-600 font-semibold">
                Connected
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-500">Mode</span>

              <span>Test Mode</span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500">Gateway</span>

              <span>Razorpay</span>
            </div>

            <button className="w-full mt-5 border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition">
              Manage Integration
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-2 gap-7">
        {/* Recovery Channels */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-[#5B3FD8]" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Recovery
              </p>
              <h2 className="font-semibold text-2xl">Channels</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center border rounded-xl p-4">
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-sm text-gray-500">
                  Primary recovery channel.
                </p>
              </div>

              <Toggle value={whatsapp} onChange={setWhatsapp} />
            </div>

            <div className="flex justify-between items-center border rounded-xl p-4">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-500">
                  Secondary follow-up.
                </p>
              </div>

              <Toggle value={email} onChange={setEmail} />
            </div>
          </div>
        </div>

        {/* Notifications & Security */}
        <div className="space-y-7">
          {/* Notifications */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-[#5B3FD8]" />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Notifications
                </p>
                <h2 className="font-semibold text-2xl">Alerts</h2>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                High-value abandoned carts
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                Successful recoveries
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" />
                Weekly AI summary
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck className="text-[#5B3FD8]" />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Security
                </p>
                <h2 className="font-semibold text-2xl">API Keys</h2>
              </div>
            </div>

            <p className="text-gray-500 text-sm mb-5">
              Manage Groq, Gemini and Razorpay credentials.
            </p>

            <button className="w-full border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition">
              Configure Keys
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button className="bg-[#5B3FD8] hover:bg-[#4B32B5] text-white px-6 py-3 rounded-xl flex items-center gap-2 transition shadow-sm">
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}