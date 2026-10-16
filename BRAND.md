# Brand voice & content guide

How Favor Care writes. This applies to **every user-facing string**: page copy,
headlines, captions, story posts, CTAs, emails. AI agents read this before
writing copy (see AGENTS.md, "Sources of truth").

## Identity

- **Tone:** raw, authentic, hopeful
- **Style:** straight to the point — less fluff, more story
- **Core message:** "Every story matters. Every act of compassion makes an
  impact."

## Storytelling approach

1. **Raw & honest** — show the real struggles without sugarcoating.
2. **Hope-focused** — always balance the hardship with a message of dignity and
   hope.
3. **Straight to the point** — keep captions and videos short, powerful, and
   action-driven.
4. **Impact-oriented** — highlight not just the need, but the change happening
   because of generosity.

## Content style

**Photos & video**

- Candid, documentary-style. Avoid overly polished or staged shots.
- Show hands extended, smiles, tears, and genuine human connection.

**Captions & copy**

- Direct. Name the person and state what happened: _"This is Maria. Today, she
  received her first medical check-up in years."_
- Tie to action: _"Your giving makes this possible. Join us in reaching more
  lives."_

**Graphics**

- Minimal words, strong images.
- If you are using letters — bold and clear fonts, easy to read at first glance.

## Engagement arc: show stories → spark action

Every story follows the same three beats:

1. **"Here's the reality"** — the raw moment.
2. **"Here's the hope"** — how lives are changing.
3. **"Here's how you can help"** — one clear call to action: donate, partner,
   volunteer.

A story page ends with a contextual CTA tied to the program in the story.

## CTA examples

- "Help us reach more children like Ana."
- "Together, we can give hope where it's needed most."

## Rules for writing (AI and humans)

- **Never invent people, quotes, or numbers.** Real stories live in
  `components/posts.ts` and `components/content.ts`; new stories come from the
  team, not from a model. If a fact isn't in the repo, ask — don't make it up.
- **Keep the arc:** reality → hope → ask. Hardship never appears without the
  dignity-and-hope counterweight.
- **Read the shipped copy first.** `components/content.ts` is canonical; new
  copy should sound like what's already there.
- **Short beats smooth.** A sentence that lands beats a paragraph that explains.
