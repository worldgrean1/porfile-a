import React, { useEffect, useRef, useState } from 'react';

interface ProjectionGridProps {
  scrollProgress: number;
  activeBgColor: string;
}

export default function ProjectionGrid({ scrollProgress, activeBgColor }: ProjectionGridProps) {
  // Use ref for mouse position to avoid setState on every mousemove (60-200 calls/sec)
  const compassRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1) for subtle parallax projection
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
      // Apply transforms directly to DOM — bypasses React reconciler entirely
      if (compassRef.current) {
        compassRef.current.style.transform = `translate3d(${mousePosRef.current.x * -25}px, ${mousePosRef.current.y * -25}px, 0)`;
      }
      if (radarRef.current) {
        radarRef.current.style.transform = `translate3d(${mousePosRef.current.x * 15}px, ${mousePosRef.current.y * 15}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Light sections use '#FFFFFF' — was incorrectly checking for #FFF1E9 / #EBE8E8 which never appear
  const isLight = activeBgColor === '#FFFFFF';

  // Dynamic colors matching current section tone
  const primaryColor = '#2dd4bf'; // Brand Cyan
  const secondaryColor = isLight ? 'rgba(13, 13, 13, 0.45)' : 'rgba(255, 255, 255, 0.45)';
  const gridLinesColor = isLight ? 'rgba(13, 13, 13, 0.02)' : 'rgba(255, 255, 255, 0.015)';
  const blueprintLineColor = isLight ? 'rgba(45, 212, 191, 0.08)' : 'rgba(45, 212, 191, 0.15)';
  const indicatorColor = isLight ? 'rgba(13, 13, 13, 0.25)' : 'rgba(255, 255, 255, 0.15)';

  return (
    <div id="projection-grid-container" className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      
      {/* 1. ARCHITECTURAL BLUEPRINT GRID ARRAY */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridLinesColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridLinesColor} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.85
        }}
      />

      {/* 2. GLOWING HORIZONS AND COORDINATES COMPASS */}
      <div 
        ref={compassRef}
        className="absolute right-[-100px] top-[15%] w-[600px] h-[600px] opacity-40 xl:opacity-60 will-change-transform"
        style={{ transform: 'translate3d(0px, 0px, 0)' }}
      >
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          {/* External Telemetry track */}
          <circle 
            cx="200" 
            cy="200" 
            r="180" 
            stroke={blueprintLineColor} 
            strokeWidth="0.75" 
            strokeDasharray="4 8" 
            className="origin-center animate-spin-slow-cw"
          />
          
          {/* Interactive Core dial */}
          <circle 
            cx="200" 
            cy="200" 
            r="140" 
            stroke={primaryColor} 
            strokeWidth="0.5" 
            opacity="0.3"
          />
          
          {/* Dynamic coordinate cross lines */}
          <line x1="20" y1="200" x2="380" y2="200" stroke={blueprintLineColor} strokeWidth="0.5" />
          <line x1="200" y1="20" x2="200" y2="380" stroke={blueprintLineColor} strokeWidth="0.5" />

          {/* Compass Node Rings */}
          <circle 
            cx="200" 
            cy="200" 
            r="80" 
            stroke={primaryColor} 
            strokeWidth="1" 
            strokeDasharray="40 10 5 10" 
            opacity="0.45"
            className="origin-center animate-spin-slow-ccw"
          />

          {/* Glowing central target vector nodes */}
          <circle cx="200" cy="200" r="3" fill={primaryColor} />
          <path d="M 180,200 L 220,200 M 200,180 L 200,220" stroke={primaryColor} strokeWidth="1.25" />
          
          {/* Animated orbiting coordinates */}
          <g className="origin-center animate-spin-normal-cw">
            <line x1="200" y1="200" x2="280" y2="200" stroke={primaryColor} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="280" cy="200" r="4" fill={primaryColor} className="animate-pulse" />
            <text x="290" y="203" fill={secondaryColor} fontSize="6" fontFamily="monospace" letterSpacing="0.1em">GRID_ROTATOR_ACTIVE</text>
          </g>

          {/* System status display rings */}
          <text x="210" y="193" fill={secondaryColor} fontSize="7" fontFamily="monospace" letterSpacing="0.25em" opacity="0.65">SYS: COMP_V5</text>
          <text x="210" y="213" fill={primaryColor} fontSize="6.5" fontFamily="monospace" letterSpacing="0.2em" fontWeight="bold">ELEV: {Math.round(scrollProgress * 180)}°</text>
        </svg>
      </div>

      {/* 3. RADIAL SCANNER ARC DISPLAY (LEFT BOTTOM PART) */}
      <div 
        ref={radarRef}
        className="absolute left-[3%] bottom-[8%] w-[380px] h-[380px] opacity-35 xl:opacity-50 hidden md:block will-change-transform"
        style={{ transform: 'translate3d(0px, 0px, 0)' }}
      >
        <svg className="w-full h-full" viewBox="0 0 300 300" fill="none">
          {/* Architectural structural coordinate shapes */}
          <rect 
            x="50" 
            y="50" 
            width="200" 
            height="200" 
            stroke={blueprintLineColor} 
            strokeWidth="0.5" 
            strokeDasharray="2 4"
          />
          <polygon 
            points="150,30 270,250 30,250" 
            stroke={blueprintLineColor} 
            strokeWidth="0.5" 
            opacity="0.3"
            className="origin-center animate-spin-very-slow-ccw"
          />

          {/* Central radar screen rings */}
          <circle cx="150" cy="150" r="110" stroke={blueprintLineColor} strokeWidth="0.5" />
          <circle cx="150" cy="150" r="50" stroke={primaryColor} strokeWidth="0.75" opacity="0.25" />
          
          {/* Animated radar scanning sweep line */}
          <line 
            x1="150" 
            y1="150" 
            x2="150" 
            y2="40" 
            stroke={primaryColor} 
            strokeWidth="1.5" 
            opacity="0.8"
            className="origin-center animate-spin-fast-cw"
            style={{ 
              filter: 'drop-shadow(0 0 8px rgba(45, 212, 191, 0.8))'
            }}
          />

          {/* Coordinate text anchors — static decorative HUD labels (mousePos removed from state; ref-driven) */}
          <text x="60" y="45" fill={secondaryColor} fontSize="6" fontFamily="monospace">LOC_X: {(150).toFixed(2)}</text>
          <text x="60" y="55" fill={secondaryColor} fontSize="6" fontFamily="monospace">LOC_Y: {(150).toFixed(2)}</text>
          <text x="175" y="240" fill={primaryColor} fontSize="6.5" fontFamily="monospace" letterSpacing="0.1em">PROJ_MATRIX</text>
        </svg>
      </div>

      {/* 4. FLOATING TELEMETRY LABELS HUD (PERSISTENT SCROLL ELEVATION DATA) */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center justify-between w-[95%] max-w-[1400px] px-4 font-mono text-[8px] text-white/20 tracking-widest leading-none">
        <span className="hidden sm:inline-block transition-colors duration-500" style={{ color: isLight ? 'rgba(13, 13, 13, 0.45)' : 'rgba(255, 255, 255, 0.2)' }}>
          SEC_TELE_091 — ACTIVE STATE MATRIX BUFFER
        </span>
        <span className="hidden xl:inline-block transition-colors duration-500" style={{ color: isLight ? 'rgba(13, 13, 13, 0.45)' : 'rgba(255, 255, 255, 0.2)' }}>
          PORT_ ingress_routed_3000 — FRAME_PULSE_LOCK: OK
        </span>
      </div>

      {/* 5. GIMBAL CORNER BRACKETS FOR DETAILED WORKSTATION */}
      <div 
        className="absolute top-20 bottom-3 right-3 left-3 md:left-24 md:right-8 border transition-colors duration-1000 hidden lg:block"
        style={{ 
          borderColor: isLight ? 'rgba(13, 13, 13, 0.04)' : 'rgba(255, 255, 255, 0.02)' 
        }}
      >
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: blueprintLineColor }} />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: blueprintLineColor }} />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: blueprintLineColor }} />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: blueprintLineColor }} />
      </div>

    </div>
  );
}
