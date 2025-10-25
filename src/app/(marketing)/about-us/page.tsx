// import { Footer } from "@/components/sections/footer"
// import { Header } from "@/components/sections/header"
// import { Metadata } from "next"
// import Image from "next/image"
// import Link from "next/link"

// export const metadata: Metadata = {
//   title: "About Us | AlchemystAI",
//   description: "Learn more about the team behind AlchemystAI and our mission to revolutionize AI-powered development.",
// }

// const tableOfContents = [
//   { title: "Who We Are", link: "#who-we-are" },
//   { title: "Editorial Team", link: "#editorial-team" },
//   { title: "Management Team", link: "#management-team" },
//   { title: "Careers", link: "#careers" },
//   { title: "Contact Us", link: "#contact-us" },
// ]

// const teamMembers = [
//   {
//     name: "John Smith",
//     role: "Chief Technology Officer",
//     image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3EJS%3C/text%3E%3C/svg%3E",
//     bio: "John has over 15 years of experience in AI and machine learning. He leads our technical vision and innovation strategy. Previously, he worked at major tech companies developing cutting-edge AI solutions.",
//   },
//   {
//     name: "Sarah Johnson",
//     role: "Head of AI Research",
//     image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3ESJ%3C/text%3E%3C/svg%3E",
//     bio: "Sarah is an AI researcher with a PhD in Computer Science. She leads our research initiatives in natural language processing and machine learning. Her work has been published in top AI conferences.",
//   },
//   {
//     name: "Michael Chen",
//     role: "Lead Engineer",
//     image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3EMC%3C/text%3E%3C/svg%3E",
//     bio: "Michael brings 10 years of software engineering experience to AlchemystAI. He oversees our core platform development and infrastructure. Previously, he built scalable systems at several successful startups.",
//   },
//   {
//     name: "Emily Rodriguez",
//     role: "Product Director",
//     image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3EER%3C/text%3E%3C/svg%3E",
//     bio: "Emily has spent 8 years building AI-powered developer tools. She drives our product strategy and roadmap. Her focus is on creating intuitive experiences that help developers be more productive.",
//   }
// ]

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       {/* <Header /> */}
//       <div className="container mx-auto px-4 py-24">
//         <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

//         <div className="text-center py-16">
//           <h2 className="text-2xl font-semibold text-foreground mb-4">Coming Soon</h2>
//           <p className="text-muted-foreground">We&apos;re working on some amazing content for you.</p>
//         </div>

//         {/* Commented out content */}
        
//         <div className="mb-12 p-6 bg-secondary rounded-lg">
//           <h2 className="text-lg font-semibold mb-4">TABLE OF CONTENTS</h2>
//           <div className="grid grid-cols-2 gap-4">
//             {tableOfContents.map((item, index) => (
//               <Link
//                 key={index}
//                 href={item.link}
//                 className="flex items-center hover:opacity-75 transition-opacity"
//               >
//                 <span className="mr-2">→</span>
//                 {item.title}
//               </Link>
//             ))}
//           </div>
//         </div>

//         <div id="who-we-are" className="mb-16">
//           <h2 className="text-2xl font-bold mb-6">Who We Are</h2>
//           <p className="text-lg mb-6">
//             AlchemystAI was founded with the mission of revolutionizing software development through AI.
//             Our team combines expertise in artificial intelligence, software engineering, and developer tools
//             to create the next generation of AI-powered development solutions.
//           </p>
//           <p className="text-lg">
//             Our platform serves developers and teams from all over the world and from all walks of life. Some are
//             exploring AI-powered development for the first time, while others are experienced developers looking to
//             enhance their productivity. No matter who they are, we are here to help.
//           </p>
//         </div>

//         <div id="editorial-team" className="mb-16">
//           <h2 className="text-2xl font-bold mb-8">Our Team</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member, index) => (
//               <div key={index} className="flex flex-col items-center text-center">
//                 <div className="w-40 h-40 relative mb-4">
//                   <Image
//                     src={member.image}
//                     alt={member.name}
//                     fill
//                     className="object-cover rounded-lg"
//                   />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">{member.name}</h3>
//                 <p className="opacity-75 mb-4">{member.role}</p>
//                 <p className="text-sm">{member.bio}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div id="awards" className="text-center mb-16">
//           <h2 className="text-2xl font-bold mb-8">Our Awards & Recognition</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="p-6 bg-secondary rounded-lg">
//               <p className="font-semibold">2024 Innovation in AI Development</p>
//               <p className="opacity-75">Tech Excellence Awards</p>
//             </div>
//             <div className="p-6 bg-secondary rounded-lg">
//               <p className="font-semibold">2023 Best Developer Tool</p>
//               <p className="opacity-75">Developer Choice Awards</p>
//             </div>
//             <div className="p-6 bg-secondary rounded-lg">
//               <p className="font-semibold">2023 AI Breakthrough Award</p>
//               <p className="opacity-75">Enterprise Technology Awards</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | AlchemystAI",
  description:
    "Learn more about the vision behind AlchemystAI — building the tractable context layer for the Agentic Web.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About Us
        </h1>

        <div className="relative flex justify-center mb-20">
          <div
            className="absolute inset-0 max-w-3xl mx-auto blur-3xl opacity-50 rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99,102,241,0.4), rgba(14,165,233,0.2), transparent 100%)",
            }}
          ></div>

          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/funding1.jpeg"
            alt="Founders of Alchemyst AI"
            width={1200}
            height={700}
            className="object-cover w-full h-auto hover:scale-[1.02] transition-transform duration-500"
            priority
          />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl prose prose-lg dark:prose-invert leading-relaxed">
          <h2>Your AI agent needs tractable context.</h2>
          <p>
            AI isn't the future anymore — it's already changing our present. But here's the kicker — only
            <strong> 26% </strong> are actually usable.
          </p>

          <p>Any functional agent will have three parts to it:</p>
          <ul>
            <li>The models</li>
            <li>The workflows</li>
            <li>The context</li>
          </ul>

          <p>
            The first two are already being solved: Models are crushing SoTA records every day, while workflows are
            more or less direct ports of real-world repetitive processes, specifically tailored to businesses. That's
            the UX that MCPs strive to solve for.
          </p>

          <p>The real problem lies in the <strong>context</strong>.</p>

          <h3>Context engineering is the next frontier for AI adoption.</h3>

          <p>
            As LLM context windows 10× over every year (a trend that's holding pretty well so far), data explodes at
            100× more. So here's the uncomfortable truth:
          </p>

          <blockquote>
            Data is always going to exceed LLM context window sizes, no matter what.
          </blockquote>

          <p>
            Thus, the question for any AI-enabled business is not <strong>IF</strong> they would need a new context
            layer and context engineering in general, but <strong>WHEN</strong>. Turns out, that's pretty soon. Beyond
            ~10 sessions per user, businesses need to treat memory and user-specific context as mandatory requirements
            for their users. And that's the average number of chat sessions that a customer has with an AI chatbot in
            a month.
          </p>

          <h2>“95% of generative AI efforts will fail by 2026–27.” — MIT</h2>

          <p>And the reason is lack of proper contextualization.</p>

          <p>
            So, you don't just need context — you need <strong>tractable</strong> context that you can verify.
          </p>

          <p>That's the sole purpose of us building <strong>Alchemyst AI</strong>.</p>

          <p>
            The world will be moving towards <strong>Agent Era 2.0</strong> — where context matters more than prompts.
            Prompts can be auto-optimized, thanks to accurate context storage and retrieval.
          </p>

          <p>
            This is the vision we bet our entire company on, a year ago. With this coming true, we want to say one
            thing:
          </p>

          <blockquote>
            “Everyone will upgrade — and the ones using Alchemyst AI will be at the forefront.”
          </blockquote>

          <p className="mt-10 italic text-right">
            ~ Signing off, <br /> Anuran and Uttaran
          </p>
        </div>
      </div>
    </div>
  )
}
