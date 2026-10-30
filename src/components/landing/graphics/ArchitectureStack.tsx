import { useEffect, useState } from 'react';

export type StackLayer = { id: string; label: string; items: string[] };

type Props = {
  layers: StackLayer[];
  className?: string;
  ariaLabel?: string;
};

export function ArchitectureStack({ layers, className = '', ariaLabel }: Props) {
  const [active, setActive] = useState<string | null>(layers[0]?.id ?? null);
  const [paused, setPaused] = useState(false);

  const layerKey = layers.map((l) => l.id).join('|');

  useEffect(() => {
    if (paused || !layerKey) return;
    const ids = layerKey.split('|');
    const tick = window.setInterval(() => {
      setActive((curr) => {
        const idx = Math.max(0, ids.indexOf(curr ?? ''));
        return ids[(idx + 1) % ids.length];
      });
    }, 3200);
    return () => window.clearInterval(tick);
  }, [paused, layerKey]);

  return (
    <div
      className={`rg-iso-stack ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="rg-iso-stack__legend" aria-live="polite" aria-label={ariaLabel}>
        {layers.map((layer) => (
          <button
            key={layer.id}
            type="button"
            className={`rg-iso-stack__item${active === layer.id ? ' is-active' : ''}`}
            onMouseEnter={() => setActive(layer.id)}
            onFocus={() => setActive(layer.id)}
            onClick={() => setActive(layer.id)}
          >
            <span className="rg-iso-stack__item-name">{layer.label}</span>
            <span className="rg-iso-stack__item-desc">{layer.items.join(' · ')}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
