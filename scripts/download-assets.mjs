import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, "..", "public");

const assets = [
  ["videos/waves.mp4", "https://www.mlp.com/wp-content/uploads/2024/03/waves.mp4"],
  ["videos/julia.mp4", "https://www.mlp.com/wp-content/uploads/2025/10/v4-julia-5-second-video.mp4"],
  ["videos/igor.mp4", "https://www.mlp.com/wp-content/uploads/2024/05/Igor-5s-Preview.mp4"],
  ["videos/mlp-tm.mp4", "https://www.mlp.com/wp-content/uploads/2024/05/MLP-TM-472397229.mp4"],
  ["images/footer-millennium-wordmark.png", "https://www.mlp.com/wp-content/uploads/2026/05/footer-Millennium-wordmark-scaled.png"],
  ["seo/favicon-32.png", "https://www.mlp.com/wp-content/uploads/2024/05/cropped-favicon-32x32.png"],
  ["seo/favicon-192.png", "https://www.mlp.com/wp-content/uploads/2024/05/cropped-favicon-192x192.png"],
  ["seo/apple-touch-icon.png", "https://www.mlp.com/wp-content/uploads/2024/05/cropped-favicon-180x180.png"],
  ["images/rotator/01-abstract.jpg", "https://averin-capital.transforms.svdcdn.com/production/homepage-animation/e848f985aaf0f26de2c8e4d05e0f7567.png?w=2200&h=1238&q=80&auto=format%2Cavif&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1746210372&s=062a14200a60658454029067b7f12a37"],
  ["images/rotator/02-microfluidics.jpg", "https://averin-capital.transforms.svdcdn.com/production/homepage-animation/Microfluidics.png?w=2200&h=1238&q=80&auto=format%2Cavif&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1748873063&s=dc646a149093cbef4cb24b6369c0713a"],
  ["images/rotator/03-pills.jpg", "https://averin-capital.transforms.svdcdn.com/production/homepage-animation/visualelectric-pills-03-citrine.png?w=2200&h=1238&q=80&auto=format%2Cavif&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1746210372&s=3e340cd245dba103bf5f71dfe0d1e50e"],
  ["images/rotator/04-surgical.jpg", "https://averin-capital.transforms.svdcdn.com/production/homepage-animation/5927344.jpg?w=2200&h=1238&q=100&auto=format%2Cavif&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1746210371&s=139e92d0c30c046eb74bd60c1e5fcd5f"],
  ["images/rotator/05-servers.jpg", "https://averin-capital.transforms.svdcdn.com/production/homepage-animation/Servers2.png?w=2200&h=1238&q=80&auto=format%2Cavif&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1756040338&s=e9998798dad7d6119d6e4f1a98cb4dc6"],
  ["images/rotator/06-molecule.jpg", "https://averin-capital.transforms.svdcdn.com/production/homepage-animation/visualelectric-molecule-07.png?w=2200&h=1238&q=80&auto=format%2Cavif&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1756040583&s=2f0b531435a1d7876941c072ced467ed"],
  ["images/rotator/07-chip-droplet.jpg", "https://averin-capital.transforms.svdcdn.com/production/homepage-animation/chip-with-droplet.png?w=2200&h=1238&q=80&auto=format%2Cavif&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1748867453&s=c1bc601a8fe23db94f09bac19cfe1025"],
  ["images/rotator/08-dna-robot.jpg", "https://averin-capital.transforms.svdcdn.com/production/homepage-animation/Better-DNA-Robot.png?w=2200&h=1238&q=80&auto=format%2Cavif&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1748871298&s=fab93df730d1f124629cee42da112d9c"],
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
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Accept": "image/jpeg,image/png,image/*,*/*;q=0.8",
      "Referer": "https://www.averincapital.com/",
    },
  });
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
