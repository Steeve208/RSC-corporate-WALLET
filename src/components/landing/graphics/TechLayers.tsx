type Layer = { title: string; description: string };

type Props = {
  layers: Layer[];
  className?: string;
};

const COLORS = ['#D4A017', '#2563EB', '#081A33', '#3B82F6', '#C4940F'];

export function TechLayers({ layers, className = '' }: Props) {
  return (
    <div className={`rg-iso-tech ${className}`}>
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
