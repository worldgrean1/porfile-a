interface DynamicMetricProps {
  type: 'vectors' | 'wave' | 'grid' | 'orbit';
  hovered: boolean;
}

export default function DynamicMetricGraphic({ type, hovered }: DynamicMetricProps) {
  switch (type) {
    case 'grid':
      return (
        <svg className="w-full h-full opacity-15 group-hover:opacity-30 transition-opacity duration-500" viewBox="0 0 100 100">
          <defs>
            <pattern id="card-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1.2" fill="#2dd4bf" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#card-grid)" />
          {hovered && (
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              className="origin-center animate-[ping_3s_ease-in-out_infinite]"
            />
          )}
        </svg>
      );

    case 'vectors':
      return (
        <svg className="w-full h-full opacity-10 group-hover:opacity-25 transition-opacity duration-500" viewBox="0 0 120 120">
          <g className={`origin-center transition-all duration-[3000ms] ${hovered ? 'animate-[spin_4s_linear_infinite]' : 'animate-[spin_20s_linear_infinite]'}`}>
            {/* Target vectors crosshair */}
            <circle cx="0" cy="0" r="45" fill="none" stroke="#2dd4bf" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="30" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="-55" y1="0" x2="55" y2="0" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="-55" x2="0" y2="55" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.4" />
            <rect x="-6" y="-6" width="12" height="12" fill="none" stroke="#2dd4bf" strokeWidth="0.75" />
          </g>
        </svg>
      );

    case 'wave':
      return (
        <svg className="w-full h-full opacity-15 group-hover:opacity-30 transition-opacity duration-500 overflow-hidden" viewBox="0 0 120 120">
          <g className="animate-wave-slide" style={{ width: '240px' }}>
            <svg viewBox="0 0 240 120" width="240" height="120">
              {/* Overlapping smooth waves using responsive pure CSS translation */}
              <path
                d="M 0 60 Q 15 40, 30 60 T 60 60 T 90 60 T 120 60 T 150 60 T 180 60 T 210 60 T 240 60"
                fill="none"
                stroke="#2dd4bf"
                strokeWidth={hovered ? "2" : "1.5"}
                className="transition-all duration-300"
              />
              <path
                d="M 0 60 Q 20 75, 40 60 T 80 60 T 120 60 T 160 60 T 200 60 T 240 60"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.5"
                opacity="0.2"
                strokeDasharray="2 2"
              />
            </svg>
          </g>
        </svg>
      );

    case 'orbit':
    default:
      return (
        <svg className="w-full h-full opacity-10 group-hover:opacity-25 transition-opacity duration-500" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="10" fill="#2dd4bf" className={`transition-all duration-300 origin-center ${hovered ? 'scale-125 opacity-60 animate-pulse' : 'opacity-40'}`} />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#2dd4bf" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          {/* Orbiting particles wrapped in hardware CSS rotating structures */}
          <g className={`origin-center ${hovered ? 'animate-[spin_1.5s_linear_infinite]' : 'animate-[spin_5s_linear_infinite]'}`} style={{ transformOrigin: '50px 50px' }}>
            <circle
              cx="80"
              cy="50"
              r="3.5"
              fill="#2dd4bf"
            />
          </g>
          <g className={`origin-center ${hovered ? 'animate-[spin_1s_linear_infinite_reverse]' : 'animate-[spin_3s_linear_infinite_reverse]'}`} style={{ transformOrigin: '50px 50px' }}>
            <circle
              cx="90"
              cy="50"
              r="2"
              fill="#ffffff"
            />
          </g>
        </svg>
      );
  }
}
