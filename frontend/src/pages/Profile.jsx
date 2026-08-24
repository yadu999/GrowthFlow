import Layout from "../components/Layout";
import { Mail, Phone, Building, Shield } from "lucide-react";

export default function Profile() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted mt-2">
            Manage your merchant account information.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-4xl font-bold">
              Y
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Yaduvansh Tyagi</h2>
              <p className="text-muted">Merchant Admin</p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <Info icon={Mail} title="Email" value="yaduvansh@example.com"/>
            <Info icon={Phone} title="Phone" value="+91 98765 43210"/>
            <Info icon={Building} title="Organization" value="GrowthFlow Merchant"/>
            <Info icon={Shield} title="Role" value="Administrator"/>

          </div>

        </div>

        <div className="bg-surface border border-border rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-5">
            Recent Account Activity
          </h3>

          <div className="space-y-4">
            {[
              "Logged in from Chennai",
              "Updated merchant settings",
              "Generated recovery workflow",
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-3 border-b border-border last:border-none">
                <span>{item}</span>
                <span className="text-muted text-sm">
                  {i + 1} day ago
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}

function Info({ icon: Icon, title, value }) {
  return (
    <div className="border border-border rounded-xl p-5">
      <div className="flex items-center gap-3">
        <Icon size={18}/>
        <span className="text-muted">{title}</span>
      </div>
      <p className="mt-3 font-medium">{value}</p>
    </div>
  );
}