import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

// Google requires favicons to be a multiple of 48px for search results.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 11,
          background: "linear-gradient(135deg, #6e8efb, #a777e3)",
          color: "white",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        JB
      </div>
    ),
    size
  );
}
