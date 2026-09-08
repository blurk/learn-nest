# Notes

## User preferences
- **Learning style**: theory-first, code-second. Concepts before syntax.
- **Level**: junior backend dev. No prior Node/Express/TypeScript assumed.
- **Mission**: career preparation for junior NestJS role.
- **Cadence**: multi-session stateful learning. Each session leaves workspace updated.

## Working notes
- Workspace created fresh: `learn-nest/`
- Mission confirmed: junior level, career goal, theory-first
- First lesson will be pure conceptual: "What Nest is and why it exists" — no code yet, sets mental model
- Resources confirmed: official docs as primary source. No third-party blog posts yet (curate later if official docs feel too dense for junior audience)
- Gaps identified: TypeScript primer, Node/HTTP primer, real-codebase examples. Will address as lessons approach them.

## Open questions to revisit
- How much TypeScript scaffolding does the user want before Nest? Separate primer or inline?
- Database choice (Postgres + Prisma is common modern stack; confirm when relevant)

## Teaching format decisions
- **Abstract lessons by default.** Lessons present concepts in plain language without under-the-hood machinery (no `reflect-metadata`, no decorator compilation, no runtime internals unless the lesson is *about* those things).
- **Deep-dives on demand.** When the user asks "what does X look like under the hood," answer in full technical detail in the chat, but do **not** retroactively rewrite the lesson to include it. Future lessons stay abstract unless the user requests depth on a specific topic.
- **Rationale**: user is theory-first but does not want every lesson to carry implementation noise. Mental models come from abstraction; precision comes from ask-and-answer.
