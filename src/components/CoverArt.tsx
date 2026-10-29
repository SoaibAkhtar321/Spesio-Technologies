import type { Project } from '../content/site';

/**
 * Generated cover art for each project — no stock screenshots.
 * Each motif hints at the product: a map grid, a pickup queue, embroidered thread.
 */
export function CoverArt({ project, label = true }: { project: Project; label?: boolean }) {
  const [accent, deep] = project.hue;
  const id = project.slug;
  return (
    <div className="art" style={{ background: deep }}>
      <svg viewBox="0 0 800 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={`g-${id}`} cx="70%" cy="30%" r="75%">
            <stop offset="0" stopColor={accent} stopOpacity="0.55" />
            <stop offset="0.6" stopColor={accent} stopOpacity="0.05" />
            <stop offset="1" stopColor={deep} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="620" fill={`url(#g-${id})`} />
        {project.motif === 'map' && <MapMotif accent={accent} />}
        {project.motif === 'queue' && <QueueMotif accent={accent} />}
        {project.motif === 'thread' && <ThreadMotif accent={accent} />}
      </svg>
      {label && <span className="art__label">{project.name.split(' ')[0]}</span>}
    </div>
  );
}

function MapMotif({ accent }: { accent: string }) {
  const lines = [];
  for (let i = 0; i < 18; i++) {
    lines.push(<path key={`h${i}`} d={`M-20 ${40 + i * 36} Q 400 ${20 + i * 36 + Math.sin(i) * 30} 820 ${50 + i * 36}`} stroke="#efece6" strokeOpacity="0.09" fill="none" />);
  }
  for (let i = 0; i < 22; i++) {
    lines.push(<path key={`v${i}`} d={`M${i * 40} -20 Q ${i * 40 + Math.cos(i) * 24} 310 ${i * 40 - 10} 640`} stroke="#efece6" strokeOpacity="0.07" fill="none" />);
  }
  const plots = [
    [470, 170, 120, 80], [600, 250, 90, 110], [420, 280, 150, 70], [540, 380, 110, 90],
  ];
  return (
    <g>
      {lines}
      {plots.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={accent} fillOpacity={0.08 + i * 0.05} stroke={accent} strokeOpacity="0.8" />
      ))}
      {[[530, 210], [645, 305], [495, 315], [595, 425]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="22" fill={accent} fillOpacity="0.18">
            <animate attributeName="r" values="10;28;10" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <circle r="6" fill={accent} />
        </g>
      ))}
    </g>
  );
}

function QueueMotif({ accent }: { accent: string }) {
  const slots = ['12:00', '12:15', '12:30', '12:45', '13:00'];
  return (
    <g fontFamily="JetBrains Mono, monospace">
      <rect x="430" y="70" width="230" height="470" rx="34" fill="#0b0b0c" stroke="#efece6" strokeOpacity="0.2" />
      <rect x="500" y="88" width="90" height="10" rx="5" fill="#efece6" fillOpacity="0.15" />
      {slots.map((s, i) => (
        <g key={s} transform={`translate(452 ${130 + i * 74})`}>
          <rect width="186" height="58" rx="12" fill={i === 1 ? accent : '#efece6'} fillOpacity={i === 1 ? 1 : 0.06} />
          <text x="16" y="35" fontSize="15" fill={i === 1 ? '#0b0b0c' : '#efece6'} fillOpacity={i === 1 ? 1 : 0.6}>{s}</text>
          <rect x="96" y="25" width="74" height="8" rx="4" fill={i === 1 ? '#0b0b0c' : '#efece6'} fillOpacity={0.25} />
          <rect x="96" y="25" width={[60, 74, 44, 22, 10][i]} height="8" rx="4" fill={i === 1 ? '#0b0b0c' : accent} fillOpacity={i === 1 ? 0.8 : 0.8} />
        </g>
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={120 + i * 34} cy={340} r="9" fill={accent} fillOpacity={1 - i * 0.1}>
          <animate attributeName="cx" values={`${80 + i * 34};${120 + i * 34}`} dur="1.6s" repeatCount="indefinite" />
        </circle>
      ))}
      <path d="M80 340 H 420" stroke={accent} strokeOpacity="0.25" strokeDasharray="2 8" />
    </g>
  );
}

function ThreadMotif({ accent }: { accent: string }) {
  const petals = Array.from({ length: 12 });
  return (
    <g transform="translate(560 270)">
      {[200, 150, 100].map((r, k) => (
        <circle key={r} r={r} fill="none" stroke={accent} strokeOpacity={0.15 + k * 0.1} strokeDasharray="3 7" />
      ))}
      {petals.map((_, i) => (
        <path
          key={i}
          transform={`rotate(${i * 30})`}
          d="M0 0 C 30 -40, 30 -100, 0 -130 C -30 -100, -30 -40, 0 0 Z"
          fill="none"
          stroke={accent}
          strokeOpacity="0.85"
          strokeDasharray="4 5"
        />
      ))}
      <circle r="16" fill={accent} />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite" />
        {petals.map((_, i) => (
          <circle key={i} cx={Math.cos((i * Math.PI) / 6) * 175} cy={Math.sin((i * Math.PI) / 6) * 175} r="4" fill={accent} />
        ))}
      </g>
    </g>
  );
}
