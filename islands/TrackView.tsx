import { useEffect } from "preact/hooks";
import { track } from "./Tracking.tsx";

export interface TrackViewProps {
  /** The event name fired once when the island mounts. */
  event: string;
  /** String props attached to the event (UTM attribution is merged in). */
  props?: Record<string, string>;
}

// Fires a named analytics event once on mount — the view-based seam that
// complements Tracking's click delegation. Use it for landing/confirmation
// pages a visitor arrives at without clicking anything (e.g. the
// /coffeeforacause/thanks post-donation landing). Renders nothing; a no-op
// when no vendor is configured (track() guards the vendor globals).
export function TrackView({ event, props }: TrackViewProps) {
  // Mount-only by design: a view fires once per page load, not per render.
  useEffect(() => {
    track(event, props);
  }, []);
  return null;
}

export default TrackView;
