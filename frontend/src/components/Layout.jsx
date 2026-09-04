import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CommandPalette from "./CommandPalette";
import CopilotPanel from "./CopilotPanel";
import razorpayLogo from "../assets/razorpay-logo.png";

import {
  LayoutDashboard,
  Users,
  BarChart3,
  Sparkles,
  Settings,
  Search,
  Bell,
  Bot,
  CircleHelp,
  Menu,
  X,
  User,
  CreditCard,
  LogOut,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "AI Bundle", icon: Sparkles, path: "/bundle" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Layout() {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [copilotOpen, setCopilotOpen] = useState(false);

  const notificationRef = useRef(null);
  const helpRef = useRef(null);
  const profileRef = useRef(null);

  const toggleCopilot = () => {
    setCopilotOpen((prev) => !prev);
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

      {/* Floating Header */}
      <header className="sticky top-4 z-50 px-6 lg:px-8 xl:px-10">
        <div className="max-w-[1720px] mx-auto">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-6 py-3 flex items-center justify-between gap-6">

            {/* Razorpay Logo */}
            <div
              className="flex items-center gap-3 shrink-0 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src={razorpayLogo}
                alt="Razorpay GrowthFlow AI"
                className="h-14 w-auto object-contain bg-white rounded-md"
              />

              
            </div>

            {/* Navigation */}
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

              {/* AI Copilot */}
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
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50">
                    <h3 className="font-semibold mb-3">Notifications</h3>

                    <div className="space-y-3 text-sm">
                      <div className="p-3 rounded-xl bg-gray-50">
                        AI recovered a ₹4,999 cart.
                      </div>

                      <div className="p-3 rounded-xl bg-gray-50">
                        New Razorpay checkout generated.
                      </div>

                      <div className="p-3 rounded-xl bg-gray-50">
                        Recovery campaign ready for approval.
                      </div>
                    </div>
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
                  <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 z-50">
                    <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100 text-sm">
                      Documentation
                    </button>

                    <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100 text-sm">
                      Keyboard Shortcuts
                    </button>

                    <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100 text-sm">
                      Contact Support
                    </button>
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
                    <p className="text-sm font-semibold">Yaduvansh</p>
                    <p className="text-xs text-gray-500">Merchant Admin</p>
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-50">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100"
                    >
                      <User size={18} />
                      Profile
                    </button>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/billing");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100"
                    >
                      <CreditCard size={18} />
                      Billing
                    </button>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/logout");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
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
      <main className="max-w-[1720px] mx-auto px-6 lg:px-8 xl:px-10 pt-8 pb-10">
        <Outlet />
      </main>

      {/* AI Copilot */}
      <CopilotPanel
        open={copilotOpen}
        onClose={() => setCopilotOpen(false)}
      />
    </div>
  );
}