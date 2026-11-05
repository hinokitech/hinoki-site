// Two cameras, one scene. A shader draws a warehouse bay in linear light (a
// sunlit dock door can be dozens of times brighter than the room) with a ball
// bouncing across it, and two simulated cameras watch it at once:
// - The normal camera takes a snapshot 30 times a second, smeared over its
//   exposure, through a response that clips and blooms in bright light, and
//   holds each snapshot until the next.
// - The event camera runs the per-pixel model from the offline converter
//   (site-rebuild-inputs/tools/event-sim.mjs): a pixel reports when its log
//   brightness moves a threshold away from the level it last reported, ON
//   where it rose and OFF where it fell, and stays silent while nothing changes.
// The two views share the canvas either side of a movable split. An
// illustration, not recorded data.

export type TwoCameraParams = {
  /** Share of the width given to the normal camera, 0..1: small changes apply at once, big ones ease over. */
  split: number;
  /** Ball speed, 0..1. */
  speed: number;
  /** Sunlight at the dock door, 0..1 (a log scale from overcast to direct sun). */
  sun: number;
  /** Freeze the ball where it is. */
  hold: boolean;
};

/** Live rates, both scaled to a 1280×720 sensor. */
export type TwoCameraRates = { events: number; pixels: number };

/** The scene's layout, in scene units: the view is 1 unit tall and `aspect` wide, y up. */
export const LAYOUT = {
  ballR: 0.055,
  /** Where the ball meets the floor. */
  ground: 0.085,
  bounce: 0.42,
  /** How close the ball's centre comes to either side, beyond its radius. */
  margin: 0.02,
  /** The dock door: x as shares of the width, y in scene units. */
  doorX0: 0.38,
  doorX1: 0.62,
  doorY0: 0.2,
  doorY1: 0.76,
};

/** The ball and the running counts after each displayed frame. One object, reused. */
export type TwoCameraFrame = {
  /** Scene time, s. */
  clock: number;
  aspect: number;
  /** The split as drawn this frame (it eases toward the one asked for). */
  split: number;
  /** Ball centre and velocity, scene units and units/s. */
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Bounce phase (the ball touches the floor at every multiple of π) and its rate, rad/s. */
  phase: number;
  rate: number;
  held: boolean;
  bounces: number;
  doorEntries: number;
  /** Events so far, scaled to a 1280×720 sensor. */
  events: number;
};

export type TwoCamera = {
  start: () => void;
  stop: () => void;
  resize: () => void;
  set: (p: Partial<TwoCameraParams>) => void;
  destroy: () => void;
};

const REF_W = 1280, REF_H = 720; // sensor the readouts are scaled to
const FPS = 30; // normal camera
const EXPOSURE = 1 / 60; // its shutter time
const BLUR_SAMPLES = 10;
const SUB = 4; // event-camera reads per displayed frame
const BALL_R = LAYOUT.ballR;
const GROUND = LAYOUT.ground;
const BOUNCE = LAYOUT.bounce;
const EV = { thr: 0.2, sigma: 0.03, floor: 0.01, logHi: 60, tau: 0.05, fill: 0.85, gain: 2.2 };
const NOISE_PER_S = 0.0008; // background events per pixel per second
const TWINKLE_PER_S = 0.6; // flicker events per lamp pixel per second
const COLORS = { bg: [10, 11, 13], on: [232, 98, 42], off: [144, 153, 168] };

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

// The bay and the ball, in linear RGB. Shared by both cameras.
const SCENE = `
const float FLOOR = 0.2;
const float GROUND = ${GROUND.toFixed(4)};
uniform float uA;      // scene width; the height is 1
uniform float uSun;    // daylight at the door, in room-light units
uniform float uPx;     // one pixel of the camera drawing this, in scene units

float h21(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
float h31(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }

// A box with about a pixel of soft edge, so still edges don't shimmer.
float box(vec2 p, vec2 lo, vec2 hi) {
  vec2 a = smoothstep(lo - uPx, lo + uPx, p) * (1.0 - smoothstep(hi - uPx, hi + uPx, p));
  return a.x * a.y;
}

// The dock door sits in the middle of the back wall, so the divider's
// starting place cuts it in half: one camera on each side of the glare.
vec2 doorLo() { return vec2(uA * ${LAYOUT.doorX0.toFixed(4)}, ${LAYOUT.doorY0.toFixed(4)}); }
vec2 doorHi() { return vec2(uA * ${LAYOUT.doorX1.toFixed(4)}, ${LAYOUT.doorY1.toFixed(4)}); }

float doorDist(vec2 p) { return length(p - clamp(p, doorLo(), doorHi())); }

// The two ceiling lamps, one over each rack.
float lampX(int k) { return uA * (k == 0 ? 0.185 : 0.815); }

// Light falling on the room: the lamps, and daylight spilling in from the door.
vec3 roomLight(vec2 p) {
  float lamps = exp(-pow((p.x - lampX(0)) / 0.34, 2.0)) + exp(-pow((p.x - lampX(1)) / 0.34, 2.0));
  vec3 l = vec3(0.42) + vec3(1.0, 0.95, 0.86) * 0.55 * lamps * (0.55 + 0.45 * p.y);
  return l + vec3(0.75, 0.85, 1.0) * uSun * 0.05 * exp(-doorDist(p) / 0.12);
}

// The yard seen through the open door: sky, a warehouse across the way and a
// parked truck, all lit by the sun.
vec3 yard(vec2 p) {
  vec2 lo = doorLo(), hi = doorHi();
  float w = hi.x - lo.x;
  vec3 c = mix(vec3(0.82, 0.9, 1.0), vec3(0.6, 0.72, 0.95), clamp((p.y - lo.y) / (hi.y - lo.y), 0.0, 1.0));
  vec3 shed = vec3(0.48, 0.49, 0.52) * (fract((p.x - lo.x) / 0.045) < 0.08 ? 0.8 : 1.0);
  c = mix(c, shed, box(p, vec2(lo.x - 1.0, FLOOR + 0.03), vec2(hi.x + 1.0, FLOOR + 0.24)));
  // The truck faces left, so the half of the door left of the divider shows
  // its cab, not just two wheels that could pass for balls.
  c = mix(c, vec3(0.88, 0.89, 0.92), box(p, vec2(lo.x + w * 0.34, FLOOR + 0.05), vec2(lo.x + w * 0.95, FLOOR + 0.3)));
  c = mix(c, vec3(0.7, 0.72, 0.78), box(p, vec2(lo.x + w * 0.1, FLOOR + 0.05), vec2(lo.x + w * 0.32, FLOOR + 0.22)));
  c = mix(c, vec3(0.18, 0.22, 0.3), box(p, vec2(lo.x + w * 0.12, FLOOR + 0.15), vec2(lo.x + w * 0.23, FLOOR + 0.205)));
  c = mix(c, vec3(0.14), box(p, vec2(lo.x + w * 0.1, FLOOR + 0.04), vec2(lo.x + w * 0.95, FLOOR + 0.06)));
  for (int k = 0; k < 3; k++) {
    float wx = lo.x + w * (k == 0 ? 0.2 : k == 1 ? 0.73 : 0.87);
    c = mix(c, vec3(0.08), 1.0 - smoothstep(0.024 - uPx, 0.024 + uPx, length(p - vec2(wx, FLOOR + 0.05))));
  }
  c = mix(c, vec3(0.56, 0.54, 0.5), box(p, vec2(lo.x - 1.0, -1.0), vec2(hi.x + 1.0, FLOOR + 0.03)));
  return c * uSun;
}

// A run of pallet racking against the back wall, from x0 to x1: blue
// uprights, orange beams and shrink-wrapped cartons, two slots a level and
// some empty. side (0 or 1) picks which loads sit where.
vec3 rack(vec2 p, vec3 c, float x0, float x1, float side) {
  if (p.x < x0 - 0.02 || p.x > x1 + 0.02 || p.y < FLOOR || p.y > 0.88) return c;
  vec3 rc = vec3(0.05, 0.05, 0.06);
  float lv = p.y < 0.43 ? 0.0 : p.y < 0.645 ? 1.0 : 2.0;
  float y0 = lv == 0.0 ? FLOOR : lv == 1.0 ? 0.446 : 0.661;
  float y1 = lv == 0.0 ? 0.43 : lv == 1.0 ? 0.645 : 0.846;
  float cx0 = x0 + 0.016, cx1 = x1 - 0.016;
  float halfW = (cx1 - cx0) * 0.5;
  float slot = clamp(floor((p.x - cx0) / halfW), 0.0, 1.0);
  float sx0 = cx0 + slot * halfW + 0.008, sx1 = sx0 + halfW - 0.016;
  vec3 cid = vec3(side, lv, slot);
  float present = step(0.2, h31(cid + 0.37));
  float topY = y0 + 0.04 + (y1 - y0 - 0.06) * (0.6 + 0.38 * h31(cid + 3.1));
  float pallet = box(p, vec2(sx0, y0), vec2(sx1, y0 + 0.022));
  rc = mix(rc, vec3(0.34, 0.25, 0.15) * (fract((p.x - sx0) / 0.034) < 0.3 ? 0.55 : 1.0), pallet * present);
  float load = box(p, vec2(sx0 + 0.004, y0 + 0.022), vec2(sx1 - 0.004, topY)) * present;
  float bwid = (sx1 - sx0) / (2.0 + floor(h31(cid + 5.3) * 2.0));
  float bh = 0.05 + 0.03 * h31(cid + 7.1);
  vec2 q = vec2((p.x - sx0) / bwid, (p.y - y0 - 0.022) / bh);
  vec2 bl = fract(q), bi = floor(q);
  float tone = h31(vec3(bi, side * 10.0 + lv * 3.0 + slot + 0.5));
  vec3 card = mix(vec3(0.4, 0.29, 0.17), vec3(0.56, 0.43, 0.28), tone);
  card *= (bl.x < 0.04 || bl.y < 0.07) ? 0.55 : 1.0;
  card = mix(card, vec3(0.76, 0.71, 0.6), step(abs(bl.y - 0.56), 0.045));
  card = mix(card, vec3(0.9), step(abs(bl.x - 0.32), 0.13) * step(abs(bl.y - 0.3), 0.09) * step(0.62, tone));
  card += vec3(0.09) * smoothstep(0.82, 1.0, sin((p.x - sx0) * 70.0 + p.y * 9.0) * 0.5 + 0.5);
  rc = mix(rc, card, load);
  float beam = max(max(box(p, vec2(x0, 0.43), vec2(x1, 0.446)), box(p, vec2(x0, 0.645), vec2(x1, 0.661))),
                   box(p, vec2(x0, 0.846), vec2(x1, 0.862)));
  rc = mix(rc, vec3(0.72, 0.26, 0.06) * (fract(p.y / 0.016) < 0.35 ? 1.15 : 0.85), beam);
  float post = max(box(p, vec2(x0 - 0.01, FLOOR), vec2(x0 + 0.01, 0.875)),
                   box(p, vec2(x1 - 0.01, FLOOR), vec2(x1 + 0.01, 0.875)));
  float slots = step(0.55, fract(p.y / 0.024));
  rc = mix(rc, vec3(0.08, 0.13, 0.32) * (1.0 - 0.45 * slots), post);
  return rc;
}

// The bay without the ball. lamp > 0.5 marks the lamps, which flicker.
vec3 bay(vec2 p, out float lamp) {
  lamp = 0.0;
  vec3 light = roomLight(p);
  vec3 c = vec3(0.2, 0.21, 0.23) * (fract(p.x / 0.16) < 0.022 ? 0.78 : 1.0) * (0.95 + 0.05 * h21(floor(p * 90.0)));
  c = mix(c, vec3(0.1, 0.1, 0.11), box(p, vec2(-1.0, FLOOR), vec2(uA + 1.0, FLOOR + 0.03)));
  c = rack(p, c, uA * 0.035, uA * 0.335, 0.0);
  c = rack(p, c, uA * 0.665, uA * 0.965, 1.0);
  c = mix(c, vec3(0.06, 0.06, 0.07), box(p, vec2(-1.0, 0.905), vec2(uA + 1.0, 2.0)));
  vec3 col = c * light;

  // The dock door: frame, the opening onto the yard, and the rolled-up door.
  vec2 lo = doorLo(), hi = doorHi();
  col = mix(col, vec3(0.1, 0.1, 0.11) * light, box(p, lo - 0.022, hi + vec2(0.022, 0.03)));
  col = mix(col, yard(p), box(p, lo, vec2(hi.x, hi.y - 0.055)));
  col = mix(col, vec3(0.3, 0.31, 0.33) * (fract(p.y / 0.011) < 0.22 ? 0.65 : 1.0) * light,
            box(p, vec2(lo.x, hi.y - 0.055), hi));

  // Floor: polished concrete, a painted safety line, and daylight pooling in
  // front of the door.
  if (p.y < FLOOR) {
    vec3 f = vec3(0.24, 0.24, 0.25) * (0.72 + 0.28 * p.y / FLOOR) * (0.96 + 0.04 * h21(floor(p * 160.0)));
    f = mix(f, vec3(0.78, 0.6, 0.12), box(p, vec2(-1.0, FLOOR - 0.03), vec2(uA + 1.0, FLOOR - 0.022)));
    col = f * light;
    float spread = 0.1 + (FLOOR - p.y) * 0.9;
    float pool = exp(-pow((p.x - (lo.x + hi.x) * 0.5) / spread, 2.0)) * (0.35 + 0.65 * p.y / FLOOR);
    col += vec3(0.75, 0.85, 1.0) * uSun * 0.045 * pool;
  }

  // Ceiling lamps: a dark housing with a bright strip underneath.
  for (int k = 0; k < 2; k++) {
    float lx = lampX(k);
    col = mix(col, vec3(0.03), box(p, vec2(lx - 0.07, 0.882), vec2(lx + 0.07, 0.905)));
    float strip = box(p, vec2(lx - 0.062, 0.874), vec2(lx + 0.062, 0.884));
    col = mix(col, vec3(1.0, 0.97, 0.9) * 4.0, strip);
    lamp = max(lamp, strip);
  }
  return col;
}

// The ball (centre xy, radius z) over the scene colour c, with its contact
// shadow on the floor.
vec3 withBall(vec2 p, vec3 c, vec3 b) {
  float h = max(0.0, b.y - b.z - GROUND);
  vec2 sd = (p - vec2(b.x, GROUND)) / vec2(b.z * (1.15 + h * 1.2), b.z * (0.26 + h * 0.3));
  c *= 1.0 - 0.6 * exp(-dot(sd, sd) * 1.6) / (1.0 + h * 5.0) * step(p.y, FLOOR);
  vec2 d = p - b.xy;
  float cov = 1.0 - smoothstep(b.z - uPx, b.z + uPx, length(d));
  if (cov <= 0.0) return c;
  vec2 q = d / b.z;
  vec3 n = vec3(q, sqrt(max(0.0, 1.0 - dot(q, q))));
  vec3 ld = normalize(vec3(-0.35, 0.75, 0.55));
  vec3 col = vec3(0.86, 0.82, 0.74) * roomLight(b.xy) * (0.22 + 0.86 * max(0.0, dot(n, ld)));
  col += vec3(0.55) * pow(max(0.0, dot(reflect(vec3(0.0, 0.0, -1.0), n), ld)), 24.0);
  // Daylight from the door catches the side facing it, or rims the whole
  // ball when it is in front of the opening.
  float toward = clamp((doorLo().x + doorHi().x - 2.0 * b.x) * 4.0, -1.0, 1.0);
  float rim = pow(max(0.0, n.x * toward), 3.0) + 0.6 * pow(1.0 - n.z, 4.0) * (1.0 - abs(toward));
  col += vec3(0.75, 0.85, 1.0) * uSun * 0.03 * rim * exp(-doorDist(b.xy) / 0.3);
  return mix(c, col, cov);
}
`;

// The normal camera: one snapshot, blurred over the exposure, through a
// response that saturates, with bloom and a veil of glare in strong light,
// sensor noise and a soft vignette. Writes display-ready sRGB.
const FRAME = `#version 300 es
precision highp float;
${SCENE}
uniform vec2 uRes;
uniform vec3 uBalls[${BLUR_SAMPLES}];
uniform float uSeed;
out vec4 outColor;
void main() {
  vec2 p = gl_FragCoord.xy / uRes * vec2(uA, 1.0);
  float lamp;
  vec3 base = bay(p, lamp);
  vec3 acc = vec3(0.0);
  for (int k = 0; k < ${BLUR_SAMPLES}; k++) acc += withBall(p, base, uBalls[k]);
  vec3 lin = acc / float(${BLUR_SAMPLES});
  vec3 v = 1.0 - exp(-0.7 * lin);
  float veil = smoothstep(3.0, 30.0, uSun) * 0.95 * exp(-doorDist(p) / 0.06) + smoothstep(8.0, 40.0, uSun) * 0.07;
  v += veil * (1.0 - v);
  v = pow(v, vec3(1.0 / 2.2));
  v += (h21(gl_FragCoord.xy + uSeed) - 0.5) * 0.04;
  vec2 c = gl_FragCoord.xy / uRes - 0.5;
  v *= 1.0 - 0.28 * dot(c, c);
  outColor = vec4(clamp(v * vec3(0.97, 0.99, 1.02), 0.0, 1.0), 1.0);
}`;

// One event-camera read against the stored state: R the reference level
// (log brightness), G and B the fading ON and OFF dots, A a tally of events
// since the last count.
const EVENT = `#version 300 es
precision highp float;
${SCENE}
uniform vec2 uRes;
uniform vec3 uBall;
uniform sampler2D uState;
uniform sampler2D uNoise;   // R threshold quirk (roughly Gaussian), G draw rank
uniform float uThr, uSigma, uFloorL, uLogHi, uDecay, uFill, uNoiseP, uTwinkleP, uInit, uRestart;
uniform uint uTick;         // counts reads, for fresh randomness each one
out vec4 outState;

// Integer hash to a uniform float: precise enough for one-in-a-million
// chances, which a float hash is not.
uint pcg(uint v) { uint s = v * 747796405u + 2891336453u; uint w = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u; return (w >> 22u) ^ w; }
float rnd(uint salt) {
  uvec2 q = uvec2(gl_FragCoord.xy);
  return float(pcg(q.x ^ pcg(q.y ^ pcg(uTick * 3u + salt)))) * (1.0 / 4294967296.0);
}

void main() {
  ivec2 px = ivec2(gl_FragCoord.xy);
  vec2 p = gl_FragCoord.xy / uRes * vec2(uA, 1.0);
  float lamp;
  vec3 c = withBall(p, bay(p, lamp), uBall);
  float lo = log(uFloorL), hi = log(uLogHi);
  float logL = log(dot(c, vec3(0.2126, 0.7152, 0.0722)) + uFloorL);
  if (uInit > 0.5) { outState = vec4(clamp((logL - lo) / (hi - lo), 0.0, 1.0), 0.0, 0.0, 0.0); return; }

  vec4 s = texelFetch(uState, px, 0);
  vec4 nz = texelFetch(uNoise, px, 0);
  float ref = mix(lo, hi, s.r);
  float thr = max(0.05, uThr + uSigma * (nz.r * 6.0 - 3.0));
  float dl = logL - ref;
  float n = dl > thr ? floor(dl / thr) : dl < -thr ? -floor(-dl / thr) : 0.0;
  ref += n * thr;
  float ev = clamp(n, -2.0, 2.0);

  // Fade what was drawn; the small step keeps 8-bit values from sticking.
  float on = max(0.0, s.g * 4.0 * uDecay - 0.012), off = max(0.0, s.b * 4.0 * uDecay - 0.012);
  float extra = 0.0;
  if (rnd(0u) < uNoiseP) extra = rnd(1u) < 0.5 ? 1.0 : -1.0;
  if (lamp > 0.5 && rnd(2u) < uTwinkleP) extra = rnd(1u) < 0.5 ? 1.0 : -1.0;
  float fired = ev + extra;
  if (fired != 0.0 && nz.g < uFill) { if (fired > 0.0) on += fired; else off -= fired; }
  float tally = (uRestart > 0.5 ? 0.0 : s.a * 255.0) + abs(ev) + abs(extra);
  outState = vec4(clamp((ref - lo) / (hi - lo), 0.0, 1.0), min(on * 0.25, 1.0), min(off * 0.25, 1.0), min(tally, 255.0) / 255.0);
}`;

// Both views either side of the split: the held snapshot on the left, the
// event dots on the right.
const DISPLAY = `#version 300 es
precision highp float;
uniform sampler2D uFrame;
uniform sampler2D uState;
uniform vec2 uCanvas;
uniform float uSplit;
uniform float uDot;
uniform vec3 uBg, uOn, uOff;
uniform float uGain;
out vec4 outColor;
void main() {
  vec2 uv = gl_FragCoord.xy / uCanvas;
  if (uv.x < uSplit) { outColor = vec4(texture(uFrame, uv).rgb, 1.0); return; }
  ivec2 size = textureSize(uState, 0);
  ivec2 sp = min(ivec2(floor(gl_FragCoord.xy / uDot)), size - 1);
  vec4 s = texelFetch(uState, sp, 0);
  float a = 1.0 - exp(-uGain * s.g * 4.0), b = 1.0 - exp(-uGain * s.b * 4.0);
  vec2 f = fract(gl_FragCoord.xy / uDot);
  float inside = uDot >= 3.0 ? step(f.x, 0.8) * step(f.y, 0.8) : 1.0;
  // Each dot shows whichever polarity is stronger, so ON and OFF never blend
  // into white.
  outColor = vec4(mix(uBg, a >= b ? uOn : uOff, max(a, b) * inside), 1.0);
}`;

type GL = WebGL2RenderingContext;

function compile(gl: GL, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) throw new Error("shader");
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
}

function link(gl: GL, frag: string, names: string[]) {
  const p = gl.createProgram();
  if (!p) throw new Error("program");
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag));
  gl.bindAttribLocation(p, 0, "aPos");
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? "link");
  const u: Record<string, WebGLUniformLocation | null> = {};
  for (const n of names) u[n] = gl.getUniformLocation(p, n);
  return { p, u };
}

function texture(gl: GL, w: number, h: number, data: Uint8Array | null, filter: number) {
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return t;
}

function target(gl: GL, tex: WebGLTexture | null) {
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  return fbo;
}

const rgb = (c: number[]) => c.map((v) => v / 255) as [number, number, number];

export function createTwoCamera(
  canvas: HTMLCanvasElement,
  onRates: (r: TwoCameraRates) => void,
  onFrame?: (f: TwoCameraFrame) => void,
): TwoCamera | null {
  const ctx = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false, powerPreference: "low-power" });
  if (!ctx || ctx.isContextLost()) {
    console.warn("Two-camera view unavailable: no WebGL2 context");
    return null;
  }
  const gl: GL = ctx;

  const progs = (() => {
    try {
      const scene = ["uA", "uSun", "uPx", "uRes"];
      return {
        frame: link(gl, FRAME, [...scene, "uBalls", "uSeed"]),
        event: link(gl, EVENT, [...scene, "uBall", "uState", "uNoise", "uThr", "uSigma", "uFloorL", "uLogHi", "uDecay",
          "uFill", "uNoiseP", "uTwinkleP", "uTick", "uInit", "uRestart"]),
        display: link(gl, DISPLAY, ["uFrame", "uState", "uCanvas", "uSplit", "uDot", "uBg", "uOn", "uOff", "uGain"]),
      };
    } catch (err) {
      console.warn("Two-camera view unavailable:", err);
      return null;
    }
  })();
  if (!progs) return null;
  const { frame, event, display } = progs;

  const vao = gl.createVertexArray();
  const vbo = gl.createBuffer();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  // Targets, rebuilt when the canvas changes size: the event sensor (two
  // CSS pixels a dot), its state ping-pong and quirks, and the snapshot.
  let cw = 0, ch = 0, dot = 1, sw = 0, sh = 0, fw = 0, fh = 0, aspect = 1.6;
  let frameTex: WebGLTexture | null = null, frameFbo: WebGLFramebuffer | null = null, noiseTex: WebGLTexture | null = null;
  let states: { tex: WebGLTexture | null; fbo: WebGLFramebuffer | null }[] = [];
  let cur = 0, needInit = true, readBuf = new Uint8Array(0);

  const freeTargets = () => {
    for (const s of states) { gl.deleteTexture(s.tex); gl.deleteFramebuffer(s.fbo); }
    states = [];
    gl.deleteTexture(frameTex); gl.deleteFramebuffer(frameFbo); gl.deleteTexture(noiseTex);
  };

  const buildTargets = () => {
    freeTargets();
    for (let k = 0; k < 2; k++) {
      const tex = texture(gl, sw, sh, null, gl.NEAREST);
      states.push({ tex, fbo: target(gl, tex) });
    }
    frameTex = texture(gl, fw, fh, null, gl.LINEAR);
    frameFbo = target(gl, frameTex);
    const nz = new Uint8Array(sw * sh * 4);
    for (let i = 0; i < sw * sh; i++) {
      const g = Math.sqrt(-2 * Math.log(Math.random() || 1e-9)) * Math.cos(2 * Math.PI * Math.random());
      nz[i * 4] = Math.round(((Math.max(-3, Math.min(3, g)) + 3) / 6) * 255);
      nz[i * 4 + 1] = Math.floor(Math.random() * 256);
      nz[i * 4 + 3] = 255;
    }
    noiseTex = texture(gl, sw, sh, nz, gl.NEAREST);
    readBuf = new Uint8Array(sw * sh * 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    cur = 0;
    needInit = true;
  };

  // Scene state.
  const params: TwoCameraParams = { split: 0.5, speed: 0.55, sun: 0.25, hold: false };
  let split = params.split;
  let clock = 0, nextCapture = 0, nextCount = 0.5, countFrom = 0;
  let bx = 0.35, by = GROUND + BALL_R + 0.3, dir = 1, phase = 0.8;
  let vx = 0, vy = 0, rate = 2.4 + params.speed * 4;
  let bounces = 0, doorEntries = 0, inDoor = false, total = 0;
  const trail: { t: number; x: number; y: number }[] = [];
  let restart = false, reads = 0;

  const sunLevel = () => 0.6 * Math.pow(70, params.sun);
  const lo = () => BALL_R + LAYOUT.margin, hi = () => aspect - BALL_R - LAYOUT.margin;

  const physics = (dt: number) => {
    clock += dt;
    if (!params.hold) {
      const across = 0.15 + params.speed * 1.5;
      bx += dir * across * dt;
      if (bx > hi()) { bx = hi(); dir = -1; }
      if (bx < lo()) { bx = lo(); dir = 1; }
      rate = 2.4 + params.speed * 4;
      const contact = Math.floor(phase / Math.PI);
      phase += rate * dt;
      if (Math.floor(phase / Math.PI) > contact) bounces++;
      by = GROUND + BALL_R + BOUNCE * Math.abs(Math.sin(phase));
      vx = dir * across;
      vy = BOUNCE * rate * Math.cos(phase) * Math.sign(Math.sin(phase));
      const nowIn = bx >= aspect * LAYOUT.doorX0 && bx <= aspect * LAYOUT.doorX1;
      if (nowIn && !inDoor) doorEntries++;
      inDoor = nowIn;
    } else {
      vx = 0;
      vy = 0;
    }
    trail.push({ t: clock, x: bx, y: by });
    while (trail.length > 2 && clock - trail[1].t > EXPOSURE * 2) trail.shift();
  };

  const ballAt = (t: number) => {
    if (!trail.length) return { x: bx, y: by };
    if (t <= trail[0].t) return trail[0];
    for (let i = 1; i < trail.length; i++) {
      if (t <= trail[i].t) {
        const a = trail[i - 1], b = trail[i];
        const k = (t - a.t) / Math.max(1e-6, b.t - a.t);
        return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
      }
    }
    return trail[trail.length - 1];
  };

  const sceneUniforms = (u: Record<string, WebGLUniformLocation | null>, w: number, h: number) => {
    gl.uniform1f(u.uA, aspect);
    gl.uniform1f(u.uSun, sunLevel());
    gl.uniform1f(u.uPx, 1 / h);
    gl.uniform2f(u.uRes, w, h);
  };

  const capture = () => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameFbo);
    gl.viewport(0, 0, fw, fh);
    gl.useProgram(frame.p);
    sceneUniforms(frame.u, fw, fh);
    const balls = new Float32Array(BLUR_SAMPLES * 3);
    for (let k = 0; k < BLUR_SAMPLES; k++) {
      const b = ballAt(clock - EXPOSURE + (EXPOSURE * k) / (BLUR_SAMPLES - 1));
      balls.set([b.x, b.y, BALL_R], k * 3);
    }
    gl.uniform3fv(frame.u.uBalls, balls);
    gl.uniform1f(frame.u.uSeed, Math.random() * 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const read = (dt: number) => {
    const src = states[cur], dst = states[1 - cur];
    gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fbo);
    gl.viewport(0, 0, sw, sh);
    gl.useProgram(event.p);
    sceneUniforms(event.u, sw, sh);
    gl.uniform3f(event.u.uBall, bx, by, BALL_R);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, src.tex);
    gl.uniform1i(event.u.uState, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, noiseTex);
    gl.uniform1i(event.u.uNoise, 1);
    gl.uniform1f(event.u.uThr, EV.thr);
    gl.uniform1f(event.u.uSigma, EV.sigma);
    gl.uniform1f(event.u.uFloorL, EV.floor);
    gl.uniform1f(event.u.uLogHi, EV.logHi);
    gl.uniform1f(event.u.uDecay, Math.exp(-dt / EV.tau));
    gl.uniform1f(event.u.uFill, EV.fill);
    gl.uniform1f(event.u.uNoiseP, NOISE_PER_S * dt);
    gl.uniform1f(event.u.uTwinkleP, TWINKLE_PER_S * dt);
    reads = (reads + 1) >>> 0;
    gl.uniform1ui(event.u.uTick, reads);
    gl.uniform1f(event.u.uInit, needInit ? 1 : 0);
    gl.uniform1f(event.u.uRestart, restart ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    needInit = false;
    restart = false;
    cur = 1 - cur;
  };

  // Count the events tallied since the last count; both rates are scaled
  // from this sensor's size to a 1280×720 one.
  const count = () => {
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, states[cur].fbo);
    gl.readBuffer(gl.COLOR_ATTACHMENT0);
    gl.readPixels(0, 0, sw, sh, gl.RGBA, gl.UNSIGNED_BYTE, readBuf);
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
    let sum = 0;
    for (let i = 3; i < readBuf.length; i += 4) sum += readBuf[i];
    const scale = (REF_W * REF_H) / (sw * sh);
    total += sum * scale;
    onRates({ events: (sum / Math.max(1e-3, clock - countFrom)) * scale, pixels: FPS * REF_W * REF_H });
    countFrom = clock;
    restart = true;
  };

  const show = () => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, cw, ch);
    gl.useProgram(display.p);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, frameTex);
    gl.uniform1i(display.u.uFrame, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, states[cur].tex);
    gl.uniform1i(display.u.uState, 1);
    gl.uniform2f(display.u.uCanvas, cw, ch);
    gl.uniform1f(display.u.uSplit, split);
    gl.uniform1f(display.u.uDot, dot);
    gl.uniform3f(display.u.uBg, ...rgb(COLORS.bg));
    gl.uniform3f(display.u.uOn, ...rgb(COLORS.on));
    gl.uniform3f(display.u.uOff, ...rgb(COLORS.off));
    gl.uniform1f(display.u.uGain, EV.gain);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  // Hand the ball and the counts to whoever draws on top.
  const state: TwoCameraFrame = {
    clock: 0, aspect, split, x: bx, y: by, vx: 0, vy: 0, phase, rate,
    held: false, bounces: 0, doorEntries: 0, events: 0,
  };
  const emit = () => {
    if (!onFrame) return;
    state.clock = clock;
    state.aspect = aspect;
    state.split = split;
    state.x = bx;
    state.y = by;
    state.vx = vx;
    state.vy = vy;
    state.phase = phase;
    state.rate = rate;
    state.held = params.hold;
    state.bounces = bounces;
    state.doorEntries = doorEntries;
    state.events = total;
    onFrame(state);
  };

  // A still picture for when it isn't running: the snapshot, and an event
  // view that is (rightly) empty.
  const still = () => {
    if (!states.length) return;
    if (needInit) read(1 / 240);
    capture();
    show();
    emit();
  };

  let raf = 0, last = 0;
  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    if (!states.length) return;
    const frameDt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;
    const dt = frameDt / SUB;
    for (let k = 0; k < SUB; k++) {
      physics(dt);
      read(dt);
      if (clock >= nextCapture) {
        capture();
        nextCapture = clock - nextCapture > 1 / FPS ? clock + 1 / FPS : nextCapture + 1 / FPS;
      }
    }
    if (clock >= nextCount) { count(); nextCount = clock + 0.5; }
    split += (params.split - split) * Math.min(1, frameDt * 10);
    if (Math.abs(params.split - split) < 0.001) split = params.split;
    show();
    emit();
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cw = Math.round(rect.width * dpr);
    ch = Math.round(rect.height * dpr);
    canvas.width = cw;
    canvas.height = ch;
    aspect = cw / ch;
    dot = Math.max(1, Math.round(2 * dpr));
    const nw = Math.ceil(cw / dot), nh = Math.ceil(ch / dot);
    const nfw = Math.min(1600, Math.round(cw / 1.5)), nfh = Math.round((nfw * ch) / cw);
    if (nw !== sw || nh !== sh || nfw !== fw || nfh !== fh) {
      sw = nw; sh = nh; fw = nfw; fh = nfh;
      buildTargets();
    }
    bx = Math.min(hi(), Math.max(lo(), bx));
    if (!raf) still();
  };

  return {
    start() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    },
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    },
    resize,
    set(p) {
      const sunChanged = p.sun !== undefined && p.sun !== params.sun;
      // Small moves of the split come from dragging the divider or the arrow
      // keys, and follow at once; big ones (switching views) slide over.
      const step = p.split === undefined ? 0 : Math.abs(p.split - params.split);
      Object.assign(params, p);
      if (step > 0 && step < 0.15) split = params.split;
      if (!raf) {
        split = params.split;
        if (sunChanged) needInit = true;
        still();
      }
    },
    destroy() {
      cancelAnimationFrame(raf);
      raf = 0;
      freeTargets();
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
      for (const prog of [frame, event, display]) gl.deleteProgram(prog.p);
    },
  };
}
