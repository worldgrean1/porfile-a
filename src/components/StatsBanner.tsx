import { useEffect, useState } from 'react';
import { ShieldAlert, RefreshCcw, Landmark, Monitor } from 'lucide-react';

export default function StatsBanner() {
  const [fps, setFps] = useState(60);
  const [windowRes, setWindowRes] = useState('1920x1080');

  useEffect(() => {
    const sizeUpdate = () => {
      setWindowRes(`${window.innerWidth}x${window.innerHeight}`);
    };
    window.addEventListener('resize', sizeUpdate);
    sizeUpdate();

    let lastTime = performance.now();
    let frames = 0;
    let animationId: number;

    const calcFps = () => {
      const now = performance.now();
      frames++;
      if (now > lastTime + 1000) {
        const calculatedFps = Math.min(60, Math.round((frames * 1000) / (now - lastTime)));
        setFps(calculatedFps);
        frames = 0;
        lastTime = now;
      }
      animationId = requestAnimationFrame(calcFps);
    };

    animationId = requestAnimationFrame(calcFps);

    return () => {
      window.removeEventListener('resize', sizeUpdate);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <footer className="w-full bg-black/95 backdrop-blur-sm border-t border-white/[0.04] py-10 px-8 lg:px-16 relative z-10 select-none">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Copyright branding */}
        <div className="flex flex-col md:items-start text-center md:text-left space-y-2 text-xs">
          <span className="text-white font-mono font-bold tracking-widest uppercase">
            © 2026 TRANSLINK CREATIVE STUDIO. ALL RIGHTS RESERVED.
          </span>
          <span className="text-white/35 text-[10px] font-mono tracking-wider">
            MULTIDISCIPLINARY TEAM — SOFTWARE · DESIGN · MOTION · GAME DEV · IMMERSIVE WEB
          </span>
        </div>

        {/* Live system telemetrics ticker strip */}
        <div className="flex flex-wrap md:justify-end gap-x-10 gap-y-4 font-mono text-[10px] text-white/35 uppercase justify-center">

          <div className="flex items-center gap-2.5">
            <Monitor className="w-4 h-4 text-cyan-500" />
            <span>RENDER_CAPS: GPU_ACCEL</span>
          </div>

          <div className="flex items-center gap-2.5">
            <RefreshCcw className="w-4 h-4 text-cyan-500 animate-spin" style={{ animationDuration: '5s' }} />
            <span>GL_FPS: <strong className="text-white font-bold">{fps} frames/sec</strong></span>
          </div>

          <div className="flex items-center gap-2.5">
            <Landmark className="w-4 h-4 text-cyan-500" />
            <span>COORDS_GRID: <strong className="text-white">{windowRes}</strong></span>
          </div>

          <div className="flex items-center gap-2 text-cyan-500 font-bold">
            <ShieldAlert className="w-4 h-4 text-cyan-500" />
            <span>SYS_CORE_SECURE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
