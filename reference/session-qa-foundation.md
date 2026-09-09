# Session Q&A: NestJS Foundation

This document captures the deep-dive questions and explanations from the initial orientation sessions. It serves as a supplement to the lessons, focusing on the "under the hood" mechanics and architectural trade-offs.

---

## 1. Decorators and Metadata

**Q: What does 'attaching metadata' look like under the hood?**

**A:** It is a three-layer process:
1. **The Surface**: You write `@Controller('cats')`.
2. **The Compilation**: TypeScript desugars this into a function call that applies the decorator to the class.
3. **The Runtime**: The decorator uses a library called `reflect-metadata` to write a key-value pair (e.g., `path: '/cats'`) into a metadata table attached to the class.

When Nest starts up, the `NestFactory` (the "Librarian") walks through all registered classes and reads these stickers from the metadata table to decide how to wire the application graph.

---

## 2. Circular Dependencies

**Q: What if two things depend on each other (circular)?**

**A:** This creates a "chicken and egg" paradox where the IoC container cannot find a starting point to instantiate the objects.

**The Fix**: `forwardRef()`.
This tells Nest to use a **Proxy** (a placeholder). Instead of injecting the real service immediately, Nest injects a wrapper. The first time a method is called on that wrapper, it lazily resolves the real service from the container.

**Architectural Note**: Circular dependencies are usually a "code smell." The preferred fix is to extract the shared logic into a third, smaller service that both original services depend on.

---

## 3. Injection Scopes

**Q: What if I actually want a new copy of a service every time?**

**A:** You change the `scope` of the `@Injectable()` decorator. Nest provides three scopes:
1. **DEFAULT (Singleton)**: One instance for the entire app. (Default).
2. **TRANSIENT**: A dedicated instance for every single consumer.
3. **REQUEST**: One instance created per incoming HTTP request, shared by everyone handling that specific request.

**Trade-off**: Moving away from Singletons increases memory usage and CPU overhead during instantiation.

---

## 4. Interfaces and Type Erasure

**Q: How does Nest know which class to inject if I use an interface?**

**A:** It doesn't, because TypeScript interfaces are **erased** at compile time and do not exist in JavaScript.

**The Solution: Injection Tokens.**
Instead of asking for a *Type*, you ask for a *Token* (a string or symbol).
1. **Registration**: In the module, you map a token to a class: `{ provide: 'IUserService', useClass: UsersServiceImpl }`.
2. **Injection**: In the controller, you use the `@Inject()` decorator: `constructor(@Inject('IUserService') private userService: IUserService) {}`.

This allows for perfect decoupling: the controller depends on a token, and you can swap the implementation in the module without changing the controller's code.

---

## 5. Encapsulation

**Q: Why is encapsulation the default in NestJS?**

**A:** To prevent the "Big Ball of Mud" architecture. By making everything private by default and requiring explicit `imports` and `exports`, Nest ensures:
- **Reduced Fragility**: Changing a private service cannot break code in another module.
- **Lower Cognitive Load**: Developers only see the public API of a module, not every internal helper.
- **Explicit Boundaries**: The architecture forces you to design how features interact rather than letting them tangle organically.
