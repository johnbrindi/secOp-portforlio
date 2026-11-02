import { ImageResponse } from "next/og";

// PWA / notification icons at /icons/96, /icons/192 and /icons/512 (same mark as app/icon.tsx).
// Padded so the logo survives "maskable" cropping on Android.
const SIZES = [96, 192, 512];

export function generateStaticParams() {
  return SIZES.map((size) => ({ size: String(size) }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ size: string }> }) {
  const size = Number((await params).size);
  if (!SIZES.includes(size)) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6e8efb, #a777e3)",
          color: "white",
          fontSize: size * 0.38,
          fontWeight: 700,
          letterSpacing: -size * 0.02,
        }}
      >
        JB
      </div>
    ),
    { width: size, height: size },
  );
}
