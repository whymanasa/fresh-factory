export default function IndiaPostStamp({ variant }: { variant: "space" | "menu" }) {
  const panelColor = variant === "space" ? "#C8503A" : "#1B4F8A"

  return (
    <div
      style={{
        display: "inline-block",
        transform: variant === "space" ? "rotate(3deg)" : "rotate(-2.5deg)",
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))",
      }}
    >
      <svg width="80" height="96" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="96" fill="#F5EDD8" rx="1" />

        {Array.from({ length: 9 }, (_, i) => (
          <circle key={`t${i}`} cx={5 + i * 8.75} cy={4} r={3} fill="#C2BDB8" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={`b${i}`} cx={5 + i * 8.75} cy={92} r={3} fill="#C2BDB8" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <circle key={`l${i}`} cx={4} cy={5 + i * 8.36} r={3} fill="#C2BDB8" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <circle key={`r${i}`} cx={76} cy={5 + i * 8.36} r={3} fill="#C2BDB8" />
        ))}

        <rect x="9" y="9" width="62" height="78" fill={panelColor} rx="1" />

        <text x="40" y="19" textAnchor="middle" fill="#F5EDD8" fontFamily="serif" fontSize="6" letterSpacing="1.5">
          INDIA POST
        </text>

        {variant === "space" ? (
          <g transform="translate(18, 24)">
            <rect x="4" y="8" width="26" height="18" rx="1" fill="none" stroke="#F5EDD8" strokeWidth="1.5" />
            <path d="M30 12 Q38 12 38 17 Q38 22 30 22" fill="none" stroke="#F5EDD8" strokeWidth="1.5" />
            <ellipse cx="17" cy="28" rx="18" ry="3" fill="none" stroke="#F5EDD8" strokeWidth="1.2" />
            <path d="M10 6 Q12 2 10 -2" fill="none" stroke="#F5EDD8" strokeWidth="1" opacity="0.8" />
            <path d="M17 4 Q19 0 17 -4" fill="none" stroke="#F5EDD8" strokeWidth="1" opacity="0.8" />
            <path d="M24 6 Q26 2 24 -2" fill="none" stroke="#F5EDD8" strokeWidth="1" opacity="0.8" />
          </g>
        ) : (
          <g transform="translate(40, 55)">
            <ellipse cx="0" cy="0" rx="5" ry="12" fill="none" stroke="#F5EDD8" strokeWidth="1.2" />
            <ellipse cx="-8" cy="2" rx="4" ry="10" fill="none" stroke="#F5EDD8" strokeWidth="1.2" transform="rotate(-25)" />
            <ellipse cx="8" cy="2" rx="4" ry="10" fill="none" stroke="#F5EDD8" strokeWidth="1.2" transform="rotate(25)" />
            <ellipse cx="-14" cy="6" rx="3.5" ry="8" fill="none" stroke="#F5EDD8" strokeWidth="1" transform="rotate(-50)" />
            <ellipse cx="14" cy="6" rx="3.5" ry="8" fill="none" stroke="#F5EDD8" strokeWidth="1" transform="rotate(50)" />
            <line x1="0" y1="12" x2="0" y2="22" stroke="#F5EDD8" strokeWidth="1.2" />
            <line x1="-6" y1="18" x2="6" y2="18" stroke="#F5EDD8" strokeWidth="1" />
          </g>
        )}

        <line x1="12" y1="72" x2="68" y2="72" stroke="#F5EDD8" strokeWidth="0.5" opacity="0.6" />
        <text x="40" y="81" textAnchor="middle" fill="#F5EDD8" fontFamily="serif" fontSize="7" letterSpacing="0.5">
          ₹ 5
        </text>
        <text x="40" y="89" textAnchor="middle" fill="#F5EDD8" fontFamily="sans-serif" fontSize="5" letterSpacing="1" opacity="0.8">
          BHARAT
        </text>
      </svg>
    </div>
  )
}
