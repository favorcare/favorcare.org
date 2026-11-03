import type { NextConfig } from "next";

const config: NextConfig = {
  async redirects() {
    return [
      // The canonical WP archive lives at /posts (staging's /news-updates
      // 404s); old in-app links update via the nav.
      { source: "/news-updates", destination: "/posts", permanent: true },
      // cfac-donations' PayMongo success/cancel URLs say /coffeeforcause
      // (no "a"); catch them until the backend is corrected.
      {
        source: "/coffeeforcause",
        destination: "/coffeeforacause",
        permanent: false,
      },
      {
        source: "/coffeeforcause/:path*",
        destination: "/coffeeforacause/:path*",
        permanent: false,
      },
    ];
  },
};

export default config;
