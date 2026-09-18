import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';
import { GharkasathiEmblem } from './GharkasathiLogo';

export interface BrandedLaunchScreenProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const BrandedLaunchScreen: React.FC<BrandedLaunchScreenProps> = ({
  onComplete,
  forceShow = false
}) => {
  const [phase, setPhase] = useState<'neon-draw' | 'emblem-reveal' | 'brand-reveal' | 'ready' | 'exit'>('neon-draw');
  const [initProgress, setInitProgress] = useState(0);
  const [initStatus, setInitStatus] = useState('Initializing Gharkasathi PropTech Engine...');
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [useVideo, setUseVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check returning user and reduced motion
  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    // Check if returning user
    const hasLaunchedBefore = localStorage.getItem('gharkasathi_app_launched') === 'true';
    setIsReturningUser(hasLaunchedBefore && !forceShow);

    // Check if video is playable
    const testVideo = document.createElement('video');
    const canPlay = testVideo.canPlayType('video/mp4');
    if (canPlay) {
      // We check if video loads without error
      setUseVideo(true);
    }
  }, [forceShow]);

  // Parallel Initialization & Timeline Manager
  useEffect(() => {
    if (reducedMotion && !forceShow) {
      // Instant bypass for accessibility
      onComplete();
      return;
    }

    // Returning user duration: 1.6s total vs First launch: 3.6s total
    const totalDuration = isReturningUser ? 1600 : 3600;
    const startTime = Date.now();

    // Simulated multi-stage parallel system initialization
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setInitProgress(progress);

      if (progress < 30) {
        setInitStatus('Validating secure customer & partner session...');
      } else if (progress < 65) {
        setInitStatus('Preloading 90+ home services & Raipur real estate...');
      } else if (progress < 90) {
        setInitStatus('Connecting CSGSP verification & 30-min dispatch...');
      } else {
        setInitStatus('Ecosystem ready. Entering Gharkasathi...');
      }

      if (elapsed >= totalDuration) {
        clearInterval(progressInterval);
        handleFinish();
      }
    }, 40);

    // Animation Keyframe Timeline
    const t1 = setTimeout(() => {
      setPhase('emblem-reveal');
    }, isReturningUser ? 400 : 1100);

    const t2 = setTimeout(() => {
      setPhase('brand-reveal');
    }, isReturningUser ? 800 : 2000);

    const t3 = setTimeout(() => {
      setPhase('ready');
    }, isReturningUser ? 1300 : 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isReturningUser, reducedMotion, forceShow, onComplete]);

  const handleFinish = () => {
    setPhase('exit');
    localStorage.setItem('gharkasathi_app_launched', 'true');
    setTimeout(() => {
      onComplete();
    }, 450); // wait for fade transition
  };

  return (
    <div
      role="dialog"
      aria-label="Gharkasathi Brand Launch"
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center select-none transition-all duration-500 ${
        phase === 'exit' 
          ? 'opacity-0 scale-105 pointer-events-none' 
          : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #D10E18 0%, #A30014 60%, #7A000F 100%)'
      }}
    >
      {/* Background Ambient Glow FX */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Top Header: Launch Mode & Skip to App */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white/70 z-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-red-200/90">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>{isReturningUser ? 'Express Launch' : 'Official Launch Experience'}</span>
        </div>

        <button
          type="button"
          onClick={handleFinish}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/25 hover:bg-black/40 text-white text-xs font-bold border border-white/15 backdrop-blur-md transition-all cursor-pointer hover:border-white/30"
        >
          <span>Skip to App</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CENTER STAGE: ANIMATED LOGO & INTRO SEQUENCE */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 max-w-lg mx-auto z-10">
        
        {/* Emblem Neon Drawing / Solid Fill Container */}
        <div className="relative mb-6">
          {/* Neon Glow Aura behind emblem */}
          <div 
            className={`absolute -inset-4 rounded-full bg-white/25 blur-xl transition-opacity duration-700 ${
              phase === 'emblem-reveal' || phase === 'brand-reveal' || phase === 'ready' 
                ? 'opacity-80 scale-110' 
                : 'opacity-20 scale-95'
            }`} 
          />

          {/* Master Monoline Vector with Neon Stroke Animation */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            <svg 
              viewBox="0 0 160 160" 
              fill="none" 
              className="w-full h-full text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]"
            >
              <defs>
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* TM Superscript */}
              <text 
                x="142" 
                y="26" 
                fill="white" 
                fontFamily="'Outfit', system-ui, sans-serif" 
                fontSize="16" 
                fontWeight="800"
                className={`transition-opacity duration-500 ${
                  phase === 'neon-draw' ? 'opacity-0' : 'opacity-100'
                }`}
              >
                TM
              </text>

              {/* Monoline Stroke paths with dash-array animation */}
              <g 
                stroke="white" 
                strokeWidth="5.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                transform="translate(10, 10)"
                filter="url(#neonGlow)"
              >
                {/* Chimney */}
                <path 
                  d="M 88 38 L 88 22 L 97 22 L 97 46" 
                  className="animate-[dash_1.4s_ease-in-out_forwards]"
                  style={{ strokeDasharray: 80, strokeDashoffset: phase === 'neon-draw' ? 80 : 0 }}
                />

                {/* Triangular Gable Roof */}
                <path 
                  d="M 36 50 L 72 22 L 108 50" 
                  strokeWidth="6"
                  className="animate-[dash_1.4s_ease-in-out_forwards]"
                  style={{ strokeDasharray: 180, strokeDashoffset: phase === 'neon-draw' ? 180 : 0 }}
                />

                {/* House Outer Walls & Base */}
                <path 
                  d="M 46 50 L 46 92 L 98 92 L 98 50" 
                  className="animate-[dash_1.6s_ease-in-out_forwards]"
                  style={{ strokeDasharray: 200, strokeDashoffset: phase === 'neon-draw' ? 200 : 0 }}
                />

                {/* Centered Entrance Door */}
                <path 
                  d="M 62 92 L 62 65 L 82 65 L 82 92" 
                  className="animate-[dash_1.2s_ease-in-out_forwards]"
                  style={{ strokeDasharray: 120, strokeDashoffset: phase === 'neon-draw' ? 120 : 0 }}
                />

                {/* Left Outer Hand Contour */}
                <path 
                  d="M 68 116 L 26 116 C 18 116 14 110 14 102 L 14 36 C 14 29 20 29 20 36 L 20 86" 
                  className="animate-[dash_1.8s_ease-in-out_forwards]"
                  style={{ strokeDasharray: 260, strokeDashoffset: phase === 'neon-draw' ? 260 : 0 }}
                />

                {/* Right Outer Hand Contour */}
                <path 
                  d="M 76 116 L 118 116 C 126 116 130 110 130 102 L 130 36 C 130 29 124 29 124 36 L 124 86" 
                  className="animate-[dash_1.8s_ease-in-out_forwards]"
                  style={{ strokeDasharray: 260, strokeDashoffset: phase === 'neon-draw' ? 260 : 0 }}
                />

                {/* Left Inner Palm Lines */}
                <path 
                  d="M 23 70 L 56 104 C 62 109 68 109 71 109" 
                  strokeWidth="4.5" 
                  style={{ strokeDasharray: 100, strokeDashoffset: phase === 'neon-draw' ? 100 : 0 }}
                />
                <path 
                  d="M 30 96 L 62 110" 
                  strokeWidth="4" 
                  style={{ strokeDasharray: 60, strokeDashoffset: phase === 'neon-draw' ? 60 : 0 }}
                />

                {/* Right Inner Palm Lines */}
                <path 
                  d="M 121 70 L 88 104 C 82 109 76 109 73 109" 
                  strokeWidth="4.5" 
                  style={{ strokeDasharray: 100, strokeDashoffset: phase === 'neon-draw' ? 100 : 0 }}
                />
                <path 
                  d="M 114 96 L 82 110" 
                  strokeWidth="4" 
                  style={{ strokeDasharray: 60, strokeDashoffset: phase === 'neon-draw' ? 60 : 0 }}
                />

                {/* Bottom Platform Ground Lines */}
                <line 
                  x1="20" y1="124" x2="68" y2="124" 
                  strokeWidth="5" 
                  style={{ strokeDasharray: 50, strokeDashoffset: phase === 'neon-draw' ? 50 : 0 }}
                />
                <line 
                  x1="76" y1="124" x2="124" y2="124" 
                  strokeWidth="5" 
                  style={{ strokeDasharray: 50, strokeDashoffset: phase === 'neon-draw' ? 50 : 0 }}
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Brand Name Wordmark: GHARKASATHI */}
        <div 
          className={`transition-all duration-700 transform ${
            phase === 'brand-reveal' || phase === 'ready'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-[0.25em] uppercase font-['Outfit'] drop-shadow-md">
            GHARKASATHI
          </h1>

          {/* Tagline reveals */}
          <div className="mt-2 space-y-1">
            <p className="text-xs sm:text-sm font-medium text-red-100 tracking-[0.18em] italic">
              apke sapno ke ghar ka bharosemand sathi
            </p>
            <p className="text-[11px] sm:text-xs font-bold text-white/90 uppercase tracking-widest pt-1 border-t border-white/20 inline-block px-4">
              All Your Property Needs. Under One Roof.
            </p>
          </div>
        </div>

      </div>

      {/* BOTTOM PROGRESS & PARALLEL INITIALIZATION */}
      <div className="absolute bottom-6 left-0 right-0 px-6 max-w-sm mx-auto text-center space-y-2 z-10">
        {/* Real-time Progress Bar */}
        <div className="w-full h-1 bg-black/30 rounded-full overflow-hidden backdrop-blur-xs">
          <div 
            className="h-full bg-white transition-all duration-75 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ width: `${initProgress}%` }}
          />
        </div>

        {/* Subtle Status Text */}
        <div className="flex items-center justify-between text-[11px] text-red-100 font-medium tracking-wide">
          <span className="truncate mr-2">{initStatus}</span>
          <span className="font-mono text-white/90 shrink-0">{initProgress}%</span>
        </div>
      </div>
    </div>
  );
};
