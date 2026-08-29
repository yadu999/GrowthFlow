import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import CommandPalette from "./CommandPalette";

import {
  LayoutDashboard,
  Users,
  BarChart3,
  Sparkles,
  Megaphone,
  Settings,
  Search,
  Bell,
  Bot,
  CircleHelp,
  Menu,
  X,
  FileText,
  Keyboard,
  User,
  CreditCard,
  LogOut,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "Recovery", icon: Sparkles, path: "/recovery" },
  { name: "Campaigns", icon: Megaphone, path: "/campaigns" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Layout({ children }) {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  const [copilotOpen, setCopilotOpen] = useState(false);

  const notificationRef = useRef(null);
  const helpRef = useRef(null);
  const profileRef = useRef(null);

  const toggleCopilot = () => {
    const nextState = !copilotOpen;
    setCopilotOpen(nextState);

    window.dispatchEvent(
      new CustomEvent("toggle-copilot", {
        detail: { open: nextState },
      })
    );
  };

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;

    navigate(`/customers?search=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const closeMobile = () => setMobileMenu(false);

    window.addEventListener("resize", closeMobile);
    return () => window.removeEventListener("resize", closeMobile);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationOpen(false);
      }

      if (helpRef.current && !helpRef.current.contains(e.target)) {
        setHelpOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-gray-900">
      <CommandPalette />

      {/* Floating SaaS Header */}

      <header className="sticky top-3 z-50 px-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-6 py-3 flex items-center justify-between gap-6">

            {/* Logo */}

            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#5B3FD8] flex items-center justify-center text-white font-bold text-lg">
                G
              </div>

              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  GrowthFlow
                </h1>

                <p className="text-xs text-gray-500">
                  Commerce Intelligence
                </p>
              </div>
            </div>

            {/* Center Navigation */}

            <nav className="hidden lg:flex items-center bg-gray-100 rounded-full p-1 gap-1">
              {menu.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                        isActive
                          ? "bg-white text-[#5B3FD8] shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`
                    }
                  >
                    <Icon size={16} />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Side */}

            <div className="flex items-center gap-3">

              {/* Search */}

              <div className="hidden xl:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-64">
                <Search size={16} className="text-gray-400" />

                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search..."
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
                />
              </div>

              {/* Status */}

              <div className="hidden xl:flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                Operational
              </div>

              {/* Copilot */}

              <button
                onClick={toggleCopilot}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                  copilotOpen
                    ? "bg-[#5B3FD8] text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {copilotOpen ? <X size={18} /> : <Bot size={18} />}
              </button>

              {/* Notifications */}

              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <Bell size={18} className="text-gray-700" />

                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-semibold">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                      <h3 className="font-semibold">
                        Notifications
                      </h3>

                      <button
                        onClick={() => {
                          setNotificationCount(0);
                          toast.success("Notifications cleared");
                        }}
                        className="text-xs text-[#5B3FD8]"
                      >
                        Mark all read
                      </button>
                    </div>

                    {[
                      "Recovery workflow completed",
                      "Campaign launched",
                      "3 high-intent customers detected",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-4 border-b last:border-0 border-gray-100 hover:bg-gray-50"
                      >
                        <p className="text-sm">{item}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {i + 1} min ago
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Help */}

              <div className="relative hidden sm:block" ref={helpRef}>
                <button
                  onClick={() => setHelpOpen(!helpOpen)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <CircleHelp size={18} className="text-gray-700" />
                </button>

                {helpOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                    {[
                      ["Documentation", FileText],
                      ["Keyboard Shortcuts", Keyboard],
                      ["Contact Support", User],
                      ["About GrowthFlow", CircleHelp],
                    ].map(([label, Icon], i) => (
                      <button
                        key={i}
                        onClick={() => {
                          toast(label);
                          setHelpOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                      >
                        <Icon size={18} />
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile */}

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-[#5B3FD8] text-white flex items-center justify-center font-semibold">
                    Y
                  </div>

                  <div className="hidden xl:block text-left">
                    <p className="text-sm font-semibold">
                      Yaduvansh
                    </p>

                    <p className="text-xs text-gray-500">
                      Merchant Admin
                    </p>
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-semibold">
                        Yaduvansh
                      </p>

                      <p className="text-sm text-gray-500">
                        Merchant Admin
                      </p>
                    </div>

                    <NavLink
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      <User size={18} />
                      Profile
                    </NavLink>

                    <NavLink
                      to="/preferences"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      <Settings size={18} />
                      Preferences
                    </NavLink>

                    <NavLink
                      to="/billing"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      <CreditCard size={18} />
                      Billing
                    </NavLink>

                    <NavLink
                      to="/logout"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600"
                    >
                      <LogOut size={18} />
                      Logout
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Mobile */}

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="lg:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
              >
                {mobileMenu ? <X size={18} /> : <Menu size={18} />}
              </button>

            </div>
          </div>

          {/* Mobile Navigation */}

          {mobileMenu && (
            <div className="lg:hidden mt-3 bg-white rounded-2xl shadow-md border border-gray-200 p-3 space-y-1">
              {menu.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setMobileMenu(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl ${
                        isActive
                          ? "bg-[#F3F1FE] text-[#5B3FD8]"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}

      <main className="max-w-[1800px] mx-auto px-6 pt-8 pb-8">
        {children}
      </main>
    </div>
  );
}