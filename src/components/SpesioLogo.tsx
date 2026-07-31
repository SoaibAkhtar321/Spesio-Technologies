import React from 'react';

interface SpesioLogoProps {
  variant?: 'full' | 'horizontal' | 'mark';
  isLightMode?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
}

export const SpesioLogo: React.FC<SpesioLogoProps> = ({
  variant = 'horizontal',
  isLightMode = true,
  className = '',
  size = 'md',
}) => {
  // Size mappings
  const heightClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
    custom: '',
  };

  const markSizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    custom: '',
  };

  // Emblem vector geometry representing the real ST logo accurately
  const Emblem = () => {
    const sColor = isLightMode ? '#0F172A' : '#FFFFFF';
    const sColorSecondary = isLightMode ? '#334155' : '#E2E8F0';

    return (
      <svg
        viewBox="0 0 240 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="stOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7700" />
            <stop offset="50%" stopColor="#FF6A00" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>
        </defs>

        {/* Letter "S" Monogram - Angular Geometric Ribbon */}
        <g>
          {/* S Outer Polygon Path */}
          <path
            d="
              M 105 20
              L 205 20
              L 175 55
              L 135 55
              L 135 68
              L 168 68
              L 205 105
              L 205 175
              L 170 210
              L 70 210
              L 35 175
              L 35 135
              L 70 100
              L 105 100
              L 105 85
              L 70 85
              L 35 50
              Z
            "
            fill={sColor}
          />
          {/* S Inner Cutout 1 (Top Loop Hole) */}
          <path
            d="
              M 75 58
              L 95 38
              L 155 38
              L 140 58
              Z
            "
            fill={isLightMode ? '#FFFFFF' : '#000000'}
          />
          {/* S Inner Cutout 2 (Center/Bottom Hole) */}
          <path
            d="
              M 70 140
              L 70 170
              L 95 192
              L 165 192
              L 175 180
              L 175 130
              L 142 130
              L 142 165
              L 130 175
              L 95 175
              L 88 165
              L 88 140
              Z
            "
            fill={isLightMode ? '#FFFFFF' : '#000000'}
          />
        </g>

        {/* Letter "T" Monogram - Overlapping Vivid Orange Geometric T */}
        <g>
          {/* Top Horizontal Bar of T */}
          <polygon
            points="108,55 220,55 200,88 135,88"
            fill="url(#stOrange)"
          />
          {/* Vertical Stem of T with Angled Bottom */}
          <polygon
            points="150,88 182,88 182,185 150,210"
            fill="url(#stOrange)"
          />
        </g>
      </svg>
    );
  };

  // Full Logo Layout (Emblem stacked above text)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className={markSizeClasses[size] || 'w-20 h-20'}>
          <Emblem />
        </div>
        <div className="mt-3 tracking-widest uppercase">
          <div className={`text-xl sm:text-2xl font-black tracking-[0.28em] ${
            isLightMode ? 'text-slate-900' : 'text-white'
          }`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            SPESIO
          </div>
          <div className="text-[10px] sm:text-xs font-black text-orange-600 tracking-[0.45em] mt-0.5">
            TECHNOLOGIES
          </div>
        </div>
      </div>
    );
  }

  // Mark only layout
  if (variant === 'mark') {
    return (
      <div className={`${markSizeClasses[size] || 'w-10 h-10'} ${className}`}>
        <Emblem />
      </div>
    );
  }

  // Horizontal Layout (Emblem next to text)
  return (
    <div className={`inline-flex items-center gap-3 ${heightClasses[size]} ${className}`}>
      <div className="h-full aspect-square shrink-0">
        <Emblem />
      </div>
      <div className="flex flex-col justify-center leading-none">
        <span className={`font-black tracking-[0.24em] text-base sm:text-lg ${
          isLightMode ? 'text-slate-900' : 'text-white'
        }`}>
          SPESIO
        </span>
        <span className="text-[9px] sm:text-[10px] font-black text-orange-600 tracking-[0.42em] mt-1 uppercase">
          TECHNOLOGIES
        </span>
      </div>
    </div>
  );
};

