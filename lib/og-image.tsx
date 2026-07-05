import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogImageAlt = "Hinoki Technologies — Building the future";
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export async function generateOgImage() {
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
          backgroundColor: "#0a0b0d",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232, 98, 42, 0.18) 0%, rgba(10, 11, 13, 0) 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            right: -40,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196, 43, 43, 0.12) 0%, rgba(10, 11, 13, 0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            position: "relative",
          }}
        >
          <img
            src={logoSrc}
            width={48}
            height={48}
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#f4f1ed",
            }}
          >
            Hinoki Technologies
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            position: "relative",
            maxWidth: 920,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#e8622a",
            }}
          >
            Neuromorphic Edge AI
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 88,
              fontWeight: 300,
              color: "#f4f1ed",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            <div style={{ display: "flex" }}>Building the</div>
            <div
              style={{
                display: "flex",
                background: "linear-gradient(135deg, #f07a30 0%, #e8622a 45%, #c42b2b 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              future.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 400,
              color: "#9099a8",
              lineHeight: 1.5,
            }}
          >
            Edge intelligence for physical systems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              height: 1,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            }}
          />
          <div
            style={{
              display: "flex",
              width: 72,
              height: 2,
              backgroundColor: "#e8622a",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 18,
              fontWeight: 500,
              color: "#9099a8",
              letterSpacing: "-0.01em",
            }}
          >
            hinokitech.com
          </div>
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
