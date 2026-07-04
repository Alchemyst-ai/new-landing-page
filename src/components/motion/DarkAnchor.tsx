// DarkAnchor — a server-component wrapper that flips its descendants into the
// scoped dark-anchor token set (via `data-theme="dark"`, defined in
// globals.css). This is how a deliberate dark chapter is dropped into the
// otherwise-light page: every shadcn primitive and `.btn-ghost` / `.nav-link`
// inside reads against the dark surface automatically.
//
// No JS, no layout shifts. Purely a token scope.

import * as React from "react";
import { cn } from "@/lib/utils";

type DarkAnchorTag = "section" | "div" | "aside" | "article" | "footer" | "header";

export interface DarkAnchorProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Render as: <section> (default), <div>, <aside>, <article>, <footer>, <header>. */
  as?: DarkAnchorTag;
}

const TAGS: Record<DarkAnchorTag, React.ElementType> = {
  section: "section",
  div: "div",
  aside: "aside",
  article: "article",
  footer: "footer",
  header: "header",
};

export default function DarkAnchor({
  as = "section",
  className,
  children,
  ...rest
}: DarkAnchorProps) {
  const Tag = TAGS[as];
  return (
    <Tag
      className={cn("relative", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
