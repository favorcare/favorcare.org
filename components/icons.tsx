// The single seam for every icon on the site. UI glyphs come from
// lucide-preact (stroke, `currentColor`); brand glyphs come from
// simple-icons (filled 24×24 paths). Nothing outside this file may import
// an icon package or hand-roll an inline `<svg>` — swap the library here,
// and the whole site follows.
//
// Stroke widths are passed through in lucide's relative semantics (the
// same as the hand-rolled 24-grid SVGs this module replaced), so on-screen
// weight scales with size exactly as before. `PlusIcon` is the exception:
// its original was a 14-grid glyph, so it uses `absoluteStrokeWidth` to
// hold a true 2px at any size; `MailIcon` (new, no filled predecessor)
// does the same.
import {
  ChevronLeft,
  ChevronRight,
  Coffee,
  Mail,
  Menu,
  Plus,
  X,
} from "lucide-preact";
import { siFacebook, siInstagram, siYoutube } from "simple-icons";

export interface IconProps {
  /** Rendered width/height in px (icons are square). */
  size?: number;
  class?: string;
}

export function CloseIcon({ size = 24, class: cls }: IconProps) {
  return <X aria-hidden="true" size={size} strokeWidth={2} class={cls} />;
}

export function MenuIcon({ size = 24, class: cls }: IconProps) {
  return <Menu aria-hidden="true" size={size} strokeWidth={2} class={cls} />;
}

export function ChevronLeftIcon({ size = 30, class: cls }: IconProps) {
  return (
    <ChevronLeft aria-hidden="true" size={size} strokeWidth={2.5} class={cls} />
  );
}

export function ChevronRightIcon({ size = 30, class: cls }: IconProps) {
  return (
    <ChevronRight
      aria-hidden="true"
      size={size}
      strokeWidth={2.5}
      class={cls}
    />
  );
}

export function PlusIcon({ size = 14, class: cls }: IconProps) {
  return (
    <Plus
      aria-hidden="true"
      size={size}
      strokeWidth={2}
      absoluteStrokeWidth
      class={cls}
    />
  );
}

export function MailIcon({ size = 22, class: cls }: IconProps) {
  return (
    <Mail
      aria-hidden="true"
      size={size}
      strokeWidth={2}
      absoluteStrokeWidth
      class={cls}
    />
  );
}

/** The Coffee for a Cause campaign glyph (stroke, currentColor). */
export function CoffeeIcon({ size = 24, class: cls }: IconProps) {
  return (
    <Coffee
      aria-hidden="true"
      size={size}
      strokeWidth={2}
      absoluteStrokeWidth
      class={cls}
    />
  );
}

export type BrandName = "facebook" | "instagram" | "youtube";

const BRANDS: Record<BrandName, { path: string }> = {
  facebook: siFacebook,
  instagram: siInstagram,
  youtube: siYoutube,
};

export function BrandIcon(
  { name, size = 22, class: cls }: IconProps & { name: BrandName },
) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      class={cls}
    >
      <path d={BRANDS[name].path} />
    </svg>
  );
}
