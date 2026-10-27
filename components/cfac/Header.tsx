import { Button } from "../Button.tsx";
import { CoffeeIcon } from "../icons.tsx";
import { CFAC, CFAC_EVENTS, cfacDonateProps } from "../cfac.ts";

// CFAC campaign header: espresso bar (bg-primary → the scoped espresso),
// campaign wordmark left, single DONATE pill right. No site nav — this is
// a campaign page, not a site section; mobile keeps the same two pieces
// (no burger).
//
// TODO(brand kit): the wordmark is a text + glyph placeholder. When the
// CFAC logo arrives, replace it with the SVG asset (static/, via asset())
// exactly as components/Header.tsx does.
export function CfacHeader() {
  return (
    <header class="relative bg-primary py-2.5 text-on-primary lg:py-[10px]">
      <div class="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 md:px-10">
        <a
          href="/coffeeforacause"
          class="flex items-center gap-2.5"
          aria-label="Coffee for a Cause home"
        >
          <CoffeeIcon size={30} class="text-yellow" />
          <span class="flex flex-col leading-none">
            <span class="text-[17px] font-bold md:text-xl">
              {CFAC.name}
            </span>
            <span class="mt-1 text-[11px] font-semibold uppercase tracking-wider text-on-primary/80">
              by Favor Care
            </span>
          </span>
        </a>

        <Button
          variant="yellow"
          size="header"
          href={CFAC.donate.href}
          track={CFAC_EVENTS.donate}
          trackProps={cfacDonateProps("header")}
        >
          {CFAC.donate.label}
        </Button>
      </div>
    </header>
  );
}

export default CfacHeader;
