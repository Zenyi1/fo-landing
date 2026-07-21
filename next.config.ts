import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // proxy posthog through our own domain so ad blockers don't drop analytics and replay
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: "https://us-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/:path*", destination: "https://us.i.posthog.com/:path*" },
    ];
  },
  async redirects() {
    return [
      // old bilingual site lived under /en and /ja — send those (and their sub-paths) home
      { source: "/en", destination: "/", permanent: true },
      { source: "/ja", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/", permanent: true },
      { source: "/ja/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
