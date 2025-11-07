// "use client";

// import { useEffect, useState } from "react";

// export default function TripettoPopup() {
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     // Show popup after 5 seconds
//     const timer = setTimeout(() => {
//       setShowForm(true);
//     }, 2500);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!showForm) return;

//     // Dynamically load Tripetto scripts
//     const scripts = [
//       "https://cdn.jsdelivr.net/npm/@tripetto/runner",
//       "https://cdn.jsdelivr.net/npm/@tripetto/runner-classic",
//       "https://cdn.jsdelivr.net/npm/@tripetto/studio",
//     ];

//     const loadedScripts: HTMLScriptElement[] = [];

//     scripts.forEach((src) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.async = true;
//       document.body.appendChild(script);
//       loadedScripts.push(script);
//     });

//     // Once scripts load, initialize Tripetto
//     const init = setTimeout(() => {
//       // @ts-ignore
//       if (window.TripettoStudio && window.TripettoClassic) {
//         // @ts-ignore
//         window.TripettoStudio.form({
//           runner: window.TripettoClassic,
//           token:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiM1l5eWpWb24wRUt4YVltWlJUdm1vL1R2NENtaHQwYVpJVEtKMEdyUzkrZz0iLCJkZWZpbml0aW9uIjoib3JPU0tpWEtWWGdSc1N1UXZTSml2SWQ3N21yVlNYVUdlQ3h0bnNuN1doaz0iLCJ0eXBlIjoiY29sbGVjdCJ9.F63lbgOgWT8pnaID9vQ_OwCxu0W_X7DRaJtmNlb31BE",
//           element: "tripetto-1xl83gd",
//         });
//       }
//     }, 1000);

//     return () => {
//       clearTimeout(init);
//       loadedScripts.forEach((s) => document.body.removeChild(s));
//     };
//   }, [showForm]);

//   if (!showForm) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="relative bg-black border-[1px] border-gray-500 rounded-2xl shadow-lg p-6 w-full max-w-lg">
//         <button
//           onClick={() => setShowForm(false)}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//         >
//           ✕
//         </button>

//         <div id="tripetto-1xl83gd" className="min-h-[400px]" />
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";

// export default function TripettoPopup() {
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowForm(true);
//     }, 2500);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!showForm) return;

//     const scripts = [
//       "https://cdn.jsdelivr.net/npm/@tripetto/runner",
//       "https://cdn.jsdelivr.net/npm/@tripetto/runner-classic",
//       "https://cdn.jsdelivr.net/npm/@tripetto/studio",
//     ];

//     const loadedScripts: HTMLScriptElement[] = [];
//     scripts.forEach((src) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.async = true;
//       document.body.appendChild(script);
//       loadedScripts.push(script);
//     });

//     const init = setTimeout(() => {
//       // @ts-ignore
//       if (window.TripettoStudio && window.TripettoClassic) {
//         // @ts-ignore
//         window.TripettoStudio.form({
//           runner: window.TripettoClassic,
//           token:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiM1l5eWpWb24wRUt4YVltWlJUdm1vL1R2NENtaHQwYVpJVEtKMEdyUzkrZz0iLCJkZWZpbml0aW9uIjoib3JPU0tpWEtWWGdSc1N1UXZTSml2SWQ3N21yVlNYVUdlQ3h0bnNuN1doaz0iLCJ0eXBlIjoiY29sbGVjdCJ9.F63lbgOgWT8pnaID9vQ_OwCxu0W_X7DRaJtmNlb31BE",
//           element: "tripetto-1xl83gd",
//         });

//         // 👇 Observe for the button after form submission
//         const observer = new MutationObserver(() => {
//           const hiddenButton = document.querySelector(
//             ".sc-fqkwJk.hTuWxr"
//           ) as HTMLElement | null;
//           if (hiddenButton) {
//             hiddenButton.style.display = "none";
//           }
//         });

//         // Observe changes in the form container
//         const formContainer = document.getElementById("tripetto-1xl83gd");
//         if (formContainer) {
//           observer.observe(formContainer, {
//             childList: true,
//             subtree: true,
//           });
//         }
//       }
//     }, 1000);

//     return () => {
//       clearTimeout(init);
//       loadedScripts.forEach((s) => document.body.removeChild(s));
//     };
//   }, [showForm]);

//   if (!showForm) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="relative bg-black border-[1px] border-gray-500 rounded-2xl shadow-lg p-8 h-[32rem] sm:h-[35rem] overflow-hidden w-full max-w-lg safari-tripetto-fix">
//         <button
//           onClick={() => setShowForm(false)}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//         >
//           ✕
//         </button>

//         <div id="tripetto-1xl83gd" className="min-h-[400px]" />
//       </div>
//     </div>
//   );
// }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
        linkedin_profile_url: formData.csv_linkedinhandle.trim(),
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
        <CardTitle>Contact information</CardTitle>
        <CardDescription>Share a few details and we’ll get back to you</CardDescription>
      </CardHeader>
      <CardContent>
        {banner && (
          <div className={`mb-4 text-sm ${banner.variant === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{banner.message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Your details</h3>
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
              <Input id="csv_linkedinhandle" name="csv_linkedinhandle" type="url" value={formData.csv_linkedinhandle} onChange={handleChange} required placeholder="https://www.linkedin.com/in/username" />
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

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="relative bg-black rounded-2xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="flex flex-col items-center justify-center h-48 text-center gap-2">
            <div className="text-white text-lg font-medium">Thank you!</div>
            <div className="text-gray-300 text-sm">We’ll stay in touch.</div>
          </div>
        ) : (
          <LeadForm onSubmitted={() => {
            setSubmitted(true);
            setTimeout(() => setOpen(false), 2000);
          }} />
        )}
      </div>
    </div>
  );
}
