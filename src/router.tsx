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
import { getProject } from './content/site';

export type Route =
  | { name: 'home' }
  | { name: 'case-study'; slug: string }
  | { name: 'not-found' };

export function matchRoute(rawPath: string): Route {
  const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
  if (path === '/') return { name: 'home' };
  const m = path.match(/^\/work\/([^/]+)$/);
  if (m && getProject(m[1])) return { name: 'case-study', slug: m[1] };
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

export function Router({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState(() => ({ path: window.location.pathname, hash: window.location.hash }));
  const isFirst = useRef(true);

  useEffect(() => {
    const onPop = () => setLoc({ path: window.location.pathname, hash: window.location.hash });
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    const url = new URL(to, window.location.origin);
    const same = url.pathname === window.location.pathname && url.hash === window.location.hash;
    if (!same) {
      window.history[opts?.replace ? 'replaceState' : 'pushState'](null, '', url.pathname + url.search + url.hash);
    }
    setLoc({ path: url.pathname, hash: url.hash });
  }, []);

  // Scroll handling: jump to #hash if present, otherwise to the top on route change.
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      if (!loc.hash) return;
    }
    const id = loc.hash.slice(1);
    const raf = requestAnimationFrame(() => {
      const el = id ? document.getElementById(decodeURIComponent(id)) : null;
      if (el) el.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [loc.path, loc.hash]);

  const value = useMemo(() => ({ ...loc, navigate }), [loc, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Internal links navigate with the History API; external, new-tab and modified clicks behave normally. */
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
