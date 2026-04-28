import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export const alt = "Hinoki — Physical intelligence for robotics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBytes = await readFile(
    join(process.cwd(), "public", "assets", "logo-hinoki-tree.png"),
  );
  const logoSrc = `data:image/png;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f7f4ef",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <img
            src={logoSrc}
            width={56}
            height={56}
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: "#e8622a",
              textTransform: "uppercase",
            }}
          >
            Arc by Hinoki
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              fontWeight: 300,
              color: "#252830",
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
            }}
          >
            <div style={{ display: "flex" }}>Physical intelligence</div>
            <div style={{ display: "flex" }}>for robotics.</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 400,
              color: "#5a5e6b",
              lineHeight: 1.5,
            }}
          >
            Sub-millisecond. Adaptive. Zero inference.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              height: 2,
              backgroundColor: "#e8622a",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 500,
              color: "#252830",
              letterSpacing: "-0.01em",
            }}
          >
            Hinoki
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
