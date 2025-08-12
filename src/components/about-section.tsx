import { FC } from "react";

interface AboutSectionProps {
  title?: string;
  content?: string;
}

const AboutSection: FC<AboutSectionProps> = ({ 
  title = "Who Are We & Why Read This Blog?", 
  content = "We are a team of experienced market analysts and trading experts dedicated to providing you with actionable insights and data-driven analysis. Our research combines technical analysis, fundamental research, and market sentiment to help you make informed trading decisions. Every article is thoroughly researched and reviewed by our expert team to ensure accuracy and relevance in today's dynamic markets."
}) => {
  return (
    <section className="w-full lg:w-[800px] px-4 sm:px-6 lg:px-8 mt-6">
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-muted-foreground leading-7 whitespace-pre-line">{content}</p>
      </div>
    </section>
  );
};

export default AboutSection; 