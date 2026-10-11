import { define } from "../../utils.ts";

// The posts listing moved to /news-updates to mirror favorcare.org's URL
// structure; individual posts still live at /posts/<slug>.
export const handler = define.handlers({
  GET() {
    return new Response(null, {
      status: 308,
      headers: { Location: "/news-updates" },
    });
  },
});
