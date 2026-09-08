# NestJS Resources

## Knowledge

- [NestJS Official Docs — Introduction](https://docs.nestjs.com/)
  Canonical source. Read first. Covers philosophy, install, project structure. Use for: mental model framing, confirming any claim.

- [NestJS Official Docs — First Steps](https://docs.nestjs.com/first-steps)
  Walks through scaffold, `main.ts`, `AppModule`, controllers, services. Use for: orienting a new project, understanding the four starter files.

- [NestJS Official Docs — Modules](https://docs.nestjs.com/modules)
  Deep dive on `@Module()` decorator, feature modules, shared modules, global modules, dynamic modules. Use for: anything about module structure or `imports/exports`.

- [NestJS Official Docs — Providers](https://docs.nestjs.com/providers)
  Services as providers, DI mechanics, scopes, optional providers, property injection. Use for: anything about `@Injectable()` and how dependencies are wired.

- [Angular — Dependency Injection guide](https://angular.dev/guide/di)
  Nest's DI is heavily modeled on Angular's. Use for: deeper DI mental model if the Nest docs feel terse.

- [Wikipedia — SOLID principles](https://en.wikipedia.org/wiki/SOLID)
  NestJS documentation explicitly recommends following SOLID. Use for: grounding the "why" of module boundaries and provider design.

## Wisdom (Communities)

- [r/nestjs](https://reddit.com/r/nestjs)
  Active subreddit. Use for: real-world architecture questions, "is this idiomatic" judgment calls.
- [NestJS Discord](https://discord.gg/nestjs)
  Official. High signal. Use for: live questions, library maintainers present.
- [NestJS GitHub Discussions](https://github.com/nestjs/nest/discussions)
  Use for: deep architectural questions, RFC-level debates.

## Gaps

- Junior-friendly TypeScript primer (need: write or curate before lesson 2)
- Junior-friendly Node.js / HTTP request lifecycle primer (need: write or curate before lesson 3)
- Curated "real codebase" examples for pattern reading (need: identify one open-source Nest app worth dissecting)
