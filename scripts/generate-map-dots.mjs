// one-time generator: rasterizes world countries geojson into a coarse dot grid
// output: src/data/world-dots.json — array of [col, row, emerging] triples
// usage: node scripts/generate-map-dots.mjs

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const GEOJSON_URL =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

const STEP = 2; // degrees per grid cell
const MIN_LAT = -56; // drop antarctica
const MAX_LAT = 84;

// iso3 codes glowed as emerging markets on the map (decorative, blurred)
const EMERGING = new Set([
  // latin america
  "MEX", "GTM", "HND", "SLV", "NIC", "CRI", "PAN", "CUB", "DOM", "HTI",
  "JAM", "TTO", "COL", "VEN", "ECU", "PER", "BOL", "PRY", "URY", "ARG",
  "CHL", "BRA", "GUY", "SUR", "BLZ",
  // africa
  "DZA", "MAR", "TUN", "LBY", "EGY", "SDN", "SSD", "MRT", "MLI", "NER",
  "TCD", "ETH", "ERI", "DJI", "SOM", "KEN", "UGA", "TZA", "RWA", "BDI",
  "NGA", "GHA", "CIV", "SEN", "GIN", "GNB", "SLE", "LBR", "TGO", "BEN",
  "BFA", "CMR", "CAF", "COD", "COG", "GAB", "GNQ", "AGO", "ZMB", "ZWE",
  "MWI", "MOZ", "NAM", "BWA", "ZAF", "LSO", "SWZ", "MDG",
  // middle east
  "TUR", "SAU", "ARE", "QAT", "KWT", "BHR", "OMN", "YEM", "JOR", "LBN",
  "SYR", "IRQ", "IRN", "PSE",
  // south + southeast asia
  "PAK", "IND", "BGD", "LKA", "NPL", "BTN", "AFG", "MMR", "THA", "VNM",
  "KHM", "LAO", "MYS", "IDN", "PHL", "BRN", "TLS", "PNG", "CHN",
  // cis + eastern europe
  "KAZ", "UZB", "TKM", "KGZ", "TJK", "AZE", "ARM", "GEO", "MNG", "UKR",
  "BLR", "MDA", "SRB", "BIH", "MKD", "ALB",
]);

function bbox(rings) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const ring of rings) {
    for (const [x, y] of ring) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  return [minX, minY, maxX, maxY];
}

// even-odd ray casting across all rings (outer + holes)
function inPolygon(rings, x, y) {
  let inside = false;
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
  }
  return inside;
}

const res = await fetch(GEOJSON_URL);
if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
const geo = await res.json();

const polygons = [];
for (const f of geo.features) {
  if (f.id === "ATA") continue;
  const emerging = EMERGING.has(f.id) ? 1 : 0;
  const geom = f.geometry;
  const polys =
    geom.type === "Polygon" ? [geom.coordinates]
    : geom.type === "MultiPolygon" ? geom.coordinates
    : [];
  for (const rings of polys) {
    polygons.push({ rings, box: bbox(rings), emerging });
  }
}

const dots = [];
const rows = Math.floor((MAX_LAT - MIN_LAT) / STEP);
const cols = Math.floor(360 / STEP);
for (let r = 0; r < rows; r++) {
  const lat = MAX_LAT - (r + 0.5) * STEP;
  for (let c = 0; c < cols; c++) {
    const lon = -180 + (c + 0.5) * STEP;
    for (const p of polygons) {
      const [minX, minY, maxX, maxY] = p.box;
      if (lon < minX || lon > maxX || lat < minY || lat > maxY) continue;
      if (inPolygon(p.rings, lon, lat)) {
        dots.push([c, r, p.emerging]);
        break;
      }
    }
  }
}

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "src", "data");
mkdirSync(outDir, { recursive: true });
const out = { cols, rows, dots };
writeFileSync(join(outDir, "world-dots.json"), JSON.stringify(out));
console.log(`wrote ${dots.length} dots (${cols}x${rows} grid, ${dots.filter((d) => d[2]).length} emerging)`);
