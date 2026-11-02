// Builds every app icon from the brand logo. To change the logo, replace
// public/brand/logo.svg (square artwork, 512×512 viewBox) and run: npm run icons
import { readFile } from "node:fs/promises";
import sharp from "sharp";

const logo = await readFile("public/brand/logo.svg", "utf8");
const badge = await readFile("public/brand/logo-badge.svg");
// iOS and Android "maskable" icons apply their own rounded mask, so they need a square background.
const squareSvg = logo.replace(/(<rect[^>]*?)\srx="[^"]*"/, "$1");
const square = Buffer.from(squareSvg);
// Android may crop maskable icons to a circle; shrink the artwork into the central safe zone.
const maskable = Buffer.from(squareSvg.replace(/(<rect[^>]*\/>)([\s\S]*)(<\/svg>)/,
  '$1<g transform="translate(51.2 51.2) scale(0.8)">$2</g>$3'));
const rounded = Buffer.from(logo);

const outputs = [
  ["app/icon.png", rounded, 96],             // favicon (Google wants multiples of 48)
  ["app/apple-icon.png", square, 180],       // iPhone home screen
  ["public/icons/96.png", rounded, 96],      // manifest shortcuts
  ["public/icons/192.png", rounded, 192],    // admin app icon, notification icon
  ["public/icons/512.png", rounded, 512],
  ["public/icons/maskable-512.png", maskable, 512],
  ["public/icons/badge-96.png", badge, 96],  // notification badge (monochrome)
];

for (const [file, svg, size] of outputs) {
  await sharp(svg, { density: 300 }).resize(size, size).png().toFile(file);
  console.log(`${file} (${size}px)`);
}
