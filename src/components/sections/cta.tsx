import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <Section id="cta">
      <div className="border overflow-hidden relative text-center py-16 mx-auto">
        <p className="max-w-3xl text-foreground mb-6 text-balance mx-auto font-medium text-3xl">
          Ready to build your next AI agent?
        </p>

        <Link href="/platform/signin?utm_source=blog&utm_campaign=blog_footer_cta&utm_medium=website&utm_content=get_started">
          <div className="flex justify-center">
            <Button className="flex items-center gap-2 bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors">Get Started</Button>
          </div>
        </Link>
      </div>
    </Section>
  );
}
