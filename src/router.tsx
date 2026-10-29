import type React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { getProject, getService } from './content/site';

export type Route =
  | { name: 'home' }
  | { name: 'case-study'; slug: string }
  | { name: 'service'; slug: string }
  | { name: 'not-found' };

export function matchRoute(rawPath: string): Route {
  const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
  if (path === '/') return { name: 'home' };
  const w = path.match(/^\/work\/([^/]+)$/);
  if (w && getProject(w[1])) return { name: 'case-study', slug: w[1] };
  const s = path.match(/^\/services\/([^/]+)$/);
  if (s && getService(s[1])) return { name: 'service', slug: s[1] };
  return { name: 'not-found' };
}

interface RouterState {
  path: string;
  hash: string;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterState | null>(null);

export function useRouter(): RouterState {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used inside <Router>');
  return ctx;
}

export const useRoute = (): Route => matchRoute(useRouter().path);

/** Scrolls to an element, using Lenis when it is running. */
export function scrollToTarget(target: string | HTMLElement | number, immediate = false) {
  const lenis = typeof window !== 'undefined' ? (window as any).__lenis : null;
  const el = typeof target === 'string' ? document.getElementById(target) : target;
  if (el == null) return;
  if (lenis) lenis.scrollTo(el, { offset: typeof el === 'number' ? 0 : -72, immediate, duration: 1.4 });
  else if (typeof el === 'number') window.scrollTo(0, el);
  else el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
}

export function Router({ children, initialPath = '/' }: { children: ReactNode; initialPath?: string }) {
  const [loc, setLoc] = useState(() =>
    typeof window === 'undefined'
      ? { path: initialPath, hash: '' }
      : { path: window.location.pathname, hash: window.location.hash },
  );
  const isFirst = useRef(true);

  useEffect(() => {
    const onPop = () => setLoc({ path: window.location.pathname, hash: window.location.hash });
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    const url = new URL(to, window.location.origin);
    const same = url.pathname === window.location.pathname;
    window.history[opts?.replace ? 'replaceState' : 'pushState'](null, '', url.pathname + url.search + url.hash);
    if (same && url.hash) {
      scrollToTarget(decodeURIComponent(url.hash.slice(1)));
      return;
    }
    setLoc({ path: url.pathname, hash: url.hash });
  }, []);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      if (!loc.hash) return;
    }
    const id = loc.hash.slice(1);
    // Wait a frame so the new route has rendered.
    const t = window.setTimeout(() => {
      if (id && document.getElementById(decodeURIComponent(id))) scrollToTarget(decodeURIComponent(id), true);
      else scrollToTarget(0, true);
    }, 30);
    return () => window.clearTimeout(t);
  }, [loc.path, loc.hash]);

  const value = useMemo(() => ({ ...loc, navigate }), [loc, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; ref?: React.Ref<HTMLAnchorElement> };

export function Link({ href, onClick, target, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const internal = href.startsWith('/') && !href.startsWith('//');

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !internal || target === '_blank') return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href);
  };

  return <a href={href} target={target} onClick={handleClick} {...rest} />;
}
