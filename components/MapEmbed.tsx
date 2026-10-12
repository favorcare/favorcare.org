export interface MapEmbedProps {
  /** Full maps.google.com embed URL (q=…&t=m&z=…&output=embed). */
  src: string;
  title: string;
  class?: string;
}

// Google Maps embed for the WP google_maps widget (favor Church, EDSA
// Shangri-La). Full-bleed on the homepage; height via the class prop.
export function MapEmbed({ src, title, class: extra }: MapEmbedProps) {
  return (
    <iframe
      src={src}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      class={extra ?? "h-[235px] w-full md:h-[262px] lg:h-[400px]"}
    />
  );
}

export default MapEmbed;
