import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "Dashboard", path: "/" },
  { name: "Customers", path: "/customers" },
  { name: "Analytics", path: "/analytics" },
  { name: "AI Recovery", path: "/recovery" },
  { name: "Campaigns", path: "/campaigns" },
  { name: "Settings", path: "/settings" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = pages.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center pt-32 z-50">

      <div className="w-[550px] bg-[#111827] border border-white/10 rounded-3xl overflow-hidden">

        <input
          autoFocus
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent p-5 outline-none border-b border-white/10"
        />

        <div className="max-h-80 overflow-y-auto">

          {filtered.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
                setQuery("");
              }}
              className="w-full text-left px-5 py-4 hover:bg-white/5 transition"
            >
              {item.name}
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}