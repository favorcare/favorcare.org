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
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Eye,
  HandHeart,
  Heart,
  Mail,
  MapPin,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { siFacebook, siInstagram, siTiktok, siYoutube } from "simple-icons";

export interface IconProps {
  /** Rendered width/height in px (icons are square). */
  size?: number;
  className?: string;
}

/** The X glyph for dialog/overlay closes. `strokeWidth` (default 2) thins
 *  it for the accreditation popup's hairline WP glyph. */
export function CloseIcon({
  size = 24,
  className: cls,
  strokeWidth = 2,
}: IconProps & { strokeWidth?: number }) {
  return (
    <X
      aria-hidden="true"
      size={size}
      strokeWidth={strokeWidth}
      className={cls}
    />
  );
}

export function MenuIcon({ size = 24, className: cls }: IconProps) {
  return (
    <Menu aria-hidden="true" size={size} strokeWidth={2} className={cls} />
  );
}

export function ChevronLeftIcon({ size = 30, className: cls }: IconProps) {
  return (
    <ChevronLeft
      aria-hidden="true"
      size={size}
      strokeWidth={2.5}
      className={cls}
    />
  );
}

export function ChevronRightIcon({ size = 30, className: cls }: IconProps) {
  return (
    <ChevronRight
      aria-hidden="true"
      size={size}
      strokeWidth={2.5}
      className={cls}
    />
  );
}

export function PlusIcon({ size = 14, className: cls }: IconProps) {
  return (
    <Plus
      aria-hidden="true"
      size={size}
      strokeWidth={2}
      absoluteStrokeWidth
      className={cls}
    />
  );
}

export function MailIcon({ size = 22, className: cls }: IconProps) {
  return (
    <Mail
      aria-hidden="true"
      size={size}
      strokeWidth={2}
      absoluteStrokeWidth
      className={cls}
    />
  );
}

/** The Coffee for a Cause campaign glyph (stroke, currentColor). */
export function CoffeeIcon({ size = 24, className: cls }: IconProps) {
  return (
    <Coffee
      aria-hidden="true"
      size={size}
      strokeWidth={2}
      absoluteStrokeWidth
      className={cls}
    />
  );
}

/** Map pin for address rows (CFAC contact card). */
export function MapPinIcon({ size = 22, className: cls }: IconProps) {
  return (
    <MapPin aria-hidden="true" size={size} strokeWidth={2} className={cls} />
  );
}

/** Check mark (CFAC thank-you badge). */
export function CheckIcon({ size = 24, className: cls }: IconProps) {
  return (
    <Check aria-hidden="true" size={size} strokeWidth={2.5} className={cls} />
  );
}

/** Arrows for "Return to Site" / "Send Message" style CTAs. */
export function ArrowLeftIcon({ size = 20, className: cls }: IconProps) {
  return (
    <ArrowLeft aria-hidden="true" size={size} strokeWidth={2} className={cls} />
  );
}

export function ArrowRightIcon({ size = 20, className: cls }: IconProps) {
  return (
    <ArrowRight
      aria-hidden="true"
      size={size}
      strokeWidth={2}
      className={cls}
    />
  );
}

/** The CFAC How It Works step glyphs — see the need / feel the impact /
 *  take action. */
export function EyeIcon({ size = 28, className: cls }: IconProps) {
  return <Eye aria-hidden="true" size={size} strokeWidth={2} className={cls} />;
}

export function HeartIcon({ size = 28, className: cls }: IconProps) {
  return (
    <Heart aria-hidden="true" size={size} strokeWidth={2} className={cls} />
  );
}

export function HandHeartIcon({ size = 28, className: cls }: IconProps) {
  return (
    <HandHeart aria-hidden="true" size={size} strokeWidth={2} className={cls} />
  );
}

export type BrandName = "facebook" | "instagram" | "tiktok" | "youtube";

const BRANDS: Record<BrandName, { path: string }> = {
  facebook: siFacebook,
  instagram: siInstagram,
  tiktok: siTiktok,
  youtube: siYoutube,
};

export function BrandIcon({
  name,
  size = 22,
  className: cls,
}: IconProps & { name: BrandName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={cls}
    >
      <path d={BRANDS[name].path} />
    </svg>
  );
}
