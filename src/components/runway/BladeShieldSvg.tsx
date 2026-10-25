import React from 'react';

interface BladeShieldSvgProps {
  bladeRotation: number;
  counterRingRotation: number;
}

export const BladeShieldSvg: React.FC<BladeShieldSvgProps> = ({
  bladeRotation,
  counterRingRotation,
}) => {
  return (
    <>
      {/* Outer Energy Pulse Aura */}
      <div className="absolute w-[440px] h-[440px] rounded-full bg-secondary-container/20 blur-3xl animate-pulse" />

      {/* LAYER 1: Counter-Rotating Outer Energy Ring with Runic Brackets (SVG) */}
      <svg
        id="shield-ring-outer"
        className="absolute w-[420px] h-[420px] will-change-transform"
        fill="none"
        viewBox="0 0 400 400"
        style={{ transform: `rotate(${counterRingRotation % 360}deg)` }}
      >
        {/* Dashed Outer Reticle */}
        <circle
          cx="200"
          cy="200"
          opacity="0.6"
          r="190"
          stroke="#00dbe9"
          strokeDasharray="8 6"
          strokeWidth="1.5"
        />
        <circle
          cx="200"
          cy="200"
          opacity="0.8"
          r="176"
          stroke="#ff562d"
          strokeDasharray="32 14"
          strokeWidth="2"
        />
        {/* 4 Outer Runic Kinetic Nodes */}
        <g fill="#ff562d">
          <polygon points="200,2 210,24 190,24" />
          <polygon points="200,398 210,376 190,376" />
          <polygon points="2,200 24,190 24,210" />
          <polygon points="398,200 376,190 376,210" />
        </g>
        {/* Circular runic ticks */}
        <circle
          cx="200"
          cy="200"
          opacity="0.4"
          r="162"
          stroke="#c3cc8c"
          strokeDasharray="4 8"
          strokeWidth="1"
        />
      </svg>

      {/* LAYER 2: PRIMARY ROTATING TITANIUM BLADES (Clockwise fast spin) */}
      <svg
        id="shield-blades-layer"
        className="relative w-[380px] h-[380px] will-change-transform filter drop-shadow-[0_0_18px_rgba(255,86,45,0.7)]"
        fill="none"
        viewBox="0 0 400 400"
        style={{ transform: `rotate(${bladeRotation % 360}deg)` }}
      >
        {/* Central Shield Hub Housing */}
        <circle cx="200" cy="200" fill="#121415" r="72" stroke="#4b5320" strokeWidth="4" />
        <circle
          cx="200"
          cy="200"
          fill="#1a1c1d"
          r="54"
          stroke="#00dbe9"
          strokeDasharray="10 4"
          strokeWidth="2"
        />

        {/* 6 Heavy Serrated Tungsten/Argent Kinetic Razor Blades */}
        {/* Blade 1 (0 deg) */}
        <path
          d="M200 135 L214 70 L242 12 L210 38 L192 128 Z"
          fill="#ff562d"
          stroke="#dfe8a6"
          strokeWidth="1.5"
        />
        <path d="M204 135 L236 40 L216 75 Z" fill="#ffdad2" opacity="0.75" />

        {/* Blade 2 (60 deg) */}
        <g transform="rotate(60 200 200)">
          <path
            d="M200 135 L214 70 L242 12 L210 38 L192 128 Z"
            fill="#ff562d"
            stroke="#dfe8a6"
            strokeWidth="1.5"
          />
          <path d="M204 135 L236 40 L216 75 Z" fill="#ffdad2" opacity="0.75" />
        </g>

        {/* Blade 3 (120 deg) */}
        <g transform="rotate(120 200 200)">
          <path
            d="M200 135 L214 70 L242 12 L210 38 L192 128 Z"
            fill="#ff562d"
            stroke="#dfe8a6"
            strokeWidth="1.5"
          />
          <path d="M204 135 L236 40 L216 75 Z" fill="#ffdad2" opacity="0.75" />
        </g>

        {/* Blade 4 (180 deg) */}
        <g transform="rotate(180 200 200)">
          <path
            d="M200 135 L214 70 L242 12 L210 38 L192 128 Z"
            fill="#ff562d"
            stroke="#dfe8a6"
            strokeWidth="1.5"
          />
          <path d="M204 135 L236 40 L216 75 Z" fill="#ffdad2" opacity="0.75" />
        </g>

        {/* Blade 5 (240 deg) */}
        <g transform="rotate(240 200 200)">
          <path
            d="M200 135 L214 70 L242 12 L210 38 L192 128 Z"
            fill="#ff562d"
            stroke="#dfe8a6"
            strokeWidth="1.5"
          />
          <path d="M204 135 L236 40 L216 75 Z" fill="#ffdad2" opacity="0.75" />
        </g>

        {/* Blade 6 (300 deg) */}
        <g transform="rotate(300 200 200)">
          <path
            d="M200 135 L214 70 L242 12 L210 38 L192 128 Z"
            fill="#ff562d"
            stroke="#dfe8a6"
            strokeWidth="1.5"
          />
          <path d="M204 135 L236 40 L216 75 Z" fill="#ffdad2" opacity="0.75" />
        </g>

        {/* Inner Razor Saw Teeth Array */}
        <g fill="#c3cc8c" stroke="#4b5320" strokeWidth="1">
          <polygon points="200,126 206,140 194,140" />
          <polygon points="200,274 206,260 194,260" />
          <polygon points="126,200 140,206 140,194" />
          <polygon points="274,200 260,206 260,194" />
          <polygon points="148,148 160,154 154,160" />
          <polygon points="252,252 240,246 246,240" />
          <polygon points="148,252 160,246 154,240" />
          <polygon points="252,148 240,154 246,160" />
        </g>

        {/* Central Slayer Crucible Glyph / Reactor Core */}
        <circle cx="200" cy="200" fill="#ff562d" r="32" />
        <circle cx="200" cy="200" fill="#ffdad2" r="18" />

        {/* Runic Crucible Brand Marker */}
        <path
          d="M194 186 L206 186 L202 214 L198 214 Z M188 192 L212 192 M189 204 L211 204"
          stroke="#560d00"
          strokeLinecap="square"
          strokeWidth="2.5"
        />
      </svg>

      {/* LAYER 3: Cyan Targeting Reticle / Combat HUD Crosshair Overlay */}
      <div className="absolute w-[300px] h-[300px] pointer-events-none flex items-center justify-center">
        <div className="w-full h-[1px] bg-tertiary/40" />
        <div className="h-full w-[1px] bg-tertiary/40 absolute" />
        <div className="absolute inset-0 border border-tertiary/30 rounded-full scale-95 animate-ping opacity-25" />
      </div>
    </>
  );
};
