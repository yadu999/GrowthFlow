import { useEffect, useMemo, useState } from "react";
import {
  Download,
  ArrowDownUp,
  Users,
  User,
  ChevronRight,
} from "lucide-react";

export default function CustomerTable({ search = "" }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("cart");

  useEffect(() => {
    fetch("http://localhost:8000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  /* Search */

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      c.CustomerID.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  /* Sort */

  const sortedCustomers = useMemo(() => {
    const data = [...filteredCustomers];

    if (sort === "cart") {
      data.sort((a, b) => b.CartValue - a.CartValue);
    } else {
      data.sort((a, b) => a.Status.localeCompare(b.Status));
    }

    return data;
  }, [filteredCustomers, sort]);

  /* Export CSV */

  const exportCSV = () => {
    const rows = [
      ["Customer", "Cart", "Status"],
      ...sortedCustomers.map((c) => [
        c.CustomerID,
        c.CartValue,
        c.Status,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "growthflow-customers.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  /* Status */

  const getStatusStyle = (status) => {
    switch (status) {
      case "Recovered":
        return "text-success";

      case "Abandoned":
        return "text-danger";

      default:
        return "text-warning";
    }
  };

  return (
    <section className="py-2">
      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <p className="text-sm text-muted">Customer Monitoring</p>

          <h2 className="text-2xl font-semibold mt-1 text-text">
            Customer Activity
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <ArrowDownUp
              size={16}
              className="absolute left-3 top-3 text-muted"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="pl-9 pr-8 py-2 rounded-lg border border-border bg-background text-text text-sm outline-none hover:border-accent"
            >
              <option value="cart">Highest Cart</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-surface transition"
          >
            <Download size={16} />
            Export
          </button>

          <span className="text-sm text-muted">
            {sortedCustomers.length} customers
          </span>
        </div>
      </div>

      {/* Table */}

      {loading ? (
        <div className="py-20 flex flex-col items-center text-muted">
          <Users size={36} className="animate-pulse mb-3" />
          Loading customer data...
        </div>
      ) : (
        <div className="pt-3 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted border-b border-border">
                <th className="py-3 font-medium">Customer</th>
                <th className="py-3 font-medium">Cart Value</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {sortedCustomers.map((c) => (
                <tr
                  key={c.CustomerID}
                  className="border-b border-border hover:bg-surface transition"
                >
                  {/* Customer */}

                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-sm font-semibold">
                        {c.CustomerID.slice(-1)}
                      </div>

                      <div>
                        <p className="font-medium text-text">
                          {c.CustomerID}
                        </p>

                        <p className="text-xs text-muted">
                          Active customer
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Cart */}

                  <td className="py-4 font-medium text-text">
                    ₹{c.CartValue.toLocaleString("en-IN")}
                  </td>

                  {/* Status */}

                  <td className="py-4">
                    <span
                      className={`text-sm font-medium ${getStatusStyle(
                        c.Status
                      )}`}
                    >
                      {c.Status}
                    </span>
                  </td>

                  {/* Action */}

                  <td className="py-4 text-right">
                    <button className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
                      View
                      <ChevronRight size={15} />
                    </button>
                  </td>
                </tr>
              ))}

              {sortedCustomers.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <User size={34} className="mx-auto mb-3 text-muted" />

                    <p className="font-medium text-text">
                      No customers found
                    </p>

                    <p className="text-sm text-muted mt-1">
                      Try changing your search or sorting options.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}