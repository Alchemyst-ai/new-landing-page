'use client'

import { Icons } from "@/components/icons";
import { Section } from "@/components/section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Ripple } from "@/components/ui/ripple";
import Link from "next/link";
import { useEffect, useState } from "react";

const contributors = [
  {
    name: "Alice Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Bob Brown",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
  },
  {
    name: "Charlie Davis",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
  },
  {
    name: "Diana Evans",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
  },
  {
    name: "Ethan Ford",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
  },
];

// export function Community() {
//   return (
//     <Section id="community" title="Community">
//       <div className="border-x border-t overflow-hidden relative mt-2">
//         <Ripple />
//         <div className="p-6 text-center py-12">
//           <p className="text-muted-foreground mb-6 text-balance max-w-prose mx-auto font-medium">
//             We&apos;re grateful for the amazing open-source community that helps
//             make our project better every day.
//           </p>
//           <div className="flex justify-center -space-x-6 mb-8">
//             {contributors.map((contributor, index) => (
//               <div key={index}>
//                 <Avatar className="size-12 relative border-2 border-background bg-muted">
//                   <AvatarImage
//                     src={contributor.avatar}
//                     alt={contributor.name}
//                     className="object-cover"
//                   />
//                   <AvatarFallback className="text-lg font-semibold">
//                     {contributor.name.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-center">
//             <Link href="https://github.com/Alchemyst-ai/awesome-saas" target="_blank">
//               <Button variant="secondary" className="flex items-center gap-2 cursor-pointer">
//                 <Icons.github className="h-5 w-5" />
//                 Join the Alchemyst Community
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// }

interface DiscordInviteData {
  approximate_member_count: number;
  approximate_presence_count: number;
}


export function Community() {
  const [discordData, setDiscordData] = useState<DiscordInviteData | null>(null);

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const res = await fetch(
          "https://discord.com/api/v9/invites/H2StAaSeJ8?with_counts=true",
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to fetch Discord data");
        const data = await res.json();
        setDiscordData({
          approximate_member_count: data.approximate_member_count,
          approximate_presence_count: data.approximate_presence_count,
        });
      } catch (err) {
        console.error("Discord API error:", err);
      }
    };

    fetchDiscordData();
  }, []);

  return (
    <Section id="community" title="Community">
      <div className="border-x border-t overflow-hidden relative mt-2">
        <Ripple />
        <div className="p-6 text-center py-12">
          <p className="text-muted-foreground mb-6 text-balance max-w-prose mx-auto font-medium">
            We&apos;re grateful for the amazing open-source community that helps
            make our project better every day.
          </p>

          {/* Contributors */}
          <div className="flex justify-center -space-x-6 mb-8">
            {contributors.map((contributor, index) => (
              <div key={index}>
                <Avatar className="size-12 relative border-2 border-background bg-muted">
                  <AvatarImage
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg font-semibold">
                    {contributor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {/* GitHub Community */}
            {/* <Link
              href="https://github.com/Alchemyst-ai/awesome-saas"
              target="_blank"
            >
              <Button
                variant="secondary"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Icons.github className="h-5 w-5" />
                Join the Alchemyst GitHub
              </Button>
            </Link> */}

            {/* Discord Community */}
            <Link href="https://discord.gg/H2StAaSeJ8?utm_source=landing_page&utm_medium=redirect&utm_campaign=discord_join" target="_blank">
              <Button
                variant="outline"
                className="
                  flex items-center gap-2 border-border
                  text-foreground
                  hover:text-green-500 hover:border-green-500 hover:bg-green-500/10
                  transition-all
                "
              >
                {/* Discord SVG */}
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                  className="text-current transition-colors"
                >
                  <path
                    fill="currentColor"
                    d="M20.317 4.3698a19.7913 19.7913 0 0 0 -4.8851 -1.5152 0.0741 0.0741 0 0 0 -0.0785 0.0371c-0.211 0.3753 -0.4447 0.8648 -0.6083 1.2495 -1.8447 -0.2762 -3.68 -0.2762 -5.4868 0 -0.1636 -0.3933 -0.4058 -0.8742 -0.6177 -1.2495a0.077 0.077 0 0 0 -0.0785 -0.037 19.7363 19.7363 0 0 0 -4.8852 1.515 0.0699 0.0699 0 0 0 -0.0321 0.0277C0.5334 9.0458 -0.319 13.5799 0.0992 18.0578a0.0824 0.0824 0 0 0 0.0312 0.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a0.0777 0.0777 0 0 0 0.0842 -0.0276c0.4616 -0.6304 0.8731 -1.2952 1.226 -1.9942a0.076 0.076 0 0 0 -0.0416 -0.1057c-0.6528 -0.2476 -1.2743 -0.5495 -1.8722 -0.8923a0.077 0.077 0 0 1 -0.0076 -0.1277c0.1258 -0.0943 0.2517 -0.1923 0.3718 -0.2914a0.0743 0.0743 0 0 1 0.0776 -0.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a0.0739 0.0739 0 0 1 0.0785 0.0095c0.1202 0.099 0.246 0.1981 0.3728 0.2924a0.077 0.077 0 0 1 -0.0066 0.1276 12.2986 12.2986 0 0 1 -1.873 0.8914 0.0766 0.0766 0 0 0 -0.0407 0.1067c0.3604 0.698 0.7719 1.3628 1.225 1.9932a0.076 0.076 0 0 0 0.0842 0.0286c1.961 -0.6067 3.9495 -1.5219 6.0023 -3.0294a0.077 0.077 0 0 0 0.0313 -0.0552c0.5004 -5.177 -0.8382 -9.6739 -3.5485 -13.6604a0.061 0.061 0 0 0 -0.0312 -0.0286zM8.02 15.3312c-1.1825 0 -2.1569 -1.0857 -2.1569 -2.419 0 -1.3332 0.9555 -2.4189 2.157 -2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332 -0.9555 2.4189 -2.1569 2.4189zm7.9748 0c-1.1825 0 -2.1569 -1.0857 -2.1569 -2.419 0 -1.3332 0.9554 -2.4189 2.1569 -2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332 -0.946 2.4189 -2.1568 2.4189Z"
                  ></path>
                </svg>

                Join Discord Community
              </Button>
            </Link>

          </div>

          {/* Discord Member Counts */}
          {discordData && (
            <p className="text-sm text-muted-foreground mt-4">
              <span className="text-foreground font-medium">
                {discordData.approximate_member_count.toLocaleString()}
              </span>{" "}
              members ·{" "}
              <span className="text-foreground/80">
                {discordData.approximate_presence_count.toLocaleString()} online
              </span>
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
