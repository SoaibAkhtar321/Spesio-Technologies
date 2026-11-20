import { useEffect } from 'react';

/** Adds `.in` to [data-rv] elements as they enter or sit above the viewport. Re-scans when `key` changes. */
export function useReveals(key: string) {
  useEffect(() => {
    const revealVisible = () => {
      const limit = window.innerHeight + 60;
      document.querySelectorAll('[data-rv]:not(.in)').forEach((el) => {
        if (el.getBoundingClientRect().top <= limit) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    };

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '80px 0px 80px 0px', threshold: 0 },
    );

    const scan = () => {
      document.querySelectorAll('[data-rv]:not(.in)').forEach((el) => io.observe(el));
      revealVisible();
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', revealVisible, { passive: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', revealVisible);
    };
  }, [key]);
}
