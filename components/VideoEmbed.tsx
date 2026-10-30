export interface VideoEmbedProps {
  /** YouTube video id (e.g. "zPlPPJDo-ew"). */
  id: string;
  /** Accessible name for the iframe (rendered as the iframe title). */
  title: string;
  className?: string;
}

// YouTube embed matching the WP Elementor video widget's rendered iframe
// (controls on, related videos off, playsinline). Lazy-loaded so the two
// homepage embeds cost nothing until scrolled near.
export function VideoEmbed({ id, title, className: extra }: VideoEmbedProps) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${id}?controls=1&rel=0&playsinline`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className={extra ?? "aspect-video w-full"}
    />
  );
}

export default VideoEmbed;
