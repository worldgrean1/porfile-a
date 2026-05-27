import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  scrollProgress: number;
  activeBgColor: string;
  activeTextColor: string;
}

export default function Header({ scrollProgress, activeBgColor, activeTextColor }: HeaderProps) {
  const [currentSectionLabel, setCurrentSectionLabel] = useState('Workspace');

  // Watch scroll to alter label status dynamically
  useEffect(() => {
    const handleScrollStatus = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;
      const sections = [
        { id: 'signin', label: '00 — System Entry' },
        { id: 'hero', label: '01 — Identity Gate' },
        { id: 'about', label: '02 — Identity Reveal' },
        { id: 'activation', label: '03 — Activation Unlock' },
        { id: 'manifesto', label: '04 — Manifesto' },
        { id: 'gamezone', label: '05 — Game Zone' },
        { id: 'process', label: '06 — Our Process' },
        { id: 'contact', label: '07 — Contact Us' },
        { id: 'signout', label: '08 — Exit Scene' }
      ];

      const renderedSpecs = sections
        .map(sec => {
          const el = document.getElementById(sec.id);
          if (el) {
            return {
              label: sec.label,
              top: el.getBoundingClientRect().top + window.scrollY
            };
          }
          return null;
        })
        .filter((sec): sec is NonNullable<typeof sec> => sec !== null)
        .sort((a, b) => a.top - b.top);

      let currentLabel = sections[0].label;
      for (const sec of renderedSpecs) {
        if (scrollPosition >= sec.top) {
          currentLabel = sec.label;
        } else {
          break;
        }
      }

      setCurrentSectionLabel(currentLabel);
    };

    window.addEventListener('scroll', handleScrollStatus, { passive: true });
    handleScrollStatus();
    return () => window.removeEventListener('scroll', handleScrollStatus);
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const elTop = el.getBoundingClientRect().top + window.scrollY;
      const offset = id === 'hero' ? 0 : elTop - 85;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 px-6 py-5 lg:px-16 flex justify-between items-center transition-all duration-500"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
        color: activeTextColor
      }}
    >
      <div className="flex items-center space-x-4">
        <span className="font-display font-bold text-xl tracking-wider text-white bg-black px-3 py-1 rounded-lg border border-white/10 shadow-lg backdrop-blur-sm" id="header-logo-badge">
          TL
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold transition-colors duration-500 hidden sm:inline-block"
          style={{ color: 'rgba(255, 255, 255, 0.55)' }}
        >
          TRANSLINK STUDIO — CREATIVE COLLECTIVE
        </span>
      </div>

      {/* Status displays + Hire CTA */}
      <div className="flex items-center space-x-6" id="header-cta-group">
        <div className="hidden xl:flex flex-col items-end text-[10px] uppercase tracking-wider font-mono">
          <span className="font-bold transition-colors" style={{ color: activeTextColor }}>
            SCROLL: {Math.round(scrollProgress * 100)}%
          </span>
          <span
            className="text-[8px] tracking-widest font-bold transition-colors duration-500"
            style={{ color: 'rgba(255, 255, 255, 0.35)' }}
          >
            SYS_COORD — {currentSectionLabel}
          </span>
        </div>

        <a
          href="#contact"
          onClick={(e) => handleNavClick('contact', e)}
          className="px-5 py-2.5 border font-mono font-bold tracking-widest text-[11px] uppercase rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-[1.03] backdrop-blur-sm hover:border-cyan-500/50"
          style={{
            borderColor: 'rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.02)',
            color: '#fff'
          }}
          id="hire-dial-btn"
        >
          <span style={{ color: '#fff' }}>WORK WITH US</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-500 stroke-[2.5]" />
        </a>
      </div>
    </header>
  );
}
