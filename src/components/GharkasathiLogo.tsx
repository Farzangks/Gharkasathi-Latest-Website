import React from 'react';

interface GharkasathiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'white-on-red' | 'red-on-white' | 'dark' | 'monochrome' | 'light';
  showSlogan?: boolean;
  sloganText?: string;
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'icon-only';
}

export const GharkasathiEmblem: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Central House */}
      {/* Pitched Roof */}
      <path
        d="M72 74L100 50L128 74"
        strokeWidth="7"
      />
      {/* Chimney */}
      <path
        d="M116 58V45H124V65"
        strokeWidth="6"
      />
      {/* House Body */}
      <path
        d="M78 74V108H122V74"
        strokeWidth="7"
      />
      {/* House Door */}
      <path
        d="M93 108V86H107V108"
        strokeWidth="6"
      />

      {/* Protective Hands Cradling the House */}
      {/* Left Outer Hand & Forearm */}
      <path
        d="M60 148H86L100 128"
        strokeWidth="6"
      />
      <path
        d="M52 136L52 92C52 86 56 80 62 80C68 80 72 85 72 91V114"
        strokeWidth="7"
      />
      <path
        d="M60 148V134L44 116C39 110 39 100 45 95C50 90 60 92 65 98L75 110"
        strokeWidth="6"
      />

      {/* Right Outer Hand & Forearm (Symmetrical) */}
      <path
        d="M140 148H114L100 128"
        strokeWidth="6"
      />
      <path
        d="M148 136L148 92C148 86 144 80 138 80C132 80 128 85 128 91V114"
        strokeWidth="7"
      />
      <path
        d="M140 148V134L156 116C161 110 161 100 155 95C150 90 140 92 135 98L125 110"
        strokeWidth="6"
      />

      {/* Base Cradling Cuffs / Foundation Lines */}
      <path
        d="M50 158H150"
        strokeWidth="7"
      />
      <path
        d="M55 168H145"
        strokeWidth="6"
      />

      {/* TM Symbol */}
      <text
        x="154"
        y="62"
        fill="currentColor"
        fontSize="12"
        fontFamily="sans-serif"
        fontWeight="bold"
        stroke="none"
      >
        TM
      </text>
    </svg>
  );
};

export const GharkasathiLogo: React.FC<GharkasathiLogoProps> = ({
  size = 'md',
  variant = 'red-on-white',
  showSlogan = true,
  sloganText = 'All your property Need, Under One Roof.',
  className = '',
  layout = 'horizontal',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const sloganSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  const variantStyles = {
    'white-on-red': {
      container: 'text-white',
      badgeBg: 'bg-white text-red-600',
      title: 'text-white',
      slogan: 'text-red-100',
      iconBox: 'bg-transparent text-white',
    },
    'red-on-white': {
      container: 'text-stone-900',
      badgeBg: 'bg-red-600 text-white',
      title: 'text-stone-900',
      slogan: 'text-stone-600',
      iconBox: 'bg-red-600 text-white rounded-xl p-1 shadow-sm',
    },
    'dark': {
      container: 'text-white',
      badgeBg: 'bg-red-600 text-white',
      title: 'text-white',
      slogan: 'text-stone-400',
      iconBox: 'bg-red-600 text-white rounded-xl p-1 shadow-sm',
    },
    'monochrome': {
      container: 'text-current',
      badgeBg: 'bg-current text-white',
      title: 'text-current',
      slogan: 'text-current opacity-80',
      iconBox: 'text-current',
    },
    'light': {
      container: 'text-stone-900',
      badgeBg: 'bg-red-600 text-white',
      title: 'text-stone-900',
      slogan: 'text-stone-600',
      iconBox: 'bg-red-600 text-white rounded-xl p-1 shadow-sm',
    },
  };

  const selected = variantStyles[variant] || variantStyles['red-on-white'];

  if (layout === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${selected.iconBox} ${className}`}>
        <GharkasathiEmblem className={iconSizes[size]} />
      </div>
    );
  }

  if (layout === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center text-center ${selected.container} ${className}`}>
        <div className={selected.iconBox}>
          <GharkasathiEmblem className={iconSizes[size]} />
        </div>
        <div className="mt-2">
          <div className={`font-black tracking-tight uppercase ${textSizes[size]} ${selected.title}`}>
            GHARKASATHI
          </div>
          {showSlogan && (
            <p className={`font-medium tracking-wide ${sloganSizes[size]} ${selected.slogan} mt-0.5`}>
              {sloganText}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${selected.container} ${className}`}>
      <div className={`${selected.iconBox} shrink-0`}>
        <GharkasathiEmblem className={iconSizes[size]} />
      </div>
      <div className="leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight ${textSizes[size]} ${selected.title}`}>
            GHARKASATHI
          </span>
          <span className="text-[9px] font-extrabold px-1 py-0.2 rounded bg-red-100 text-red-700 uppercase tracking-wider">
            TM
          </span>
        </div>
        {showSlogan && (
          <p className={`font-semibold tracking-normal ${sloganSizes[size]} ${selected.slogan} line-clamp-1`}>
            {sloganText}
          </p>
        )}
      </div>
    </div>
  );
};
