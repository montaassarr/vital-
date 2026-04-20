export default function VitaiAssistLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 240"
      role="img"
      aria-label="VitAI Assist"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vitaiPurple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B7CF0" />
          <stop offset="100%" stopColor="#5B4AD3" />
        </linearGradient>
      </defs>

      <g transform="translate(200 12)">
        <path
          d="M80 22L108 38V71L80 87V107L62 96L42 85L14 69V36L42 20L62 9L80 22Z"
          stroke="url(#vitaiPurple)"
          strokeWidth="6"
          fill="none"
          strokeLinejoin="round"
        />
        <circle cx="36" cy="53" r="6" fill="url(#vitaiPurple)" />
        <circle cx="80" cy="53" r="6" fill="url(#vitaiPurple)" />
        <circle cx="59" cy="34" r="6" fill="url(#vitaiPurple)" />
        <path d="M36 53H80" stroke="url(#vitaiPurple)" strokeWidth="4" strokeLinecap="round" />
        <path d="M59 34L80 53" stroke="url(#vitaiPurple)" strokeWidth="4" strokeLinecap="round" />
        <path d="M59 34V53" stroke="url(#vitaiPurple)" strokeWidth="4" strokeLinecap="round" />
        <path d="M80 53V72" stroke="url(#vitaiPurple)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="80" cy="72" r="8" stroke="url(#vitaiPurple)" strokeWidth="4" fill="none" />
      </g>

      <text
        x="282"
        y="176"
        textAnchor="middle"
        fontFamily="Sergio Trendy, Margin DEMO, Georgia, serif"
        fontSize="92"
        fontWeight="600"
        fill="#505058"
        letterSpacing="1.2"
      >
        VitAI
      </text>
      <text
        x="365"
        y="210"
        textAnchor="middle"
        fontFamily="Margin DEMO, Sergio Trendy, Times New Roman, serif"
        fontSize="58"
        fontStyle="italic"
        fill="#505058"
      >
        Assist
      </text>
    </svg>
  );
}