import { NavLink } from "react-router-dom";
import CommandPalette from "./CommandPalette";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

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
  const [mobileMenu, setMobileMenu] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [notificationCount, setNotificationCount] = useState(3);

  const notificationRef = useRef(null);
  const helpRef = useRef(null);
  const profileRef = useRef(null);

  const toggleCopilot = () => {
    window.dispatchEvent(new Event("toggle-copilot"));
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
      )
        setNotificationOpen(false);

      if (helpRef.current && !helpRef.current.contains(e.target))
        setHelpOpen(false);

      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text">
      <CommandPalette />

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1600px] mx-auto px-5 lg:px-8 h-20 flex items-center justify-between gap-4">

          {/* LEFT */}

          <div className="flex items-center gap-8 min-w-0">

            <div className="min-w-fit">
              <h1 className="text-2xl font-bold">GrowthFlow</h1>
              <p className="text-xs text-muted">Commerce Operations</p>
            </div>

            <nav className="hidden lg:flex items-center gap-2">
              {menu.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                        isActive
                          ? "bg-surface border border-border text-white"
                          : "text-muted hover:bg-surface hover:text-white"
                      }`
                    }
                  >
                    <Icon size={17} />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Search */}

            <div className="hidden xl:flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-2 w-80">
              <Search size={17} className="text-muted" />

              <input
                placeholder="Search customers..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted"
              />

              <span className="text-xs text-muted border border-border rounded px-2 py-0.5">
                ⌘K
              </span>
            </div>

            {/* Status */}

            <div className="hidden lg:flex items-center gap-2 text-sm text-muted">
              <span className="w-2.5 h-2.5 rounded-full bg-success"></span>
              Operational
            </div>

            {/* Copilot */}

            <button
              onClick={toggleCopilot}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border hover:border-slate-500 transition"
            >
              <Bot size={18} />
              <span className="hidden xl:block text-sm font-medium">
                Copilot
              </span>
            </button>

            {/* Notifications */}

            <div className="relative" ref={notificationRef}>

              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-surface-secondary transition"
              >
                <Bell size={18} />

                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-semibold">
                    {notificationCount}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden">

                  <div className="flex items-center justify-between p-4 border-b border-border">

                    <h3 className="font-semibold">Notifications</h3>

                    <button
                      onClick={() => {
                        setNotificationCount(0);
                        toast.success("All notifications marked as read");
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Mark all read
                    </button>

                  </div>

                  <div className="divide-y divide-border">

                    {[
                      "Recovery workflow completed",
                      "Campaign launched successfully",
                      "3 high-intent customers detected",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-4 hover:bg-surface-secondary transition"
                      >
                        <p className="text-sm">{item}</p>

                        <p className="text-xs text-muted mt-1">
                          {i + 1} min ago
                        </p>
                      </div>
                    ))}

                  </div>

                </div>
              )}

            </div>

            {/* Help */}

            <div className="relative hidden sm:block" ref={helpRef}>

              <button
                onClick={() => setHelpOpen(!helpOpen)}
                className="w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-surface-secondary transition"
              >
                <CircleHelp size={18} />
              </button>

              {helpOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden">

                  <button
                    onClick={() => {
                      toast("Documentation coming soon");
                      setHelpOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary transition text-left"
                  >
                    <FileText size={18} />
                    Documentation
                  </button>

                  <button
                    onClick={() => {
                      toast("N • Next | C • Copilot | Esc • Reset");
                      setHelpOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary transition text-left"
                  >
                    <Keyboard size={18} />
                    Keyboard Shortcuts
                  </button>

                  <button
                    onClick={() => {
                      toast("support@growthflow.ai");
                      setHelpOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary transition text-left"
                  >
                    <User size={18} />
                    Contact Support
                  </button>

                  <button
                    onClick={() => {
                      toast("GrowthFlow v1.0");
                      setHelpOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary transition text-left"
                  >
                    <CircleHelp size={18} />
                    About GrowthFlow
                  </button>

                </div>
              )}

            </div>

            {/* PROFILE */}

            <div className="relative" ref={profileRef}>

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 bg-surface border border-border rounded-xl px-3 py-2 hover:bg-surface-secondary transition max-w-[210px]"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-semibold text-white flex-shrink-0">
                  Y
                </div>

                <div className="hidden sm:block min-w-0 text-left">
                  <p className="text-sm font-semibold truncate">
                    Yaduvansh
                  </p>

                  <p className="text-xs text-muted truncate">
                    Merchant Admin
                  </p>
                </div>

              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden">

                  <div className="p-4 border-b border-border">
                    <p className="font-semibold">Yaduvansh</p>

                    <p className="text-sm text-muted">
                      Merchant Admin
                    </p>
                  </div>

                  <NavLink
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary transition"
                  >
                    <User size={18} />
                    Profile
                  </NavLink>

                  <NavLink
                    to="/preferences"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary transition"
                  >
                    <Settings size={18} />
                    Preferences
                  </NavLink>

                  <NavLink
                    to="/billing"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary transition"
                  >
                    <CreditCard size={18} />
                    Billing
                  </NavLink>

                  <NavLink
                    to="/logout"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary transition text-red-400"
                  >
                    <LogOut size={18} />
                    Logout
                  </NavLink>

                </div>
              )}

            </div>

            {/* MOBILE */}

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center"
            >
              {mobileMenu ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>
        </div>

        {/* MOBILE NAV */}

        {mobileMenu && (
          <div className="lg:hidden border-t border-border bg-background px-5 py-4 space-y-2">
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
                        ? "bg-surface border border-border"
                        : "text-muted hover:bg-surface"
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

      </header>

      <main className="max-w-[1600px] mx-auto px-5 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}