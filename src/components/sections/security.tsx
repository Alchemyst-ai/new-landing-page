import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Eye, Lock } from "lucide-react";

export const SecuritySection = () => {
  return (
    <Section className="overflow-hidden mt-24">
      <div className="container relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm dark:bg-muted/70">
            Security
          </div>
          
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Enterprise-Ready Compliance, AI-Ready Speed
          </h1>
          
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Alchemyst is built with privacy and compliance at its core—HIPAA, GDPR, ISO 27001, and SOC 2 Type II certified—ensuring data trust and integrity across every AI workflow.
          </p>

          <Button size="lg" className="mt-8 bg-white">
            Request A Demo
          </Button>

          {/*  use the GIF Here...*/}
          <div className="relative mt-16 w-full max-w-5xl">
            <Image
              src="/security/security.gif"
              alt="Security Animation"
              width={1200}
              height={800}
              className="w-full rounded-lg shadow-lg"
              unoptimized
            />
          </div>

          {/* Section for text */}
          <div className="mt-24 w-full">
            <h2 className="text-4xl font-bold mb-16">We Value Trust</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-4">
              <Card className="p-10 text-center flex flex-col items-center rounded-lg hover:shadow-lg transition-shadow min-h-[420px]">
                <div className="h-16 w-16 flex items-center justify-center mb-8 bg-[#EAEAEA] rounded-2xl p-4">
                  <ShieldCheck className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-semibold mb-6">Enterprise-Grade Compliance</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Alchemyst is built to meet the highest standards in data protection and enterprise trust. We are fully compliant with HIPAA and GDPR, and certified under ISO 27001 and SOC 2 Type II—ensuring that your data is handled with integrity, transparency, and the utmost care.
                </p>
              </Card>

              <Card className="p-10 text-center flex flex-col items-center rounded-lg hover:shadow-lg transition-shadow min-h-[420px]">
                <div className="h-16 w-16 flex items-center justify-center mb-8 bg-[#EAEAEA] rounded-2xl p-4">
                  <Eye className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-semibold mb-6">Built-In Transparency</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our platform is designed for auditability from day one. From real-time access logs to detailed compliance reports, Alchemyst provides complete visibility into how your data is processed—giving you the confidence to scale securely and stay ahead of regulatory needs.
                </p>
              </Card>

              <Card className="p-10 text-center flex flex-col items-center rounded-lg hover:shadow-lg transition-shadow min-h-[420px]">
                <div className="h-16 w-16 flex items-center justify-center mb-8 bg-[#EAEAEA] rounded-2xl p-4">
                  <Lock className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-semibold mb-6">Secure by Architecture</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Security isn&apos;t an add-on—it&apos;s in our DNA. Alchemyst enforces best-in-class practices like zero-trust access, encryption at rest and in transit, and continuous monitoring to protect your workflows and sensitive data, every step of the way.
                </p>
              </Card>
            </div>
          </div>

          {/* Section for text part 2 */}
          <div className="mt-24 w-full">
            <h2 className="text-4xl font-bold mb-16">Compliant With Industry Standards</h2>
            
            <div className="relative w-full max-w-4xl mx-auto">
              <Image
                src="/security/security.png"
                alt="Industry Standards Compliance"
                width={1200}
                height={800}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}; 