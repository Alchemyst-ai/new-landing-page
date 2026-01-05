// "use client";

// import { Section } from "@/components/section";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useState } from "react";

// export function CalBooking() {
//   const [open, setOpen] = useState(false);

//   return (
//     <Section id="schedule-meeting">
//       <div className="border-x border-t">
//         <div className="flex justify-center items-center py-12 bg-background">
//           <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//               <Button 
//                 className="bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors px-6 py-6 text-lg"
//                 size="lg"
//               >
//                 Talk to Founder
//               </Button>
//             </DialogTrigger>
//             <DialogContent 
//               className="max-w-4xl w-full h-[90vh] p-0 bg-gray-900 border-gray-800 overflow-hidden data-[state=closed]:!slide-out-to-0 data-[state=open]:!slide-in-from-0 [&>button]:hidden"
//             >
//               <div className="w-full h-full overflow-hidden rounded-lg">
//                 <iframe
//                   src="https://cal.com/uttaran-nayak-alchemyst/30min?theme=dark&hideEventTypeDetails=false&hideLandingPageDetails=false"
//                   style={{ width: "100%", height: "100%", border: "none", display: "block" }}
//                   allowFullScreen
//                   scrolling="no"
//                 />
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//     </Section>
//   );
// } 

"use client";

import { Section } from "@/components/section";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export function CalBooking() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);

    window.addEventListener("open-founder-cal", openHandler);
    return () => {
      window.removeEventListener("open-founder-cal", openHandler);
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
              src="https://cal.com/anuran/chat-with-anuran?overlayCalendar=true&theme=dark&hideEventTypeDetails=false&hideLandingPageDetails=false"
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
