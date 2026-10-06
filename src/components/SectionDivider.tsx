import React from 'react';

interface SectionDividerProps {
  isLightMode?: boolean;
}

/** Hard, intentional hand-off from the light chapters to the dark Process chapter: a mono caption on a thin rule. */
export const SectionDivider: React.FC<SectionDividerProps> = ({ isLightMode = true }) => (
  <div
    aria-hidden="true"
    className={`border-t font-mono text-[10px] uppercase tracking-wider ${
      isLightMode ? 'bg-[#D6E6FF] text-slate-600 border-[#171B2E]' : 'bg-[#12162A] text-zinc-500 border-zinc-700'
    }`}
  >
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-3 flex justify-between">
      <span>End of capabilities</span>
      <span>Next: how we build ↓</span>
    </div>
  </div>
);
