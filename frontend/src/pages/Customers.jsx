import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CustomerTable from "../components/CustomerTable";

export default function Customers() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  // Update search if the URL changes
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted mt-2">
            Search and monitor customer activity.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Search Customer ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Customer Table */}
        <CustomerTable search={search} />

      </div>
    
  );
}