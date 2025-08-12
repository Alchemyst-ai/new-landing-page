import { FC } from "react";

interface SummarySectionProps {
  title?: string;
  summary: string;
}

const SummarySection: FC<SummarySectionProps> = ({ title = "Summary", summary }) => {
  if (!summary) return null;

  return (
    <section className="w-full lg:w-[800px] px-4 sm:px-6 lg:px-8 mt-6">
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="text-muted-foreground leading-7 whitespace-pre-line">{summary}</p>
      </div>
    </section>
  );
};

export default SummarySection; 