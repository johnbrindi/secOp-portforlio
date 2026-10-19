import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Mazwewoh John Brindi — Network & Infrastructure Engineer · Security";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const avatar = await readFile(join(process.cwd(), "assets/og-avatar.jpg"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #09090f 0%, #0f0f1a 60%, #1a1530 100%)",
          color: "#e8e8f0",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 740 }}>
          <div style={{ display: "flex", fontSize: 24, color: "#6e8efb", letterSpacing: 4, textTransform: "uppercase" }}>
            Portfolio
          </div>
          <div style={{ display: "flex", fontSize: 62, fontWeight: 700, lineHeight: 1.05, marginTop: 20, whiteSpace: "nowrap" }}>
            Mazwewoh John Brindi
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 32, color: "#8b8ba7", marginTop: 24, lineHeight: 1.35 }}>
            <div style={{ display: "flex" }}>Network & Infrastructure Engineer</div>
            <div style={{ display: "flex" }}>Security Lead · CEO &amp; Founder, ZIGEX</div>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
            {["MPLS / L3VPN", "SOC & SIEM", "Pentesting"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 22,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(110,142,251,.45)",
                  color: "#c9d3ff",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <img
          src={`data:image/jpeg;base64,${avatar}`}
          width={320}
          height={320}
          alt=""
          style={{
            borderRadius: 999,
            border: "6px solid #6e8efb",
            boxShadow: "0 0 80px rgba(110,142,251,.35)",
          }}
        />
      </div>
    ),
    size
  );
}
