import { useState } from "react";
import { NavLink } from "react-router-dom";
import CommandPalette from "./CommandPalette";

import {
  LayoutDashboard,
  Users,
  BarChart3,
  Sparkles,
  Megaphone,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "AI Recovery", icon: Sparkles, path: "/recovery" },
  { name: "Campaigns", icon: Megaphone, path: "/campaigns" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090D] text-white flex">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } transition-all duration-300 border-r border-white/10 bg-[#05070B] flex flex-col`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                GrowthFlow
              </h1>
              <p className="text-xs text-gray-500">AI Commerce Agent</p>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `w-full flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  } px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Merchant Card */}
        <div className="p-4">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold">
                Y
              </div>

              {!collapsed && (
                <div>
                  <p className="font-medium">Yaduvansh</p>
                  <p className="text-xs text-gray-500">Merchant</p>
                </div>
              )}
            </div>

            {!collapsed && (
              <>
                <div className="mt-4 h-2 bg-white/10 rounded-full">
                  <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                </div>

                <p className="text-xs text-gray-500 mt-2">Premium Plan</p>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Ctrl + K Command Palette */}
        <CommandPalette />

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          {/* Search */}
          <div className="relative w-80 max-w-full">
            <Search
              className="absolute left-4 top-3.5 text-gray-500"
              size={18}
            />

            <input
              placeholder="Search customers..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-violet-500 transition"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button className="relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
              <Bell size={18} />

              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-xs flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold">
                Y
              </div>

              <div>
                <p className="text-sm font-medium">Yaduvansh</p>
                <p className="text-xs text-gray-500">Merchant Admin</p>
              </div>
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}