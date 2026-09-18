import React, { useEffect, useState } from 'react';

interface GharkasathiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'white-on-red' | 'red-on-white' | 'dark' | 'monochrome' | 'light';
  showSlogan?: boolean;
  sloganText?: string;
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'icon-only' | 'master-lockup';
  customLogoSrc?: string;
  onClick?: () => void;
}

/**
 * Gharkasathi Emblem: Two protective hands cradling a house with centered door,
 * pitched gable roof with chimney on the right, and TM superscript.
 */
export const GharkasathiEmblem: React.FC<{ 
  className?: string; 
  src?: string;
  variant?: 'white' | 'red' | 'dark' | 'current';
}> = ({ 
  className = 'w-10 h-10', 
  src,
  variant = 'current'
}) => {
  const [imgError, setImgError] = useState(false);

  // If a custom image path is given and works (and is not default emblem.svg), display it
  if (src && !imgError && src !== '/emblem.svg') {
    return (
      <img
        src={src}
        alt="Gharkasathi Trademark Emblem"
        className={`${className} object-contain`}
        onError={() => setImgError(true)}
      />
    );
  }

  const strokeColor = variant === 'white' 
    ? '#FFFFFF' 
    : variant === 'red' 
    ? '#CE0B15' 
    : variant === 'dark' 
    ? '#1C1917' 
    : 'currentColor';

  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Gharkasathi Trademark Emblem"
    >
      {/* TM Superscript */}
      <text
        x="142"
        y="26"
        fill={strokeColor}
        fontSize="16"
        fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
        fontWeight="800"
      >
        TM
      </text>

      {/* House & Hands Monoline Geometry */}
      <g stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(10, 10)">
        {/* Chimney on Right Roof Slope */}
        <path d="M 88 38 L 88 22 L 97 22 L 97 46" />

        {/* Triangular Gable Roof */}
        <path d="M 36 50 L 72 22 L 108 50" strokeWidth="5.5" />

        {/* House Main Walls */}
        <path d="M 46 50 L 46 92 L 98 92 L 98 50" />

        {/* Centered Entrance Door */}
        <path d="M 62 92 L 62 65 L 82 65 L 82 92" />

        {/* Hands Cupping the House */}
        {/* Left Outer Hand Contour */}
        <path d="M 68 116 L 26 116 C 18 116 14 110 14 102 L 14 36 C 14 29 20 29 20 36 L 20 86" />

        {/* Right Outer Hand Contour */}
        <path d="M 76 116 L 118 116 C 126 116 130 110 130 102 L 130 36 C 130 29 124 29 124 36 L 124 86" />

        {/* Left Inner Palm Lines */}
        <path d="M 23 70 L 56 104 C 62 109 68 109 71 109" strokeWidth="4.5" />
        <path d="M 30 96 L 62 110" strokeWidth="4" />

        {/* Right Inner Palm Lines */}
        <path d="M 121 70 L 88 104 C 82 109 76 109 73 109" strokeWidth="4.5" />
        <path d="M 114 96 L 82 110" strokeWidth="4" />

        {/* Bottom Platform Base */}
        <line x1="20" y1="124" x2="68" y2="124" strokeWidth="5" />
        <line x1="76" y1="124" x2="124" y2="124" strokeWidth="5" />
      </g>
    </svg>
  );
};

export const GharkasathiLogo: React.FC<GharkasathiLogoProps> = ({
  size = 'md',
  variant = 'light',
  showSlogan = true,
  sloganText = 'All Your Home Needs, Under One Roof.',
  className = '',
  layout = 'master-lockup',
  customLogoSrc,
  onClick,
}) => {
  const [customSvg, setCustomSvg] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gharkasathi_custom_logo_svg');
    }
    return null;
  });

  useEffect(() => {
    const handleStorageUpdate = () => {
      if (typeof window !== 'undefined') {
        setCustomSvg(localStorage.getItem('gharkasathi_custom_logo_svg'));
      }
    };
    window.addEventListener('gharkasathi_logo_updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);
    return () => {
      window.removeEventListener('gharkasathi_logo_updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  // Scaled dimensions
  const scale = {
    sm: { title: 'text-lg', slogan: 'text-[10px]', emblem: 'w-7 h-7', badge: 'w-7 h-7 p-1 rounded-md', gap: 'gap-2.5' },
    md: { title: 'text-xl sm:text-2xl', slogan: 'text-[11px] sm:text-xs', emblem: 'w-9 h-9 sm:w-10 sm:h-10', badge: 'w-9 h-9 sm:w-10 sm:h-10 p-1.5 rounded-xl', gap: 'gap-3' },
    lg: { title: 'text-2xl sm:text-3xl', slogan: 'text-xs sm:text-sm', emblem: 'w-12 h-12 sm:w-14 sm:h-14', badge: 'w-12 h-12 sm:w-14 sm:h-14 p-2 rounded-2xl', gap: 'gap-4' },
    xl: { title: 'text-4xl sm:text-5xl', slogan: 'text-base sm:text-lg', emblem: 'w-16 h-16 sm:w-20 sm:h-20', badge: 'w-16 h-16 sm:w-20 sm:h-20 p-2.5 rounded-3xl', gap: 'gap-5' },
  }[size];

  const theme = {
    'white-on-red': {
      textTitle: 'text-white',
      textSlogan: 'text-red-100',
      emblemColor: 'white' as const,
      badgeBg: 'bg-white/10 border border-white/20',
      badgeEmblemVariant: 'white' as const,
      container: 'text-white',
    },
    'red-on-white': {
      textTitle: 'text-stone-900',
      textSlogan: 'text-stone-600',
      emblemColor: 'red' as const,
      badgeBg: 'bg-red-600 shadow-xs',
      badgeEmblemVariant: 'white' as const,
      container: 'text-stone-900',
    },
    'light': {
      textTitle: 'text-stone-900',
      textSlogan: 'text-stone-600',
      emblemColor: 'red' as const,
      badgeBg: 'bg-red-600 shadow-xs',
      badgeEmblemVariant: 'white' as const,
      container: 'text-stone-900',
    },
    'dark': {
      textTitle: 'text-white',
      textSlogan: 'text-stone-300',
      emblemColor: 'white' as const,
      badgeBg: 'bg-red-600 shadow-xs',
      badgeEmblemVariant: 'white' as const,
      container: 'text-white',
    },
    'monochrome': {
      textTitle: 'text-current',
      textSlogan: 'text-current opacity-80',
      emblemColor: 'current' as const,
      badgeBg: 'bg-stone-800',
      badgeEmblemVariant: 'white' as const,
      container: 'text-current',
    },
  }[variant] || {
    textTitle: 'text-stone-900',
    textSlogan: 'text-stone-600',
    emblemColor: 'red' as const,
    badgeBg: 'bg-red-600 shadow-xs',
    badgeEmblemVariant: 'white' as const,
    container: 'text-stone-900',
  };

  // If user uploaded custom SVG code via Brand Logo Center, render that custom SVG directly!
  if (customSvg && customSvg.includes('<svg')) {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer hover:opacity-90' : ''} ${className}`}
        dangerouslySetInnerHTML={{ __html: customSvg }}
      />
    );
  }

  // 1. If layout is icon-only
  if (layout === 'icon-only') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer hover:opacity-90' : ''} ${className}`}
      >
        <div className={`${scale.badge} ${theme.badgeBg} flex items-center justify-center shrink-0`}>
          <GharkasathiEmblem 
            className="w-full h-full" 
            src={customLogoSrc} 
            variant={theme.badgeEmblemVariant}
          />
        </div>
      </div>
    );
  }

  // 2. Vertical Stack Layout
  if (layout === 'vertical') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex flex-col items-center text-center select-none ${theme.container} ${onClick ? 'cursor-pointer hover:opacity-90' : ''} ${className}`}
        style={{ fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" }}
      >
        <div className={`${scale.badge} ${theme.badgeBg} flex items-center justify-center shrink-0 mb-2`}>
          <GharkasathiEmblem 
            className="w-full h-full" 
            src={customLogoSrc} 
            variant={theme.badgeEmblemVariant}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <span className={`font-black tracking-tight ${scale.title} ${theme.textTitle}`}>
              Gharkasathi
            </span>
            <span className="text-[10px] bg-red-950 text-red-400 font-extrabold px-1 rounded border border-red-800">
              TM
            </span>
          </div>
          {showSlogan && (
            <p className={`font-medium tracking-normal mt-0.5 whitespace-nowrap ${scale.slogan} ${theme.textSlogan}`}>
              {sloganText}
            </p>
          )}
        </div>
      </div>
    );
  }

  // 3. Master Lockup (Icon Emblem Badge on LEFT, Wordmark + Slogan on RIGHT)
  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center ${scale.gap} select-none ${theme.container} ${onClick ? 'cursor-pointer hover:opacity-90' : ''} ${className}`}
      style={{ fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" }}
    >
      {/* Left: Brand Emblem Badge */}
      <div className={`${scale.badge} ${theme.badgeBg} flex items-center justify-center shrink-0`}>
        <GharkasathiEmblem 
          className="w-full h-full" 
          src={customLogoSrc} 
          variant={theme.badgeEmblemVariant}
        />
      </div>

      {/* Right: Brand Wordmark and Slogan */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1">
          <span className={`font-black tracking-tight ${scale.title} ${theme.textTitle}`}>
            Gharkasathi
          </span>
          <span className="text-[9px] bg-red-100 text-red-700 font-bold px-1 rounded hidden sm:inline">
            TM
          </span>
        </div>
        
        {showSlogan && (
          <p className={`font-medium tracking-normal whitespace-nowrap ${scale.slogan} ${theme.textSlogan}`}>
            {sloganText}
          </p>
        )}
      </div>
    </div>
  );
};

