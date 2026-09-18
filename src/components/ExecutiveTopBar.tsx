import React from 'react';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  MapPin, 
  ExternalLink,
  Layers,
  CheckCircle2,
  Rocket,
  Globe,
  Lock
} from 'lucide-react';
import { GharkasathiEmblem } from './GharkasathiLogo';

export type AppViewMode = 'website' | 'cto';

interface ExecutiveTopBarProps {
  currentMode: AppViewMode;
  onSelectMode: (mode: AppViewMode) => void;
  selectedCity?: string;
  onOpenDomainModal?: () => void;
  onLockAdmin?: () => void;
}

export const ExecutiveTopBar: React.FC<ExecutiveTopBarProps> = ({
  currentMode,
  onSelectMode,
  selectedCity = 'Raipur',
  onOpenDomainModal,
  onLockAdmin
}) => {
  return (
    <aside aria-label="Executive Control Header" className="bg-stone-950 text-stone-200 border-b border-stone-800 text-xs sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-2 gap-2">
          {/* Left: Brand Identity & Tagline */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-red-600 flex items-center justify-center p-0.5 shrink-0 shadow-xs">
                <GharkasathiEmblem className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-white tracking-wider text-xs uppercase">
                GHARKASATHI
              </span>
              <span className="text-[10px] bg-red-950 text-red-400 font-extrabold px-1.5 py-0.2 rounded border border-red-800 hidden sm:inline">
                TM
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-stone-400 text-[11px] pl-2 border-l border-stone-800">
              <span className="text-stone-300 font-medium">All your property Need, Under One Roof.</span>
            </div>

            {/* City indicator */}
            <div className="flex items-center gap-1 text-[11px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded-md border border-stone-800">
              <MapPin className="w-3 h-3 text-red-500" />
              <span>{selectedCity} (HQ)</span>
            </div>
          </div>

          {/* Center: 2-Way Mode Switcher (Customer Portal / CTO & Admin) */}
          <div className="flex items-center bg-stone-900/90 p-1 rounded-xl border border-stone-800 shadow-inner w-full md:w-auto justify-center">
            <button
              onClick={() => onSelectMode('website')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                currentMode === 'website'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
              title="View Customer Portal (Construction, Plot Calculator, Real Estate, Interiors)"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Customer Portal</span>
            </button>

            <button
              onClick={() => onSelectMode('cto')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                currentMode === 'cto'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
              title="Open CTO Architecture & Operations Console"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CTO & Admin</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            {currentMode === 'cto' && onLockAdmin && (
              <button
                onClick={onLockAdmin}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 hover:text-white border border-red-800/80 text-[11px] font-bold transition-all cursor-pointer ml-1"
                title="Lock admin session and return to customer website"
              >
                <Lock className="w-3 h-3 text-red-400" />
                <span>Lock &amp; Exit</span>
              </button>
            )}
          </div>

          {/* Right: Domain Deploy CTA & Badges */}
          <div className="flex items-center gap-2">
            {onOpenDomainModal && (
              <button
                onClick={onOpenDomainModal}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-black text-[11px] shadow-sm shadow-red-600/30 transition-all cursor-pointer"
                title="Manage Live Domain Deployment for gharkasathi.com"
              >
                <Globe className="w-3.5 h-3.5 animate-pulse" />
                <span>gharkasathi.com</span>
                <span className="text-[9px] bg-red-800 text-white px-1 rounded uppercase font-mono">LIVE</span>
              </button>
            )}

            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-red-400 font-bold bg-red-950/60 px-2.5 py-1 rounded-lg border border-red-800/60">
              <Sparkles className="w-3 h-3 text-red-400 animate-pulse" />
              <span>Sathi AI Active</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
