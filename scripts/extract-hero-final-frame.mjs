import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";
import ffprobePath from "ffprobe-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "..", "public", "assets");

const videoFile = process.argv[2] ?? "hero-bg-fallback.mp4";
const outputFile =
  process.argv[3] ?? "title-slide-hero-ic-final-frame.png";
const endTrimSec = Number(process.argv[4] ?? "1");

const inputPath = path.join(assetsDir, videoFile);
const outputPath = path.join(assetsDir, outputFile);

if (!ffmpegPath) {
  throw new Error("ffmpeg-static binary not found");
}

const probe = JSON.parse(
  execFileSync(
    ffprobePath.path,
    [
      "-v",
      "quiet",
      "-print_format",
      "json",
      "-show_format",
      "-show_streams",
      inputPath,
    ],
    { encoding: "utf8" },
  ),
);

const duration = Number(probe.format?.duration);
if (!Number.isFinite(duration)) {
  throw new Error(`Could not read duration for ${videoFile}`);
}

const timestamp = Math.max(0, duration - endTrimSec);

execFileSync(
  ffmpegPath,
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-ss",
    String(timestamp),
    "-i",
    inputPath,
    "-frames:v",
    "1",
    "-q:v",
    "2",
    "-y",
    outputPath,
  ],
  { stdio: "inherit" },
);

writeFileSync(
  path.join(assetsDir, `${outputFile}.meta.json`),
  JSON.stringify(
    {
      source: videoFile,
      duration,
      timestamp,
      endTrimSec,
    },
    null,
    2,
  ),
);

console.log(
  `Extracted ${outputFile} at ${timestamp.toFixed(3)}s (${duration.toFixed(3)}s total)`,
);
