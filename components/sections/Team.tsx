import { Section } from "../layout/Section.tsx";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import type { TeamMember } from "../content.ts";

export interface TeamProps {
  id?: string;
  title: string;
  subtitle?: string;
  members: TeamMember[];
}

// "Meet our team" grid — headshot, name, role. The photo card is written
// directly (not via Card) so the image can bleed to the card edges.
export function Team({ id, title, subtitle, members }: TeamProps) {
  return (
    <Section id={id} tone="dim">
      <Container class="py-20">
        <SectionHeading title={title} subtitle={subtitle} align="center" />
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {members.map((member) => (
            <article
              key={member.name}
              class="overflow-hidden rounded-lg border border-surface-container-high bg-surface shadow-sm"
            >
              <img
                src={member.photo}
                alt={member.photoAlt}
                loading="lazy"
                class="aspect-4/5 w-full object-cover"
              />
              <div class="p-4">
                <h3 class="font-semibold text-on-surface">{member.name}</h3>
                <p class="mt-1 text-sm text-on-surface-variant">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Team;
