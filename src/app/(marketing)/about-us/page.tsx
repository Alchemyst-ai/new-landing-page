import { Footer } from "@/components/sections/footer"
import { Header } from "@/components/sections/header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | AlchemystAI",
  description: "Learn more about the team behind AlchemystAI and our mission to revolutionize AI-powered development.",
}

const tableOfContents = [
  { title: "Who We Are", link: "#who-we-are" },
  { title: "Editorial Team", link: "#editorial-team" },
  { title: "Management Team", link: "#management-team" },
  { title: "Careers", link: "#careers" },
  { title: "Contact Us", link: "#contact-us" },
]

const teamMembers = [
  {
    name: "John Smith",
    role: "Chief Technology Officer",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3EJS%3C/text%3E%3C/svg%3E",
    bio: "John has over 15 years of experience in AI and machine learning. He leads our technical vision and innovation strategy. Previously, he worked at major tech companies developing cutting-edge AI solutions.",
  },
  {
    name: "Sarah Johnson",
    role: "Head of AI Research",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3ESJ%3C/text%3E%3C/svg%3E",
    bio: "Sarah is an AI researcher with a PhD in Computer Science. She leads our research initiatives in natural language processing and machine learning. Her work has been published in top AI conferences.",
  },
  {
    name: "Michael Chen",
    role: "Lead Engineer",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3EMC%3C/text%3E%3C/svg%3E",
    bio: "Michael brings 10 years of software engineering experience to AlchemystAI. He oversees our core platform development and infrastructure. Previously, he built scalable systems at several successful startups.",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Director",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='24'%3EER%3C/text%3E%3C/svg%3E",
    bio: "Emily has spent 8 years building AI-powered developer tools. She drives our product strategy and roadmap. Her focus is on creating intuitive experiences that help developers be more productive.",
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* <Header /> */}
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

        {/* Coming Soon Section */}
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">We&apos;re working on some amazing content for you.</p>
        </div>

        {/* Commented out content */}
        {/*
        <div className="mb-12 p-6 bg-secondary rounded-lg">
          <h2 className="text-lg font-semibold mb-4">TABLE OF CONTENTS</h2>
          <div className="grid grid-cols-2 gap-4">
            {tableOfContents.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex items-center hover:opacity-75 transition-opacity"
              >
                <span className="mr-2">→</span>
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div id="who-we-are" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg mb-6">
            AlchemystAI was founded with the mission of revolutionizing software development through AI.
            Our team combines expertise in artificial intelligence, software engineering, and developer tools
            to create the next generation of AI-powered development solutions.
          </p>
          <p className="text-lg">
            Our platform serves developers and teams from all over the world and from all walks of life. Some are
            exploring AI-powered development for the first time, while others are experienced developers looking to
            enhance their productivity. No matter who they are, we are here to help.
          </p>
        </div>

        <div id="editorial-team" className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-40 h-40 relative mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="opacity-75 mb-4">{member.role}</p>
                <p className="text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="awards" className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-8">Our Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-secondary rounded-lg">
              <p className="font-semibold">2024 Innovation in AI Development</p>
              <p className="opacity-75">Tech Excellence Awards</p>
            </div>
            <div className="p-6 bg-secondary rounded-lg">
              <p className="font-semibold">2023 Best Developer Tool</p>
              <p className="opacity-75">Developer Choice Awards</p>
            </div>
            <div className="p-6 bg-secondary rounded-lg">
              <p className="font-semibold">2023 AI Breakthrough Award</p>
              <p className="opacity-75">Enterprise Technology Awards</p>
            </div>
          </div>
        </div>

        <div id="contact-us" className="text-center">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg mb-4">
            Have questions or want to learn more about AlchemystAI?
          </p>
          <Link
            href="mailto:contact@alchemyst.ai"
            className="inline-block px-8 py-3 rounded-lg hover:opacity-75 transition-opacity"
          >
            Get in Touch
          </Link>
        </div>
        */}
      </div>
      {/* <Footer /> */}
    </div>
  )
}