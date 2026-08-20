import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
  mode?: 'camera' | 'flat';
};

/** Perspective stage with a slow camera yaw and pointer parallax. */
export function IsoScene({ className = '', children, mode = 'camera' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const flat = mode === 'flat';

  useEffect(() => {
    const el = ref.current;
    if (!el || flat) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--iso-rx', `${(-y * 10).toFixed(2)}deg`);
      el.style.setProperty('--iso-ry', `${(x * 12).toFixed(2)}deg`);
    };
    const onLeave = () => {
      el.style.setProperty('--iso-rx', '0deg');
      el.style.setProperty('--iso-ry', '0deg');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [flat]);

  return (
    <div ref={ref} className={`rg-iso-scene${flat ? ' rg-iso-scene--flat' : ''} ${className}`}>
      <div className="rg-iso-scene__stage">{children}</div>
    </div>
  );
}
