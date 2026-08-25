import Layout from "../components/Layout";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Logout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto mt-24">

        <div className="bg-surface border border-border rounded-2xl p-8 text-center">

          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <LogOut size={34} />
          </div>

          <h1 className="text-2xl font-bold">Sign Out</h1>

          <p className="text-muted mt-3">
            End your current GrowthFlow session?
          </p>

          <div className="flex gap-3 mt-8">

            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 border border-border rounded-xl hover:bg-surface-secondary"
            >
              Cancel
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white"
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    </Layout>
  );
}