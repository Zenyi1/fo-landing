import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
