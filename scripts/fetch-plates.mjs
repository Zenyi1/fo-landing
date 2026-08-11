import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Downloads the /intelligence plates from Unsplash at the exact crops the page
// renders, so the files in public/plates are the files the browser gets and no
// remote host has to stay in next.config.
//
// The photos are pinned by id rather than re-searched, because the point of
// this script is that a lost or re-cloned public/plates comes back identical.
// Picking new photography is a manual job; this only re-fetches the choices.
//
//   UNSPLASH_ACCESS_KEY=... node scripts/fetch-plates.mjs
//
// Unsplash's API guidelines require the /download endpoint be hit whenever a
// copy is taken. It returns a URL we ignore — the call itself is the point, and
// it is what credits the photographer's download count.

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "public", "plates");

const PLATES = [
  {
    file: "bench.jpg",
    id: "6Fxc1d53pog",
    by: "Mitya Abrosimov",
    link: "https://unsplash.com/photos/6Fxc1d53pog",
    w: 1200,
    h: 1500, // 4:5, hero
  },
  {
    file: "archive.jpg",
    id: "IEiAmhXehwE",
    by: "Nana Smirnova",
    link: "https://unsplash.com/photos/IEiAmhXehwE",
    w: 1600,
    h: 500, // 16:5, compliance and regulatory
  },
  {
    file: "lab.jpg",
    id: "mCpSF-KnlKY",
    by: "Trnava University",
    link: "https://unsplash.com/photos/mCpSF-KnlKY",
    w: 2400,
    h: 900, // 8:3, closing statement
  },
  {
    // A calm horizon where the sea dissolves into the sky, rather than the near
    // black water this used to be. It is a lighter plate, so the scrim carries
    // more of the legibility: the CTA copy sits over the left of it and the
    // brightest patch there governs the choice. Under the 50% scrim the heading
    // measures 7.3:1 and the 80% white body copy 5.4:1.
    file: "ocean.jpg",
    id: "GxymWkdnl4Y",
    by: "Fernando Jorge",
    link: "https://unsplash.com/photos/GxymWkdnl4Y",
    w: 2400,
    h: 1030, // ~21:9, CTA backdrop behind the scrim
  },
];

const key = process.env.UNSPLASH_ACCESS_KEY;
if (!key) {
  console.error("UNSPLASH_ACCESS_KEY is not set");
  process.exit(1);
}

const auth = { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" };

async function json(url) {
  const res = await fetch(url, { headers: auth });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

await mkdir(OUT, { recursive: true });

for (const p of PLATES) {
  const photo = await json(`https://api.unsplash.com/photos/${p.id}`);

  // required by the API guidelines, and must fire before we keep the bytes
  await json(photo.links.download_location);

  // imgix params on the raw url: crop to the exact box the page renders, so the
  // browser never downloads pixels it will throw away
  const url = `${photo.urls.raw}&w=${p.w}&h=${p.h}&fit=crop&crop=entropy&fm=jpg&q=82`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} downloading ${p.file}`);

  const bytes = Buffer.from(await res.arrayBuffer());
  await writeFile(resolve(OUT, p.file), bytes);
  console.log(
    `${p.file}  ${p.w}x${p.h}  ${(bytes.length / 1024).toFixed(0)}kB  ${p.by}`,
  );
}

const credits = [
  "# Plate credits",
  "",
  "Photographs from Unsplash, used under the Unsplash License, which permits",
  "commercial use without attribution. Credited anyway, and kept here so the",
  "provenance of each file is recoverable.",
  "",
  "Re-fetch with `UNSPLASH_ACCESS_KEY=... node scripts/fetch-plates.mjs`.",
  "",
  ...PLATES.map((p) => `- \`${p.file}\` — ${p.by}, ${p.link}`),
  "",
].join("\n");

await writeFile(resolve(OUT, "CREDITS.md"), credits);
console.log("CREDITS.md");
