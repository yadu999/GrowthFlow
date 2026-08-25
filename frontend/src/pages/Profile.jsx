import { useState } from "react";
import Layout from "../components/Layout";
import { Mail, Phone, Building, Shield, Edit3, Save } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Profile() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Yaduvansh Tyagi",
    email: "yaduvansh@example.com",
    phone: "+91 98765 43210",
    company: "GrowthFlow Merchant",
    role: "Merchant Admin",
  });

  const handleSave = () => {
    localStorage.setItem("growthflow-profile", JSON.stringify(profile));
    toast.success("Profile updated");
    setEditing(false);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted mt-1">
              Manage your merchant account information.
            </p>
          </div>

          {editing ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl"
            >
              <Save size={18} />
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl hover:bg-surface-secondary"
            >
              <Edit3 size={18} />
              Edit
            </button>
          )}
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-4xl font-bold">
              Y
            </div>

            <div>
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-muted">{profile.role}</p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <InfoField
              icon={Mail}
              title="Email"
              value={profile.email}
              editing={editing}
              onChange={(v) => setProfile({ ...profile, email: v })}
            />

            <InfoField
              icon={Phone}
              title="Phone"
              value={profile.phone}
              editing={editing}
              onChange={(v) => setProfile({ ...profile, phone: v })}
            />

            <InfoField
              icon={Building}
              title="Organization"
              value={profile.company}
              editing={editing}
              onChange={(v) => setProfile({ ...profile, company: v })}
            />

            <InfoField
              icon={Shield}
              title="Role"
              value={profile.role}
              editing={false}
            />

          </div>

        </div>

        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-5">Recent Activity</h3>

          <div className="space-y-4">
            {[
              ["Logged in from Chennai", "2 min ago"],
              ["Updated recovery workflow", "1 hour ago"],
              ["Campaign exported", "Yesterday"],
              ["Subscription renewed", "3 days ago"],
            ].map(([title, time], i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-b border-border last:border-none"
              >
                <span>{title}</span>
                <span className="text-sm text-muted">{time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}

function InfoField({ icon: Icon, title, value, editing, onChange }) {
  return (
    <div className="border border-border rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <Icon size={18} />
        <span className="text-muted">{title}</span>
      </div>

      {editing ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 outline-none"
        />
      ) : (
        <p className="font-medium">{value}</p>
      )}
    </div>
  );
}