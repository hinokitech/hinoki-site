import fs from "fs";

const p = new URL("../app/reflex/ReflexArcDiagram.tsx", import.meta.url);
let s = fs.readFileSync(p, "utf8");
// errant tags from a bad edit pass
s = s.split("</motion.div>").join("</div>");
s = s.split("<motion.div").join("<div");
s = s.split("vmotion.div").join("vdiv");
fs.writeFileSync(p, s);
console.log("done");
