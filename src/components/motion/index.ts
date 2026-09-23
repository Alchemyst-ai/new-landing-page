// Barrel export for the motion and token-scope primitives used site-wide.
// Client wrappers carry their own "use client" directive, so server
// components can import from here freely.

export { default as Reveal } from "./Reveal";
export { default as DarkAnchor } from "./DarkAnchor";
export {
  EASE,
  VIEWPORT,
  Stagger,
  FadeUp,
  RevealText,
  DrawLine,
  Parallax,
  FigureReveal,
  useParallax,
  fadeUpVariants,
} from "./primitives";
