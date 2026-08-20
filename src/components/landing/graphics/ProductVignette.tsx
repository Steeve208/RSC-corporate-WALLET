import { IsoCube } from './iso-primitives';
import { IsoScene } from './IsoScene';

export type ProductKey = 'reeskova' | 'chain' | 'p2p' | 'escrow' | 'wallet' | 'corporate';

type Props = {
  product: ProductKey;
  className?: string;
};

function ReeskovaVignette() {
  return (
    <g className="rg-vig rg-vig--reeskova">
      <IsoCube cx={120} cy={200} w={80} d={60} h={100} topFill="#D4A017" />
      <g className="rg-vig__cap">
        <IsoCube cx={120} cy={140} w={60} d={50} h={40} topFill="#E0B028" />
      </g>
      <path className="rg-vig__arc" d="M 80 140 Q 120 96 160 140" fill="none" stroke="#D4A017" strokeWidth="1.5" />
      <rect className="rg-vig__win rg-vig__win--a" x="105" y="160" width="8" height="12" fill="rgba(255,255,255,0.35)" />
      <rect className="rg-vig__win rg-vig__win--b" x="127" y="160" width="8" height="12" fill="rgba(255,255,255,0.35)" />
      <rect className="rg-vig__win rg-vig__win--c" x="105" y="180" width="8" height="12" fill="rgba(255,255,255,0.22)" />
      <rect className="rg-vig__win rg-vig__win--d" x="127" y="180" width="8" height="12" fill="rgba(255,255,255,0.22)" />
    </g>
  );
}

function ChainVignette() {
  return (
    <g className="rg-vig rg-vig--chain">
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <g
            key={`${row}-${col}`}
            className="rg-vig__node"
            style={{ ['--i' as string]: String(row * 3 + col) }}
          >
            <IsoCube
              cx={70 + col * 50}
              cy={180 - row * 40}
              w={32}
              d={32}
              h={22}
              topFill={row === 1 && col === 1 ? '#D4A017' : '#2563EB'}
            />
          </g>
        )),
      )}
      <path
        className="rg-vig__pulse-ring"
        d="M 110 140 L 130 140 L 140 160 L 130 180 L 110 180 L 100 160 Z"
        fill="none"
        stroke="#D4A017"
        strokeWidth="1"
      />
    </g>
  );
}

function WalletVignette() {
  return (
    <g className="rg-vig rg-vig--wallet">
      <g className="rg-vig__card">
        <rect x="70" y="130" width="100" height="64" rx="8" fill="#081A33" stroke="#D4A017" strokeWidth="1.5" />
        <rect className="rg-vig__chip" x="82" y="148" width="48" height="8" rx="2" fill="#D4A017" />
        <circle className="rg-vig__mark" cx="150" cy="162" r="10" fill="#D4A017" opacity="0.4" />
        <rect className="rg-vig__sheen" x="70" y="130" width="18" height="64" fill="rgba(255,255,255,0.12)" />
      </g>
    </g>
  );
}

function P2pVignette() {
  return (
    <g className="rg-vig rg-vig--p2p">
      <g className="rg-vig__vol rg-vig__vol--l">
        <IsoCube cx={90} cy={190} w={44} d={44} h={36} topFill="#2563EB" />
      </g>
      <g className="rg-vig__vol rg-vig__vol--r">
        <IsoCube cx={150} cy={190} w={44} d={44} h={36} topFill="#D4A017" />
      </g>
      <path className="rg-vig__bridge" d="M 108 168 Q 120 138 132 168" fill="none" stroke="#D4A017" strokeWidth="1.4" />
      <circle className="rg-iso__courier" r="2.2" fill="#D4A017">
        <animateMotion dur="2.8s" repeatCount="indefinite" path="M108,168 Q120,138 132,168" />
      </circle>
    </g>
  );
}

function EscrowVignette() {
  return (
    <g className="rg-vig rg-vig--escrow">
      <ellipse className="rg-iso__shadow" cx={120} cy={214} rx={56} ry={12} fill="rgba(8,26,51,0.1)" />
      <path
        d="M 72 180 L 120 150 L 168 180 L 168 220 L 72 220 Z"
        fill="#081A33"
        stroke="#D4A017"
        strokeWidth="1.25"
      />
      <g className="rg-vig__seal">
        <circle cx={120} cy={195} r={14} fill="none" stroke="#D4A017" strokeWidth="2" />
        <path d="M 114 195 L 118 199 L 126 191" fill="none" stroke="#D4A017" strokeWidth="1.5" />
      </g>
    </g>
  );
}

function CorporateVignette() {
  return (
    <g className="rg-vig rg-vig--corporate">
      <IsoCube cx={120} cy={210} w={120} d={50} h={20} topFill="#081A33" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="rg-vig__col" style={{ ['--i' as string]: String(i) }}>
          <IsoCube
            cx={70 + i * 34}
            cy={170}
            w={24}
            d={24}
            h={50}
            topFill="#0F2847"
            leftFill="#061428"
            rightFill="#081A33"
          />
        </g>
      ))}
      <rect className="rg-vig__portal" x="108" y="148" width="24" height="32" fill="#D4A017" />
    </g>
  );
}

const VIGNETTES: Record<ProductKey, () => JSX.Element> = {
  reeskova: ReeskovaVignette,
  chain: ChainVignette,
  wallet: WalletVignette,
  p2p: P2pVignette,
  escrow: EscrowVignette,
  corporate: CorporateVignette,
};

export function ProductVignette({ product, className = '' }: Props) {
  const V = VIGNETTES[product];
  return (
    <IsoScene className={className}>
      <svg
        className={`rg-iso rg-iso--vignette rg-iso--${product}`}
        viewBox="0 0 240 260"
        role="img"
        aria-hidden
      >
        <ellipse className="rg-iso__shadow" cx={120} cy={232} rx={80} ry={12} fill="rgba(8,26,51,0.07)" />
        <V />
      </svg>
    </IsoScene>
  );
}
