import type { NextConfig } from "next";

const config: NextConfig = {
  async redirects() {
    return [
      // The canonical WP archive lives at /posts (staging's /news-updates
      // 404s); old in-app links update via the nav.
      { source: "/news-updates", destination: "/posts", permanent: true },
    ];
  },
};

export default config;
