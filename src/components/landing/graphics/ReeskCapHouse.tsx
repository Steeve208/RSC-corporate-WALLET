import { useEffect, useRef } from 'react';

type Props = {
  labels?: Record<string, string>;
  layerLabels?: {
    products: string;
    rails: string;
    chain: string;
  };
  className?: string;
};

const PRODUCTS = ['reeskova', 'wallet', 'p2p', 'corporate', 'escrow', 'chain'] as const;

export function ReeskCapHouse({ labels, layerLabels, className = '' }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = () => el.classList.add('is-live');
    const t = window.setTimeout(show, reduce ? 0 : 40);

    if (reduce) return () => window.clearTimeout(t);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--mx', x.toFixed(3));
      el.style.setProperty('--my', y.toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      window.clearTimeout(t);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const L = {
    products: layerLabels?.products ?? 'Products',
    rails: layerLabels?.rails ?? 'Rails',
    chain: layerLabels?.chain ?? 'Chain',
  };

  return (
    <div ref={rootRef} className={`rg-3d ${className}`}>
      <div className="rg-3d__floor" aria-hidden />
      <div className="rg-3d__world">
        <section className="rg-3d__layer rg-3d__layer--products" style={{ ['--z' as string]: '72px' }}>
          <p className="rg-3d__caption">{L.products}</p>
          <ul className="rg-3d-tiles">
            {PRODUCTS.map((key, i) => (
              <li
                key={key}
                className={`rg-3d-tile rg-3d-tile--${key}`}
                style={{ ['--i' as string]: String(i) }}
              >
                <span>{labels?.[key] ?? key}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rg-3d__layer rg-3d__layer--rails" style={{ ['--z' as string]: '36px' }}>
          <p className="rg-3d__caption rg-3d__caption--on-gold">{L.rails}</p>
          <div className="rg-3d-plate rg-3d-plate--gold">
            <span>{labels?.escrow ?? 'Escrow'}</span>
            <span>API</span>
            <span>{labels?.wallet ?? 'Wallet'}</span>
          </div>
        </section>

        <section className="rg-3d__layer rg-3d__layer--chain" style={{ ['--z' as string]: '0px' }}>
          <p className="rg-3d__caption rg-3d__caption--on-navy">{L.chain}</p>
          <div className="rg-3d-plate rg-3d-plate--navy">
            <strong>{labels?.chain ?? 'RSC Chain'}</strong>
          </div>
        </section>
      </div>
    </div>
  );
}
