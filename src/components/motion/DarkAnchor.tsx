// DarkAnchor: a server-component wrapper that flips its descendants into the
// scoped warm-charcoal token set (data-theme="dark", defined in globals.css)
// and paints the #1C1917 surface. This is how a deliberate dark chapter or
// tile is dropped into the otherwise light page. The Navbar probes for
// [data-theme='dark'] and inverts itself while it floats over one.
//
// No JS, no layout shift. Purely a token scope plus a surface.

import * as React from "react";
import { cn } from "@/lib/utils";

type DarkAnchorTag = "section" | "div" | "aside" | "article" | "footer" | "header";

export interface DarkAnchorProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as: <section> (default), <div>, <aside>, <article>, <footer>, <header>. */
  as?: DarkAnchorTag;
  /** Skip the default surface (background + text colour) and only scope tokens. */
  bare?: boolean;
}

export default function DarkAnchor({
  as = "section",
  bare = false,
  className,
  children,
  ...rest
}: DarkAnchorProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      data-theme="dark"
      className={cn("relative", !bare && "bg-[#1C1917] text-[#F5F5F4]", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
