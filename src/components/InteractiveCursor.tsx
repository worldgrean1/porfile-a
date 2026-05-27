import { useEffect, useRef, useState } from 'react';

export default function InteractiveCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Hidden on touchscreen mobile devices
    if (window.matchMedia('(max-width: 1024px)').matches) {
      return;
    }

    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    let hovered = false;

    setIsHidden(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .interactive-hover');
      const isNowHovered = !!isInteractive;
      if (isNowHovered !== hovered) {
        hovered = isNowHovered;
        setIsHovered(isNowHovered);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth physics ease for Cursor Ring and Cursor Dot
    let req: number;
    const animate = () => {
      // Ring trailing effect
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;

      // Dot immediate tracking
      dotPos.x += (mouse.x - dotPos.x) * 0.7;
      dotPos.y += (mouse.y - dotPos.y) * 0.7;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${hovered ? 1.7 : 1.0})`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
      }

      req = requestAnimationFrame(animate);
    };

    req = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(req);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Target Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-shadow duration-300 hidden lg:block"
        style={{
          boxShadow: isHovered ? '0 0 12px rgba(45, 212, 191, 0.6)' : 'none',
          backgroundColor: isHovered ? 'rgba(45, 212, 191, 0.08)' : 'transparent',
          borderColor: isHovered ? '#2dd4bf' : 'rgba(255, 255, 255, 0.4)',
        }}
      />
      {/* Core Center Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      />
    </>
  );
}
