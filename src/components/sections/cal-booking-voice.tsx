"use client";

import { Section } from "@/components/section";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export function CalBookingVoice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);

    window.addEventListener("open-founder-cal-voice", openHandler);
    return () => {
      window.removeEventListener("open-founder-cal-voice", openHandler);
    };
  }, []);

  return (
    <Section id="schedule-meeting">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-4xl w-full h-[90vh] p-0 bg-gray-900 border-gray-800 overflow-hidden data-[state=closed]:!slide-out-to-0 data-[state=open]:!slide-in-from-0 [&>button]:hidden"
        >
          <div className="w-full h-full overflow-hidden rounded-lg">
            <iframe
              src="https://cal.com/uttaran-nayak-alchemyst/30min?theme=dark&hideEventTypeDetails=false&hideLandingPageDetails=false"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
              allowFullScreen
              scrolling="no"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  );
}
