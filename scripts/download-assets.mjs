import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, "..", "public");

const assets = [
  ["videos/waves.mp4", "https://www.mlp.com/wp-content/uploads/2024/03/waves.mp4"],
  ["videos/sizzle-reel.mp4", "https://www.mlp.com/wp-content/uploads/2025/07/sizzle-reel-2025-preview.mp4"],
  ["videos/julia.mp4", "https://www.mlp.com/wp-content/uploads/2025/10/v4-julia-5-second-video.mp4"],
  ["videos/igor.mp4", "https://www.mlp.com/wp-content/uploads/2024/05/Igor-5s-Preview.mp4"],
  ["videos/mlp-tm.mp4", "https://www.mlp.com/wp-content/uploads/2024/05/MLP-TM-472397229.mp4"],
  ["images/footer-millennium-wordmark.png", "https://www.mlp.com/wp-content/uploads/2026/05/footer-Millennium-wordmark-scaled.png"],
  ["seo/favicon-32.png", "https://www.mlp.com/wp-content/uploads/2024/05/cropped-favicon-32x32.png"],
  ["seo/favicon-192.png", "https://www.mlp.com/wp-content/uploads/2024/05/cropped-favicon-192x192.png"],
  ["seo/apple-touch-icon.png", "https://www.mlp.com/wp-content/uploads/2024/05/cropped-favicon-180x180.png"],
];

async function exists(path) {
  try { await stat(path); return true; } catch { return false; }
}

async function download([rel, url]) {
  const dest = resolve(PUBLIC, rel);
  if (await exists(dest)) {
    console.log(`✓ exists ${rel}`);
    return;
  }
  await mkdir(dirname(dest), { recursive: true });
  console.log(`↓ ${rel} ← ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`  saved ${rel} (${(buf.length / 1024).toFixed(1)} KiB)`);
}

async function batch(items, n = 4) {
  const queue = [...items];
  const workers = Array.from({ length: n }, async () => {
    while (queue.length) {
      const item = queue.shift();
      try { await download(item); } catch (e) { console.error("✗", item[0], e.message); }
    }
  });
  await Promise.all(workers);
}

await batch(assets);
console.log("done");
