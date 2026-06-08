import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

const BASE_URL = "https://first-ocean.com";
const PATHS = [
  "",
  "/approach",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
  "/legal/disclosures",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PATHS.flatMap((path) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: path.startsWith("/legal")
        ? ("yearly" as const)
        : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/legal") ? 0.3 : path === "/contact" ? 0.5 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
