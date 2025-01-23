import type * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

export type CollapsibleProps = ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Root
>;
export type CollapsibleTriggerProps = ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Trigger
>;
export type CollapsibleContentProps = ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Content
>;

export type CollapsibleRef = ElementRef<typeof CollapsiblePrimitive.Root>;
export type CollapsibleTriggerRef = ElementRef<
  typeof CollapsiblePrimitive.Trigger
>;
export type CollapsibleContentRef = ElementRef<
  typeof CollapsiblePrimitive.Content
>;
