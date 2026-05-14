"use client";

import { useEffect, useMemo, useRef } from "react";

type Tweaks = {
  darkMode: boolean;
};

const TWEAKS_DEFAULT: Tweaks = {
  darkMode: false,
};

const HARDWARE_ROW_CAPTION =
  "The robot keeps its existing controller. Arc adds a faster reflex loop, while reporting state back to the main system.";

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
      rPathBase: "rgba(232,98,42,0.18)",
      rSig: "#E8622A",
      rLabel: "#E8622A",
      rBoxFill: "#2A1F1A",
      rBoxBorder: "#E8622A",
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
    rPathBase: "rgba(232,98,42,0.18)",
    rSig: "#E8622A",
    rLabel: "#E8622A",
    rBoxFill: "#FFF6F1",
    rBoxBorder: "#E8622A",
    rEndpoint: "#E3DFDA",
    rEndBorder: "#B8B2A8",
  };
}

export function ArcIntegrationCanvas({
  tweaks,
}: {
  tweaks?: Partial<Tweaks>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      isMobile = W < 720;
      H = isMobile
        ? Math.max(620, Math.min(820, Math.round(W * 1.15)))
        : Math.max(520, Math.min(620, Math.round(W * 0.55)));
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

    type Box = { cx: number; cy: number; w: number; h: number; label: string };

    function layout() {
      const padX = Math.max(28, W * 0.04);
      const padTop = isMobile ? 36 : 44;
      const padBot = isMobile ? 52 : 52;
      const innerH = H - padTop - padBot;

      const rowTopY = padTop + innerH * 0.16;
      const rowMidY = padTop + innerH * 0.52;
      const rowBotY = padTop + innerH * 0.88;

      function rowBoxes(labels: string[], cy: number): Box[] {
        const x0 = padX;
        const x1 = W - padX;
        const n = labels.length;
        const minG = isMobile ? 14 : 22;
        const availW = x1 - x0;
        const maxBW = isMobile ? 120 : 220;
        const bW = Math.min(maxBW, Math.floor((availW - (n - 1) * minG) / n));
        const bH = isMobile ? 40 : 48;
        const gap = Math.floor((availW - n * bW) / (n - 1));
        const tot = n * bW + (n - 1) * gap;
        const sx = (x0 + x1) / 2 - tot / 2 + bW / 2;
        return labels.map((lbl, i) => ({
          cx: Math.round(sx + i * (bW + gap)),
          cy: Math.round(cy),
          w: bW,
          h: bH,
          label: lbl,
        }));
      }

      const topBoxes = rowBoxes(
        ["AI / Planner", "Robot OS / PLC", "Motion & Safety Layer"],
        rowTopY,
      );
      const botBoxes = rowBoxes(
        ["Sensor", "Motor Controller", "Actuator"],
        rowBotY,
      );

      const midX0 = padX;
      const midX1 = W - padX;
      const arcW = isMobile ? 150 : 220;
      const arcH = isMobile ? 56 : 64;
      const endW = isMobile ? 110 : 170;
      const endH = isMobile ? 40 : 48;
      const arcCx = (midX0 + midX1) / 2;
      const sensorInCx = midX0 + endW / 2 + (isMobile ? 0 : 4);
      const correctionOutCx = midX1 - endW / 2 - (isMobile ? 0 : 4);

      const midElems = {
        sensorIn: {
          cx: sensorInCx,
          cy: rowMidY,
          w: endW,
          h: endH,
          label: "Selected Sensor Input",
        },
        arc: {
          cx: arcCx,
          cy: rowMidY,
          w: arcW,
          h: arcH,
          label: "Arc FPGA",
        },
        correction: {
          cx: correctionOutCx,
          cy: rowMidY,
          w: endW,
          h: endH,
          label: "Bounded Correction Output",
        },
      };

      const rowLabelX = padX + 2;

      return {
        padX,
        rowTopY,
        rowMidY,
        rowBotY,
        topBoxes,
        botBoxes,
        midElems,
        rowLabelX,
      };
    }

    function drawBG(C: ReturnType<typeof getColors>) {
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);
      const sp = 26;
      ctx.fillStyle = C.gridDot;
      for (let x = sp; x < W; x += sp) {
        for (let y = sp; y < H; y += sp) {
          ctx.beginPath();
          ctx.arc(x, y, 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function drawRowChrome(
      L: ReturnType<typeof layout>,
      C: ReturnType<typeof getColors>,
    ) {
      const divY1 = (L.rowTopY + L.rowMidY) / 2 + (isMobile ? 4 : 8);
      const divY2 = (L.rowMidY + L.rowBotY) / 2 - (isMobile ? 4 : 8);

      ctx.strokeStyle = C.div;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      [divY1, divY2].forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(L.padX, y);
        ctx.lineTo(W - L.padX, y);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      font(9.5, 600);
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      const labelOff = isMobile ? 34 : 40;

      ctx.fillStyle = C.lLabel;
      ctx.fillText("EXISTING CONTROLLER", L.rowLabelX, L.rowTopY - labelOff);

      ctx.fillStyle = C.rLabel;
      ctx.fillText("ARC — REFLEX LAYER", L.rowLabelX, L.rowMidY - labelOff);

      ctx.fillStyle = C.meta;
      ctx.fillText("PHYSICAL HARDWARE", L.rowLabelX, L.rowBotY - labelOff);

      font(isMobile ? 10 : 10.5, 400);

      ctx.fillStyle = C.rLabel;
      ctx.globalAlpha = 0.85;
      const arcLayerParts = [
        "Fast local adaptive control",
        "sub-ms target",
        "bounded output",
      ];
      if (isMobile) {
        const cx = W / 2;
        const lineH = 11;
        const lineGap = 2;
        const blockBottom = divY2 - 10;
        font(9, 400);
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        let y = blockBottom;
        for (let i = arcLayerParts.length - 1; i >= 0; i--) {
          ctx.fillText(arcLayerParts[i]!, cx, y);
          y -= lineH + lineGap;
        }
      } else {
        ctx.textAlign = "right";
        ctx.textBaseline = "alphabetic";
        ctx.fillText(
          "Fast local adaptive control · sub-ms target · bounded output",
          W - L.padX - 4,
          divY2 - 6,
        );
      }
      ctx.globalAlpha = 1;
    }

    function drawConventionalBox(b: Box, C: ReturnType<typeof getColors>) {
      rr(b.cx - b.w / 2, b.cy - b.h / 2, b.w, b.h, 4);
      ctx.fillStyle = C.lBox;
      ctx.fill();
      ctx.strokeStyle = C.lBorder;
      ctx.lineWidth = 1;
      ctx.stroke();

      const fs = Math.max(10, Math.min(13, b.w * 0.085));
      font(fs, 400);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = C.sub;
      ctx.fillText(b.label, b.cx, b.cy);
    }

    function drawNeutralBox(b: Box, C: ReturnType<typeof getColors>) {
      rr(b.cx - b.w / 2, b.cy - b.h / 2, b.w, b.h, 4);
      ctx.fillStyle = C.lBox;
      ctx.fill();
      ctx.strokeStyle = C.lBorder;
      ctx.lineWidth = 1;
      ctx.stroke();

      const fs = Math.max(10, Math.min(13, b.w * 0.085));
      font(fs, 400);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = C.sub;
      ctx.fillText(b.label, b.cx, b.cy);
    }

    function drawArcBox(b: Box, C: ReturnType<typeof getColors>) {
      rr(b.cx - b.w / 2, b.cy - b.h / 2, b.w, b.h, 6);
      ctx.fillStyle = C.rBoxFill;
      ctx.fill();
      ctx.strokeStyle = C.rBoxBorder;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      font(7.5, 600);
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = C.rLabel;
      ctx.globalAlpha = 0.7;
      ctx.fillText("REFLEX", b.cx, b.cy - b.h / 2 - 6);
      ctx.globalAlpha = 1;

      font(isMobile ? 13 : 15, 500);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = C.text;
      ctx.fillText("Arc FPGA", b.cx, b.cy);
    }

    function drawArcEndpoint(b: Box, C: ReturnType<typeof getColors>) {
      rr(b.cx - b.w / 2, b.cy - b.h / 2, b.w, b.h, 4);
      ctx.fillStyle = C.rEndpoint;
      ctx.fill();
      ctx.strokeStyle = C.rEndBorder;
      ctx.lineWidth = 1;
      ctx.stroke();

      font(isMobile ? 10 : 11, 500);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = C.text;
      const words = b.label.split(" ");
      if (words.length > 1 && b.w < 200) {
        const mid = Math.ceil(words.length / 2);
        const line1 = words.slice(0, mid).join(" ");
        const line2 = words.slice(mid).join(" ");
        ctx.fillText(line1, b.cx, b.cy - 7);
        ctx.fillText(line2, b.cx, b.cy + 7);
      } else {
        ctx.fillText(b.label, b.cx, b.cy);
      }
    }

    function horizontalArrow(
      x0: number,
      x1: number,
      y: number,
      color: string,
      lw = 1,
    ) {
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.stroke();
      const aw = 5,
        ah = 3.5;
      ctx.beginPath();
      ctx.moveTo(x1 - aw, y - ah);
      ctx.lineTo(x1 + 1, y);
      ctx.lineTo(x1 - aw, y + ah);
      ctx.stroke();
    }

    function drawTopRow(
      L: ReturnType<typeof layout>,
      C: ReturnType<typeof getColors>,
    ) {
      const { topBoxes } = L;
      const motion = topBoxes[2]!;
      const capGap = isMobile ? 5 : 7;
      font(isMobile ? 10 : 10.5, 400);
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = C.sub;
      ctx.fillText(
        "Task planning · supervision · safety",
        motion.cx,
        motion.cy - motion.h / 2 - capGap,
      );

      for (let i = 0; i < topBoxes.length - 1; i++) {
        const b0 = topBoxes[i]!;
        const b1 = topBoxes[i + 1]!;
        const x0 = b0.cx + b0.w / 2 + 1;
        const x1 = b1.cx - b1.w / 2 - 1;
        horizontalArrow(x0, x1, b0.cy, C.lConn, 1);
      }
      for (let i = 0; i < topBoxes.length; i++) {
        drawConventionalBox(topBoxes[i]!, C);
      }
    }

    function drawBottomRow(
      L: ReturnType<typeof layout>,
      C: ReturnType<typeof getColors>,
    ) {
      const { botBoxes } = L;
      for (let i = 0; i < botBoxes.length - 1; i++) {
        const b0 = botBoxes[i]!;
        const b1 = botBoxes[i + 1]!;
        const x0 = b0.cx + b0.w / 2 + 1;
        const x1 = b1.cx - b1.w / 2 - 1;
        horizontalArrow(x0, x1, b0.cy, C.lConn, 1);
      }
      for (let i = 0; i < botBoxes.length; i++) {
        drawNeutralBox(botBoxes[i]!, C);
      }
    }

    function wrapCaptionToWidth(maxW: number, fs: number, text: string) {
      ctx.font = `italic 400 ${fs}px -apple-system,"Helvetica Neue",Arial,sans-serif`;
      const words = text.split(/\s+/);
      const lines: string[] = [];
      let cur = "";
      for (const word of words) {
        const trial = cur ? `${cur} ${word}` : word;
        if (ctx.measureText(trial).width <= maxW) cur = trial;
        else {
          if (cur) lines.push(cur);
          cur = word;
        }
      }
      if (cur) lines.push(cur);
      return lines;
    }

    function drawHardwareRowCaption(
      L: ReturnType<typeof layout>,
      C: ReturnType<typeof getColors>,
    ) {
      const b0 = L.botBoxes[0]!;
      const b2 = L.botBoxes[2]!;
      const spanL = b0.cx - b0.w / 2;
      const spanR = b2.cx + b2.w / 2;
      const spanCx = (spanL + spanR) / 2;
      let maxW = Math.min(spanR - spanL - 12, isMobile ? 360 : 480);
      maxW = Math.max(maxW, 160);

      const botBottom = b0.cy + b0.h / 2;
      let fs = isMobile ? 11.25 : 12;
      let lines = wrapCaptionToWidth(maxW, fs, HARDWARE_ROW_CAPTION);
      let lh = Math.round(fs * 1.38);
      let capTop = botBottom + (isMobile ? 7 : 9);
      while (capTop + lines.length * lh > H - 8 && fs > 9) {
        fs -= 0.5;
        lines = wrapCaptionToWidth(maxW, fs, HARDWARE_ROW_CAPTION);
        lh = Math.round(fs * 1.38);
      }

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = C.meta;
      ctx.globalAlpha = 0.92;
      let y = capTop;
      for (const ln of lines) {
        ctx.font = `italic 400 ${fs}px -apple-system,"Helvetica Neue",Arial,sans-serif`;
        ctx.fillText(ln, spanCx, y);
        y += lh;
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function drawMidRow(L: ReturnType<typeof layout>, C: ReturnType<typeof getColors>) {
      const { sensorIn, arc, correction } = L.midElems;
      const y = arc.cy;
      const x0 = sensorIn.cx + sensorIn.w / 2;
      const xArcL = arc.cx - arc.w / 2;
      const xArcR = arc.cx + arc.w / 2;
      const x1 = correction.cx - correction.w / 2;

      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(xArcL, y);
      ctx.strokeStyle = C.rPathBase;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(xArcR, y);
      ctx.lineTo(x1, y);
      ctx.stroke();

      const aw = 5,
        ah = 3.5;
      ctx.strokeStyle = C.rPathBase;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(xArcL - aw - 1, y - ah);
      ctx.lineTo(xArcL - 1, y);
      ctx.lineTo(xArcL - aw - 1, y + ah);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x1 - aw, y - ah);
      ctx.lineTo(x1, y);
      ctx.lineTo(x1 - aw, y + ah);
      ctx.stroke();

      drawArcEndpoint(sensorIn, C);
      drawArcBox(arc, C);
      drawArcEndpoint(correction, C);
    }

    function drawVerticalLinks(
      L: ReturnType<typeof layout>,
      C: ReturnType<typeof getColors>,
    ) {
      const { topBoxes, botBoxes, midElems } = L;

      // (1) Task-level control: Robot OS / PLC → Motor Controller
      {
        const supTop = topBoxes[1]!;
        const supBot = botBoxes[1]!;
        const supY0 = supTop.cy + supTop.h / 2;
        const supY1 = supBot.cy - supBot.h / 2;
        const arcEl = midElems.arc;
        const bypassX = arcEl.cx + arcEl.w / 2 + 22;
        const jogY1 = (supY0 + (arcEl.cy - arcEl.h / 2)) / 2;
        const jogY2 = (supY1 + (arcEl.cy + arcEl.h / 2)) / 2;

        ctx.save();
        ctx.strokeStyle = C.lBorderAct;
        ctx.globalAlpha = 0.55;
        ctx.setLineDash([4, 5]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(supTop.cx, supY0);
        ctx.lineTo(supTop.cx, jogY1);
        ctx.lineTo(bypassX, jogY1);
        ctx.lineTo(bypassX, jogY2);
        ctx.lineTo(supBot.cx, jogY2);
        ctx.lineTo(supBot.cx, supY1);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(supBot.cx - 3.5, supY1 - 5);
        ctx.lineTo(supBot.cx, supY1);
        ctx.lineTo(supBot.cx + 3.5, supY1 - 5);
        ctx.stroke();

        font(8.5, 500);
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = C.lLabel;
        ctx.globalAlpha = 0.75;
        ctx.fillText("task-level control", bypassX + 6, jogY1 - 3);
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // (2) State feedback: Arc FPGA → Robot OS / PLC
      {
        const fbTop = topBoxes[1]!;
        const arcEl = midElems.arc;
        const fbX = arcEl.cx - 60;
        const fbYSrc = arcEl.cy - arcEl.h / 2;
        const fbYDst = fbTop.cy + fbTop.h / 2;

        ctx.save();
        ctx.strokeStyle = C.rSig;
        ctx.globalAlpha = 0.55;
        ctx.setLineDash([3, 4]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(fbX, fbYSrc);
        ctx.lineTo(fbX, fbYDst);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(fbX - 3, fbYDst + 5);
        ctx.lineTo(fbX, fbYDst);
        ctx.lineTo(fbX + 3, fbYDst + 5);
        ctx.stroke();

        font(8.5, 500);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = C.rLabel;
        ctx.globalAlpha = 0.7;
        ctx.fillText("state feedback", fbX - 8, (fbYSrc + fbYDst) / 2);
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // (3) Physical sensor → Selected Sensor Input
      {
        const sBot = botBoxes[0]!;
        const sIn = midElems.sensorIn;
        const sY0 = sBot.cy - sBot.h / 2;
        const sY1 = sIn.cy + sIn.h / 2;
        const sX = sBot.cx;
        const sXTarget = sIn.cx;

        ctx.save();
        ctx.strokeStyle = C.rPathBase;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        if (Math.abs(sX - sXTarget) < 4) {
          ctx.moveTo(sX, sY0);
          ctx.lineTo(sX, sY1);
        } else {
          const midY = (sY0 + sY1) / 2;
          ctx.moveTo(sX, sY0);
          ctx.lineTo(sX, midY);
          ctx.lineTo(sXTarget, midY);
          ctx.lineTo(sXTarget, sY1);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(sXTarget - 3.5, sY1 + 5);
        ctx.lineTo(sXTarget, sY1);
        ctx.lineTo(sXTarget + 3.5, sY1 + 5);
        ctx.stroke();
        ctx.restore();
      }

      // (4) Bounded Correction Output → Motor Controller
      {
        const mBot = botBoxes[1]!;
        const cOut = midElems.correction;
        const cY0 = cOut.cy + cOut.h / 2;
        const cY1 = mBot.cy - mBot.h / 2;
        const cXTarget = mBot.cx;
        const cXSource = cOut.cx;

        ctx.save();
        ctx.strokeStyle = C.rPathBase;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        if (Math.abs(cXSource - cXTarget) < 4) {
          ctx.moveTo(cXSource, cY0);
          ctx.lineTo(cXSource, cY1);
        } else {
          const midY = (cY0 + cY1) / 2;
          ctx.moveTo(cXSource, cY0);
          ctx.lineTo(cXSource, midY);
          ctx.lineTo(cXTarget, midY);
          ctx.lineTo(cXTarget, cY1);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cXTarget - 3.5, cY1 - 5);
        ctx.lineTo(cXTarget, cY1);
        ctx.lineTo(cXTarget + 3.5, cY1 - 5);
        ctx.stroke();
        ctx.restore();
      }
    }

    function render() {
      const C = getColors(T.darkMode);
      const L = layout();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawBG(C);
      drawRowChrome(L, C);
      drawVerticalLinks(L, C);
      drawTopRow(L, C);
      drawMidRow(L, C);
      drawBottomRow(L, C);
      drawHardwareRowCaption(L, C);
    }

    function handleResize() {
      resize();
      render();
    }

    resize();
    render();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [T]);

  const ariaLabel =
    "Diagram: Arc integration architecture. Existing controller (AI / Planner, Robot OS / PLC, Motion & Safety Layer) sends task-level control into the Motor Controller. Arc FPGA sits as a fast local reflex layer between Selected Sensor Input and Bounded Correction Output, feeding Motor Controller and reporting state back to Robot OS / PLC. Physical hardware: Sensor, Motor Controller, Actuator. Caption: The robot keeps its existing controller. Arc adds a faster reflex loop, while reporting state back to the main system.";

  return (
    <div className="bg-bg-base">
      <canvas
        ref={canvasRef}
        className="w-full"
        role="img"
        aria-label={ariaLabel}
      />
    </div>
  );
}
