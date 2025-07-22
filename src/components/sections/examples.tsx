import { FeatureSelector } from "@/components/feature-selector";
import { Section } from "@/components/section";
import { codeToHtml } from "shiki";



export async function Examples() {
  return (
    <Section id="examples">
      <div className="border-x border-t">
        <FeatureSelector />
      </div>
    </Section>
  );
}
