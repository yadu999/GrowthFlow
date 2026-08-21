function ConfidenceRing({ value = 92 }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="flex justify-center items-center">
      <svg width="120" height="120">
        {/* Background */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#1f2937"
          strokeWidth="10"
          fill="none"
        />

        {/* Progress */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#3b82f6"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />

        {/* Percentage */}
        <text
          x="60"
          y="66"
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="bold"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
}

export default ConfidenceRing;