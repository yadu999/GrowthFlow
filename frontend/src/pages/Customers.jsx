import { useState } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import CustomerTable from "../components/CustomerTable";

export default function Customers() {
  const [search, setSearch] = useState("");

  return (
    <Layout>
      <PageWrapper>

        <h1 className="text-4xl font-bold mb-8">
          Customers
        </h1>

        <input
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-3"
        />

        <CustomerTable search={search} />

      </PageWrapper>
    </Layout>
  );
}