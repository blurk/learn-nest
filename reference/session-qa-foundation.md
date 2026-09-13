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

## 6. The Provider vs Service Hierarchy

**Q: Is "Provider" a bigger concept than "Service"? And does the Module include Providers, which then include Services?**

**A:** Yes. Think of it as **Category &rarr; Role &rarr; Implementation**.

- **Provider (The Category)**: The broadest term. Any class or value that can be injected by the IoC container is a "Provider."
- **Service (The Role)**: A specific type of provider. While most services are providers, not all providers are services (e.g., repositories, constants, or factories are also providers).
- **Module (The Container)**: The organizational unit that manages these providers.

**The Hierarchy**: `Module` &rarr; manages &rarr; `Providers` &rarr; which can be &rarr; `Services`.

---

## 7. The Bootstrap Process


**Q: Why is `main.ts` so small?**

**A:** Because `main.ts` is the **ignition switch**, not the application itself. It delegates the complex work of building the application graph, registering routes, and instantiating services to the `NestFactory`. This keeps the entry point clean and moves the architectural a configuration into the Modules.

---

## 7. The Role of Decorators

**Q: What happens if I delete the `@Module` decorator?**

**A:** The class loses its identity. It is no longer a "Module" to the framework, just a plain JavaScript class. Because the IoC container relies on the `@Module` decorator as a "sticker" to find the map of controllers and providers, the application will crash at startup because it no longer has a map to follow.

---

## 8. The Underlying Server

**Q: Where does the HTTP server actually live?**

**A:** Nest is a framework, not a server. The actual server lives in an underlying platform library (by default, **Express** via `@nestjs/platform-express`). 

Nest acts as a brain (orchestrator) that sits on top of the server (the muscle). This allows you to swap the underlying server (e.g., from Express to Fastify) without changing your controllers or services, as long as you stay within the NestJS abstraction.

---

## 9. Error Handling and Exceptions

**Q: What happens when a request fails? Does the server automatically send 4xx or 5xx errors?**

**A:** Nest uses an **Exception Filter** (a safety net) to handle errors. Instead of manually setting status codes, you `throw` a built-in exception.
- **Controlled Failure**: Throwing `NotFoundException()` or `BadRequestException()` tells Nest to send a specific status code (404, 400, etc.).
- **Uncontrolled Failure**: If a plain `Error` is thrown or the app crashes, the global filter catches it and sends a **500 Internal Server Error**.

---

## 10. Parameter Missing Behaviors

**Q: What happens if a parameter is missing from the request?**

**A:** Behavior depends on the parameter type:
- **Path Parameters (`@Param`)**: Required. If missing, the route doesn't match &rarr; **404 Not Found**.
- **Query Parameters (`@Query`)**: Optional. If missing, the variable becomes `undefined` &rarr; **200 OK** (Logic must handle the `undefined`).
- **Body Parameters (`@Body`)**: Optional by default. If missing, property is `undefined` &rarr; **200 OK** (unless a **Validation Pipe** is used, which triggers a **400 Bad Request**).

---

## 11. Response Mapping and DTOs

**Q: Should I return the same DTO that I received in a request?**

**A:** No. You should use a separate **Response DTO** (or ViewModel). Returning internal entities or request DTOs directly leads to security risks (leaking passwords), API instability (breaking the client when DB columns change), and poor data formatting.

---

## 12. Data Filtering with ClassSerializerInterceptor

**Q: How do I prevent specific fields (like passwords) from being sent in a response?**

**A:** Use the `@Exclude()` decorator from `class-transformer` on the class property. However, this only works if the `ClassSerializerInterceptor` is registered (usually globally in `main.ts` via `app.useGlobalInterceptors()`).

**Crucial Requirement**: The controller must return an **instance of the class** (e.g., `return new UserResponseDto(...)`), not a plain JavaScript object. ---

## 13. Controller Coordination

**Q: Can a controller call multiple services?**

**A:** Yes. The controller acts as a **Coordinator**. It is standard to inject multiple services to fulfill a complex request. However, if the coordination involves complex business logic (branching, transactions), you should move that logic into an **Orchestrator Service** (Facade) to keep the controller thin and the logic testable.

---

## 14. Service Granularity

**Q: When do I create a new service versus adding a method to an existing one?**

**A:** Follow the **Single Responsibility Principle (SRP)**. Create a new service if:
- **The "Noun" Test**: The method describes a general capability (e.g., `EmailService`) rather than a core action of the entity (e.g., `UsersService.updatePassword`).
- **The "Change" Test**: Changing the new logic would risk breaking unrelated logic in the current class.
- **The "Constructor" Test**: Adding the method requires injecting too many new dependencies, leading to a "God Object."
