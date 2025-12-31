import Image from "next/image";
import Link from "next/link";

const ResearchComponent = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* <Header /> */}
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="text-foreground">AI Agents talk. <br /> Alchemyst helps them listen</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          A scalable memory-first system that dynamically extracts and retrieves key conversational facts - delivering 20% higher accuracy over SOTA on the PopQA benchmark with 95% reduction in development time.
          </p>
        </div>
      </div>

      <div className="px-4 pb-20 flex justify-center">
        <Image
          src="/research/sota.png"
          alt="Alchemyst Agent"
          width={1000}
          height={1000}
          unoptimized
          priority // Add priority to load image immediately at start
        />
      </div>

     {/* Benchmarking Section */}
     <div className="w-full bg-card py-16 px-4">
       <div className="max-w-4xl mx-auto">
         <div className="text-center mb-8">
           <span className="text-sm uppercase tracking-wider text-muted-foreground mb-4 inline-block">Executive Summary</span>
           <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Benchmarking Alchemyst</h2>
         </div>

         <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
           <p>
             Modern AI agents often suffer from high operational costs, limited task completion, and long development cycles - making it difficult to scale AI systems efficiently. Simply fine-tuning LLMs or increasing infrastructure fails to address these bottlenecks at the root.
           </p>

           <p>
             <strong className="text-foreground">Alchemyst</strong> tackles these challenges head-on with a context-first memory layer and optimized AI infrastructure that drastically reduces cost, boosts performance, and shortens time-to-launch.
           </p>

           <p>Across real-world deployments, Alchemyst has demonstrated:</p>

           <ul className="list-disc list-inside space-y-3 pl-4">
             <li>
               <strong className="text-foreground">~40% lower interaction cost</strong> by sending only relevant context to the LLM
             </li>
             <li>
               <strong className="text-foreground">~40% reduction in token usage</strong>, making AI more affordable to operate
             </li>
             <li>
               <strong className="text-foreground">95% decrease in dev time</strong>  -  from 6 months to under 2 weeks
             </li>
             <li>
               <strong className="text-foreground">2.2× revenue increase</strong> from agents built on the platform
             </li>
             <li>
               <strong className="text-foreground">33.7% improvement in task completion</strong>, achieving 99.7% success rate
             </li>
           </ul>

           <p>
             By turning short-term agents into persistent, context-aware systems, Alchemyst empowers teams to go from idea to production-ready AI in days - not months.
           </p>
         </div>

         <div className="mt-8 flex justify-center space-x-4">
           <Link
             href="https://docsend.com/view/iem35yrj5pkbsm46"
             target="_blank"
             className="bg-foreground text-background px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90"
           >
             Read the paper
           </Link>
           <button className="border border-border text-foreground px-6 py-3 rounded-lg font-medium transition-colors hover:bg-muted">
             View Code
           </button>
         </div>
       </div>
     </div>

     {/* Under the Hood Section */}
      <div className="w-full bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider text-muted-foreground mb-4 inline-block">Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Under The Hood</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A two-phase memory pipeline that extracts, consolidates, and retrieves
              only the most salient conversational facts - enabling scalable, long-term
              reasoning.
            </p>
          </div>

          <div className="flex justify-center">
            <Image
              src="/research/underHood01.svg"
              alt="Under the Hood Architecture"
              width={1200}
              height={600}
              className="w/full max-w-5xl h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Second Architecture Section */}
      <div className="w-full bg-card py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Alchemyst delivers a four-stage processing pipeline - Asym0, OKG Orchestration, ThinkRAG, and Context Marketing - connecting Data Sources to Agents/MCPs with comprehensive observability across all stages.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Image
              src="/research/underHood02.svg"
              alt="Alchemyst Architecture Pipeline"
              width={1200}
              height={600}
              className="w-full max-w-5xl h-auto"
              priority
            />
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The architecture supports two deployment options: Managed Services leveraging MongoDB and QDrant for rapid deployment by development teams and small companies, and On-Premises Enterprise solutions with multi-source integration for organizations requiring data sovereignty and enhanced security.
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mt-6">
              This design enables scalable data orchestration while providing deployment flexibility to meet diverse organizational requirements and compliance needs.
            </p>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default ResearchComponent;