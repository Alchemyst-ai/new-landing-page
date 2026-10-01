import type { Metadata } from "next";
import CareersContent from "./careers-content";

const url = "https://getalchemystai.com/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Be a part of the team that is building the context layer for the trillion-agent world.",
  alternates: { canonical: url },
  openGraph: { title: "Careers | Alchemyst AI", description: "Be a part of the team that is building the context layer for the trillion-agent world.", url, type: "website" },
  twitter: { card: "summary_large_image", title: "Careers | Alchemyst AI", description: "Be a part of the team that is building the context layer for the trillion-agent world." },
};

export default function CareersPage() {
  return <CareersContent />;
}
