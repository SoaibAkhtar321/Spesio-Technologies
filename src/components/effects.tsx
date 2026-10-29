import { useEffect } from 'react';

/** Adds `.in` to [data-rv] elements as they enter the viewport. Re-scans when `key` changes. */
export function useReveals(key: string) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );
    const scan = () => document.querySelectorAll('[data-rv]:not(.in)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [key]);
}
