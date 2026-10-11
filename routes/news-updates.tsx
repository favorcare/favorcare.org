import { define } from "../utils.ts";

// The canonical WP archive lives at /posts (staging's /news-updates 404s);
// this URL now redirects there. Old in-app links update via the nav.
export const handler = define.handlers({
  GET() {
    return new Response(null, {
      status: 308,
      headers: { Location: "/posts" },
    });
  },
});
