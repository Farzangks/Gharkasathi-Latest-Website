import React, { useState, useEffect } from 'react';
import { Sparkles, Tag, ArrowRight, Check, Clock, Flame, Gift } from 'lucide-react';

interface FestivalOffer {
  id: string;
  festivalName: string;
  badge: string;
  tagline: string;
  discount: string;
  couponCode: string;
  icon: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
}

export const FESTIVAL_PRESETS: FestivalOffer[] = [
  {
    id: 'ganesh-utsav',
    festivalName: 'Ganesh Utsav Special',
    badge: 'Bappa Ki Kripa Offer',
    tagline: 'Ghar Sajayein Bappa Ke Aagman Par! Free 3D Modular Kitchen Design + ₹500 OFF',
    discount: 'FLAT ₹500 OFF',
    couponCode: 'BAPPA500',
    icon: '🌺',
    bgGradient: 'from-amber-500 via-rose-600 to-red-600',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-100',
    accentColor: 'bg-amber-400 text-stone-950',
  },
  {
    id: 'diwali-dhamaka',
    festivalName: 'Diwali Shubh Labh',
    badge: 'Diwali Deepotsav',
    tagline: 'Deep Cleaning, Painting & Waterproofing at Guaranteed Lowest Rates in Raipur & NCR',
    discount: 'UPTO 30% OFF',
    couponCode: 'SHUBHLABH',
    icon: '🪔',
    bgGradient: 'from-red-600 via-rose-700 to-amber-600',
    borderColor: 'border-yellow-400',
    textColor: 'text-yellow-100',
    accentColor: 'bg-yellow-400 text-stone-950',
  },
  {
    id: 'navratri-otsav',
    festivalName: 'Navratri Mahotsav',
    badge: '9 Din 9 Offers',
    tagline: 'Dandiya Season Ready: Instant AC Service & Sofa Deep Cleaning in 30 Mins',
    discount: 'FLAT ₹350 OFF',
    couponCode: 'NAVRATRI9',
    icon: '✨',
    bgGradient: 'from-rose-600 via-red-600 to-orange-500',
    borderColor: 'border-orange-300',
    textColor: 'text-orange-100',
    accentColor: 'bg-orange-300 text-stone-950',
  },
  {
    id: 'express-blinkit',
    festivalName: 'Express Blinkit Mode',
    badge: '30-Min On-Duty',
    tagline: 'Verified Gharkasathi Professional at your doorstep within 30 Minutes',
    discount: 'FREE VISITATION',
    couponCode: 'EXPRESS30',
    icon: '⚡',
    bgGradient: 'from-red-600 via-red-700 to-stone-900',
    borderColor: 'border-red-400',
    textColor: 'text-red-100',
    accentColor: 'bg-white text-red-700',
  }
];

export const FestiveBanner: React.FC = () => {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  // Countdown timer for Blinkit-style FOMO
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto rotate offers every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOfferIndex(prev => (prev + 1) % FESTIVAL_PRESETS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const offer = FESTIVAL_PRESETS[activeOfferIndex];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div id="dynamic-festive-ticker" className="w-full bg-stone-950 text-white relative overflow-hidden border-b border-red-800/40">
      {/* Dynamic Animated Gradient Background */}
      <div className={`w-full bg-gradient-to-r ${offer.bgGradient} px-3 py-2 sm:py-2.5 transition-all duration-700`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Festival Badge & Offer Tagline */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-xs text-[11px] font-extrabold uppercase tracking-wide border border-white/20 text-white shrink-0 shadow-xs">
              <span className="text-sm">{offer.icon}</span>
              {offer.badge}
            </span>

            <p className="text-xs sm:text-sm font-semibold truncate text-white drop-shadow-xs">
              {offer.tagline}
            </p>
          </div>

          {/* Right: Coupon, Timer & Selector */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Flash Sale Timer */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-black/30 backdrop-blur-xs text-[11px] font-mono font-bold text-white border border-white/20">
              <Clock className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>Ends in: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>

            {/* Coupon Code Pill */}
            <button
              onClick={() => handleCopyCode(offer.couponCode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-md transition-all active:scale-95 cursor-pointer ${offer.accentColor}`}
              title="Click to copy coupon code"
            >
              <Tag className="w-3 h-3" />
              <span>{offer.couponCode}</span>
              <span className="text-[10px] font-mono opacity-80 underline ml-0.5">
                {copiedCode === offer.couponCode ? 'Copied!' : 'Copy'}
              </span>
              {copiedCode === offer.couponCode && <Check className="w-3 h-3 text-emerald-700" />}
            </button>

            {/* Festival Switcher Dots */}
            <div className="flex items-center gap-1 ml-1">
              {FESTIVAL_PRESETS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveOfferIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    activeOfferIndex === idx ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/70'
                  }`}
                  title={`Switch to ${p.festivalName}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
