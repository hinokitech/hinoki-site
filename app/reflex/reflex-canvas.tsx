"use client";

import { useEffect, useMemo, useRef } from "react";

type Tweaks = {
  speed: number;
  glow: number;
  wavePath: boolean;
  darkMode: boolean;
  latencyBar: boolean;
  pulseCount: number;
};

const TWEAKS_DEFAULT: Tweaks = {
  speed: 0.75,
  glow: 1.0,
  wavePath: false,
  darkMode: false,
  latencyBar: false,
  pulseCount: 2,
};

const BASE_CYCLE = 4400;
const LOOP_PAUSE_MS = 0;
const STEPS = 5;
const HOLD_F = 0.63;
const RESET_START_F = 0.9;
const BASE_RPERIOD = 1500;
const BOX_LABELS = ["Sensor", "Memory", "Inference", "Decision", "Output"];
const MOBILE_PAD_PX = 24;
const MOBILE_PANEL_GAP_PX = 32;
const LEFT_TIME_SCALE = 0.75;
const RIGHT_TIME_SCALE = 0.78;
const RIGHT_PULSE_SPEED = 3.2;

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function getColors(dark: boolean) {
  if (dark)
    return {
      bg: "#1A1C1F",
      gridDot: "rgba(255,255,255,0.055)",
      div: "#2C3038",
      text: "#EEE9E2",
      sub: "#8A8F9A",
      meta: "#555B66",
      lBox: "#24272C",
      lBoxAct: "#2D3239",
      lBorder: "#353A44",
      lBorderAct: "#7B8FAB",
      lConn: "#2E333B",
      lSig: "#7B8FAB",
      lLabel: "#7B8FAB",
      lBarBg: "#24272C",
      lBarFill: "#7B8FAB",
      rPathBase: "rgba(232,98,42,0.12)",
      rSig: "#E8622A",
      rLabel: "#E8622A",
      rEndpoint: "#2A2D32",
      rEndBorder: "#3A3F48",
    };
  return {
    bg: "#F4F1ED",
    gridDot: "rgba(140,128,115,0.20)",
    div: "#D8D3CB",
    text: "#252830",
    sub: "#5A5E6B",
    meta: "#9099A8",
    lBox: "#E9E5E0",
    lBoxAct: "#FFFFFF",
    lBorder: "#C5C0B8",
    lBorderAct: "#6E7F99",
    lConn: "#D1CCC5",
    lSig: "#6E7F99",
    lLabel: "#7B8FAB",
    lBarBg: "#E3DED7",
    lBarFill: "#6E7F99",
    rPathBase: "rgba(232,98,42,0.15)",
    rSig: "#E8622A",
    rLabel: "#E8622A",
    rEndpoint: "#E3DFDA",
    rEndBorder: "#B8B2A8",
  };
}

export function ReflexCanvas({
  tweaks,
  active = true,
  panel = "both",
}: {
  tweaks?: Partial<Tweaks>;
  active?: boolean;
  panel?: "both" | "left" | "right";
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const t0Ref = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);

  const T = useMemo<Tweaks>(
    () => ({ ...TWEAKS_DEFAULT, ...(tweaks ?? {}) }),
    [tweaks],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let isMobile = false;

    function resize() {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      W = canvas.clientWidth || window.innerWidth;
      isMobile = W < 768;
      if (isMobile) {
        H =
          panel === "both"
            ? Math.max(520, Math.min(760, Math.round(W * 0.9)))
            : Math.max(280, Math.min(420, Math.round(W * 0.55)));
      } else {
        H = Math.max(320, Math.min(480, Math.round(W * 0.31)));
      }
      canvas.style.height = `${H}px`;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    }

    function rr(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    }

    function font(size: number, weight: number) {
      ctx.font = `${weight} ${size}px -apple-system,"Helvetica Neue",Arial,sans-serif`;
    }

    function wavePt(t: number, pX0: number, pX1: number, pY: number, amp: number) {
      return { x: lerp(pX0, pX1, t), y: pY + amp * Math.sin(Math.PI * 2 * t) };
    }

    type Region = {
      x0: number;
      x1: number;
      cx: number;
      cy: number;
      labelY: number;
      subY: number;
    };

    function layout() {
      const pad = isMobile ? MOBILE_PAD_PX : Math.max(36, W * 0.045);
      const gut = isMobile ? 0 : 20;
      const singlePanel = panel !== "both";

      const isSplitMobile = isMobile && panel === "both";
      const topPanelH = isSplitMobile ? (H - MOBILE_PANEL_GAP_PX) / 2 : H;
      const bottomPanelY0 = isSplitMobile ? topPanelH + MOBILE_PANEL_GAP_PX : 0;
      const bottomPanelH = isSplitMobile ? (H - MOBILE_PANEL_GAP_PX) / 2 : H;

      // On desktop, when rendering a single panel, treat the canvas as one region.
      // (The parent layout is responsible for placing panels side-by-side.)
      const lx0 = pad;
      const lx1 = singlePanel ? W - pad : W * 0.5 - gut;
      const rx0 = singlePanel ? pad : W * 0.5 + gut;
      const rx1 = W - pad;

      const leftRegion: Region = isMobile
        ? {
            x0: pad,
            x1: W - pad,
            cx: W * 0.5,
            cy: (panel === "both" ? topPanelH * 0.54 : H * 0.55),
            labelY: (panel === "both" ? topPanelH * 0.18 : H * 0.18),
            subY: (panel === "both" ? topPanelH * 0.90 : H * 0.90),
          }
        : {
            x0: lx0,
            x1: lx1,
            cx: (lx0 + lx1) / 2,
            cy: H * 0.5,
            labelY: H * 0.185,
            subY: H * 0.705,
          };

      const rightRegion: Region = isMobile
        ? {
            x0: pad,
            x1: W - pad,
            cx: W * 0.5,
            cy:
              panel === "both" ? bottomPanelY0 + bottomPanelH * 0.5 : H * 0.55,
            labelY:
              panel === "both" ? bottomPanelY0 + bottomPanelH * 0.18 : H * 0.18,
            subY:
              panel === "both" ? bottomPanelY0 + bottomPanelH * 0.9 : H * 0.9,
          }
        : {
            x0: rx0,
            x1: rx1,
            cx: (rx0 + rx1) / 2,
            cy: H * 0.5,
            labelY: H * 0.185,
            subY: H * 0.705,
          };

      // Boxes (left / top region)
      const minG = isMobile ? 10 : 14;
      const availW = leftRegion.x1 - leftRegion.x0;
      const maxBW = isMobile ? 64 : 80;
      const bW = Math.min(maxBW, Math.floor((availW - (STEPS - 1) * minG) / STEPS));
      const bH = Math.max(28, Math.round(bW * 0.43));
      const gap = Math.floor((availW - STEPS * bW) / (STEPS - 1));
      const tot = STEPS * bW + (STEPS - 1) * gap;
      const bSX = leftRegion.cx - tot / 2 + bW / 2;

      const boxes = BOX_LABELS.map((lbl, i) => ({
        cx: Math.round(bSX + i * (bW + gap)),
        cy: Math.round(leftRegion.cy),
        w: bW,
        h: bH,
        label: lbl,
      }));

      // Right path (right / bottom region)
      const pp = isMobile
        ? Math.max(MOBILE_PAD_PX, (rightRegion.x1 - rightRegion.x0) * 0.08)
        : Math.max(20, (rightRegion.x1 - rightRegion.x0) * 0.065);
      const pX0 = Math.round(rightRegion.x0 + pp);
      const pX1 = Math.round(rightRegion.x1 - pp);
      const pY = Math.round(rightRegion.cy);

      return {
        pad,
        gut,
        leftRegion,
        rightRegion,
        boxes,
        bW,
        bH,
        gap,
        pX0,
        pX1,
        pY,
      };
    }

    function leftState(cycleT: number, stepDur: number) {
      const cycleDur = stepDur * STEPS;
      const t = ((cycleT % cycleDur) + cycleDur) % cycleDur; // normalize
      const raw = t / stepDur;
      const si = Math.floor(raw) % STEPS;
      const frac = raw - Math.floor(raw);
      if (si === STEPS - 1) {
        if (frac < RESET_START_F) return { mode: "hold" as const, idx: si };
        return { mode: "reset" as const, idx: si };
      }
      if (frac < HOLD_F) return { mode: "hold" as const, idx: si };
      return {
        mode: "travel" as const,
        idx: si,
        next: si + 1,
        tf: ease((frac - HOLD_F) / (1 - HOLD_F)),
      };
    }

    function drawBG(C: ReturnType<typeof getColors>) {
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);

      const spacing = 26;
      ctx.fillStyle = C.gridDot;
      for (let x = spacing; x < W; x += spacing) {
        for (let y = spacing; y < H; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function drawDivider(L: ReturnType<typeof layout>, C: ReturnType<typeof getColors>) {
      ctx.beginPath();
      if (panel !== "both") {
        // no divider in single-panel mode
        return;
      }
      if (isMobile) {
        const y = (H - MOBILE_PANEL_GAP_PX) / 2 + MOBILE_PANEL_GAP_PX / 2;
        ctx.moveTo(L.pad, y);
        ctx.lineTo(W - L.pad, y);
      } else {
        const x = W * 0.5;
        ctx.moveTo(x, H * 0.08);
        ctx.lineTo(x, H * 0.93);
      }
      ctx.strokeStyle = C.div;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawLabels(L: ReturnType<typeof layout>, C: ReturnType<typeof getColors>) {
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";

      font(9.5, 600);
      if (panel !== "right") {
        ctx.fillStyle = C.lLabel;
        ctx.fillText("TODAY'S CONTROLLERS", L.leftRegion.cx, L.leftRegion.labelY);
      }
      if (panel !== "left") {
        ctx.fillStyle = C.rLabel;
        ctx.fillText(
          "ARC — ADAPTIVE PHYSICAL AI",
          L.rightRegion.cx,
          L.rightRegion.labelY,
        );
      }

      const ruleW = 100;

      if (panel !== "right") {
        ctx.beginPath();
        const ruleYLeft = L.leftRegion.labelY + 6;
        ctx.moveTo(L.leftRegion.cx - ruleW / 2, ruleYLeft);
        ctx.lineTo(L.leftRegion.cx + ruleW / 2, ruleYLeft);
        ctx.strokeStyle = C.lLabel;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      if (panel !== "left") {
        ctx.save();
        ctx.shadowColor = C.rSig;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        const ruleYRight = L.rightRegion.labelY + 6;
        ctx.moveTo(L.rightRegion.cx - ruleW / 2, ruleYRight);
        ctx.lineTo(L.rightRegion.cx + ruleW / 2, ruleYRight);
        ctx.strokeStyle = C.rSig;
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      font(9.5, 400);
      ctx.fillStyle = C.meta;
      if (panel !== "right") {
        ctx.fillText(
          "5 discrete steps · complexity at every layer",
          L.leftRegion.cx,
          L.leftRegion.subY,
        );
      }
      if (panel !== "left") {
        ctx.fillText(
          "continuous · sensor to actuator · no inference layer · adaptive",
          L.rightRegion.cx,
          L.rightRegion.subY,
        );
      }
    }

    function drawLeft(
      cycleT: number,
      stepDur: number,
      L: ReturnType<typeof layout>,
      C: ReturnType<typeof getColors>,
      tweaks: Tweaks,
    ) {
      const state = leftState(cycleT, stepDur);
      const { boxes } = L;
      const glow = tweaks.glow;

      for (let i = 0; i < STEPS - 1; i++) {
        const b0 = boxes[i]!;
        const b1 = boxes[i + 1]!;
        const x0 = b0.cx + b0.w / 2 + 1;
        const x1 = b1.cx - b1.w / 2 - 1;
        const y = b0.cy;

        ctx.beginPath();
        ctx.moveTo(x0, y);
        ctx.lineTo(x1, y);
        ctx.strokeStyle = C.lConn;
        ctx.lineWidth = 1;
        ctx.stroke();

        const aw = 5;
        const ah = 3.5;
        ctx.beginPath();
        ctx.moveTo(x1 - aw, y - ah);
        ctx.lineTo(x1 + 1, y);
        ctx.lineTo(x1 - aw, y + ah);
        ctx.strokeStyle = C.lConn;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (state.mode === "travel" && state.idx === i) {
          const px = lerp(x0, x1, state.tf);
          const g = ctx.createLinearGradient(x0, y, px, y);
          g.addColorStop(0, "rgba(110,127,153,0)");
          g.addColorStop(1, `rgba(110,127,153,${clamp(0.9 * glow, 0, 1)})`);
          ctx.beginPath();
          ctx.moveTo(x0, y);
          ctx.lineTo(px, y);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      for (let i = 0; i < STEPS; i++) {
        const b = boxes[i]!;
        const act =
          (state.mode === "hold" && state.idx === i) ||
          (state.mode === "travel" && state.idx === i);
        const done =
          (state.mode === "hold" && i < state.idx) ||
          (state.mode === "travel" && i < state.idx) ||
          state.mode === "reset";

        ctx.save();
        if (act) {
          ctx.shadowColor = C.lSig;
          ctx.shadowBlur = clamp(14 * glow, 4, 28);
        }
        rr(b.cx - b.w / 2, b.cy - b.h / 2, b.w, b.h, 3);
        ctx.fillStyle = act ? C.lBoxAct : done ? C.lBox : C.lBox;
        ctx.fill();
        ctx.strokeStyle = act ? C.lBorderAct : C.lBorder;
        ctx.lineWidth = act ? 1.5 : 1;
        ctx.stroke();
        ctx.restore();

        font(7.5, 400);
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = act ? C.lLabel : C.meta;
        ctx.globalAlpha = act ? 0.8 : 0.45;
        ctx.fillText(String(i + 1), b.cx, b.cy - b.h / 2 - 5);
        ctx.globalAlpha = 1;

        const fs = Math.max(7.5, Math.min(9.5, b.w * 0.135));
        font(fs, act ? 500 : 400);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = act ? C.text : C.sub;
        ctx.fillText(b.label, b.cx, b.cy + 0.5);
      }

      if (state.mode === "travel") {
        const b0 = boxes[state.idx]!;
        const b1 = boxes[state.next]!;
        const x0 = b0.cx + b0.w / 2 + 1;
        const x1 = b1.cx - b1.w / 2 - 1;
        const sx = lerp(x0, x1, state.tf);

        ctx.save();
        ctx.shadowColor = C.lSig;
        ctx.shadowBlur = clamp(18 * glow, 6, 36);
        ctx.beginPath();
        ctx.arc(sx, b0.cy, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = C.lSig;
        ctx.fill();
        ctx.restore();
      }

    }

    function drawRight(
      ts: number,
      sinceStartMs: number,
      L: ReturnType<typeof layout>,
      C: ReturnType<typeof getColors>,
      tweaks: Tweaks,
    ) {
      const tts = ts * RIGHT_TIME_SCALE;
      const { pX0, pX1, pY } = L;
      const amp = tweaks.wavePath ? 12 : 0;
      const glow = tweaks.glow;
      const nPulse = tweaks.pulseCount;
      const rPeriod =
        BASE_RPERIOD / (tweaks.speed * RIGHT_TIME_SCALE * RIGHT_PULSE_SPEED);

      const SEGS = amp > 0 ? 80 : 2;
      ctx.beginPath();
      for (let i = 0; i <= SEGS; i++) {
        const t = i / SEGS;
        const pt = wavePt(t, pX0, pX1, pY, amp);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.save();
      ctx.shadowColor = C.rSig;
      ctx.shadowBlur = clamp(6 * glow, 2, 16);
      ctx.strokeStyle = C.rPathBase;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      [pX0, pX1].forEach((ex, idx) => {
        const ey = wavePt(idx === 0 ? 0 : 1, pX0, pX1, pY, amp).y;
        ctx.save();
        ctx.shadowColor = C.rSig;
        ctx.shadowBlur = clamp(8 * glow, 3, 18);
        ctx.beginPath();
        ctx.arc(ex, ey, 4, 0, Math.PI * 2);
        ctx.fillStyle = C.rEndpoint;
        ctx.fill();
        ctx.strokeStyle = C.rEndBorder;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });

      font(9, 400);
      ctx.fillStyle = C.meta;
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "center";
      const labelOffY = 16 + Math.abs(amp);
      ctx.fillText("SENSOR", pX0, pY - labelOffY);
      ctx.fillText("ACTUATOR", pX1, pY - labelOffY);

      const actuatorPulse = Math.sin(tts * 0.004) * 0.5 + 0.5;
      const epY = wavePt(1, pX0, pX1, pY, amp).y;
      ctx.save();
      ctx.beginPath();
      ctx.arc(pX1, epY, 4 + actuatorPulse * 8, 0, Math.PI * 2);
      ctx.strokeStyle = C.rSig;
      ctx.globalAlpha = (1 - actuatorPulse) * 0.35 * glow;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();

      // On initial activation, start with "nothing" traveling across.
      if (sinceStartMs < 350) return;
      const pulseAlpha = clamp((sinceStartMs - 350) / 450, 0, 1);

      for (let p = 0; p < nPulse; p++) {
        const offset = p * (rPeriod / nPulse);
        const t = ((tts + offset) % rPeriod) / rPeriod;
        const primary = p === 0;

        const pt = wavePt(t, pX0, pX1, pY, amp);

        const trailFrac = 0.14;
        const tStart = Math.max(0, t - trailFrac);
        const trailSegs = amp > 0 ? 24 : 2;
        if (t > 0.005) {
          ctx.beginPath();
          for (let i = 0; i <= trailSegs; i++) {
            const tt = lerp(tStart, t, i / trailSegs);
            const tpt = wavePt(tt, pX0, pX1, pY, amp);
            if (i === 0) ctx.moveTo(tpt.x, tpt.y);
            else ctx.lineTo(tpt.x, tpt.y);
          }
          ctx.strokeStyle = C.rSig;
          ctx.lineWidth = primary ? 2 : 1.5;
          ctx.globalAlpha = primary
            ? clamp(0.65 * glow, 0, 0.9) * pulseAlpha
            : clamp(0.38 * glow, 0, 0.7) * pulseAlpha;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        ctx.save();
        ctx.shadowColor = C.rSig;
        ctx.shadowBlur = primary ? clamp(22 * glow, 8, 44) : clamp(14 * glow, 4, 28);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, primary ? 5.5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = primary
          ? C.rSig
          : `rgba(232,98,42,${clamp(0.75 * glow, 0.3, 1)})`;
        ctx.globalAlpha = pulseAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    }

    function drawFrame(ts: number) {
      if (!active) {
        t0Ref.current = null;
        startedAtRef.current = null;
      } else {
        if (startedAtRef.current === null) startedAtRef.current = ts;
        if (t0Ref.current === null) t0Ref.current = ts;
      }
      const elapsed = ts - (t0Ref.current ?? ts);
      const sinceStart = ts - (startedAtRef.current ?? ts);

      const C = getColors(T.darkMode);
      const CYCLE = BASE_CYCLE / T.speed;
      const leftElapsed = elapsed * LEFT_TIME_SCALE;
      const cycleT = leftElapsed % CYCLE;
      const stepDurScaled = CYCLE / STEPS;

      const L = layout();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawBG(C);
      drawDivider(L, C);
      drawLabels(L, C);

      if (panel !== "right") {
        drawLeft(cycleT, stepDurScaled, L, C, T);
      }

      // Right side should remain continuous — no loop pause.
      if (panel !== "left") {
        drawRight(elapsed, sinceStart, L, C, T);
      }
    }

    function loop(ts: number) {
      drawFrame(ts);

      rafRef.current = window.requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);

    if (active) {
      rafRef.current = window.requestAnimationFrame(loop);
    } else {
      // Draw a single static frame when inactive.
      drawFrame(performance.now());
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [T, active, panel]);

  return (
    <div className="bg-bg-base">
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}

