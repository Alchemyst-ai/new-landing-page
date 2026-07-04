// Barrel export for the motion / token-scope primitives used site-wide.
// All client-side wrappers live here so server components can import them
// freely (Next.js handles the client boundary via each file's "use client"
// directive where needed).

export { default as Reveal } from "./Reveal";
export { default as MotionSection } from "./MotionSection";
export { default as DarkAnchor } from "./DarkAnchor";
