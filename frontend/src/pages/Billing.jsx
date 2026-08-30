
import { CreditCard, Download, CheckCircle } from "lucide-react";

export default function Billing() {
  const invoices = [
    ["August 2026", "₹1,999"],
    ["July 2026", "₹1,999"],
    ["June 2026", "₹1,999"],
  ];

  return (
   
      <div className="max-w-5xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-muted mt-2">
            Manage subscriptions and invoices.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8">

          <div className="flex justify-between items-center">

            <div>
              <h2 className="text-2xl font-semibold">Premium Plan</h2>
              <p className="text-muted">Unlimited workflows</p>
            </div>

            <CheckCircle className="text-green-400" />

          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-8">

            <Card title="Monthly Cost" value="₹1,999" />
            <Card title="Next Billing" value="15 Sept 2026" />
            <Card title="Usage" value="1,284 workflows" />

          </div>

          <button className="mt-8 flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl">
            <CreditCard size={18} />
            Update Payment Method
          </button>

        </div>

        <div className="bg-surface border border-border rounded-2xl p-6">

          <h3 className="text-xl font-semibold mb-5">Invoices</h3>

          {invoices.map(([month, amount]) => (
            <div
              key={month}
              className="flex justify-between items-center py-4 border-b border-border last:border-none"
            >
              <div>
                <p>{month}</p>
                <p className="text-sm text-muted">{amount}</p>
              </div>

              <button className="flex items-center gap-2 text-sm">
                <Download size={16} />
                Download
              </button>
            </div>
          ))}

        </div>

      </div>
    
  );
}

function Card({ title, value }) {
  return (
    <div className="border border-border rounded-xl p-5">
      <p className="text-sm text-muted">{title}</p>
      <h3 className="text-2xl font-semibold mt-2">{value}</h3>
    </div>
  );
}