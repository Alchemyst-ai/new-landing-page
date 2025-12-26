"use client";

import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

export function CalBooking() {
  const [open, setOpen] = useState(false);

  return (
    <Section id="schedule-meeting">
      <div className="border-x border-t">
        <div className="flex flex-col md:flex-row gap-6 p-8 md:p-12 bg-background">
          {/* Image Box - Smaller on Left */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden">
              <Image
                src="/uttran.jpeg"
                alt="Uttaran Nayak - Co-founder of Alchemyst AI"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Talk to the Founder
            </h2>
            
            <div className="mb-8">
              <p className="text-muted-foreground text-base">
                Book a 30-minute consultation to discuss your specific needs and discover how we can help 
                put your retrieval on autopilot.
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors px-4 py-6 text-base w-fit"
                  size="default"
                >
                  Schedule Meet
                </Button>
              </DialogTrigger>
              <DialogContent 
                className="max-w-4xl w-full h-[90vh] p-0 bg-gray-900 border-gray-800 overflow-hidden data-[state=closed]:!slide-out-to-0 data-[state=open]:!slide-in-from-0 [&>button]:hidden"
              >
                <div className="w-full h-full overflow-hidden rounded-lg">
                  <iframe
                    src="https://cal.com/uttaran-nayak-alchemyst/30min?theme=dark&hideEventTypeDetails=false&hideLandingPageDetails=false"
                    style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                    allowFullScreen
                    scrolling="no"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Section>
  );
} 