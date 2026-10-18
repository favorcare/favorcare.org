import type { TeamMember } from "./content.ts";

export interface TeamGridProps {
  members: TeamMember[];
}

/**
 * The who-we-are team list: portrait over name and role (centered, one
 * column) below md; from md a two-column grid with each portrait beside its
 * caption. Portraits are 204×245 at 360, 166×225 at 768 and 233×282 at 1280.
 * The section heading and subtitle stay in the route.
 */
export function TeamGrid({ members }: TeamGridProps) {
  return (
    <ul class="mt-8 flex flex-col items-center gap-6 md:mt-[70px] md:grid md:grid-cols-2 md:gap-x-2.5 md:gap-y-[30px] md:px-[42px] lg:gap-x-7 lg:gap-y-10 lg:px-[46px]">
      {members.map((m) => (
        <li class="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
          <img
            src={m.photo}
            alt={m.photoAlt}
            class="h-[245px] w-[204px] object-cover md:h-[225px] md:w-[166px] lg:h-[282px] lg:w-[233px]"
            loading="lazy"
          />
          <div class="mt-3.5 md:ml-2.5 md:mt-0 md:pt-2.5 lg:ml-6">
            <h3 class="text-[25px] font-bold leading-none text-primary md:font-medium lg:text-[30px]">
              {m.name}
            </h3>
            <p class="mt-1 text-sm font-normal text-on-surface md:text-base md:font-medium">
              {m.role}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TeamGrid;
