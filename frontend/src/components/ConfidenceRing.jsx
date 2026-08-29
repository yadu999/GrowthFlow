import { CheckCircle2 } from "lucide-react";

export default function ConfidenceRing({ confidence = 92 }) {
  const radius = 46;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (confidence / 100) * circumference;

  const getColor = () => {
    if (confidence >= 85) return "#2563EB"; // Blue
    if (confidence >= 70) return "#F59E0B"; // Orange
    return "#EF4444"; // Red
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg
          width="112"
          height="112"
          viewBox="0 0 112 112"
          className="-rotate-90"
        >
          {/* Background Ring */}
          <circle
            cx="56"
            cy="56"
            r={normalizedRadius}
            stroke="#E5E7EB"
            strokeWidth={stroke}
            fill="none"
          />

          {/* Progress Ring */}
          <circle
            cx="56"
            cy="56"
            r={normalizedRadius}
            stroke={getColor()}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 0.8s ease",
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {confidence}%
          </span>

          {confidence >= 85 && (
            <CheckCircle2 size={14} className="text-blue-600 mt-1" />
          )}
        </div>
      </div>

      <p className="mt-3 text-sm font-medium text-gray-600">
        Confidence
      </p>
    </div>
  );
}