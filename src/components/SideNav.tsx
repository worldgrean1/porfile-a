import React, { useEffect, useState } from 'react';

interface SideNavProps {
  scrollProgress: number;
  activeBgColor: string;
  activeTextColor: string;
}

const SECTIONS = [
  { id: 'signin', label: '00', sub: 'SYSTEM ENTRY' },
  { id: 'hero', label: '01', sub: 'IDENTITY GATE' },
  { id: 'about', label: '02', sub: 'IDENTITY REVEAL' },
  { id: 'activation', label: '03', sub: 'ACTIVATION UNLOCK' },
  { id: 'manifesto', label: '04', sub: 'MANIFESTO' },
  { id: 'gamezone', label: '05', sub: 'GAME ZONE' },
  { id: 'process', label: '06', sub: 'OUR PROCESS' },
  { id: 'contact', label: '07', sub: 'CONTACT US' },
  { id: 'signout', label: '08', sub: 'EXIT SCENE' }
];


export default function SideNav({ scrollProgress, activeBgColor, activeTextColor }: SideNavProps) {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScrollActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      const renderedSpecs = SECTIONS
        .map(sec => {
          const el = document.getElementById(sec.id);
          if (el) {
            return {
              id: sec.id,
              top: el.getBoundingClientRect().top + window.scrollY
            };
          }
          return null;
        })
        .filter((sec): sec is NonNullable<typeof sec> => sec !== null)
        .sort((a, b) => a.top - b.top);

      let activeId = SECTIONS[0].id;
      for (const sec of renderedSpecs) {
        if (scrollPosition >= sec.top) {
          activeId = sec.id;
        } else {
          break;
        }
      }

      setActiveSection(activeId);
    };

    window.addEventListener('scroll', handleScrollActiveSection, { passive: true });
    handleScrollActiveSection();
    return () => window.removeEventListener('scroll', handleScrollActiveSection);
  }, []);

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const elTop = target.getBoundingClientRect().top + window.scrollY;
      const topOffset = (id === 'hero' || id === 'signin') ? 0 : elTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  const isLightBackground = activeBgColor === '#FFFFFF';

  return (
    <aside className="fixed left-4 lg:left-8 xl:left-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-5 select-none">
      <div
        className="text-[9px] tracking-[0.2em] uppercase origin-left -rotate-90 translate-y-[-56px] font-mono font-bold transition-colors duration-500"
        style={{
          whiteSpace: 'nowrap',
          color: isLightBackground ? 'rgba(0, 0, 0, 0.35)' : 'rgba(255, 255, 255, 0.35)'
        }}
      >
        TELEMETRY_TIMELINE
      </div>

      <div className="flex flex-col space-y-2 relative py-3 items-center">
        {/* Full track guideline */}
        <div
          className="absolute h-full w-[1.5px] left-1/2 -translate-x-1/2 z-0 transition-colors duration-500"
          style={{
            backgroundColor: isLightBackground ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.06)'
          }}
        />

        {/* Live scroll progress indicator */}
        <div
          className="absolute top-0 w-[1.5px] left-1/2 -translate-x-1/2 z-0 transition-all duration-100"
          style={{
            height: `${scrollProgress * 100}%`,
            backgroundColor: '#2dd4bf',
            boxShadow: '0 0 10px rgba(45, 212, 191, 0.5)'
          }}
        />

        {/* Section navigation nodes */}
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => handleClick(sec.id, e)}
              className="group relative flex items-center justify-center p-1.5"
            >
              {/* Timeline marker node */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-mono font-bold transition-all duration-300 z-10 border backdrop-blur-sm ${
                  isActive
                    ? 'bg-cyan-500 text-black border-cyan-500 scale-110 shadow-[0_0_15px_rgba(45,212,191,0.6)]'
                    : isLightBackground
                      ? 'text-black/35 hover:text-cyan-600 border-black/8 hover:border-cyan-500/50 bg-white/90'
                      : 'text-white/35 hover:text-cyan-400 border-white/8 hover:border-cyan-500/50 bg-black/85'
                }`}
              >
                {sec.label}
              </div>

              {/* Holographic Tooltip */}
              <span
                className={`absolute left-11 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-widest font-bold whitespace-nowrap shadow-2xl border translate-x-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 backdrop-blur-md ${
                  isLightBackground
                    ? 'bg-white/95 border-black/8 text-black'
                    : 'bg-black/95 border-white/8 text-white'
                }`}
              >
                {sec.label} — {sec.sub}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
