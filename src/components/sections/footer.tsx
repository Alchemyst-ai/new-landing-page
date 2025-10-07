import { Icons } from "@/components/icons";
import { BorderText } from "@/components/ui/border-number";
import { siteConfig } from "@/lib/config";
import { Rss } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col gap-y-5 rounded-lg p-5 container max-w-[var(--container-max-width-very-small-mobile)] sm:max-w-[var(--container-max-width-mobile)] lg:max-w-[var(--container-max-width)]  md:max-w-[var(--container-max-width-tablet)] mx-auto">
      <div className="flex items-center justify-between flex-col gap-2 sm:flex-row">
        <div className="flex flex-col text-sm font-medium tracking-tight text-muted-foreground">
          <p>© 2025 XAlchemyst Technologies Pvt. Ltd.</p>
          <p>All rights reserved.</p>
        </div>

        <div className="flex gap-x-4">
          {siteConfig.footer.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              className="flex h-5 w-5 gap-5 items-center justify-center text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
            >
              {link.icon}
            </a>
          ))}
        <Link
          href="/rss"
          target="_blank"
          aria-label="RSS Feed"
          className="text-muted-foreground hover:text-orange-500 transition-colors"
        >
          <Rss className="mb-2" height={21}/>
        </Link>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <ul className="flex flex-col gap-x-5 gap-y-2 text-muted-foreground md:flex-row md:items-center">
          
        </ul>
      </div>
      <BorderText
        text={siteConfig.footer.brandText}
        className="text-[clamp(3rem,15vw,10rem)] overflow-hidden font-mono tracking-tighter font-medium"
      />
    </footer>
  );
}
