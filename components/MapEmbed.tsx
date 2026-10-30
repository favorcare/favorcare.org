export interface MapEmbedProps {
  /** Full maps.google.com embed URL, or a place query for `mapEmbedSrc`. */
  src: string;
  title: string;
  className?: string;
}

/** Build the no-API-key embed URL the WP google_maps widget used. */
export function mapEmbedSrc(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    query,
  )}&output=embed`;
}

// Google Maps embed for the WP google_maps widget (favor Church, EDSA
// Shangri-La). Full-bleed on the homepage; height via the class prop.
export function MapEmbed({ src, title, className: extra }: MapEmbedProps) {
  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={extra ?? "h-[235px] w-full md:h-[262px] lg:h-[400px]"}
    />
  );
}

export default MapEmbed;
