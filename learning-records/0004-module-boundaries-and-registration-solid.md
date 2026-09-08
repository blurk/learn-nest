# Module Boundaries and Registration Logic Solid

User completed lesson 0003. Initially struggled with two concepts:
1. Confused "connectivity" with "organization/coupling". Now understands modules don't enable talking, they control it to prevent the "Big Ball of Mud".
2. Confused "providers are features of modules" with "providers are components managed by modules". Now understands the distinction between the Container (Module) and the Logic (Provider).

**Evidence**: explicit "it's intuitive now" after targeted clarification on coupling vs connectivity and management vs features.

**Implications**: the "Room with Doors" metaphor is now stable. The distinction between a class's existence (code) and its registration (module property) is understood. This is the critical prerequisite for Dependency Injection. Lesson 0004 can now dive into the IoC container and provider lifecycles.
