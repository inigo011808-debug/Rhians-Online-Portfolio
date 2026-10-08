import { ImageResponse } from "next/og";

import { SITE } from "@/lib/data";

export const alt = `${SITE.name} developer portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at build time. No image file to maintain. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 88px",
          backgroundColor: "#121212",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 96,
            height: 10,
            borderRadius: 999,
            background: "linear-gradient(90deg, #f97316, #ef4444)",
          }}
        />
        <div
          style={{
            marginTop: 40,
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#f87171",
          }}
        >
          developer portfolio
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 128,
            fontWeight: 800,
            letterSpacing: -4,
            color: "#fafafa",
          }}
        >
          coderedexter
        </div>
        <div style={{ marginTop: 28, fontSize: 34, color: "#a1a1aa" }}>
          Projects, skills, and contact
        </div>
      </div>
    ),
    size,
  );
}
