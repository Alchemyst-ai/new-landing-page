"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import type { ChecklistItem } from "@/lib/assessment/schema";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

const PRIORITY_GROUPS: { priority: ChecklistItem["priority"]; label: string; hint: string }[] = [
  { priority: "P0", label: "Do first", hint: "Highest leverage for your score." },
  { priority: "P1", label: "Next", hint: "Build on the first wins." },
  { priority: "P2", label: "Later", hint: "Compounding improvements." },
];

const EFFORT_LABEL: Record<ChecklistItem["effort"], string> = {
  S: "Small effort",
  M: "Medium effort",
  L: "Large effort",
};

export function ChecklistCard({
  checklist,
  checked,
  onToggle,
  onReset,
}: {
  checklist: ChecklistItem[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
  onReset: () => void;
}) {
  const doneCount = checklist.filter((item) => checked[item.id]).length;
  const total = Math.max(checklist.length, 1);
  const allDone = doneCount === checklist.length && checklist.length > 0;

  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Your checklist
            </p>
            <CardTitle className="text-xl">
              {allDone ? "All done. Nice work." : `${doneCount} of ${checklist.length} done`}
            </CardTitle>
            <CardDescription>Ticks are saved in this browser only.</CardDescription>
          </div>
          {doneCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onReset} className="assessment-no-print">
              <RotateCcw data-icon="inline-start" />
              Reset ticks
            </Button>
          )}
        </div>
        <Progress
          value={(doneCount / total) * 100}
          className="h-1.5"
          aria-label={`${doneCount} of ${checklist.length} checklist items done`}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {PRIORITY_GROUPS.map((group) => {
          const items = checklist.filter((item) => item.priority === group.priority);
          if (items.length === 0) return null;
          return (
            <FieldSet key={group.priority} className="gap-3">
              <FieldLegend variant="label" className="mb-0 flex items-center gap-2">
                <Badge variant={group.priority === "P0" ? "default" : "secondary"}>{group.priority}</Badge>
                <span>{group.label}</span>
                <span className="font-normal text-muted-foreground">{group.hint}</span>
              </FieldLegend>
              <div className="flex flex-col gap-2">
                {items.map((item) => {
                  const done = !!checked[item.id];
                  const id = `checklist-${item.id}`;
                  return (
                    <FieldLabel key={item.id} htmlFor={id} className="cursor-pointer border-input bg-background">
                      <Field orientation="horizontal" className="items-start">
                        <Checkbox
                          id={id}
                          checked={done}
                          onCheckedChange={() => onToggle(item.id)}
                          className="mt-0.5"
                        />
                        <FieldContent className="gap-1.5">
                          <FieldTitle
                            className={cn(
                              "leading-snug transition-colors",
                              done && "text-muted-foreground line-through decoration-muted-foreground/60",
                            )}
                          >
                            {item.title}
                          </FieldTitle>
                          <FieldDescription className={cn("leading-relaxed", done && "opacity-70")}>
                            {item.detail}
                          </FieldDescription>
                          <span className="mt-1 flex flex-wrap gap-1.5">
                            <Badge variant="outline">{item.category}</Badge>
                            <Badge variant="outline">{EFFORT_LABEL[item.effort]}</Badge>
                          </span>
                        </FieldContent>
                      </Field>
                    </FieldLabel>
                  );
                })}
              </div>
            </FieldSet>
          );
        })}
      </CardContent>
    </Card>
  );
}
