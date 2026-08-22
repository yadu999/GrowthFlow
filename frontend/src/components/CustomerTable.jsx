import { useEffect, useMemo, useState } from "react";

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

  // Search Filter
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      c.CustomerID.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  // Sorting
  const sortedCustomers = useMemo(() => {
    const sorted = [...filteredCustomers];

    if (sort === "cart") {
      sorted.sort((a, b) => b.CartValue - a.CartValue);
    } else {
      sorted.sort((a, b) => a.Status.localeCompare(b.Status));
    }

    return sorted;
  }, [filteredCustomers, sort]);

  // Export CSV
  const exportCSV = () => {
    const rows = [
      ["Customer", "Cart", "Status"],
      ...sortedCustomers.map((c) => [
        c.CustomerID,
        c.CartValue,
        c.Status,
      ]),
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "growthflow-customers.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Recovered":
        return "bg-green-500/20 text-green-300 border-green-500/30";

      case "Abandoned":
        return "bg-red-500/20 text-red-300 border-red-500/30";

      default:
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Customer Activity</h2>
          <p className="text-sm text-gray-400 mt-1">
            Live customer purchase tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:border-violet-500"
          >
            <option value="cart">Highest Cart</option>
            <option value="status">Sort by Status</option>
          </select>

          {/* Export Button */}
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition font-medium"
          >
            Export CSV
          </button>

          {/* Counter */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <p className="text-xs text-gray-500">Showing</p>
            <p className="font-semibold text-violet-300">
              {sortedCustomers.length}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-16 text-center text-gray-400">
          Loading customers...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-gray-400 text-sm border-b border-white/10">
              <tr>
                <th className="text-left py-3">Customer</th>
                <th className="text-left py-3">Cart</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {sortedCustomers.map((c) => (
                <tr
                  key={c.CustomerID}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold">
                        {c.CustomerID.slice(-1)}
                      </div>

                      <div>
                        <p className="font-medium">{c.CustomerID}</p>
                        <p className="text-xs text-gray-500">
                          Active customer
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="font-semibold">
                    ₹{c.CartValue.toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${getStatusStyle(
                        c.Status
                      )}`}
                    >
                      {c.Status}
                    </span>
                  </td>
                </tr>
              ))}

              {sortedCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="py-10 text-center text-gray-500"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}