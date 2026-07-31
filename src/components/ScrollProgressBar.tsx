import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

/**
 * Thin orange progress indicator fixed to the very top of the viewport,
 * reflecting how far the user has scrolled down the page.
 */
export const ScrollProgressBar: React.FC = () => {
  const [scaleX, setScaleX] = useState(0);
  const smoothScaleX = useSpring(0, { stiffness: 300, damping: 40, mass: 0.2 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScaleX(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    smoothScaleX.set(scaleX);
  }, [scaleX, smoothScaleX]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent pointer-events-none" aria-hidden="true">
      <motion.div
        className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 origin-left"
        style={{ scaleX: smoothScaleX }}
      />
    </div>
  );
};
