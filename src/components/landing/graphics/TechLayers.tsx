import { IsoCube } from './iso-primitives';
import { IsoScene } from './IsoScene';

type Layer = { title: string; description: string };

type Props = {
  layers: Layer[];
  className?: string;
};

const COLORS = ['#D4A017', '#2563EB', '#081A33', '#3B82F6', '#C4940F'];

export function TechLayers({ layers, className = '' }: Props) {
  return (
    <div className={`rg-iso-tech ${className}`}>
      <IsoScene>
        <svg className="rg-iso rg-iso--tech" viewBox="0 0 280 250" aria-hidden>
          {layers.map((_, i) => (
            <g
              key={i}
              className="rg-iso-tech__slab"
              style={{ ['--i' as string]: String(i) }}
              transform={`translate(0, ${i * -6})`}
            >
              <IsoCube
                cx={140}
                cy={188 - i * 32}
                w={200 - i * 18}
                d={80 - i * 6}
                h={22}
                topFill={COLORS[i % COLORS.length]}
              />
            </g>
          ))}
        </svg>
      </IsoScene>
      <ul className="rg-iso-tech__list">
        {layers.map((layer, i) => (
          <li key={i} style={{ ['--i' as string]: String(i) }}>
            <span className="rg-iso-tech__dot" style={{ background: COLORS[i % COLORS.length] }} />
            <div>
              <strong>{layer.title}</strong>
              <p>{layer.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
