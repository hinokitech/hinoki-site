import sharp from "sharp";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "..", "public", "assets");

/** Hinoki dark deck surface — html[data-theme="dark"] --color-bg-base */
const DECK_BG = { r: 0x1e, g: 0x21, b: 0x24 };

function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function floodFillBackground(data, width, height, tolerance) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  function trySeed(x, y) {
    const idx = y * width + x;
    if (visited[idx]) return;
    queue.push(idx);
  }

  for (let x = 0; x < width; x++) {
    trySeed(x, 0);
    trySeed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    trySeed(0, y);
    trySeed(width - 1, y);
  }

  while (queue.length > 0) {
    const pixel = queue.pop();
    if (visited[pixel]) continue;
    visited[pixel] = 1;

    const i = pixel * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const x = pixel % width;
    const y = (pixel - x) / width;

    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const nPixel = ny * width + nx;
      if (visited[nPixel]) continue;

      const ni = nPixel * 4;
      if (
        colorDistance(r, g, b, data[ni], data[ni + 1], data[ni + 2]) <= tolerance
      ) {
        queue.push(nPixel);
      }
    }

    data[i] = DECK_BG.r;
    data[i + 1] = DECK_BG.g;
    data[i + 2] = DECK_BG.b;
    data[i + 3] = 255;
  }
}

async function processImage(inputFile, outputFile, tolerance = 18) {
  const inputPath = path.join(assetsDir, inputFile);
  const outputPath = path.join(assetsDir, outputFile);

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  floodFillBackground(data, info.width, info.height, tolerance);

  const output = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(outputPath, output);
  console.log(`Wrote ${outputFile} (${info.width}x${info.height})`);
}

await processImage(
  "vision-2035-physical-ai-monopoly-dice-accent.png",
  "vision-2035-physical-ai-monopoly-dice-accent-dark.png",
  20,
);
