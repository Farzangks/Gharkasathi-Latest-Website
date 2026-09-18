import React from 'react';
import { 
  Building2, 
  Sparkles, 
  LogOut, 
  ExternalLink, 
  FileCode2,
  HardDrive
} from 'lucide-react';
import { User } from 'firebase/auth';

import { GharkasathiLogo, GharkasathiEmblem } from './GharkasathiLogo';
import { BrandLogoModal } from './BrandLogoModal';

interface HeaderProps {
  user: User | null;
  needsAuth: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  viewMode?: 'website' | 'cto';
  onToggleViewMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  needsAuth,
  onLoginClick,
  onLogoutClick,
  viewMode = 'cto',
  onToggleViewMode,
}) => {
  const [isLogoModalOpen, setIsLogoModalOpen] = React.useState(false);

  return (
    <>
      <header id="main-header" className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand & Project Identity with Official Logo Lockup */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsLogoModalOpen(true)}
              title="Click to view or upload official SVG Logo"
              className="text-left group cursor-pointer hover:opacity-95 transition-opacity"
            >
              <GharkasathiLogo size="md" variant="light" layout="master-lockup" />
            </button>
            <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 uppercase tracking-wide">
              CTO Console
            </span>
          </div>

          {/* Right side: View Toggle & Auth */}
        <div className="flex items-center gap-3">
          {onToggleViewMode && (
            <button
              onClick={onToggleViewMode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>🌐 View Live Website (Red & White)</span>
            </button>
          )}
          {needsAuth || !user ? (
            <button
              id="header-gsi-button"
              onClick={onLoginClick}
              className="gsi-material-button text-xs cursor-pointer shadow-xs"
            >
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents">Sign in with Google</span>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 text-xs">
                <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium truncate max-w-[160px]">{user.email}</span>
              </div>

              <button
                id="header-logout-button"
                onClick={onLogoutClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 text-xs font-medium transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>

    <BrandLogoModal 
      isOpen={isLogoModalOpen} 
      onClose={() => setIsLogoModalOpen(false)} 
    />
  </>
  );
};
