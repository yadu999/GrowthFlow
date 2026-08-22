export default function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 animate-pulse">
      <div className="h-6 w-40 bg-white/10 rounded mb-6"></div>

      <div className="space-y-4">
        <div className="h-16 bg-white/10 rounded-2xl"></div>
        <div className="h-16 bg-white/10 rounded-2xl"></div>
        <div className="h-16 bg-white/10 rounded-2xl"></div>
        <div className="h-24 bg-white/10 rounded-2xl"></div>
      </div>
    </div>
  );
}