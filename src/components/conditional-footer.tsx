"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/sections/footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname.includes("/playground")) {
    return null;
  }

  return <Footer />;
}
