import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "..", "public", "assets");

const logos = [
  { file: "university-of-tsukuba-logo.png", threshold: 238 },
  { file: "aist-logo.png", threshold: 238 },
  { file: "antler-wordmark.png", threshold: 238 },
];

function makeWhiteTransparent(data, threshold) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i + 3] = 0;
    }
  }
}

for (const { file, threshold } of logos) {
  const inputPath = path.join(assetsDir, file);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  makeWhiteTransparent(data, threshold);

  const output = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(inputPath, output);
  console.log(`Processed ${file} (${info.width}x${info.height})`);
}
