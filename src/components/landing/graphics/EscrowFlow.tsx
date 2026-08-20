import { IsoCube } from './iso-primitives';
import { IsoScene } from './IsoScene';

type Step = { title: string; description: string };

type Props = {
  steps: Step[];
  className?: string;
};

export function EscrowFlow({ steps, className = '' }: Props) {
  return (
    <div className={`rg-iso-flow ${className}`}>
      <IsoScene>
        <svg className="rg-iso rg-iso--escrow-flow" viewBox="0 0 520 140" aria-hidden>
          <defs>
            <marker id="arrowGold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#D4A017" />
            </marker>
            <filter id="escrowGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            className="rg-iso__rail"
            d="M120 70 L200 70"
            fill="none"
            stroke="#D4A017"
            strokeWidth="1.1"
            markerEnd="url(#arrowGold)"
            opacity="0.55"
          />
          <path
            className="rg-iso__rail"
            d="M320 70 L400 70"
            fill="none"
            stroke="#D4A017"
            strokeWidth="1.1"
            markerEnd="url(#arrowGold)"
            opacity="0.55"
          />
          <g className="rg-iso-flow__cube" style={{ ['--i' as string]: '0' }}>
            <IsoCube cx={70} cy={90} w={48} d={48} h={32} topFill="#2563EB" />
          </g>
          <g className="rg-iso-flow__cube" style={{ ['--i' as string]: '1' }}>
            <IsoCube cx={260} cy={90} w={48} d={48} h={32} topFill="#D4A017" />
          </g>
          <g className="rg-iso-flow__cube" style={{ ['--i' as string]: '2' }}>
            <IsoCube cx={450} cy={90} w={48} d={48} h={32} topFill="#081A33" />
          </g>
          <circle className="rg-vig__seal" cx={260} cy={50} r={16} fill="none" stroke="#D4A017" strokeWidth="1.5" />
          <circle className="rg-iso__courier" r="3.2" fill="#D4A017" filter="url(#escrowGlow)">
            <animateMotion dur="4.2s" repeatCount="indefinite" path="M70,70 L260,70 L450,70" />
          </circle>
        </svg>
      </IsoScene>
      <ol className="rg-iso-flow__steps">
        {steps.map((step, i) => (
          <li key={i} className="rg-iso-flow__step" style={{ ['--i' as string]: String(i) }}>
            <span className="rg-iso-flow__num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
