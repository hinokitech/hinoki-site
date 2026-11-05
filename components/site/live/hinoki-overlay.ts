// Hinoki's marks over the event camera's side of the view: the path so far,
// the forecast to the next bounce, and a box with the track's ID. Drawn on a
// 2D canvas laid over the WebGL one, clipped to the event side, every frame.

import { LAYOUT, type TwoCameraFrame } from "./two-camera-engine";
import { forecast } from "./hinoki-sim";

const ACCENT = "#e8622a";
const TRAIL_S = 0.7;

/** Recent ball positions, for the dotted path behind it. */
export class TrackTrail {
  private points: { t: number; x: number; y: number }[] = [];

  push(f: TwoCameraFrame) {
    const last = this.points[this.points.length - 1];
    if (last && f.clock - last.t < 1 / 120) return;
    this.points.push({ t: f.clock, x: f.x, y: f.y });
    while (this.points.length > 2 && f.clock - this.points[0].t > TRAIL_S) this.points.shift();
  }

  clear() {
    this.points = [];
  }

  get all() {
    return this.points;
  }
}

export type OverlayOptions = {
  /** The tag above the box, such as "01 · ball · 97%". */
  tag: string;
  /** The label beside the forecast's landing mark, such as "0.31 s". */
  eta: (seconds: number) => string;
  font: string;
  dpr: number;
};

export function clearOverlay(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function drawOverlay(ctx: CanvasRenderingContext2D, f: TwoCameraFrame, trail: TrackTrail, o: OverlayOptions) {
  const W = ctx.canvas.width, H = ctx.canvas.height, d = o.dpr;
  clearOverlay(ctx);
  const left = f.split * W;
  if (left >= W - 1) return;
  const X = (x: number) => (x / f.aspect) * W;
  const Y = (y: number) => (1 - y) * H;

  ctx.save();
  ctx.beginPath();
  ctx.rect(left, 0, W - left, H);
  ctx.clip();
  ctx.lineCap = "round";

  // The path so far.
  const path = trail.all;
  if (path.length > 1) {
    ctx.beginPath();
    path.forEach((p, i) => (i ? ctx.lineTo(X(p.x), Y(p.y)) : ctx.moveTo(X(p.x), Y(p.y))));
    ctx.setLineDash([2 * d, 5 * d]);
    ctx.lineWidth = 1.5 * d;
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.stroke();
  }

  // Where it lands next.
  const next = forecast(f);
  if (next) {
    ctx.beginPath();
    next.points.forEach((p, i) => (i ? ctx.lineTo(X(p.x), Y(p.y)) : ctx.moveTo(X(p.x), Y(p.y))));
    ctx.setLineDash([6 * d, 5 * d]);
    ctx.lineWidth = 1.5 * d;
    ctx.strokeStyle = ACCENT;
    ctx.globalAlpha = 0.85;
    ctx.stroke();
    ctx.globalAlpha = 1;
    const end = next.points[next.points.length - 1];
    const mx = X(end.x), my = Y(LAYOUT.ground), s = 6 * d;
    ctx.setLineDash([]);
    ctx.lineWidth = 1.6 * d;
    ctx.beginPath();
    ctx.moveTo(mx - s, my - s);
    ctx.lineTo(mx + s, my + s);
    ctx.moveTo(mx + s, my - s);
    ctx.lineTo(mx - s, my + s);
    ctx.stroke();
    ctx.font = o.font;
    ctx.fillStyle = ACCENT;
    ctx.textBaseline = "alphabetic";
    const label = o.eta(next.t);
    const lw = ctx.measureText(label).width;
    const lx = mx + s + 4 * d + lw > W - 4 * d ? mx - s - 4 * d - lw : mx + s + 4 * d;
    ctx.fillText(label, lx, my - s - 2 * d);
  }

  // The box and its tag.
  const cx = X(f.x), cy = Y(f.y), r = (LAYOUT.ballR + 0.022) * H, c = 9 * d;
  ctx.setLineDash([]);
  ctx.lineWidth = 1.6 * d;
  ctx.strokeStyle = "#ffffff";
  ctx.beginPath();
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    const px = cx + sx * r, py = cy + sy * r;
    ctx.moveTo(px - sx * c, py);
    ctx.lineTo(px, py);
    ctx.lineTo(px, py - sy * c);
  }
  ctx.stroke();

  ctx.font = o.font;
  const tw = ctx.measureText(o.tag).width, th = 19 * d, pad = 8 * d;
  let tx = cx - r, ty = cy - r - 6 * d - th;
  if (ty < 4 * d) ty = cy + r + 6 * d;
  tx = Math.max(left + 4 * d, Math.min(W - tw - 2 * pad - 4 * d, tx));
  ctx.fillStyle = "rgba(10,11,13,0.9)";
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 0.8 * d;
  ctx.beginPath();
  ctx.roundRect(tx, ty, tw + 2 * pad, th, 4 * d);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "middle";
  ctx.fillText(o.tag, tx + pad, ty + th / 2 + 0.5 * d);

  ctx.restore();
}
