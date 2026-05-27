import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveCursor from './components/InteractiveCursor';

gsap.registerPlugin(ScrollTrigger);
import Header from './components/Header';
import SideNav from './components/SideNav';
import StatsBanner from './components/StatsBanner';
import ProjectionGrid from './components/ProjectionGrid';
import DynamicMetricGraphic from './components/DynamicMetricGraphic';
import { PROCESS_STEPS } from './data';

import { ArrowUpRight, Send, CircleCheck as CheckCircle, Mail, Plus, Sparkles, Fingerprint, Lock, Clock as Unlock, LogOut, ExternalLink, Github, Linkedin } from 'lucide-react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const wavePathRef = React.useRef<SVGPathElement>(null);
  const waveAmbientRef = React.useRef<SVGPathElement>(null);
  const waveSecondaryRef = React.useRef<SVGPathElement>(null);
  const phaseRadsRef = React.useRef<HTMLSpanElement>(null);
  const wavePhaseRef = React.useRef(0);
  
  // Custom contact state matching forms representation
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactType, setContactType] = useState('Kinetic Animation / GSAP Parallax');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Active color states based on scroll tracking
  const [activeBgColor, setActiveBgColor] = useState('#000000');
  const [activeTextColor, setActiveTextColor] = useState('#FFFFFF');
  const [hasScrolled, setHasScrolled] = useState(false);

  // Interactive Sign-in/out State
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [signInState, setSignInState] = useState<'idle' | 'scanning' | 'success'>('idle');

  // Trigger scanning kinetic animation
  const handleSignInClick = () => {
    if (signInState !== 'idle') return;
    setSignInState('scanning');
    
    // Animate scan-line
    gsap.fromTo('#signin-scan-line', 
      { top: '0%' },
      {
        top: '100%',
        duration: 1.2,
        repeat: 3,
        yoyo: true,
        ease: 'power1.inOut'
      }
    );

    // Pulse profile frame border with cyan glow
    gsap.fromTo('#signin-photo-frame',
      { borderColor: 'rgba(226, 74, 44, 0.4)', scale: 1 },
      {
        borderColor: '#2dd4bf',
        scale: 1.05,
        duration: 0.4,
        repeat: 5,
        yoyo: true,
        ease: 'power2.inOut'
      }
    );

    setTimeout(() => {
      setSignInState('success');
      setIsUserLoggedIn(true);

      // Success reveal transition
      gsap.fromTo('#signin-welcome-overlay',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }
      );
    }, 2400);
  };

  // Trigger digital exit wipe and reset scroll mapping
  const handleSignOutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    gsap.to('main', {
      opacity: 0.1,
      scale: 0.97,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsUserLoggedIn(false);
        setSignInState('idle');
        
        window.scrollTo({
          top: 0,
          behavior: 'instant' as any
        });

        gsap.to('main', {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: 'power2.out'
        });
      }
    });
  };

  // Kinetic Orchestration Wave State values for Section 01 Hero Visualizer
  const [kineticSpeed, setKineticSpeed] = useState(2.2);
  const [kineticAmplitude, setKineticAmplitude] = useState(30);
  const [kineticFriction, setKineticFriction] = useState(16);
  const [activePreset, setActivePreset] = useState<'liquid' | 'elastic' | 'monic'>('liquid');
  
  // Continuous waveform animation (direct DOM manipulation for performance)
  useEffect(() => {
    let animId: number;
    const tick = () => {
      wavePhaseRef.current = (wavePhaseRef.current + (kineticSpeed * 0.022)) % (Math.PI * 2);
      
      const p = wavePhaseRef.current;
      if (phaseRadsRef.current) {
        phaseRadsRef.current.textContent = `PHASE RADS ${p.toFixed(3)}`;
      }

      const generateD = (offset = 0) => {
        const points = [];
        const step = 4;
        for (let x = 0; x <= 400; x += step) {
          const envelope = Math.sin((x / 400) * Math.PI);
          const f = offset ? kineticFriction * 1.1 : kineticFriction;
          const a = offset ? kineticAmplitude * 0.72 : kineticAmplitude;
          const angle = (x / f) + p + offset;
          const y = 100 + a * Math.sin(angle) * envelope;
          points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }
        return `M 0,100 L ${points.join(' L ')}`;
      };

      if (wavePathRef.current) wavePathRef.current.setAttribute('d', generateD(0));
      if (waveAmbientRef.current) waveAmbientRef.current.setAttribute('d', `${generateD(0)} L 400,200 L 0,200 Z`);
      if (waveSecondaryRef.current) waveSecondaryRef.current.setAttribute('d', generateD(0.6));
      
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [kineticSpeed, kineticFriction, kineticAmplitude]);

  // All black backgrounds with unified theme
  useEffect(() => {
    const sectionsMap = [
      { id: 'signin',     color: '#000000', text: '#FFFFFF' }, // 00 - Pure black entry
      { id: 'hero',       color: '#000000', text: '#FFFFFF' }, // 01 - Black consistency
      { id: 'about',      color: '#000000', text: '#FFFFFF' }, // 02 - Black consistency
      { id: 'activation', color: '#000000', text: '#FFFFFF' }, // 03 - Black consistency
      { id: 'manifesto',  color: '#000000', text: '#FFFFFF' }, // 04 - Black consistency
      { id: 'gamezone',   color: '#000000', text: '#FFFFFF' }, // 05 - Black consistency
      { id: 'process',    color: '#000000', text: '#FFFFFF' }, // 06 - Black consistency
      { id: 'contact',    color: '#000000', text: '#FFFFFF' }, // 07 - Black consistency
      { id: 'signout',    color: '#000000', text: '#FFFFFF' }, // 08 - Black consistency
    ];


    const sectionsWithOffsets: { id: string; color: string; text: string; top: number; }[] = [];

    const recalculateOffsets = () => {
      sectionsWithOffsets.length = 0;
      for (const sec of sectionsMap) {
        const el = document.getElementById(sec.id);
        if (el) {
          sectionsWithOffsets.push({
            ...sec,
            top: el.getBoundingClientRect().top + window.scrollY
          });
        }
      }
      sectionsWithOffsets.sort((a, b) => a.top - b.top);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      setHasScrolled(scrollTop > 20);

      const triggerOffset = scrollTop + window.innerHeight * 0.45;
      let matchedBg = '#000000';
      let matchedText = '#FFFFFF';

      let activeSection = sectionsWithOffsets[0];
      for (const sec of sectionsWithOffsets) {
        if (triggerOffset >= sec.top) {
          activeSection = sec;
        } else {
          break;
        }
      }

      if (activeSection) {
        matchedBg = activeSection.color;
        matchedText = activeSection.text;
      }
      
      // Top and bottom safety fallbacks to avoid delayed changes on quick scrolling
      if (scrollTop < 40) {
        matchedBg = '#000000';
        matchedText = '#FFFFFF';
      } else if (scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 40) {
        matchedBg = '#FFFFFF';
        matchedText = '#000000';
      }

      setActiveBgColor(matchedBg);
      setActiveTextColor(matchedText);
    };

    recalculateOffsets();
    handleScroll();

    // Recalculate deep offsets on window resize and delayed after initial assets layout settlement
    window.addEventListener('resize', recalculateOffsets, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const layoutTimer = setTimeout(recalculateOffsets, 600);

    return () => {
      window.removeEventListener('resize', recalculateOffsets);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(layoutTimer);
    };
  }, []);

  // GSAP ScrollTrigger orchestrations for reveals, parallax, camera tracking, and sync
  useEffect(() => {
    // 1. Initial Hero Intro Animations
    const tlIntro = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.0 } });
    tlIntro.fromTo('#hero h1', 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, delay: 0.2 }
    );
    tlIntro.fromTo('#hero p', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0 }, 
      '-=0.7'
    );
    tlIntro.fromTo('#hero a, #hero .grid-cols-2 > div', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, stagger: 0.08 }, 
      '-=0.6'
    );
    tlIntro.fromTo('#hero-kinetic-card', 
      { opacity: 0, scale: 0.96 }, 
      { opacity: 1, scale: 1 }, 
      '-=0.8'
    );

    const isMobile = window.innerWidth <= 768;

    // Use gsap.context to manage and clean up all animations cleanly
    const ctx = gsap.context(() => {
      // 2. Sections Reveal Animations
      const sections = ['#signin', '#hero', '#about', '#activation', '#manifesto', '#gamezone', '#process', '#contact', '#signout'];
      
      sections.forEach((secId) => {
        const sec = document.querySelector(secId);
        if (!sec) return;

        // Parent container fade-in slide element trigger
        gsap.fromTo(sec, 
          { opacity: 0, y: isMobile ? 40 : 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sec,
              start: isMobile ? 'top 95%' : 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Child sub-elements (staggered reveals inside sections)
        const items = sec.querySelectorAll('h2, h3, p, form, blockquote, .grid > div, ul > li, .border-l > div');
        if (items.length > 0) {
          gsap.fromTo(items,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: isMobile ? 0.05 : 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sec,
                start: isMobile ? 'top 90%' : 'top 75%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });

      // 3. Cinematic Parallax and Camera Shifts (Desktop optimized)
      if (!isMobile) {
        // Hero visual parallax as we scroll down
        gsap.to('#hero-kinetic-card', {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });

        // About profile image parallax slide
        gsap.to('#about img', {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: '#about',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        // Background HUD Camera tracking effect
        gsap.to('#projection-grid-container', {
          scale: 1.05,
          rotation: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: 'main',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
          }
        });

        // Manifesto parallax effect
        const manifestoText = document.querySelectorAll('#manifesto p');
        manifestoText.forEach((p, i) => {
          gsap.to(p, {
            yPercent: (i + 1) * -10,
            ease: 'none',
            scrollTrigger: {
              trigger: '#manifesto',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          });
        });

        // Gamezone Sandbox Parallax
        gsap.to('#gamezone .group\\/sandbox', {
          yPercent: -20,
          rotation: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: '#gamezone',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        // Process Timeline Parallax
        const processSteps = document.querySelectorAll('#process .border-l > div');
        processSteps.forEach((step, i) => {
          gsap.fromTo(step, 
            { x: -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1
              }
            }
          );
        });

        // Contact Floating Coordinates Card Parallax
        gsap.to('#contact .lg\\:col-span-5 > div', {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });

        // Signout final float
        gsap.to('#signout h2', {
          yPercent: -30,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#signout',
            start: 'top 30%',
            end: 'bottom bottom',
            scrub: true
          }
        });

      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle contact submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSuccess(true);
      // Mailto fallback to ensure inquiries aren't lost silently
      window.location.href = `mailto:abebaw@abebawabebe.systems?subject=${encodeURIComponent(`Inquiry from ${contactName}: ${contactType}`)}&body=${encodeURIComponent(contactMessage + '\n\nFrom: ' + contactEmail)}`;
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setTimeout(() => setContactSuccess(false), 5000);
    }
  };

  const isLight = activeBgColor === '#FFFFFF';

  // Premium dark design token system - all black backgrounds
  const cardBgClass = 'bg-white/5 backdrop-blur-xl border-white/10 text-white shadow-2xl shadow-black/40';

  const cardBgStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(16px)'
  };

  const labelClass = 'text-white/40';
  const textDescClass = 'text-white/60';
  const titleClass = 'text-white';
  const borderClass = 'border-white/10';
  const selectClass = 'bg-black/80 border-white/15 text-white backdrop-blur-sm';
  const btnSecClass = 'bg-white/10 border-white/15 hover:bg-white/15 text-white';

  return (
    <div 
      className="bg-transition-element min-h-screen text-white font-sans antialiased relative selection:bg-neutral-800 selection:text-white pb-6"
      style={{ backgroundColor: activeBgColor, color: activeTextColor }}
    >


      {/* Screen scanline grid overlay layer */}
      <div className="scanlines" />

      {/* Projection HUD Coordinate Backdrop Grid */}
      <ProjectionGrid scrollProgress={scrollProgress} activeBgColor={activeBgColor} />

      {/* Interactive Custom Cursor */}
      <InteractiveCursor />

      {/* Top Floating Logo & Progress Navigation Header */}
      <Header 
        scrollProgress={scrollProgress} 
        activeBgColor={activeBgColor} 
        activeTextColor={activeTextColor} 
      />

      {/* Left fixed timeline navigation tracking the 10 design flow sections */}
      <SideNav 
        scrollProgress={scrollProgress} 
        activeBgColor={activeBgColor} 
        activeTextColor={activeTextColor} 
      />

      {/* Copy notification badge */}
      {copiedColor && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white text-xxs font-mono py-2.5 px-4 rounded-lg shadow-2xl flex items-center space-x-2 border border-white/10 animate-fade-in-up">
          <CheckCircle className="w-3.5 h-3.5 text-white" />
          <span className="tracking-wider uppercase">
            COPIED {copiedColor} ({
              copiedColor === 'S1 Onyx' ? '#000000' : 
              copiedColor === 'S2 Charcoal' ? '#1F1F1F' : 
              copiedColor === 'S3 Platinum' ? '#737373' : 
              copiedColor === 'S4 Paper' ? '#FFFFFF' : '#FFFFFF'
            }) TO CLIPBOARD
          </span>
        </div>
      )}

      {/* Main Container Layout */}
      <main className="relative z-10 w-full">

        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 xl:px-16 lg:pl-[140px] pt-32 pb-16 space-y-56">
            
            {/* 00 // INTERACTIVE SIGN-IN ENTRY SECTION */}
            <section id="signin" className="relative min-h-[100vh] flex flex-col justify-center items-center text-center py-20 scroll-mt-32">
              {/* Subtle gradient background overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent pointer-events-none" />

              {/* Top-Right HUD Coordinate Data */}
              <div className="absolute top-4 right-4 sm:right-0 text-right font-mono tracking-wider text-[10px] opacity-60 select-none hover:opacity-100 transition-opacity duration-300">
                <span className="block font-bold text-neutral-300">node_00</span>
                <span className="block text-[8px] text-neutral-600 uppercase tracking-widest mt-0.5">operational_bus_sync</span>
              </div>

              {/* Header Telemetry Badge */}
              <div className="space-y-3 mb-12">
                <span className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase font-bold flex items-center justify-center gap-2">
                  <Fingerprint className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  00 — TRANSLINK STUDIO IDENTITY ENTRY
                </span>
                <p className="text-[10px] font-mono uppercase text-neutral-500 tracking-widest font-light">
                  SECURE PORTAL VERIFICATION • CORE SCANNER ONLINE
                </p>
              </div>

              {/* Main Interactive Diamond & Text Group */}
              <div className="relative flex flex-col items-center">
                {/* Visual Handwritten Ink Accent Facsimile on the left */}
                <div className="absolute -left-16 sm:-left-32 top-8 select-none animate-[pulse_4s_ease-in-out_infinite] hidden sm:block">
                  <div className="relative rotate-[-12deg] z-10">
                    <span className="font-sans font-black text-teal-400 hover:text-teal-300 text-6xl tracking-tight transition-all block" style={{ fontFamily: '"Inter", sans-serif', fontWeight: 900 }}>
                      in
                    </span>
                    <div className="w-2 h-2 rounded-full bg-teal-400 absolute -top-1 -left-2 shadow-[0_0_8px_rgba(45,212,191,0.8)] animate-ping" />
                  </div>
                </div>

                {/* Rotating holographic halo background */}
                <div className="absolute w-80 h-80 rounded-full border border-white/[0.03] animate-spin-slow-cw pointer-events-none flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full border border-dashed border-cyan-500/[0.08] animate-spin-normal-cw" />
                </div>

                {/* The Interactive Diamond Core Frame mapping Image 1 */}
                <div
                  id="signin-photo-frame"
                  onClick={handleSignInClick}
                  className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center cursor-pointer group select-none transition-all duration-500"
                  style={{
                    boxShadow: signInState === 'scanning' ? '0 0 40px rgba(45,212,191,0.5), inset 0 0 20px rgba(45,212,191,0.1)' : signInState === 'success' ? '0 0 40px rgba(45,212,191,0.3), inset 0 0 20px rgba(45,212,191,0.05)' : '0 0 60px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Glowing thin borders rotated at 45 degrees */}
                  <div className="absolute inset-0 border border-cyan-500/20 rotate-45 transform origin-center scale-102 transition-colors duration-300 group-hover:border-cyan-500/50" />
                  <div className="absolute inset-0 border border-cyan-500/8 rotate-45 transform origin-center scale-[1.08] transition-colors duration-300 group-hover:border-cyan-500/20" />

                  {/* Clipped Profile Photo */}
                  <div className="w-[166px] h-[166px] sm:w-[194px] sm:h-[194px] overflow-hidden rotate-45 border border-cyan-500/30 group-hover:border-cyan-400 bg-neutral-900 flex items-center justify-center transition-all duration-500">
                    <img
                      src="/src/assets/images/alex_profile_1779877330370.png"
                      alt="Abebaw Profile Entry Port"
                      className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] max-w-none object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      style={{ transform: 'rotate(-45deg) scale(1.3)' }}
                    />

                    {/* Scanner horizontal neon line mapped via GSAP */}
                    <div
                      id="signin-scan-line"
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(45,212,191,1)] z-30 pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{ top: '0%' }}
                    />

                    {/* Interactive state panels overlaying inside photo frame */}
                    {signInState === 'scanning' && (
                      <div className="absolute inset-0 bg-neutral-950/85 -rotate-44 flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm">
                        <span className="text-[12px] font-mono text-cyan-400 animate-pulse font-bold">SCANNING</span>
                        <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest mt-1 block">BIOMETRIC HANDSHAKE</span>
                      </div>
                    )}

                    {signInState === 'success' && (
                      <div id="signin-welcome-overlay" className="absolute inset-0 bg-cyan-500/15 -rotate-44 flex flex-col items-center justify-center p-4 text-center backdrop-blur-xs select-none">
                        <CheckCircle className="w-8 h-8 text-cyan-400 animate-bounce" />
                        <span className="text-[11px] font-mono text-white tracking-widest font-bold mt-1 uppercase">VERIFIED</span>
                        <span className="text-[7px] font-mono text-cyan-300 uppercase tracking-widest">ACCESS COORD SECURED</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Big wide typography title below diamond */}
                <div className="mt-10">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight uppercase leading-none text-white transition-all duration-300">
                    abebaw<span className="text-cyan-500 font-mono font-bold">.core</span>
                  </h2>
                </div>
              </div>

              {/* Status prompt log at bottom of verification row */}
              <div className="pt-6 font-mono max-w-xs mx-auto">
                {signInState === 'idle' && (
                  <div className="flex flex-col items-center gap-5">
                    <button
                      onClick={handleSignInClick}
                      className="group border border-cyan-500/25 hover:border-cyan-400 bg-cyan-950/10 text-cyan-300/90 hover:text-white px-6 py-3 rounded-xl text-[9px] tracking-widest uppercase font-bold transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2.5 mx-auto cursor-none shadow-[0_0_20px_rgba(45,212,191,0.08)] hover:shadow-[0_0_30px_rgba(45,212,191,0.2)] backdrop-blur-sm"
                    >
                      <Lock className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>Enter Experience</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsUserLoggedIn(true);
                        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[9px] font-mono text-neutral-600 hover:text-white uppercase tracking-widest border-b border-transparent hover:border-white/20 transition-all cursor-none"
                    >
                      Explore without signing in
                    </button>
                  </div>
                )}

                {signInState === 'scanning' && (
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    Checking credentials token
                  </div>
                )}

                {signInState === 'success' && (
                  <div className="space-y-3">
                    <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Workspace unlocked</span>
                    </div>

                    <button
                      onClick={() => {
                        const heroEl = document.getElementById('hero');
                        heroEl?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="font-mono text-[9px] uppercase tracking-widest text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 mx-auto font-bold animate-bounce cursor-none transition-colors"
                    >
                      Scroll down to journey <Plus className="w-3.5 h-3.5 rotate-90" />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* 01 // ENTRY / IDENTITY GATE */}
            <section id="hero" className="relative min-h-[100vh] flex flex-col justify-center items-start text-left py-20 scroll-mt-32">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center w-full">
                {/* Left Side: Editorial Typography */}
                <div className="md:col-span-7 space-y-8">
                  <span className="text-[11px] font-mono tracking-widest text-neutral-600 uppercase font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(45,212,191,0.7)]" />
                    01 ENTRY GATE
                  </span>

                  <div className="space-y-5">
                    <h1 className={`text-4xl sm:text-5xl lg:text-[4.8rem] font-display font-medium leading-[0.95] tracking-tight uppercase transition-colors duration-500 ${isLight ? 'text-black' : 'text-white'}`}>
                      We Craft Immersive <br />
                      <span className="text-neutral-500 normal-case text-2xl sm:text-4xl lg:text-[2.8rem] block mt-3 font-display">
                        Motion Environments
                      </span>
                    </h1>

                    <div className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-500 flex flex-wrap items-center gap-2 leading-relaxed">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse shrink-0" />
                      <span>Software • Design • Motion • Games • Web Experiences</span>
                    </div>
                  </div>

                  {/* Profile Photo and Name Identity Block */}
                  <div className="flex items-center gap-4 py-5 border-y border-white/[0.06] max-w-sm">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-500/30 bg-neutral-900 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(45,212,191,0.15)]">
                      <img
                        src="/src/assets/images/alex_profile_1779877330370.png"
                        alt="Abebaw Profile Entry Port"
                        className="w-14 h-14 object-cover grayscale hover:grayscale-0 transition-all"
                      />
                    </div>
                    <div className="font-mono">
                      <span className="text-neutral-600 text-[8px] uppercase tracking-widest block font-bold">IDENTITY CONFIRMED</span>
                      <span className="text-base font-display font-bold block text-white">Abebaw Abebe</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => {
                        setIsUserLoggedIn(true);
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold tracking-widest text-[10px] uppercase rounded-xl flex items-center gap-2 transition-all shadow-[0_8px_30px_rgba(45,212,191,0.3)] hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(45,212,191,0.4)] cursor-none"
                    >
                      <span>Enter Experience</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Micro Motion Text Loop under CTA */}
                  <div className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest space-y-1.5 pt-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-500 rounded-full animate-ping" />
                      <span>"Scroll to activate experience"</span>
                    </div>
                    <div>"Motion is the interface"</div>
                    <div>"Interaction begins with movement"</div>
                  </div>
                </div>

                {/* Right Side: Interactive Kinetic choreography console */}
                <div className="md:col-span-5 relative" id="hero-kinetic-card">
                  <div className={`relative group overflow-hidden rounded-3xl border transition-all duration-500 p-6 ${isLight ? 'border-black/8 bg-white/70 backdrop-blur-xl shadow-2xl shadow-black/5' : 'border-white/[0.06] bg-white/[0.03] backdrop-blur-sm'}`}>
                    <div className="space-y-5 relative">
                      <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-neutral-600 uppercase font-bold">
                        <span>SYSTEM CHOREOGRAM</span>
                        <span ref={phaseRadsRef} className="text-cyan-500">PHASE RADS 0.000</span>
                      </div>

                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/95 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner">
                        <div className="absolute inset-0 pointer-events-none opacity-12">
                          <svg className="w-full h-full text-white" stroke="currentColor" strokeWidth="0.5" fill="none">
                            <line x1="0" y1="100" x2="400" y2="100" />
                            <line x1="100" y1="0" x2="100" y2="200" strokeDasharray="2,2" />
                            <line x1="200" y1="0" x2="200" y2="200" />
                            <line x1="300" y1="0" x2="300" y2="200" strokeDasharray="2,2" />
                            <circle cx="200" cy="100" r="60" strokeDasharray="3,3" />
                          </svg>
                        </div>

                        <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 400 200" fill="none">
                          <path
                            ref={waveAmbientRef}
                            d="M 0,100 L 400,100 L 400,200 L 0,200 Z"
                            fill="url(#wave-gradient)"
                            className="opacity-20 transition-all"
                          />
                          <path
                            ref={wavePathRef}
                            d="M 0,100 L 400,100"
                            stroke={isLight ? '#34d399' : '#2dd4bf'}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            ref={waveSecondaryRef}
                            d="M 0,100 L 400,100"
                            stroke="#f43f5e"
                            strokeWidth="1"
                            strokeDasharray="2,3"
                            className="opacity-60"
                          />
                          <defs>
                            <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="1" />
                              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>

                        <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/85 px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                          <span className="font-mono text-[8px] text-cyan-400 font-bold uppercase tracking-wider">LIVE RENDER</span>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2 text-left">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className={`${isLight ? 'text-black/65' : 'text-white/55'} font-bold`}>KINETIC VELOCITY : {kineticSpeed.toFixed(1)}x</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={kineticSpeed}
                          onChange={(e) => setKineticSpeed(parseFloat(e.target.value))}
                          className="w-full accent-cyan-500 h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 02 // IDENTITY REVEAL SECTION */}
            <section id="about" className="relative min-h-[100vh] flex flex-col justify-center space-y-12 text-left scroll-mt-32">
              <div className="space-y-5">
                <span className="text-[11px] font-mono tracking-widest text-neutral-600 uppercase font-bold block">
                  02 IDENTITY REVEAL
                </span>
                <h2 className={`text-3xl sm:text-5xl font-display font-medium tracking-tight uppercase leading-[1.1] transition-colors duration-500 ${isLight ? 'text-black' : 'text-white'}`}>
                  We are builders of <br />digital motion worlds.
                </h2>
                <p className={`text-sm sm:text-base max-w-2xl font-light leading-relaxed transition-colors duration-500 ${isLight ? 'text-black/65' : 'text-white/45'}`}>
                  We are a multidisciplinary team combining software engineering, design, motion graphics, game development, and immersive web experiences. Our focus is not websites — we build living systems that respond, move, and evolve with interaction.
                </p>
              </div>

              {/* Role List (animated reveal) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 pt-2">
                {[
                  'Software Engineer',
                  'Graphic Designer',
                  'Motion Graphics Artist',
                  'Game Developer',
                  'Immersive Web Designer'
                ].map((role, i) => (
                  <div
                    key={i}
                    className={`p-6 border rounded-2xl hover:border-cyan-500/40 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between aspect-square sm:aspect-auto backdrop-blur-sm ${
                      isLight ? 'border-black/8 bg-white/75 text-black shadow-xl shadow-black/3' : 'border-white/[0.06] bg-white/[0.03] text-white'
                    }`}
                  >
                    <span className="font-mono text-[9px] text-neutral-600 block mb-6 uppercase tracking-wider">ROLE_0{i + 1}</span>
                    <span className="font-display font-bold text-xs uppercase tracking-wide">{role}</span>
                  </div>
                ))}
              </div>

              <div className={`flex justify-between items-center text-[10px] font-mono tracking-wider uppercase pt-6 border-t transition-colors duration-500 ${isLight ? 'border-black/8 text-black/40' : 'border-white/[0.06] text-white/30'}`}>
                <span>15+ YEARS OF EXPERIENCE SHAPING DIGITAL EXPERIENCES INTO STORIES</span>
                <span>SYSTEM STATUS: CONCEPTS_VERIFIED</span>
              </div>
            </section>

            {/* 03 // SCROLL ACTIVATION / TRANSITION MOMENT */}
            <section id="activation" className="relative min-h-[100vh] py-20 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02] text-center shadow-2xl scroll-mt-32 overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-teal-500/[0.02] animate-pulse-glow pointer-events-none" />

              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest block mb-3 font-bold">SCROLL ACTIVATION</span>
              <h3 className="text-2xl sm:text-4xl font-display font-medium uppercase text-white tracking-widest leading-relaxed">
                Identity confirmed.
              </h3>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-3 px-6 max-w-md font-bold">
                Initializing immersive environment…
              </p>

              {/* System style logs */}
              <div className="mt-8 p-5 bg-black/60 backdrop-blur-sm border border-white/[0.06] rounded-2xl text-left font-mono text-[9px] text-neutral-600 space-y-2 w-72">
                <div className="flex justify-between">
                  <span>Loading motion engine…</span>
                  <span className="text-cyan-400 font-bold">OK</span>
                </div>
                <div className="flex justify-between">
                  <span>Syncing experience layers…</span>
                  <span className="text-cyan-400 font-bold">OK</span>
                </div>
                <div className="flex justify-between">
                  <span>Unlocking scroll field…</span>
                  <span className="text-cyan-500 font-bold animate-pulse">UNLOCKED</span>
                </div>
              </div>

              <div className="w-2 h-8 bg-cyan-500 animate-bounce mt-6 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.6)]" />
            </section>

            {/* 04 // MANIFESTO SECTION */}
            <section id="manifesto" className="relative min-h-[100vh] flex flex-col justify-center space-y-12 sm:space-y-16 text-left scroll-mt-32 px-6 sm:px-12">
              <div className="space-y-4 sm:space-y-6 max-w-4xl">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-500 uppercase font-bold">
                  04 MANIFESTO
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white tracking-tight uppercase leading-tight sm:leading-[1.1]">
                  We don't design pages. <br className="hidden sm:block" />We design <span className="text-cyan-400">experiences.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 pt-2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/30 transition-all duration-300">
                    <p className="text-sm sm:text-base leading-relaxed text-white/75 font-light">
                      Every interface is a story. Every scroll is a timeline. Every interaction is a response from the system itself.
                    </p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/30 transition-all duration-300">
                    <p className="text-sm sm:text-base leading-relaxed text-white/75 font-light">
                      We believe websites should not be static — they should behave like living environments shaped by motion, depth, and human interaction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 sm:mt-12">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 rounded-2xl sm:rounded-[2.5rem] blur-2xl opacity-50" />
                <div className="relative border border-cyan-500/20 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl sm:rounded-[2.5rem] p-8 sm:p-16 md:p-24 text-center shadow-2xl overflow-hidden">
                  <span className="font-mono text-[9px] sm:text-[10px] text-cyan-500/60 uppercase tracking-widest mb-6 sm:mb-8 block font-bold">CORE PHILOSOPHY</span>
                  <blockquote className="font-display font-bold text-xl sm:text-2xl md:text-4xl text-cyan-300 tracking-normal leading-relaxed">
                    "Motion is not decoration — <br />it is <span className="text-cyan-400">communication.</span>"
                  </blockquote>
                </div>
              </div>
            </section>

            {/* 05 // INTERACTIVE GAME ZONE */}
            <section id="gamezone" className="relative min-h-[100vh] flex flex-col justify-center space-y-12 sm:space-y-16 text-left scroll-mt-32 px-6 sm:px-12">
              <div className="space-y-4 sm:space-y-6 max-w-4xl">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-500 uppercase font-bold block">
                  05 INTERACTIVE SYSTEMS
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tight uppercase leading-tight sm:leading-[1.1] text-white">
                  Game Physics & <span className="text-cyan-400">Interactive Zone</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg max-w-3xl font-light leading-relaxed text-white/70">
                  We build interactive environments where users are not viewers — they are participants in motion.
                </p>
              </div>

              {/* Interactive Feature Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { title: 'Scroll-Controlled Movement', desc: 'Kinetic systems that respond to scroll velocity' },
                  { title: 'Hover Physics Interactions', desc: 'Real-time physics responding to cursor position' },
                  { title: 'Mini Simulation UI', desc: 'Live particle systems and dynamic renders' },
                  { title: 'Reactive Environments', desc: 'Adaptive interfaces that breathe with interaction' }
                ].map((item, i) => (
                  <div key={i} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-lg sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-2xl p-5 sm:p-8 hover:border-cyan-500/40 transition-all duration-300 group-hover:bg-white/8">
                      <div className="flex items-start gap-3 sm:gap-4 mb-2 sm:mb-3">
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-cyan-500 rounded-full mt-1 flex-shrink-0 shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
                        <h3 className="text-base sm:text-lg font-display font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-white/60 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Sandbox */}
              <div className="relative mt-6 sm:mt-8">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-2xl sm:rounded-[2rem] blur-2xl opacity-40" />
                <div className="relative border border-cyan-500/20 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 md:p-12 overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
                    <div className="flex-1 w-full">
                      <span className="text-[9px] sm:text-[10px] font-mono text-cyan-500/70 uppercase block font-bold tracking-widest mb-3 sm:mb-4">Interactive Sandbox</span>
                      <div className="rounded-lg sm:rounded-xl h-40 sm:h-48 bg-black/80 flex items-center justify-center relative group/sandbox cursor-pointer border border-white/10 overflow-hidden">
                        <span className="font-mono text-[8px] sm:text-[9px] text-cyan-400 uppercase animate-pulse tracking-widest text-center px-4">HOVER TO TRIGGER BOUNCE</span>

                        <div className="absolute top-1/2 left-1/4 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-cyan-400 rounded-full group-hover/sandbox:scale-150 group-hover/sandbox:-translate-y-6 transition-all duration-300 shadow-[0_0_12px_rgba(45,212,191,0.8)]" />
                        <div className="absolute top-1/3 left-1/2 w-3 sm:w-3.5 h-3 sm:h-3.5 bg-cyan-400 rounded-full group-hover/sandbox:translate-y-8 transition-all duration-300 shadow-[0_0_12px_rgba(45,212,191,0.8)]" />
                        <div className="absolute top-1/2 left-3/4 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-cyan-400 rounded-full group-hover/sandbox:scale-125 transition-all duration-300 shadow-[0_0_12px_rgba(45,212,191,0.8)]" />
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      <p className="font-display text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Every Interaction Counts</p>
                      <p className="font-mono text-xs sm:text-sm text-white/70 leading-relaxed">
                        Motion physics respond in real-time to your presence. Scroll triggers cascades. Hover creates ripples. Everything is alive and reactive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center text-[9px] sm:text-[10px] font-mono tracking-wider uppercase pt-6 sm:pt-8 border-t border-white/10 text-white/40">
                <span>SIMULATOR STATUS: LOADED</span>
                <span>PHYSICS ENGINE: ACCELERATED_GPU</span>
              </div>
            </section>

            {/* 06 // PROCESS SECTION */}
            <section id="process" className="relative min-h-[100vh] flex flex-col justify-center space-y-16 sm:space-y-20 text-left scroll-mt-32 px-6 sm:px-12">
              <div className="space-y-4 sm:space-y-6 max-w-4xl">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-500 uppercase font-bold block">
                  06 OUR PROCESS
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tight uppercase leading-tight sm:leading-[1.1] text-white">
                  From Idea to <span className="text-cyan-400">Experience</span>
                </h2>
                <p className="text-sm sm:text-base text-white/60 font-light max-w-3xl leading-relaxed">
                  A structured journey from concept to delivery, where each phase builds on precision and creative excellence.
                </p>
              </div>

              {/* Clean Vertical Timeline */}
              <div className="relative w-full pt-8 sm:pt-12">
                {/* Timeline line - centered on mobile, left-offset on desktop */}
                <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px sm:w-1 bg-gradient-to-b from-cyan-500/30 via-cyan-500/50 to-cyan-500/30" />

                {/* Timeline steps */}
                <div className="space-y-12 sm:space-y-16 md:space-y-20 relative">
                  {PROCESS_STEPS.map((step, idx) => (
                    <div key={idx} className="flex gap-6 sm:gap-0">
                      {/* Mobile: Always on right | Desktop: Alternating */}
                      <div className={`flex-1 flex flex-col justify-center ${idx % 2 === 1 ? 'sm:pr-12 md:pr-16' : 'sm:text-right sm:pr-12 md:pr-16'}`}>
                        <span className="text-[9px] sm:text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold block mb-2 sm:mb-3">
                          {step.number} — {step.title}
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-3 sm:mb-4 leading-tight">
                          {step.description}
                        </h3>

                        {/* Deliverables - responsive wrapping */}
                        <div className={`flex flex-wrap gap-2 sm:gap-2.5 ${idx % 2 === 1 ? 'justify-start' : 'sm:justify-end justify-start'}`}>
                          {step.deliverables.map((del, k) => (
                            <span key={k} className="text-[8px] sm:text-[9px] font-mono px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200 whitespace-nowrap">
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Timeline node - fixed position */}
                      <div className="flex justify-center items-start pt-1 sm:pt-0 flex-shrink-0 w-8 sm:w-auto">
                        <div className="relative">
                          {/* Glow effect */}
                          <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-lg w-8 h-8" />
                          {/* Node */}
                          <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-[0_0_20px_rgba(45,212,191,0.8)] flex items-center justify-center z-10 flex-shrink-0">
                            <div className="w-3 h-3 rounded-full bg-black" />
                          </div>
                        </div>
                      </div>

                      {/* Empty space for desktop alternating layout */}
                      <div className="hidden sm:flex flex-1 sm:pl-12 md:pl-16" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center text-[9px] sm:text-[10px] font-mono tracking-widest uppercase pt-8 sm:pt-12 border-t border-white/10 text-white/40">
                <span className="order-2 sm:order-1">ROADMAP CALIBRATED: OK</span>
                <span className="text-cyan-400 font-bold order-1 sm:order-2">IDEA → MOTION → EXPERIENCE</span>
              </div>
            </section>

            {/* 07 // CONTACT / COLLABORATION */}
            <section id="contact" className="relative min-h-[100vh] flex flex-col justify-center space-y-12 sm:space-y-16 text-left pt-8 sm:pt-12 font-sans scroll-mt-32 px-6 sm:px-12">
              <div className="space-y-4 sm:space-y-6 max-w-4xl">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-500 uppercase font-bold">
                  07 INQUIRY COORDINATES
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tight uppercase leading-tight sm:leading-[1.1] text-white">
                  Let's Build Something <span className="text-cyan-400">Immersive</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg max-w-3xl font-light leading-relaxed text-white/70">
                  We collaborate on digital experiences that blend motion, interaction, and engineering into unified systems.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start w-full">
                <div className="lg:col-span-7 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-[2rem] blur-2xl opacity-40" />
                  <div className="relative border border-cyan-500/20 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-[2rem] p-10 sm:p-14 overflow-hidden shadow-2xl">
                  {contactSuccess ? (
                    <div className="py-16 text-center space-y-5 animate-fade-in">
                      <div className="w-20 h-20 bg-cyan-500/15 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(45,212,191,0.2)]">
                        <CheckCircle className="w-10 h-10 text-cyan-500" />
                      </div>
                      <h4 className={`font-display font-bold text-2xl ${isLight ? 'text-black' : 'text-white'}`}>Inquiry Lodged</h4>
                      <p className={`text-sm max-w-md mx-auto leading-relaxed ${isLight ? 'text-black/55' : 'text-white/55'}`}>
                        My telemetry routing has logged your coordinates submission. Abebaw Abebe will handshake with you within 24 standard business hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-7">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="E.G., ALEXANDER SHAW"
                          className="w-full bg-black/95 border border-white/[0.08] px-6 py-4 rounded-xl text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="NAME@ORGANIZATION.COM"
                          className="w-full bg-black/95 border border-white/[0.08] px-6 py-4 rounded-xl text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                      </div>

                      <select
                        value={contactType}
                        onChange={(e) => setContactType(e.target.value)}
                        className="w-full bg-black/95 border border-white/[0.08] px-6 py-4 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer"
                      >
                        <option>GSAP ScrollTrigger Kinetics</option>
                        <option>Full Client Application Layout</option>
                        <option>Custom Shader Math Optimization</option>
                        <option>Consultation Workshop</option>
                      </select>

                      <textarea
                        required
                        rows={5}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Describe your project..."
                        className="w-full bg-black/95 border border-white/[0.08] px-6 py-4 rounded-xl text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 resize-none transition-all"
                      />

                      <button
                        type="submit"
                        className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold tracking-widest text-xs uppercase rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-[0_8px_30px_rgba(45,212,191,0.3)] hover:shadow-[0_12px_40px_rgba(45,212,191,0.4)] hover:scale-[1.02] cursor-pointer"
                      >
                        <span>Send Message</span>
                        <Send className="w-4 h-4 stroke-[2]" />
                      </button>
                    </form>
                  )}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-5 w-full lg:pt-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-[2rem] blur-xl opacity-40" />
                    <div className="relative p-10 rounded-[2rem] space-y-6 font-mono text-[10px] border border-white/10 bg-white/5 backdrop-blur-xl">
                      <span className="uppercase block font-bold tracking-widest mb-8 text-xs text-cyan-400">Contact Coordinates</span>
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="text-white/50">Email:</span>
                        <a href="mailto:abebaw@abebawabebe.systems" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">abebaw@abebawabebe.systems</a>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="text-white/50">Collaboration:</span>
                        <span className="font-medium text-white/80">Open for projects</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/50">Response time:</span>
                        <span className="font-medium text-white/80">24–48 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 08 // EXIT / SIGN OUT SCENE */}
            <section id="signout" className="relative min-h-[100vh] flex flex-col justify-center py-24 scroll-mt-32 space-y-20">
              <div className="absolute top-4 right-4 sm:right-0 text-right font-mono tracking-wider text-[10px] opacity-60 select-none hover:opacity-100 transition-opacity duration-300">
                <span className="block font-bold text-neutral-400">node_99</span>
                <span className="block text-[8px] text-neutral-600 uppercase tracking-widest mt-0.5">operational_bus_sync</span>
              </div>

              <div className="flex justify-center select-none py-3">
                <div className="w-7 h-7 border-2 border-cyan-500/40 rotate-45 flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(45,212,191,0.3)]">
                  <div className="w-3 h-3 bg-cyan-500" />
                </div>
              </div>

              <div className="text-center space-y-8">
                <div className="space-y-3">
                  <span className="font-mono text-[9px] text-cyan-500 uppercase font-bold tracking-widest block">Session ending…</span>
                  <p className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest">Detaching experience layer</p>
                </div>

                <h2
                  onClick={handleSignOutClick}
                  className={`text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter uppercase transition-colors duration-500 select-none cursor-pointer flex items-center justify-center gap-5 group ${titleClass} hover:text-cyan-600`}
                  title="Click to sign out of the journey"
                >
                  <span className="transition-transform group-hover:scale-[0.98]">See you soon</span>
                  <LogOut className="w-9 h-9 sm:w-12 sm:h-12 text-cyan-500 group-hover:text-cyan-600 transition-all group-hover:translate-x-4 duration-300" />
                </h2>

                <p className={`text-xs sm:text-sm font-mono tracking-widest uppercase max-w-2xl mx-auto leading-relaxed ${textDescClass}`}>
                  "See you in the next motion"
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-5 pt-8">
                <a
                  href="mailto:abebaw@abebawabebe.systems"
                  className="px-7 py-3.5 border border-black/15 hover:border-cyan-500 hover:text-cyan-600 hover:bg-cyan-500/5 font-mono text-[11px] tracking-widest uppercase rounded-full transition-all duration-300 cursor-none flex items-center gap-2.5 backdrop-blur-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact Us
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 border border-black/15 hover:border-neutral-800 hover:text-neutral-800 hover:bg-neutral-800/5 font-mono text-[11px] tracking-widest uppercase rounded-full transition-all duration-300 cursor-none flex items-center gap-2.5 backdrop-blur-sm"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 border border-black/15 hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/5 font-mono text-[11px] tracking-widest uppercase rounded-full transition-all duration-300 cursor-none flex items-center gap-2.5 backdrop-blur-sm"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </div>

              <div className={`flex justify-between items-center text-[10px] font-mono tracking-wider uppercase pt-20 border-t transition-colors duration-500 ${isLight ? 'border-black/8 text-black/35' : 'border-white/[0.06] text-white/30'}`}>
                <span>© 2026 TRANSLINK STUDIO. All rights reserved.</span>
                <span>SYSTEM STATUS: CORE_DISCONNECT</span>
              </div>
            </section>

        </div>

      </main>

      {/* Persistent Floating Conversion CTA */}
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`fixed bottom-8 right-8 z-50 px-6 py-3.5 rounded-full font-mono font-bold text-[10px] tracking-widest uppercase flex items-center gap-2.5 transition-all duration-500 shadow-2xl cursor-none lg:bottom-12 lg:right-12 backdrop-blur-md ${
          scrollProgress > 0.15 && !copiedColor
            ? 'translate-y-0 opacity-100'
            : 'translate-y-20 opacity-0 pointer-events-none'
        } ${isLight ? 'bg-black text-white hover:scale-105 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]' : 'bg-cyan-500 text-black hover:scale-105 hover:shadow-[0_12px_30px_rgba(45,212,191,0.5)]'}`}
      >
        <span>Start a Project</span>
        <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
      </a>

      {/* Persistent Live system feedback footer banner */}
      <StatsBanner />
    </div>
  );
}
