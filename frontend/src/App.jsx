import { useEffect, useState } from "react";

function App() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-5xl font-bold">GrowthFlow AI</h1>

      <p className="text-gray-400 mt-2">
        Autonomous Commerce Growth Agent
      </p>

      {stats && (
        <div className="grid grid-cols-3 gap-6 mt-10">
          <div className="bg-gray-900 rounded-2xl p-6">
            <p className="text-gray-400">Revenue</p>
            <h2 className="text-3xl font-bold">{stats.revenue}</h2>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6">
            <p className="text-gray-400">Conversion</p>
            <h2 className="text-3xl font-bold">{stats.conversion}</h2>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6">
            <p className="text-gray-400">Abandoned Carts</p>
            <h2 className="text-3xl font-bold">{stats.abandoned_carts}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;