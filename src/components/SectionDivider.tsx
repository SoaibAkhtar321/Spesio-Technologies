import React from 'react';

interface SectionDividerProps {
  isLightMode?: boolean;
}

/**
 * Chapter break between "what we build" (Services / Why Choose Us) and
 * "how we build it" (Process). A curved separator plus a background-color
 * change gives the two halves a clear, deliberate visual boundary instead
 * of an abrupt hard edge or an invisible one.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({ isLightMode = true }) => {
  const prevBg = isLightMode ? '#FFFFFF' : '#080A10';
  const nextBg = isLightMode ? '#0B0D12' : '#000000';

  return (
    <div aria-hidden="true" className="relative" style={{ backgroundColor: prevBg }}>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block w-full h-[56px] sm:h-[80px]"
      >
        <path d="M0,0 C360,90 1080,0 1440,70 L1440,90 L0,90 Z" fill={nextBg} />
      </svg>
      {/* Orange seam marking the exact fold */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-24 sm:w-40 h-px"
        style={{ backgroundImage: 'linear-gradient(to right, transparent, rgba(249,115,22,0.6), transparent)' }}
      />
    </div>
  );
};
