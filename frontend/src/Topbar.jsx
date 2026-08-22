import { Bell, MapPin } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between mb-8">

      <div>

        <h1 className="text-4xl font-bold">Welcome back, Merchant! 👋</h1>

        <p className="text-gray-400 mt-1">
          Here's what's happening with your store today.
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="bg-[#0F172A] border border-white/5 px-4 py-3 rounded-xl flex items-center gap-3">

          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>

          Live Merchant Session

          <MapPin size={16}/>

          Mumbai

        </div>

        <button className="relative p-3 rounded-xl bg-[#0F172A] border border-white/5">

          <Bell size={18}/>

          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">

            3

          </span>

        </button>

        <div className="w-11 h-11 rounded-full bg-violet-500"/>

      </div>

    </header>
  );
}