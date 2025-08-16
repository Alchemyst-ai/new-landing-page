import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import ScrollProgressBar from "@/components/scroll-progress";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: MarketingLayoutProps) {
  return (
    <>
      <Header />
      <ScrollProgressBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
