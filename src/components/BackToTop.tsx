import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  isLightMode?: boolean;
}

/** Floating "back to top" button that appears once the user has scrolled past the hero. */
export const BackToTop: React.FC<BackToTopProps> = ({ isLightMode = true }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 480);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`fixed bottom-24 right-5 sm:right-8 z-40 w-11 h-11 rounded-full flex items-center justify-center shadow-lg cursor-pointer border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
            isLightMode
              ? 'bg-[#EFE9DA] border-[#D9D3C3] text-brand-600 hover:bg-[#E8E3D6] shadow-slate-300/60'
              : 'bg-zinc-900 border-brand-500/30 text-brand-400 hover:bg-zinc-800 shadow-black/40'
          }`}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
