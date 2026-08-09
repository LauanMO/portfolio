/**
 * `<ViewTransition>` ships in the React build Next bundles for the App Router,
 * but `@types/react` keeps its declarations in an opt-in file. Without this
 * reference the component exists at runtime and TypeScript denies it.
 *
 * Referenced here rather than through the `types` array in tsconfig, which
 * would replace the default type resolution instead of adding to it.
 */
/// <reference types="react/canary" />
