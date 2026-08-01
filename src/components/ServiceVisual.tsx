import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceItem } from '../types';
import {
  Smartphone,
  Server,
  Database,
  Globe,
  Cloud,
  Cpu,
  RadioTower,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

interface ServiceVisualProps {
  service: ServiceItem;
  isLightMode?: boolean;
}

type Token = { text: string; cls: string };
type FlowNode = { label: string; icon: LucideIcon };

interface VisualContent {
  fileName: string;
  lines: Token[][];
  flow: [FlowNode, FlowNode, FlowNode];
  stats: { label: string; value: string }[];
}

/** Per-service "what it looks like when it's running" content — short, illustrative pseudo-code, not copied from anywhere. */
const CONTENT: Record<string, VisualContent> = {
  software: {
    fileName: 'order-engine.ts',
    lines: [
      [{ text: 'class', cls: 'text-maroon-400' }, { text: ' OrderEngine {', cls: 'text-zinc-300' }],
      [{ text: '  async', cls: 'text-maroon-400' }, { text: ' process(order) {', cls: 'text-zinc-300' }],
      [{ text: '    await', cls: 'text-maroon-400' }, { text: ' db.', cls: 'text-zinc-300' }, { text: 'transaction', cls: 'text-sky-400' }, { text: '(order)', cls: 'text-zinc-300' }],
      [{ text: '    return', cls: 'text-maroon-400' }, { text: ' { status: ', cls: 'text-zinc-300' }, { text: "'confirmed'", cls: 'text-emerald-400' }, { text: ' }', cls: 'text-zinc-300' }],
      [{ text: '  }', cls: 'text-zinc-500' }],
      [{ text: '}', cls: 'text-zinc-500' }],
    ],
    flow: [
      { label: 'Client', icon: Globe },
      { label: 'API', icon: Server },
      { label: 'Database', icon: Database },
    ],
    stats: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Response', value: '42ms' },
      { label: 'Test Coverage', value: '98%' },
    ],
  },
  web: {
    fileName: 'App.tsx',
    lines: [
      [{ text: 'export', cls: 'text-maroon-400' }, { text: ' default ', cls: 'text-maroon-400' }, { text: 'function', cls: 'text-maroon-400' }, { text: ' App() {', cls: 'text-zinc-300' }],
      [{ text: '  const', cls: 'text-maroon-400' }, { text: ' data = ', cls: 'text-zinc-300' }, { text: 'use', cls: 'text-sky-400' }, { text: 'Query(', cls: 'text-zinc-300' }, { text: "'/products'", cls: 'text-emerald-400' }, { text: ')', cls: 'text-zinc-300' }],
      [{ text: '  return', cls: 'text-maroon-400' }, { text: ' <', cls: 'text-zinc-300' }, { text: 'Storefront', cls: 'text-sky-400' }, { text: ' fast />', cls: 'text-zinc-300' }],
      [{ text: '}', cls: 'text-zinc-500' }],
    ],
    flow: [
      { label: 'Browser', icon: Globe },
      { label: 'CDN Edge', icon: RadioTower },
      { label: 'Server', icon: Server },
    ],
    stats: [
      { label: 'Lighthouse', value: '98/100' },
      { label: 'LCP', value: '0.9s' },
      { label: 'SEO Score', value: '100' },
    ],
  },
  app: {
    fileName: 'HomeScreen.tsx',
    lines: [
      [{ text: 'function', cls: 'text-maroon-400' }, { text: ' HomeScreen() {', cls: 'text-zinc-300' }],
      [{ text: '  const', cls: 'text-maroon-400' }, { text: ' [synced] = ', cls: 'text-zinc-300' }, { text: 'useOffline', cls: 'text-sky-400' }, { text: 'Sync()', cls: 'text-zinc-300' }],
      [{ text: '  return', cls: 'text-maroon-400' }, { text: ' <', cls: 'text-zinc-300' }, { text: 'FeedList', cls: 'text-sky-400' }, { text: ' data={synced} />', cls: 'text-zinc-300' }],
      [{ text: '}', cls: 'text-zinc-500' }],
    ],
    flow: [
      { label: 'Device', icon: Smartphone },
      { label: 'Sync Layer', icon: RadioTower },
      { label: 'Cloud', icon: Cloud },
    ],
    stats: [
      { label: 'Frame Rate', value: '60fps' },
      { label: 'Crash-free', value: '99.8%' },
      { label: 'Store Rating', value: '4.8★' },
    ],
  },
  ai: {
    fileName: 'assistant.ts',
    lines: [
      [{ text: 'const', cls: 'text-maroon-400' }, { text: ' reply = ', cls: 'text-zinc-300' }, { text: 'await', cls: 'text-maroon-400' }, { text: ' model.', cls: 'text-zinc-300' }, { text: 'infer', cls: 'text-sky-400' }, { text: '(prompt)', cls: 'text-zinc-300' }],
      [{ text: 'if', cls: 'text-maroon-400' }, { text: ' (reply.', cls: 'text-zinc-300' }, { text: 'confidence', cls: 'text-sky-400' }, { text: ' > 0.9) {', cls: 'text-zinc-300' }],
      [{ text: '  ', cls: 'text-zinc-300' }, { text: 'notify', cls: 'text-sky-400' }, { text: '(', cls: 'text-zinc-300' }, { text: "'insight ready'", cls: 'text-emerald-400' }, { text: ')', cls: 'text-zinc-300' }],
      [{ text: '}', cls: 'text-zinc-500' }],
    ],
    flow: [
      { label: 'Input', icon: Globe },
      { label: 'Model', icon: Cpu },
      { label: 'Insight', icon: Sparkles },
    ],
    stats: [
      { label: 'Accuracy', value: '96%' },
      { label: 'Latency', value: '210ms' },
      { label: 'Throughput', value: '340 tok/s' },
    ],
  },
};

export const ServiceVisual: React.FC<ServiceVisualProps> = ({ service, isLightMode = true }) => {
  const content = CONTENT[service.id] ?? CONTENT.software;

  return (
    <div
      className={`h-full flex flex-col rounded-2xl border overflow-hidden ${
        isLightMode ? 'bg-slate-900 border-slate-800' : 'bg-black/80 border-zinc-800'
      }`}
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={content.fileName}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="text-[11px] font-mono text-zinc-400"
            >
              {content.fileName}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
          />
          LIVE
        </div>
      </div>

      {/* Code block */}
      <div className="px-5 py-5 font-mono text-[11px] sm:text-xs leading-relaxed flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {content.lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.08 * i }}
                className="whitespace-pre"
              >
                <span className="select-none text-zinc-600 mr-3">{i + 1}</span>
                {line.map((tok, j) => (
                  <span key={j} className={tok.cls}>
                    {tok.text}
                  </span>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Data flow diagram */}
      <div className="px-5 pb-5 shrink-0">
        <div className="relative flex items-center justify-between py-3">
          {/* connecting line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-maroon-500/10 via-maroon-500/40 to-maroon-500/10" />
          {/* animated traveling dot */}
          <motion.span
            aria-hidden="true"
            className="absolute top-1/2 w-1.5 h-1.5 rounded-full bg-maroon-400 shadow-[0_0_8px_2px_rgba(251,146,60,0.6)]"
            style={{ left: '1.5rem', translateY: '-50%' }}
            animate={{ left: ['1.5rem', 'calc(100% - 1.5rem)', '1.5rem'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 flex items-center justify-between w-full"
            >
              {content.flow.map((node, idx) => {
                const Icon = node.icon;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-maroon-500/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-maroon-400" />
                    </div>
                    <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-wide">{node.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10"
          >
            {content.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs sm:text-sm font-black text-white">{stat.value}</div>
                <div className="text-[9px] font-medium text-zinc-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
