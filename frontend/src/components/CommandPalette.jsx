import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  LayoutDashboard,
  Users,
  BarChart3,
  Sparkles,
  Megaphone,
  Settings,
  ArrowRight,
} from "lucide-react";

const pages = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Customers", path: "/customers", icon: Users },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Recovery", path: "/recovery", icon: Sparkles },
  { name: "Campaigns", path: "/campaigns", icon: Megaphone },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
  const handler = (e) => {
    const tag = e.target.tagName;

    // Don't trigger shortcuts while typing
    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      e.target.isContentEditable
    ) {
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setOpen((v) => !v);
    }

    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      setSelected(0);
    }
  };

  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, []);

  const filtered = useMemo(() => {
    return pages.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }

      if (e.key === "Enter" && filtered[selected]) {
        navigate(filtered[selected].path);
        setOpen(false);
        setQuery("");
        setSelected(0);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, navigate]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center pt-24 z-50">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
          <Search size={20} className="text-gray-400" />

          <input
            autoFocus
            placeholder="Search pages..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            className="flex-1 outline-none text-gray-900 placeholder:text-gray-400 bg-transparent"
          />

          <span className="text-xs text-gray-500 border border-gray-300 rounded px-2 py-1">
            ESC
          </span>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No matching pages found.
            </div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                    setQuery("");
                    setSelected(0);
                  }}
                  className={`w-full flex items-center justify-between px-5 py-4 transition ${
                    index === selected
                      ? "bg-[#F3F1FE] text-[#5B3FD8]"
                      : "hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span className="font-medium">{item.name}</span>
                  </div>

                  <ArrowRight size={16} />
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 text-xs text-gray-500 bg-gray-50">
          <span>↑ ↓ Navigate</span>
          <span>Enter Open</span>
          <span>Ctrl + K</span>
        </div>
      </div>
    </div>
  );
}