"use client";

import { Streamdown } from "streamdown";

export function ReportView({ markdown }: { markdown: string }) {
  return (
    <article
      aria-label="Full assessment report"
      className="min-w-0 break-words text-sm leading-relaxed text-foreground [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_table]:block [&_table]:overflow-x-auto"
    >
      <Streamdown>{markdown}</Streamdown>
    </article>
  );
}
