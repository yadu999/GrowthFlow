import Layout from "../components/Layout";
import { CreditCard, CheckCircle } from "lucide-react";

export default function Billing() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-muted mt-2">
            Manage your GrowthFlow subscription.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-semibold">
                Premium Plan
              </h2>

              <p className="text-muted mt-1">
                Active subscription
              </p>
            </div>

            <CheckCircle className="text-green-400"/>

          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-8">

            <Card title="Monthly Cost" value="₹1,999"/>
            <Card title="Next Billing" value="15 Sept 2026"/>
            <Card title="Invoices" value="12"/>

          </div>

          <button className="mt-8 flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl hover:bg-slate-200 transition">
            <CreditCard size={18}/>
            Update Payment Method
          </button>

        </div>

      </div>
    </Layout>
  );
}

function Card({ title, value }) {
  return (
    <div className="border border-border rounded-xl p-5">
      <p className="text-muted text-sm">{title}</p>
      <h3 className="text-2xl font-semibold mt-2">{value}</h3>
    </div>
  );
}