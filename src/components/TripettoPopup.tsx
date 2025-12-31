"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

type LeadFormData = {
  email: string;
  csv_csvfirstname: string;
  csv_linkedinhandle: string;
  csv_lastname: string;
};

export function LeadForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [banner, setBanner] = useState<{ message: string; variant: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState<LeadFormData>({
    email: "",
    csv_csvfirstname: "",
    csv_linkedinhandle: "",
    csv_lastname: "",
  });

  const [formClosed, setFormClosed] = useState(false);
  const extractLinkedInUsername = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return "";
    try {
      const url = new URL(trimmed);
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length === 0) return "";
      if (parts[0].toLowerCase() === "in" && parts[1]) return parts[1];
      return parts[parts.length - 1];
    } catch {
      return trimmed.replace(/^\/+|\/+$/g, "");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "csv_linkedinhandle") {
      const username = extractLinkedInUsername(value);
      setFormData((prev) => ({ ...prev, csv_linkedinhandle: username }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        email: formData.email.trim(),
        csv_csvfirstname: formData.csv_csvfirstname.trim(),
        csv_csvcompanyname: "",
        csv_currenttitle: "",
        csv_linkedinhandle: formData.csv_linkedinhandle.trim(),
        linkedin_profile_url: formData.csv_linkedinhandle.trim().startsWith("http")
          ? formData.csv_linkedinhandle.trim()
          : (formData.csv_linkedinhandle.trim()
            ? `https://www.linkedin.com/in/${formData.csv_linkedinhandle.trim()}`
            : ""),
        lastname: (formData.csv_lastname || "").trim(),
        name: `${formData.csv_csvfirstname} ${formData.csv_lastname}`.trim(),
        firstname: formData.csv_csvfirstname.trim(),
        currentemployer: "",
        companysize: "",

        linkedinactionprofileviewed: "false",
        linkedinactionconnectrequested: "false",
        linkedinactionconnected: "false",
        linkedinactionfollowedup: "false",
        linkedinactionmessagesent: "false",
        linkedinactioninmailsent: "false",
        linkedinactionuserreplied: "false",
        linkedinactionalreadyinvited: "false",
        linkedinactionalreadyconnected: "true",
      };
      console.log(payload);
      const response = await fetch("/api/lead-automation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setBanner({ message: "Thanks! We\u2019ll get back to you soon.", variant: 'success' });
        setFormData({
          email: "",
          csv_csvfirstname: "",
          csv_linkedinhandle: "",
          csv_lastname: "",
        });
        if (onSubmitted) onSubmitted();
      } else {
        const error = await response.json().catch(() => ({}));
        setBanner({ message: error.error || "Failed to add lead. Please try again.", variant: 'error' });
      }
    } catch (error) {
      setBanner({ message: "An unexpected error occurred. Please try again.", variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle>Stay in the loop</CardTitle>
        <CardDescription>Share your details and we’ll follow up with relevant updates.</CardDescription>
      </CardHeader>
      <CardContent>
        {banner && (
          <div className={`mb-4 text-sm ${banner.variant === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{banner.message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="csv_csvfirstname">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input id="csv_csvfirstname" name="csv_csvfirstname" value={formData.csv_csvfirstname} onChange={handleChange} required placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="csv_lastname">Last Name</Label>
                <Input id="csv_lastname" name="csv_lastname" value={formData.csv_lastname} onChange={handleChange} placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john.doe@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="csv_linkedinhandle">
                LinkedIn profile URL <span className="text-destructive">*</span>
              </Label>
              <Input id="csv_linkedinhandle" name="csv_linkedinhandle" type="text" inputMode="url" value={formData.csv_linkedinhandle} onChange={handleChange} required placeholder="linkedin username or URL (e.g. john-doe or https://www.linkedin.com/in/john-doe)" />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function TripettoPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [formClosed, setFormClosed] = useState(false);

  useEffect(() => {
    if (!!window) {
      setFormFilled(!!localStorage.getItem("formFilled"));
      setFormClosed(!!localStorage.getItem('formClosed'));
    }

    if (!formFilled) {
      const t = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  if (formFilled || formClosed) return null;
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#151515]/40 flex items-center justify-center z-50 p-4">
      <div className="relative bg-[#151515] rounded-2xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <button
          aria-label="Close"
          onClick={() => {
            setOpen(false);
            setFormClosed(true);
            localStorage.setItem('formClosed', 'true')
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 cursor-pointer"
        >
          ✕
        </button>
        {submitted ? (
          <div className="flex flex-col items-center justify-center h-48 text-center gap-2">
            <div className="text-white text-lg font-medium">Thank you!</div>
            <div className="text-gray-300 text-sm">We’ll stay in touch.</div>
          </div>
        ) : (
          <LeadForm onSubmitted={() => {
            setSubmitted(true);
            setFormFilled(true);
            localStorage.setItem("formFilled", "1");
            setTimeout(() => setOpen(false), 2000);
          }} />
        )}
      </div>
    </div>
  );
}
