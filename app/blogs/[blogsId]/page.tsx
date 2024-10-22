import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { CircleCheck, Link2, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Blog() {    
  return (
      <main className="container mx-auto p-6 w-[50%]">
        <h1 className="text-4xl font-bold text-left mb-6">Alchemyst AI raises $300K Pre-Seed Round</h1>
        <p className="text-gray-600 text-left mb-12 ">Parineeta | 19-10-2024 | 7 mins read</p>

        <section className="mt-12">
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-lg text-[#ff9933]">
            “We are excited to announce the closing of our $300K pre-seed round. Asian and Indian media outlets have widely covered this, highlighting our startup’s mission to revolutionize businesses through generative AI digital employees.”
          </blockquote>
        </section>

        <section className='flex justify-center items-center mt-12'>
            <Image src="/blog/preseed.png" alt="Parineeta" width={500} height={500} />
        </section>

        <section className="space-y-6 mt-12">
          <h2 className="text-3xl font-semibold text-[#ff9933]">About Alchemyst AI</h2>
          <p className="text-lg">
            Starting in November 2023, <span className='text-[#ff9933]'><Link href="https://in.linkedin.com/in/uttarannayak">Uttaran </Link></span> & <span className='text-[#ff9933]'><Link href="https://in.linkedin.com/in/anuran-roy">Anuran</Link></span> founded Alchemyst AI while being in the 7th semester of their engineering college. The startup aims to build an ecosystem of hyper-intelligent AI employees which interact with each other to automate workflows of mid-sized to large enterprises.
          </p>
          <p className="text-lg">
            Alchemysts Hyper-intelligent AI employees, like Maya, Moh, Leela, Ron & Sam serve various enterprise verticals, including sales, marketing, HR management, customer support, and analytics.
          </p>
          <p className="text-lg">
            Our startup’s first Alchemyst, Maya, a Gen-AI sales development representative, fully automates enterprise sales processes without any human intervention. She finds and researches leads using millions of data sources, and sends them hyper-personalized emails, Telegram & WhatsApp messages. Other AI employees like Moh (AI Marketer), Leela (AI HR Manager), Ron (AI Customer Support), and Sam (AI Analytics Specialist) are in the pipeline for the company.
          </p>
          <p className="text-lg">
            Our tech team has built its own AI infrastructure with proprietary LLM AlchemystC1, and LAM, AlchemystX1 to secure the data of mid-size to large B2B enterprises going out on the web.
          </p>
        </section>

        <section className="space-y-6 mt-12">
          <h2 className="text-3xl font-bold text-[#ff9933]">Investors</h2>
          <p className="text-lg">
            The successful closure of our $300K pre-seed funding round was led by <span><Link href="https://www.influencepointventures.com/">Inflection Point Ventures (IPV)</Link></span>, with participation from <span><Link href="https://100unicorns.vc/">100Unicorns</Link></span> and <span><Link href="https://www.earlyseedventures.com/">Early Seed Ventures</Link></span>.
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Inflection Point Ventures (IPV):</strong> Founded in 2018, IPV is a 22000+ strong angel investing firm that supports new-age entrepreneurs with both monetary and experiential capital.
            </li>
            <li>
              <strong>100Unicorns:</strong> India’s Largest Accelerator VC, focused on disrupting idea-stage funding in India by backing founders with early access to capital.
            </li>
            <li>
              <strong>Earlyseed Ventures:</strong> A boutique investment bank providing all-around consulting services for early-stage startups and growth companies.
            </li>
          </ul>
        </section>

        <section className="space-y-6 mt-12">
          <h2 className="text-3xl font-bold text-[#ff9933]">Accelerators</h2>
          <p className="text-lg">
            <span><Link className='text-[#ff9933]' href="https://getalchemystai.com/">Alchemyst AI</Link></span> has been supported and backed by leading global AI accelerators like <span><Link className='text-[#ff9933]' href="https://www.linkedin.com/company/nvidia?trk=public_post-text">NVIDIA</Link></span> Inception Program, <span><Link className='text-[#ff9933]' href="https://www.linkedin.com/showcase/razorpayrize/?trk=public_post-text">Razorpay Rize</Link></span> program run by the founders and the founding team of Razorpay, <span><Link className='text-[#ff9933]' href="https://in.linkedin.com/company/conquestbits?trk=public_post-text">Conquest by BITS Pilani</Link></span> one of India’s most active accelerator, <span><Link className='text-[#ff9933]' href="https://in.linkedin.com/company/nsrceliimb?trk=public_post-text">NSRCEL </Link></span>,IIM Bangalore and <span><Link className='text-[#ff9933]' href="https://in.linkedin.com/company/headstart-network-foundation?trk=public_post-text">Headstart Network Foundation</Link></span>.
          </p>
          <p className="text-lg">
            These accelerators have been pivotal in refining our ideas, acting as pillars of motivation and guidance as we grow.
          </p>
        </section>

        <section className="space-y-6 mt-12">
          <h2 className="text-3xl font-bold text-[#ff9933]">Usage of Funds</h2>
          <p className="text-lg">
            The fresh capital will be used to enhance GPU and technological infrastructure, support team development, and scale growth to expand into key global markets, including India, the USA, MENA(Middle East), and Southeast Asia.
          </p>
          <p className="text-lg">
            The current global market size for AI is estimated at $37 billion and expected to grow to $330 billion by 2030.
          </p>
        </section>

        <section className="space-y-6 mt-12">
          <h2 className="text-3xl font-bold text-[#ff9933]">The Next Digital Revolution</h2>
          <p className="text-lg">
            Alchemysts come into play to take over mundane, repetitive tasks so businesses can focus more on creative, human-driven tasks. These AI employees are 50X more efficient than humans and available 24/7.
          </p>
          <p className="text-lg">
            Speaking to Analytics India Magazine,CEO Uttaran Nayak shared that they plan to extend into 28 languages in the coming months, particularly to cater to Indian customers. Alchemyst AI envisions becoming a $200 million company within the next three years.
          </p>
          <p className="text-lg">
            The goal of Alchemyst AI is to automate entire workflows in enterprise teams, creating a self-improving AI workforce that reshapes businesses.
          </p>
        </section>

        <section className="mt-12">
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-lg text-[#ff9933]">
            “The next industrial revolution to reshape every business is here, and it’s envisioned by Alchemyst AI.”
          </blockquote>
        </section>


        <section className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold">Featured Articles</h2>
          <ul className="list-disc list-inside text-lg">
            <li>
              AI startup Alchemyst raises pre-seed round led by Inflection Point Ventures, others | <a href="https://economictimes.indiatimes.com/tech/funding/alchemyst-ai-has-raised-funding-in-a-pre-seed-round-led-by-inflection-point-ventures-along-with-100-unicorns-and-early-seed-ventures/articleshow/114288876.cms" target="_blank" rel="noopener noreferrer" className="text-[#ff9933] hover:underline">
                Economic Times
              </a>
            </li>
            <li>
              Alchemyst AI Secures $300K in Pre-Seed Round | <a href="https://www.techinasia.com/news/indias-genai-startup-secures-300k-preseed-funding" target="_blank" rel="noopener noreferrer" className="text-[#ff9933] hover:underline">
                Tech in Asia
              </a>
            </li>
            <li>
              Tablesprint and Alchemyst AI Raise Early-Stage Funding | <a href="https://www.entrepreneur.com/en-in/news-and-trends/tablesprint-and-alchemyst-ai-raise-early-stage-funding/481385" target="_blank" rel="noopener noreferrer" className="text-[#ff9933] hover:underline">
                Entrepreneur.com
              </a>
            </li>
            <li>
              Alchemyst AI raises $300K to drive AI-powered digital workforce solutions | <a href="https://www.financialexpress.com/business/brandwagon-alchemyst-ai-raises-300k-to-drive-ai-powered-digital-workforce-solutions-3641283/" target="_blank" rel="noopener noreferrer" className="text-[#ff9933] hover:underline">
                FinancialExpress.com
              </a>
            </li>
          </ul>
        </section>

        <section className='mt-16 border-t pt-6 text-left text-gray-500'>
            <p className='flex justify-start items-center gap-[7.3rem]'>
                <span>Share Article : </span> 

                <span className='flex justify-start items-center gap-2'
                onClick={() => {
                    const copyText = "https://getalchemystai.com/blogs/pre-seed";
                    navigator.clipboard.writeText(copyText).then(() => {
                        alert("Copied to clipboard");
                    });
                }}>
                    <span><Link href="https://getalchemystai.com/blogs/pre-seed"><Mail height={15} width={15} /></Link></span>
                </span>
                
            </p>
            <p className='flex justify-start items-center gap-[10rem]'> 
                <span>Author :</span>
                <span>Parineeta</span>
            </p>
        </section>

        {/* <section className='mt-16 border-t pt-6 text-left text-gray-500'>

        </section> */}

        <footer className="mt-8 border-t pt-8 text-center text-gray-500">
          <p className='text-xl'>Featured in: Economic Times, Tech in Asia, Entrepreneur.com, FinancialExpress.com</p>
        </footer>
      </main>
  );
}
