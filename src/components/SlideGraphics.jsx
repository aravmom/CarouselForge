import React from 'react';

// ─── Rich SVG illustrations for each slide type ───

export function CircuitArt({ color = '#d4af37', scale = 1 }) {
  const s = scale;
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1080" fill="none">
      <defs>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Central glow */}
      <circle cx="540" cy="540" r="400" fill="url(#glow1)" />
      {/* Circuit lines */}
      <g stroke={color} strokeWidth="1.5" opacity="0.15">
        <path d="M100 0 L100 180 L280 180 L280 350" />
        <path d="M400 0 L400 100 L580 100 L580 250 L720 250" />
        <path d="M0 400 L120 400 L120 560 L300 560" />
        <path d="M0 700 L80 700 L80 850 L200 850" />
        <path d="M800 0 L800 120 L950 120 L950 280" />
        <path d="M1080 300 L920 300 L920 450 L780 450" />
        <path d="M700 800 L700 950 L850 950 L850 1080" />
        <path d="M300 900 L300 1080" />
        <path d="M1080 700 L900 700 L900 860 L1080 860" />
        <path d="M500 750 L500 900 L650 900" />
      </g>
      {/* Nodes */}
      <g fill={color} opacity="0.2">
        <circle cx="100" cy="180" r="8" />
        <circle cx="280" cy="350" r="8" />
        <circle cx="580" cy="250" r="8" />
        <circle cx="120" cy="560" r="8" />
        <circle cx="950" cy="280" r="8" />
        <circle cx="780" cy="450" r="8" />
        <circle cx="700" cy="950" r="6" />
        <circle cx="500" cy="900" r="6" />
        <rect x="396" y="96" width="8" height="8" rx="2" />
        <rect x="916" y="116" width="8" height="8" rx="2" />
      </g>
      {/* Corner frame accents */}
      <g stroke={color} strokeWidth="2.5" opacity="0.25">
        <path d="M0 60 L0 0 L60 0" />
        <path d="M1020 0 L1080 0 L1080 60" />
        <path d="M0 1020 L0 1080 L60 1080" />
        <path d="M1020 1080 L1080 1080 L1080 1020" />
      </g>
    </svg>
  );
}

export function WarningArt({ color = '#d4af37' }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1080" fill="none">
      <defs>
        <radialGradient id="warnGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.08" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1080" fill="url(#warnGlow)" />
      {/* Floating AI icons */}
      <g opacity="0.1" stroke={color} strokeWidth="2" fill="none">
        {/* Brain icon top-right */}
        <circle cx="850" cy="200" r="45" />
        <path d="M830 180 Q840 160 850 180 Q860 160 870 180" />
        <path d="M830 200 Q840 220 850 200 Q860 220 870 200" />
        {/* Chat bubble bottom-left */}
        <rect x="120" y="750" width="80" height="55" rx="10" />
        <path d="M140 805 L130 825 L160 805" />
        {/* Gear top-left */}
        <circle cx="200" cy="180" r="25" />
        <circle cx="200" cy="180" r="12" />
        {/* Warning triangle center-right */}
        <path d="M900 550 L940 620 L860 620 Z" strokeWidth="2.5" />
        <line x1="900" y1="575" x2="900" y2="600" strokeWidth="2.5" />
        <circle cx="900" cy="610" r="3" fill={color} />
        {/* Network dots */}
        <circle cx="750" cy="850" r="6" fill={color} opacity="0.3" />
        <circle cx="820" cy="880" r="4" fill={color} opacity="0.2" />
        <circle cx="780" cy="820" r="5" fill={color} opacity="0.25" />
        <line x1="750" y1="850" x2="820" y2="880" />
        <line x1="750" y1="850" x2="780" y2="820" />
      </g>
      {/* Corner accents */}
      <g stroke={color} strokeWidth="3" opacity="0.3">
        <path d="M0 60 L0 0 L60 0" />
        <path d="M1020 0 L1080 0 L1080 60" />
        <path d="M0 1020 L0 1080 L60 1080" />
        <path d="M1020 1080 L1080 1080 L1080 1020" />
      </g>
    </svg>
  );
}

export function CompassArt({ color = '#d4af37' }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1080" fill="none">
      <defs>
        <radialGradient id="compassGlow" cx="75%" cy="55%" r="40%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1080" fill="url(#compassGlow)" />
      {/* Large compass rose - right side */}
      <g transform="translate(820, 540)" opacity="0.12" stroke={color} strokeWidth="2">
        <circle r="120" />
        <circle r="80" strokeDasharray="8 6" />
        <circle r="40" />
        {/* Cardinal directions */}
        <line x1="0" y1="-130" x2="0" y2="-90" strokeWidth="3" />
        <line x1="130" y1="0" x2="90" y2="0" strokeWidth="3" />
        <line x1="0" y1="130" x2="0" y2="90" strokeWidth="3" />
        <line x1="-130" y1="0" x2="-90" y2="0" strokeWidth="3" />
        {/* Diamond pointer */}
        <path d="M0 -60 L15 0 L0 60 L-15 0 Z" fill={color} opacity="0.3" />
      </g>
      {/* Connecting nodes for GOVERN/MAP/MEASURE/MANAGE */}
      <g opacity="0.08" fill={color}>
        <circle cx="180" cy="250" r="10" />
        <circle cx="180" cy="830" r="10" />
        <circle cx="100" cy="540" r="10" />
      </g>
      {/* Corner accents */}
      <g stroke={color} strokeWidth="3" opacity="0.3">
        <path d="M0 60 L0 0 L60 0" />
        <path d="M1020 0 L1080 0 L1080 60" />
        <path d="M0 1020 L0 1080 L60 1080" />
        <path d="M1020 1080 L1080 1080 L1080 1020" />
      </g>
    </svg>
  );
}

export function PillarsArt({ color = '#d4af37' }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1080" fill="none">
      {/* Four abstract pillars at bottom */}
      <g opacity="0.08">
        <rect x="120" y="700" width="120" height="380" rx="6" fill={color} />
        <rect x="360" y="750" width="120" height="330" rx="6" fill={color} />
        <rect x="600" y="720" width="120" height="360" rx="6" fill={color} />
        <rect x="840" y="740" width="120" height="340" rx="6" fill={color} />
        {/* Connecting arch */}
        <path d="M180 700 Q540 550 960 740" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
      </g>
      {/* Decorative dots */}
      <g fill={color} opacity="0.06">
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={900 + c * 20} cy={100 + r * 20} r="2.5" />
          ))
        )}
      </g>
      {/* Corner accents */}
      <g stroke={color} strokeWidth="3" opacity="0.3">
        <path d="M0 60 L0 0 L60 0" />
        <path d="M1020 0 L1080 0 L1080 60" />
        <path d="M0 1020 L0 1080 L60 1080" />
        <path d="M1020 1080 L1080 1080 L1080 1020" />
      </g>
    </svg>
  );
}

export function ShieldArt({ color = '#d4af37' }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1080" fill="none">
      <defs>
        <radialGradient id="shieldGlow" cx="80%" cy="50%" r="35%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1080" fill="url(#shieldGlow)" />
      {/* Shield shape */}
      <g transform="translate(830, 450)" opacity="0.12" stroke={color} strokeWidth="2.5">
        <path d="M0 -100 L80 -60 L80 40 Q80 120 0 160 Q-80 120 -80 40 L-80 -60 Z" fill={color} fillOpacity="0.05" />
        {/* Checkmark inside */}
        <path d="M-25 20 L-5 45 L35 -15" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Upward arrows */}
      <g stroke={color} strokeWidth="1.5" opacity="0.06">
        <path d="M200 900 L200 700 M180 740 L200 700 L220 740" />
        <path d="M300 950 L300 780 M280 820 L300 780 L320 820" />
      </g>
      {/* Corner accents */}
      <g stroke={color} strokeWidth="3" opacity="0.3">
        <path d="M0 60 L0 0 L60 0" />
        <path d="M1020 0 L1080 0 L1080 60" />
        <path d="M0 1020 L0 1080 L60 1080" />
        <path d="M1020 1080 L1080 1080 L1080 1020" />
      </g>
    </svg>
  );
}

export function DocumentArt({ color = '#d4af37' }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1080" fill="none">
      {/* Floating document */}
      <g transform="translate(830, 400)" opacity="0.1" stroke={color} strokeWidth="2">
        <rect x="-60" y="-80" width="120" height="160" rx="8" fill={color} fillOpacity="0.05" />
        <line x1="-35" y1="-50" x2="35" y2="-50" />
        <line x1="-35" y1="-25" x2="35" y2="-25" />
        <line x1="-35" y1="0" x2="20" y2="0" />
        <line x1="-35" y1="25" x2="35" y2="25" />
        {/* Checkmark */}
        <path d="M-10 50 L5 65 L30 35" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* Small floating icons */}
      <g opacity="0.06" stroke={color} strokeWidth="1.5">
        <circle cx="750" cy="800" r="15" />
        <circle cx="900" cy="750" r="10" />
        <rect x="180" y="850" width="20" height="25" rx="3" />
      </g>
      {/* Corner accents */}
      <g stroke={color} strokeWidth="3" opacity="0.3">
        <path d="M0 60 L0 0 L60 0" />
        <path d="M1020 0 L1080 0 L1080 60" />
        <path d="M0 1020 L0 1080 L60 1080" />
        <path d="M1020 1080 L1080 1080 L1080 1020" />
      </g>
    </svg>
  );
}

export function StopwatchArt({ color = '#d4af37' }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1080" fill="none">
      <defs>
        <radialGradient id="swGlow" cx="80%" cy="45%" r="30%">
          <stop offset="0%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1080" fill="url(#swGlow)" />
      {/* Stopwatch */}
      <g transform="translate(840, 420)" opacity="0.12" stroke={color} strokeWidth="2.5">
        <circle r="80" fill={color} fillOpacity="0.03" />
        <circle r="65" strokeDasharray="6 4" />
        {/* Button top */}
        <rect x="-8" y="-95" width="16" height="20" rx="3" />
        {/* Hands */}
        <line x1="0" y1="0" x2="0" y2="-50" strokeWidth="3" strokeLinecap="round" />
        <line x1="0" y1="0" x2="35" y2="20" strokeWidth="2" strokeLinecap="round" />
        <circle r="5" fill={color} />
        {/* 30 marker */}
        <text x="0" y="35" textAnchor="middle" fill={color} fontSize="18" fontFamily="DM Sans" fontWeight="600" opacity="0.5">30</text>
      </g>
      {/* Corner accents */}
      <g stroke={color} strokeWidth="3" opacity="0.3">
        <path d="M0 60 L0 0 L60 0" />
        <path d="M1020 0 L1080 0 L1080 60" />
        <path d="M0 1020 L0 1080 L60 1080" />
        <path d="M1020 1080 L1080 1080 L1080 1020" />
      </g>
    </svg>
  );
}

export function BalanceArt({ color = '#d4af37' }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1080" fill="none">
      {/* Yin-yang / balance concept */}
      <g opacity="0.07">
        {/* Left side - gears (automation) */}
        <g stroke={color} strokeWidth="2" transform="translate(150, 850)">
          <circle r="35" />
          <circle r="15" />
          {[0, 60, 120, 180, 240, 300].map(a => (
            <rect key={a} x="-5" y="-42" width="10" height="14" rx="2" transform={`rotate(${a})`} fill={color} fillOpacity="0.3" />
          ))}
        </g>
        {/* Right side - shield (governance) */}
        <g stroke={color} strokeWidth="2" transform="translate(930, 850)">
          <path d="M0 -40 L35 -25 L35 15 Q35 45 0 60 Q-35 45 -35 15 L-35 -25 Z" fill={color} fillOpacity="0.05" />
        </g>
        {/* Connecting line */}
        <line x1="200" y1="850" x2="880" y2="850" stroke={color} strokeWidth="1" strokeDasharray="8 4" />
      </g>
      {/* Corner accents */}
      <g stroke={color} strokeWidth="3" opacity="0.3">
        <path d="M0 60 L0 0 L60 0" />
        <path d="M1020 0 L1080 0 L1080 60" />
        <path d="M0 1020 L0 1080 L60 1080" />
        <path d="M1020 1080 L1080 1080 L1080 1020" />
      </g>
    </svg>
  );
}

export function ChecklistArt({ color = '#d4af37' }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1080" fill="none">
      <defs>
        <radialGradient id="clGlow" cx="80%" cy="50%" r="35%">
          <stop offset="0%" stopColor={color} stopOpacity="0.08" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1080" fill="url(#clGlow)" />
      {/* Clipboard shape */}
      <g transform="translate(850, 450)" opacity="0.1" stroke={color} strokeWidth="2">
        <rect x="-55" y="-90" width="110" height="180" rx="8" fill={color} fillOpacity="0.04" />
        <rect x="-20" y="-100" width="40" height="20" rx="5" fill={color} fillOpacity="0.1" />
        {/* Check lines */}
        {[-40, -10, 20, 50].map((y, i) => (
          <g key={i}>
            <path d={`M-30 ${y} L-20 ${y + 10} L-8 ${y - 5}`} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="-0" y1={y} x2="35" y2={y} strokeWidth="1.5" />
          </g>
        ))}
      </g>
      {/* Corner accents */}
      <g stroke={color} strokeWidth="3" opacity="0.3">
        <path d="M0 60 L0 0 L60 0" />
        <path d="M1020 0 L1080 0 L1080 60" />
        <path d="M0 1020 L0 1080 L60 1080" />
        <path d="M1020 1080 L1080 1080 L1080 1020" />
      </g>
    </svg>
  );
}

export function GlowArt({ color = '#d4af37' }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1080 1080" fill="none">
      <defs>
        <radialGradient id="ctaGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="50%" stopColor={color} stopOpacity="0.05" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1080" fill="url(#ctaGlow)" />
      {/* Radiating lines */}
      <g stroke={color} strokeWidth="1" opacity="0.08">
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i * 10 * Math.PI) / 180;
          return (
            <line key={i}
              x1={540 + Math.cos(a) * 200}
              y1={480 + Math.sin(a) * 200}
              x2={540 + Math.cos(a) * 500}
              y2={480 + Math.sin(a) * 500}
            />
          );
        })}
      </g>
      {/* Envelope icon center */}
      <g transform="translate(540, 380)" opacity="0.08" stroke={color} strokeWidth="3">
        <rect x="-50" y="-30" width="100" height="60" rx="6" fill={color} fillOpacity="0.05" />
        <path d="M-50 -30 L0 10 L50 -30" />
      </g>
      {/* Corner accents */}
      <g stroke={color} strokeWidth="3" opacity="0.35">
        <path d="M0 60 L0 0 L60 0" />
        <path d="M1020 0 L1080 0 L1080 60" />
        <path d="M0 1020 L0 1080 L60 1080" />
        <path d="M1020 1080 L1080 1080 L1080 1020" />
      </g>
    </svg>
  );
}

// Map graphic names to components
export const graphicMap = {
  circuit: CircuitArt,
  warning: WarningArt,
  compass: CompassArt,
  pillars: PillarsArt,
  shield: ShieldArt,
  document: DocumentArt,
  stopwatch: StopwatchArt,
  balance: BalanceArt,
  checklist: ChecklistArt,
  glow: GlowArt,
};
