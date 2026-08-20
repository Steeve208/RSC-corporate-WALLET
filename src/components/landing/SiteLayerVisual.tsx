import { useEffect, useRef } from 'react';
import { useTranslation } from '../../contexts/I18nContext';
import '../../styles/site-layers.css';

const TILES = ['reeskova', 'wallet', 'p2p', 'corporate', 'escrow', 'chain'] as const;

/** Compact 3-layer stack used on inner marketing pages. */
export function SiteLayerVisual() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tmr = window.setTimeout(() => el.classList.add('is-live'), reduce ? 0 : 40);
    if (reduce) return () => window.clearTimeout(tmr);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      window.clearTimeout(tmr);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="rk-3d" aria-hidden>
      <div className="rk-3d__floor" />
      <div className="rk-3d__world">
        <div className="rk-3d__layer rk-3d__layer--top" style={{ ['--z' as string]: '56px' }}>
          <ul className="rk-3d-tiles">
            {TILES.map((key, i) => (
              <li key={key} className={`rk-3d-tile rk-3d-tile--${key}`} style={{ ['--i' as string]: String(i) }}>
                <span>{t(`landing.group.products.${key}.name`)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rk-3d__layer" style={{ ['--z' as string]: '28px' }}>
          <div className="rk-3d-plate rk-3d-plate--gold">
            <span>{t('landing.group.products.escrow.name')}</span>
            <span>API</span>
            <span>{t('landing.group.stackLayers.rails.label')}</span>
          </div>
        </div>
        <div className="rk-3d__layer" style={{ ['--z' as string]: '0px' }}>
          <div className="rk-3d-plate rk-3d-plate--navy">
            <strong>{t('landing.group.products.chain.name')}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
