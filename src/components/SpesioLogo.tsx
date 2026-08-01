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

// The real Spesio "ST" mark, embedded directly as a data URI (background removed,
// quantized to keep the bundle small). Inlined rather than loaded from /public so
// the logo can never 404 due to a misplaced file or a missing build step.
const MARK_SRC = 'data:image/png;base64,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';

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
 * artwork rather than a hand-drawn approximation. Wrapped for a subtle
 * entrance + hover shine so it feels alive without being distracting on
 * repeat use across the header/footer/modal.
 */
const Emblem: React.FC<{ heightClass: string; animateIn: boolean; isLightMode: boolean }> = ({ heightClass, animateIn, isLightMode }) => {
  // IMPORTANT: `h-full` on the <img> only resolves correctly if this wrapper
  // has an explicit (non-auto) height. Previously the wrapper was plain
  // `inline-block` with no height class, so `h-full` had nothing real to
  // measure against and browsers fell back to the image's native pixel
  // dimensions — causing the mark to render at full intrinsic size and blow
  // out the header/footer layout. Applying the same explicit heightClass to
  // the wrapper (not just the image) fixes that at the root.
  //
  // The mark art itself is a white "S" + orange "T" on a transparent
  // background. That's fine on dark surfaces, but on light/white surfaces
  // (header, footer, light mode generally) the white S has almost no
  // contrast and effectively disappears. Since we can't repaint the raster
  // art, we stack several zero-blur `drop-shadow` filters around the alpha
  // silhouette to create a thin dark contour — this only outlines opaque
  // pixels (the S and T shapes), so it doesn't add a visible box around the
  // transparent background. Only applied in light mode; dark mode is left
  // untouched since the white S already reads fine there.
  const img = (
    <img
      src={MARK_SRC}
      alt="Spesio Technologies"
      draggable={false}
      className="h-full w-auto object-contain select-none pointer-events-none"
      style={{
        filter: isLightMode
          ? 'drop-shadow(1px 0 0 rgba(15,23,42,0.55)) drop-shadow(-1px 0 0 rgba(15,23,42,0.55)) drop-shadow(0 1px 0 rgba(15,23,42,0.55)) drop-shadow(0 -1px 0 rgba(15,23,42,0.55)) drop-shadow(0 2px 10px rgba(255,106,0,0.25))'
          : 'drop-shadow(0 2px 10px rgba(255,106,0,0.25))',
      }}
    />
  );

  return (
    <motion.div
      className={`relative inline-flex overflow-hidden spesio-mark-shine rounded-sm shrink-0 ${heightClass}`}
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
        <Emblem heightClass={size === 'custom' ? 'h-16' : markSizeClasses[size]} animateIn={animateIn} isLightMode={isLightMode} />
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
      <div className={className}>
        <Emblem heightClass={size === 'custom' ? 'h-10' : markSizeClasses[size]} animateIn={animateIn} isLightMode={isLightMode} />
      </div>
    );
  }

  // Horizontal Layout (Emblem next to text)
  return (
    <div className={`inline-flex items-center gap-3 ${heightClasses[size]} ${className}`}>
      <Emblem heightClass="h-full" animateIn={animateIn} isLightMode={isLightMode} />
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
