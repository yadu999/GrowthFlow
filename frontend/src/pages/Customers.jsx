import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import CustomerTable from "../components/CustomerTable";

export default function Customers() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    toast.success("Customer dashboard loaded");
  }, []);

  return (
    <Layout>
      <PageWrapper>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Customers</h1>
            <p className="text-gray-400 mt-2">
              Search and manage merchant customers.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-500">Active</p>
            <p className="text-lg font-semibold text-violet-300">316 Customers</p>
          </div>
        </div>

        <input
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full max-w-md bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition"
        />

        <CustomerTable search={search} />
      </PageWrapper>
    </Layout>
  );
}