import {
  LayoutDashboard,
  Users,
  Sparkles,
  BarChart3,
  Radio,
  Megaphone,
  Settings,
  Bot,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Customers", icon: Users },
  { name: "AI Recovery", icon: Sparkles },
  { name: "Analytics", icon: BarChart3 },
  { name: "Live Feed", icon: Radio },
  { name: "Campaigns", icon: Megaphone },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#06090f] border-r border-white/5 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-white/5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">

            <Sparkles size={20} />

          </div>

          <div>

            <h1 className="font-bold text-xl">GrowthFlow</h1>

            <p className="text-xs text-gray-500">AI Commerce Agent</p>

          </div>

        </div>

      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2 flex-1">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                item.active
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >

              <Icon size={18} />

              {item.name}

            </button>

          );

        })}

      </nav>

      {/* Merchant Card */}
      <div className="p-4">

        <div className="rounded-2xl bg-[#0F172A] border border-white/5 p-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-violet-500" />

            <div>

              <p className="font-medium">Sneha Merchant</p>

              <p className="text-xs text-gray-500">Premium Plan</p>

            </div>

          </div>

          <div className="mt-4 h-2 bg-white/10 rounded-full">

            <div className="h-2 w-3/4 bg-violet-500 rounded-full" />

          </div>

        </div>

      </div>

    </aside>
  );
}