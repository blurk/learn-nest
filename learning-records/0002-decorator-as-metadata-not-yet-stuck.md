# Decorator-as-Metadata Not Yet Stuck

User missed question 3 in lesson 0001's quiz: could not recall that "decorators as metadata" is the third Angular idea Nest borrows. The other two (convention over configuration, DI) were intact.

**Why it matters**: this is the load-bearing idea. Decorators are the *bridge* between code-as-the-user-writes-it and code-as-the-container-wires-it-up. Without this concept, later lessons on `@Module()`, `@Controller()`, `@Injectable()` will feel like magic syntax rather than structured annotations the runtime reads.

**Status**: superseded by LR-0003
