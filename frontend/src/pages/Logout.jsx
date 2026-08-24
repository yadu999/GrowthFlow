import Layout from "../components/Layout";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Logout() {

  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-lg mx-auto mt-20">

        <div className="bg-surface border border-border rounded-2xl p-8 text-center">

          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-5">
            <LogOut size={34}/>
          </div>

          <h1 className="text-2xl font-bold">
            Sign Out
          </h1>

          <p className="text-muted mt-3">
            Are you sure you want to leave GrowthFlow?
          </p>

          <div className="flex gap-3 mt-8">

            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 rounded-xl border border-border hover:bg-surface-secondary"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    </Layout>
  );
}