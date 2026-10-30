type Step = { title: string; description: string };

type Props = {
  steps: Step[];
  className?: string;
};

export function EscrowFlow({ steps, className = '' }: Props) {
  return (
    <div className={`rg-iso-flow ${className}`}>
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
