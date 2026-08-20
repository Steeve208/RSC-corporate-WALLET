type IsoCubeProps = {
  cx: number;
  cy: number;
  w: number;
  d: number;
  h: number;
  topFill?: string;
  leftFill?: string;
  rightFill?: string;
  className?: string;
};

function isoPoint(cx: number, cy: number, x: number, y: number, z: number) {
  return {
    x: cx + (x - y),
    y: cy - z + (x + y) * 0.5,
  };
}

function pts(...points: { x: number; y: number }[]) {
  return points.map((p) => `${p.x},${p.y}`).join(' ');
}

/** 2:1 isometric cube. (cx, cy) is the ground-plane center. */
export function IsoCube({
  cx,
  cy,
  w,
  d,
  h,
  topFill = '#2563EB',
  leftFill = '#061428',
  rightFill = '#0F2847',
  className = '',
}: IsoCubeProps) {
  const hw = w / 2;
  const hd = d / 2;
  const p = (x: number, y: number, z: number) => isoPoint(cx, cy, x, y, z);

  const tfl = p(-hw, -hd, h);
  const tfr = p(hw, -hd, h);
  const tbr = p(hw, hd, h);
  const tbl = p(-hw, hd, h);
  const bfr = p(hw, -hd, 0);
  const bbr = p(hw, hd, 0);
  const bbl = p(-hw, hd, 0);

  return (
    <g className={`rg-iso-cube ${className}`.trim()}>
      <polygon points={pts(tbl, tbr, bbr, bbl)} fill={leftFill} />
      <polygon points={pts(tfr, tbr, bbr, bfr)} fill={rightFill} />
      <polygon points={pts(tfl, tfr, tbr, tbl)} fill={topFill} />
      <polygon className="rg-iso-cube__shine" points={pts(tfl, tfr, tbr, tbl)} fill="rgba(255,255,255,0.1)" />
      <polyline
        points={pts(tbl, tfl, tfr, bfr)}
        fill="none"
        stroke="rgba(247,244,238,0.32)"
        strokeWidth="1.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line x1={tfr.x} y1={tfr.y} x2={tbr.x} y2={tbr.y} stroke="rgba(8,26,51,0.2)" strokeWidth="0.9" />
      <line x1={tbl.x} y1={tbl.y} x2={tbr.x} y2={tbr.y} stroke="rgba(8,26,51,0.16)" strokeWidth="0.8" />
    </g>
  );
}

export function isoTopY(cy: number, h: number) {
  return cy - h;
}
