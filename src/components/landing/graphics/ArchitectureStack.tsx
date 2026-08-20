import { useEffect, useState } from 'react';
import { IsoCube } from './iso-primitives';
import { IsoScene } from './IsoScene';

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
      <IsoScene>
        <svg className="rg-iso rg-iso--stack" viewBox="0 0 480 360" role="img" aria-label={ariaLabel}>
          {layers.map((layer, li) => {
            const baseY = 280 - li * 72;
            const isActive = active === layer.id;
            return (
              <g
                key={layer.id}
                className={`rg-iso-stack__layer${isActive ? ' is-active' : ''}`}
                style={{ ['--li' as string]: String(li) }}
                onMouseEnter={() => setActive(layer.id)}
                onFocus={() => setActive(layer.id)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
              >
                <IsoCube
                  cx={240}
                  cy={baseY}
                  w={280 - li * 20}
                  d={100}
                  h={28}
                  topFill={isActive ? '#D4A017' : '#2563EB'}
                  leftFill="#081A33"
                  rightFill="#0F2847"
                />
                {layer.items.map((_, ii) => (
                  <g
                    key={ii}
                    className="rg-iso-stack__brick"
                    style={{ ['--bi' as string]: String(ii) }}
                  >
                    <IsoCube
                      cx={140 + ii * 70}
                      cy={baseY - 34}
                      w={32}
                      d={32}
                      h={22}
                      topFill={isActive ? '#E0B028' : '#3B82F6'}
                    />
                  </g>
                ))}
                <text
                  x={240}
                  y={baseY - 58}
                  textAnchor="middle"
                  className="rg-iso__label"
                  fontSize="11"
                  fill={isActive ? '#081A33' : '#64748B'}
                >
                  {layer.label}
                </text>
              </g>
            );
          })}
        </svg>
      </IsoScene>
      <div className="rg-iso-stack__legend" aria-live="polite">
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
