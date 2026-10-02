"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TextInputField } from "@/components/assessment/QuestionField";
import { Spinner } from "@/components/ui/spinner";
import { isWorkEmail, type EmailRequest } from "@/lib/assessment/schema";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailReportDialog({
  payload,
  children,
}: {
  payload: Omit<EmailRequest, "to"> & { to: string };
  /** Trigger element, rendered via DialogTrigger asChild. */
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(payload.to);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const to = email.trim().toLowerCase();
    if (!EMAIL_SHAPE.test(to)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!isWorkEmail(to)) {
      setError("Use your work email. Free email providers are not supported.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const response = await fetch("/api/assessment/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, to }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.detail || data?.title || "Delivery failed.");
      toast.success("Report sent", { description: `Check ${to} in a minute or two.` });
      setOpen(false);
    } catch (cause) {
      setError(
        `${cause instanceof Error ? cause.message : "Delivery failed."} Your report is still saved in this browser.`,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (sending) return;
        setOpen(next);
        if (next) setError(null);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={send} className="flex flex-col gap-5" noValidate>
          <DialogHeader>
            <DialogTitle>Email me this report</DialogTitle>
            <DialogDescription>
              We send the score, profile, and checklist with your current ticks. The address is only used for
              this email and is never stored.
            </DialogDescription>
          </DialogHeader>
          <TextInputField
            id="assessment-email-to"
            label="Work email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError(null);
            }}
            placeholder="you@company.com"
            error={error ?? undefined}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={sending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={sending || email.trim().length < 3}>
              {sending ? <Spinner data-icon="inline-start" aria-hidden="true" /> : <Mail data-icon="inline-start" />}
              {sending ? "Sending" : "Send report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
