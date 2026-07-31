import React from 'react';

interface SectionDividerProps {
  isLightMode?: boolean;
}

/**
 * Elegant transition between sections — a soft gradient fade instead of an
 * abrupt hard edge between differently-colored section backgrounds.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({ isLightMode = true }) => {
  return (
    <div
      aria-hidden="true"
      className={`relative h-16 sm:h-20 pointer-events-none bg-gradient-to-b ${
        isLightMode ? 'from-transparent via-orange-500/[0.03] to-transparent' : 'from-transparent via-orange-500/[0.04] to-transparent'
      }`}
    >
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-px bg-gradient-to-r from-transparent ${
          isLightMode ? 'via-orange-300' : 'via-orange-500/40'
        } to-transparent`}
      />
    </div>
  );
};
