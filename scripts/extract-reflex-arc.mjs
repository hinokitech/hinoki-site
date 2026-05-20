import fs from "fs";

const path =
  process.argv[2] ||
  "c:/Users/tones/Downloads/Reflex Arc Diagram - standalone.html";
const outDir = new URL("../app/reflex/", import.meta.url);

const html = fs.readFileSync(path, "utf8");
const line = html.split(/\n/)[216].trim();
const doc = JSON.parse(line);
const bodyMatch = doc.match(/<body[^>]*>([\s\S]*)<\/body>/i);
const body = bodyMatch ? bodyMatch[1] : doc;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(new URL("reflex-arc-body.html", outDir), body);

// extract inline style block from head
const styleMatch = doc.match(/<style>([\s\S]*?)<\/style>/i);
if (styleMatch) {
  fs.writeFileSync(
    new URL("reflex-arc-styles.css", outDir),
    styleMatch[1].replace(/@font-face[\s\S]*?}/g, "").slice(0, 80000),
  );
}

const svgMatch = body.match(/<svg[\s\S]*?<\/svg>/i);
console.log("body bytes", body.length);
console.log("style bytes", styleMatch ? styleMatch[1].length : 0);
console.log("svg bytes", svgMatch ? svgMatch[0].length : 0);
