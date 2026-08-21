import { useEffect, useState } from "react";

function CustomerTable() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
      <h2 className="text-xl font-semibold mb-4">Customer Activity</h2>

      <table className="w-full">
        <thead className="text-gray-400">
          <tr>
            <th className="text-left">Customer</th>
            <th className="text-left">Cart</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.CustomerID} className="border-t border-gray-800">
              <td className="py-4">{c.CustomerID}</td>
              <td>₹{c.CartValue}</td>
              <td>{c.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;