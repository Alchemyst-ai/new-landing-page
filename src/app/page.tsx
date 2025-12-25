// import { Blog } from "@/components/sections/blog";
import { Community } from "@/components/sections/community";
import { CTA } from "@/components/sections/cta";
import { Examples } from "@/components/sections/examples";
import { FAQSection } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
// import { Pricing } from "@/components/sections/pricing";
import { Statistics } from "@/components/sections/statistics";
// import { Testimonials } from "@/components/sections/testimonials";
import { UseCases } from "@/components/sections/use-cases";
import { CalBooking } from "@/components/sections/cal-booking";
import { InstallExtensionIsland } from "@/components/InstallExtensionIsland";
import FeedspaceWOL from "@/components/FeedSpaceWOL";
import TweetAboutUs from "@/components/TweetAboutUs";

export default function Home() {
  return (
    <main>
      {/* <Header /> */}
      <Hero />
      <Logos />
      <Examples />
      <UseCases />
      <Features />
      <Statistics />
      {/* <Testimonials /> */}
      <CalBooking />
      {/* <Pricing /> */}
      <Community />
      <FAQSection />
      {/* <Blog /> */}
      <CTA />
      <InstallExtensionIsland />
      <FeedspaceWOL pageId="69dec1c0-c92d-404c-b575-fd904e93550c"/>
      <TweetAboutUs />
      {/* <Footer /> */}
    </main>
  );
}
