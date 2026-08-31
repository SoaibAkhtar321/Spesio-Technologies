import React from 'react';
import { motion } from 'motion/react';

interface SpesioLogoProps {
  variant?: 'full' | 'horizontal' | 'mark';
  isLightMode?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  /** Plays a one-time entrance (pop + slight rotate) when the logo mounts. Default on. */
  animateIn?: boolean;
}

// The official Spesio "ST" mark — served from /public/brand so it's a real,
// cacheable asset instead of a giant inlined base64 string. This is the
// opaque badge artwork (dark circular background baked in), so it reads
// cleanly on both light and dark surfaces with no contrast hacks needed.
const MARK_SRC = '/brand/spesio-mark.png';

// Size mappings (controls the emblem's rendered height; width follows its natural aspect ratio)
const heightClasses = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-14',
  xl: 'h-20',
  custom: '',
};

const markSizeClasses = {
  sm: 'h-7',
  md: 'h-9',
  lg: 'h-12',
  xl: 'h-16',
  custom: '',
};

/**
 * The official Spesio Technologies "ST" mark, rendered from the real brand
 * artwork. Wrapped for a subtle entrance + hover shine so it feels alive
 * without being distracting on repeat use across the header/footer/modal.
 */
const Emblem: React.FC<{ heightClass: string; animateIn: boolean }> = ({ heightClass, animateIn }) => {
  // IMPORTANT: `h-full` on the <img> only resolves correctly if this wrapper
  // has an explicit (non-auto) height, so the same heightClass is applied to
  // the wrapper (not just the image) to avoid the mark rendering at its full
  // intrinsic pixel size and blowing out the header/footer layout.
  const img = (
    <img
      src={MARK_SRC}
      alt="Spesio Technologies"
      draggable={false}
      className="h-full w-auto object-contain select-none pointer-events-none rounded-full"
    />
  );

  return (
    <motion.div
      className={`relative inline-flex overflow-hidden spesio-mark-shine rounded-full shrink-0 ${heightClass}`}
      initial={animateIn ? { opacity: 0, scale: 0.6, rotate: -12 } : false}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.07, rotate: -2 }}
    >
      {img}
    </motion.div>
  );
};

export const SpesioLogo: React.FC<SpesioLogoProps> = ({
  variant = 'horizontal',
  isLightMode = true,
  className = '',
  size = 'md',
  animateIn = true,
}) => {
  // Full Logo Layout (Emblem stacked above text)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <Emblem heightClass={size === 'custom' ? 'h-16' : markSizeClasses[size]} animateIn={animateIn} />
        <div className="mt-3 tracking-widest uppercase">
          <div className={`text-xl sm:text-2xl font-black tracking-[0.28em] ${
            isLightMode ? 'text-slate-900' : 'text-white'
          }`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            SPESIO
          </div>
          <div className="text-[10px] sm:text-xs font-black text-maroon-600 tracking-[0.45em] mt-0.5">
            TECHNOLOGIES
          </div>
        </div>
      </div>
    );
  }

  // Mark only layout
  if (variant === 'mark') {
    return (
      <div className={className}>
        <Emblem heightClass={size === 'custom' ? 'h-10' : markSizeClasses[size]} animateIn={animateIn} />
      </div>
    );
  }

  // Horizontal Layout (Emblem next to text)
  return (
    <div className={`inline-flex items-center gap-3 ${heightClasses[size]} ${className}`}>
      <Emblem heightClass="h-full" animateIn={animateIn} />
      <div className="flex flex-col justify-center leading-none">
        <span className={`font-black tracking-[0.24em] text-base sm:text-lg ${
          isLightMode ? 'text-slate-900' : 'text-white'
        }`}>
          SPESIO
        </span>
        <span className="text-[9px] sm:text-[10px] font-black text-maroon-600 tracking-[0.42em] mt-1 uppercase">
          TECHNOLOGIES
        </span>
      </div>
    </div>
  );
};
