import sharp from "sharp";
import { writeFile, copyFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const source = resolve(root, "public/seo/fo.jpeg");

const targets = [
  { size: 32, out: "public/seo/favicon-32.png" },
  { size: 192, out: "public/seo/favicon-192.png" },
  { size: 180, out: "public/seo/apple-touch-icon.png" },
  { size: 32, out: "public/seo/favicon.png" },
];

for (const { size, out } of targets) {
  const buffer = await sharp(source)
    .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toBuffer();
  await writeFile(resolve(root, out), buffer);
  console.log(`wrote ${out} (${size}x${size})`);
}

await copyFile(resolve(root, "public/seo/favicon.png"), resolve(root, "src/app/favicon.ico"));
console.log("wrote src/app/favicon.ico");
