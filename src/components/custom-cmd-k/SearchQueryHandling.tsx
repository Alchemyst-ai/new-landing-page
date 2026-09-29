"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useHybridAnswer } from "@/hooks/useHybridAnswer";
import { isWebLLMSupported } from "@/lib/webllm/engine";
import { cjk } from "@streamdown/cjk";
import { code } from "@streamdown/code";
import { math } from "@streamdown/math";
import { mermaid } from "@streamdown/mermaid";
import { Check, Copy, Monitor, RotateCcw, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { Streamdown } from "streamdown";
import "katex/dist/katex.min.css";

export function SearchQueryHandling({ query }: { query: string }) {
  const { answer, status, mode, progress, error, retry, switchInferenceMode } =
    useHybridAnswer(query);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [supportsLocal, setSupportsLocal] = useState(false);
  useEffect(() => {
    setSupportsLocal(isWebLLMSupported());
  }, []);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timer);
  }, [copied]);

  if (status === "idle")
    return (
      <p className="px-4 text-sm text-muted-foreground">
        No matching pages. Enter at least 5 characters to ask a question.
      </p>
    );

  return (
    <div className="flex min-w-0 flex-col gap-3 p-4 text-left">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 break-words text-sm font-medium">{query}</p>
        {answer && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={copied ? "Answer copied" : "Copy answer"}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  `Q: ${query}\nA: ${answer}`,
                );
                setCopied(true);
                setCopyError(false);
              } catch {
                setCopyError(true);
              }
            }}
          >
            {copied ? <Check /> : <Copy />}
          </Button>
        )}
      </div>
      {copyError && (
        <p role="status" className="text-xs text-muted-foreground">
          Could not copy. Select the answer text to copy it.
        </p>
      )}
      {status === "error" ? (
        <div className="flex flex-col gap-3">
          <p role="alert" className="text-sm text-muted-foreground">
            {error}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="self-start"
            onClick={retry}
          >
            <RotateCcw data-icon="inline-start" />
            Try again
          </Button>
        </div>
      ) : answer ? (
        <div className="min-w-0 break-words text-sm leading-relaxed [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_table]:block [&_table]:overflow-x-auto">
          <Streamdown plugins={{ code, mermaid, math, cjk }}>
            {answer}
          </Streamdown>
        </div>
      ) : (
        <div role="status" className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">
            {status === "loading-model"
              ? "Preparing on-device answers…"
              : "Finding an answer…"}
          </p>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[60%]" />
          {mode === "local" && progress.text && (
            <p className="text-xs text-muted-foreground">
              {Math.round(progress.progress * 100)}% · {progress.text}
            </p>
          )}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          {mode === "online" ? (
            <Wifi className="size-3" />
          ) : (
            <Monitor className="size-3" />
          )}
          {mode === "online" ? "Online answers" : "On-device answers"}
        </span>
        {(supportsLocal || mode === "local") && (
          <Button variant="ghost" size="sm" onClick={switchInferenceMode}>
            {mode === "online" ? "Use on-device model" : "Use online answers"}
          </Button>
        )}
      </div>
      {(supportsLocal || mode === "local") && (
        <p className="text-xs text-muted-foreground">
          On-device mode downloads a model to your browser. Context and web
          searches still need an internet connection.
        </p>
      )}
    </div>
  );
}
