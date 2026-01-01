"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// import type { Metadata } from "next"

// /* ===================== SEO ===================== */

// export const metadata: Metadata = {
//   title: "AI Voice Agent Use Cases | Alchemyst AI",
//   description:
//     "Explore real-world AI voice agent use cases for sales, support, reminders, and lead qualification.",
//   keywords: [
//     "AI Voice Agent",
//     "AI Calling Agent",
//     "Outbound AI Calls",
//     "Inbound AI Support",
//     "Plivo AI",
//     "Twilio AI",
//     "Voice AI Platform"
//   ],
//   openGraph: {
//     title: "AI Voice Agent Use Cases",
//     description:
//       "Deploy human-like AI voice agents to automate calls at scale.",
//     type: "website"
//   }
// }

/* ===================== DATA ===================== */

const USE_CASES = [
	{
		title: "Outbound Sales Calls",
		desc: "Qualify leads, pitch offers, handle objections and book meetings on the go.",
		callContext:
			"A respected car dealer, ABC Cars - calls its customers via Shreya. Except that Shreya isn't a human, but Alchemyst's voice agent.",
		demoLink:
			"https://aps1.media.plivo.com/v1/Account/MAOTLKYTBLNWRMYJMYNT/Recording/70429e0a-a936-4b2b-946a-e9791c0fcbf1.mp3",
	},
	{
		title: "Lead Qualification",
		desc: "Ask smart questions, score leads in real-time and sync with CRM.",
		callContext: "",
		demoLink: "",
	},
	{
		title: "Payment & Dues Reminders",
		desc: "Automated reminder calls with polite escalation and dynamic scripts.",
		callContext:
			"Ramesh Kumar Sharma availed a home loan from Home Finance Ltd. Their representative calls him up and confirms the details. Can you differentiate if the employee is a person or not?",
		demoLink:
			"https://aps1.media.plivo.com/v1/Account/MAOTLKYTBLNWRMYJMYNT/Recording/6aa0dfe2-4759-402a-b434-ceed74429e74.mp3",
	},
	{
		title: "Customer Support",
		desc: "Resolve common issues with sentiment-aware, multilingual AI voice agents.",
		callContext: "",
		demoLink: "",
	},
	{
		title: "Inbound Call Handling",
		desc: "Never miss a call. Instantly answer FAQs, route calls and book appointments.",
		callContext:
			"Cosmetics Ltd is a famous cosmetics company with Express Customer Support, with high-caliber customer representatives like Geeta. The twist? Geeta is an AI powered by Alchemyst.",
		demoLink:
			"https://aps1.media.plivo.com/v1/Account/MAOTLKYTBLNWRMYJMYNT/Recording/a0e944d6-3d71-4765-9971-fdd5dc965f74.mp3",
	},
	{
		title: "Survey & Feedback Calls",
		desc: "Collect structured feedback via natural conversations instead of IVRs.",
		callContext: "",
		demoLink: "",
	},
];

/* ===================== PAGE ===================== */

export function SineWave() {
	const bars = 30; // More bars make the wave look smoother

	return (
		<div className="relative flex items-center justify-center h-50 py-2 bg-transparent px-10">
			{/* Inline Animation */}
			<style>{`
        @keyframes wave-grow {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(0.7); opacity: 1; }
        }
        .animate-math-wave {
          animation: wave-grow 2s ease-in-out infinite;
        }
      `}</style>

			{/* The Mathematical X-Axis (Baseline) */}
			{/* <div className="absolute w-full h-[1px] bg-white/20 z-0" /> */}

			<div className="flex items-center gap-1 h-full z-10">
				{[...Array(bars)].map((_, i) => {
					// Range: pi/2 to 5pi/2
					const angle = (i / (bars - 1)) * (2 * Math.PI);
					const val = Math.sin(angle);
					const height = Math.abs(val) * 90; // Max height of 90px

					return (
						<div key={i} className="flex flex-col w-2 h-full">
							{/* Top Half (Positive Zone) */}
							<div className="flex-1 flex items-end justify-center">
								{val > 0 && (
									<div
										className="w-full rounded-t-full bg-gradient-to-t from-[#f49025] to-[#fefefe] animate-math-wave origin-bottom"
										style={{
											height: `${height}px`,
											animationDelay: `${i * 0.05}s`,
										}}
									/>
								)}
							</div>

							{/* Bottom Half (Negative Zone) */}
							<div className="flex-1 flex items-start justify-center">
								{val < 0 && (
									<div
										className="w-full rounded-b-full bg-gradient-to-b from-[#f49025] to-[#fefefe] animate-math-wave origin-top"
										style={{
											height: `${height}px`,
											animationDelay: `${i * 0.05}s`,
										}}
									/>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

const TESTIMONIALS = [
	{
		name: "Sanket S.",
		company: "Luxor Cars, Maharashtra",
		text: "Alchemyst's voice agent has transformed our outbound sales. We book more meetings with less effort and our customers love the experience.",
		avatar:
			"https://lh3.googleusercontent.com/-WWr0aO3USTI/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfknm3V5w3vaMbIUHbwl_l8IiBpxjnw/s128-c/photo.jpg",
	},
	{
		name: "Priya M.",
		company: "Home Finance Ltd.",
		text: "The AI reminders are so natural, most customers don't realize it's not a human. Our collections team is now 2x more productive.",
		avatar: "👩‍💼",
	},
	{
		name: "Amit K.",
		company: "TechSupportPro",
		text: "We handle 80% of support calls automatically. The sentiment detection and multilingual support are game changers.",
		avatar: "🧑‍💻",
	},
	{
		name: "Sonal T.",
		company: "Cosmetics Ltd.",
		text: "Our inbound call handling is now seamless. Customers get instant answers and our team can focus on complex queries.",
		avatar: "💁‍♀️",
	},
	{
		name: "Deepak R.",
		company: "SurveyGenius",
		text: "Collecting feedback is so much easier with Alchemyst. The AI voice feels friendly and gets us more responses than IVR.",
		avatar: "🗣️",
	},
	{
		name: "Neha P.",
		company: "EduConnect",
		text: "We use Alchemyst for student reminders and support. The multilingual capability is a huge plus for us.",
		avatar: "🎓",
	},
];

export function ShowTestimonials({
	open,
	close,
	asDialog = false,
	...props
}: {
	open?: boolean;
	close?: () => void;
	asDialog?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
	if (asDialog) {
		return (
			<Dialog open={open} onOpenChange={close} {...props}>
				<DialogContent className="max-w-lg bg-[#151515]/95 border-white/10 text-white">
					<DialogHeader>
						<DialogTitle className="text-2xl">
							What Our Customers Say
						</DialogTitle>
						<DialogDescription>
							Real feedback from teams using Alchemyst Voice AI.
						</DialogDescription>
					</DialogHeader>
					<div className="mt-6">
						<Carousel opts={{ loop: true }}>
							<CarouselContent>
								{TESTIMONIALS.map((t, i) => (
									<CarouselItem key={i} className="pl-2 md:pl-4">
										<div className="flex flex-col items-center text-center gap-4 px-2 py-6">
											{t.avatar.startsWith("http") ? (
												<Image
													src={t.avatar}
													className="w-12 h-12 rounded-full object-cover"
													alt={`testimonial-by-${t.name}`}
													width={50}
													height={50}
												/>
											) : (
												<Avatar className="text-4xl">{t.avatar}</Avatar>
											)}
											<blockquote className="text-lg text-white/90 font-medium">
												“{t.text}”
											</blockquote>
											<div className="mt-2 text-sm text-white/70">
												<span className="font-semibold">{t.name}</span>
												<span className="mx-2">·</span>
												<span>{t.company}</span>
											</div>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<div className="flex justify-center gap-4 mt-4">
								<CarouselPrevious />
								<CarouselNext />
							</div>
						</Carousel>
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<section className={`py-20 px-6 bg-transparent ${props.className}`}>
			<div className="w-full max-w-[70vw] mx-auto rounded-2xl bg-[#151515]/90 p-8 text-center">
				<h2 className="text-4xl font-bold mb-2">What Our Customers Say</h2>
				<p className="text-white/60 mb-6">
					Real feedback from teams using Alchemyst Voice AI.
				</p>
				<Carousel opts={{ loop: true }}>
					<CarouselContent>
						{TESTIMONIALS.map((t, i) => (
							<CarouselItem
								key={i}
								className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
							>
								<Card className="flex flex-col items-center text-center gap-4 px-2 py-6 bg-transparent border-none shadow-none">
									{t.avatar.startsWith("http") ? (
										<Image
											src={t.avatar}
											className="w-12 h-12 rounded-full object-cover"
											alt={`testimonial-by-${t.name}`}
											width={50}
											height={50}
										/>
									) : (
										<Avatar className="text-4xl">{t.avatar}</Avatar>
									)}
									<blockquote className="text-lg text-white/90 font-medium">
										“{t.text}”
									</blockquote>
									<div className="mt-2 text-sm text-white/70">
										<span className="font-semibold">{t.name}</span>
										<span className="mx-2">·</span>
										<span>{t.company}</span>
									</div>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className="flex justify-center gap-4 mt-4">
						<CarouselPrevious />
						<CarouselNext />
					</div>
				</Carousel>
			</div>
		</section>
	);
}

export default function VoiceAgentsPage() {
	const [showTestimonials, setShowTestimonials] = useState(false);
	return (
		<main
			className="min-h-screen w-full bg-[#151515] relative"
			style={{
				backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(249,115,22,0.4), transparent)`,
			}}
		>
			{/* Orange Radial Glow Background */}
			{/* ================= HERO ================= */}
			<section className="relative pt-36 pb-32 px-6">
				<div className="absolute inset-0 blur-3xl" />
				<div className="relative max-w-6xl mx-auto text-center">
					<span className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/10 px-4 py-1 text-sm text-white/70">
						🎙️ AI Voice Agents
					</span>

					<h1 className="text-5xl md:text-6xl font-bold">
						<span className="bg-gradient-to-r from-[#f59025] via-[#f59025]/50 to-[#fefefe]/80 bg-clip-text text-transparent">
							Human-Like Voice AI
						</span>{" "}
						for everyone.
					</h1>

					<p className="mt-6 text-lg text-white/70 max-w-4xl mx-auto">
						Deploy AI voice agents that talk naturally, understand intent &amp;
						take action - 24x7, at scale.
					</p>
					{/* Voice Wave Animation
        <SineWave /> */}
					<div className="mt-10 flex justify-center gap-4">
						<Button
							className="px-6 py-3 font-medium cursor-pointer"
							variant="orange"
						>
							Book Live Demo
						</Button>
						<Link href="#testimonials">
							<Button
								variant="outline"
								className="rounded-lg border border-white/15 px-6 py-3 cursor-pointer"
								// onClick={() => setShowTestimonials(true)}
							>
								See Testimonials
							</Button>
						</Link>
					</div>
				</div>
				<ShowTestimonials
					open={showTestimonials}
					close={() => setShowTestimonials(false)}
					asDialog
				/>
			</section>

			{/* ================= USE CASES ================= */}
			<section className="py-28 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center">
						Voice Agent Use Cases
					</h2>

					<p className="mt-4 text-center text-white/70 max-w-2xl mx-auto">
						Replace manual calling teams with AI agents that scale instantly and
						never get tired.
					</p>

					<div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{USE_CASES.map((item) => (
							<div
								key={item.title}
								className="rounded-2xl border border-white/10 p-6 backdrop-blur hover:border-[#f49025]/40 transition flex flex-col"
							>
								<h3 className="text-xl font-semibold">{item.title}</h3>
								<p className="mt-3 text-white/70 flex-1">{item.desc}</p>
								{item.demoLink && item.demoLink.length > 0 && (
									<Dialog>
										<DialogTrigger asChild>
											<Button
												variant="outline"
												className="mt-4 w-full cursor-pointer"
											>
												Show Demo
											</Button>
										</DialogTrigger>
										<DialogContent className="bg-[#151515]/90 border-white/10 text-white">
											<DialogTitle>{item.title} Demo</DialogTitle>
											<DialogDescription>{item.callContext}</DialogDescription>
											<div className="mt-4 items-center w-full">
												<audio controls src={item.demoLink} className="w-full">
													<track
														kind="captions"
														srcLang="en"
														label="English captions"
													/>
												</audio>
											</div>
										</DialogContent>
									</Dialog>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ================= VOICE DEMO ================= */}
			{/* <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Hear the AI Voice in Action</h2>

          <p className="mt-4 text-white/70">
            Natural, real-time conversations powered by advanced speech models.
          </p>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-10">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#151515]/30 via-[#f49025]/20 flex items-center justify-center shadow-xl text-2xl">
                🎧
              </div>

              <p className="text-white/70 max-w-md">
                “Hello! This is an AI voice agent calling to assist you with your
                enquiry…”
              </p>

              <button className="rounded-lg bg-white text-black px-6 py-3 font-medium">
                ▶ Play Sample
              </button>
            </div>
          </div>
        </div>
      </section> */}

			{/* ================= INDUSTRIES ================= */}
			{/* <section className="py-24 px-6 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center">
            Built for Every Industry
          </h2>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {INDUSTRIES.map((industry) => (
              <div
                key={industry}
                className="rounded-xl border border-white/10 bg-[#151515]/40 p-5 text-center text-white/80 hover:bg-white/5 transition"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section> */}

			{/* ================= INTEGRATIONS ================= */}
			{/* <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60 mb-8">
            Seamlessly integrates with your existing stack
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {INTEGRATIONS.map((name) => (
              <div
                key={name}
                className="px-6 py-3 rounded-lg border border-white/10 bg-white/5 text-white/80"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section> */}

			{/* Customer testimonials */}
			<div id="testimonials">
				<ShowTestimonials />
			</div>

			{/* ================= CTA ================= */}
			<section className="py-28 px-6">
				<div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-[#151515]/30 via-[#f49025]/20 p-12 text-center">
					<h2 className="text-4xl font-bold">
						Get Your Voice Agent in hours, not months
					</h2>

					<p className="mt-4 text-white/70 max-w-2xl mx-auto">
						Integrate with your existing systems and tools effortlessly.
					</p>

					<Link
						href="https://voice.getalchemystai.com"
						target="_blank noopener noreferrer"
						className="cursor-pointer"
					>
						<Button
							variant="outline"
							className="mt-8 rounded-lg px-8 py-4 font-medium cursor-pointer"
						>
							Book Live Demo
						</Button>
					</Link>
				</div>
			</section>

			{/* ================= ANIMATION STYLES ================= */}
			<style jsx global>{`
        @keyframes wave {
          0%,
          100% {
            transform: scaleY(0.4);
          }
          50% {
            transform: scaleY(1);
          }
        }
        .animate-wave {
          animation: wave 1.2s ease-in-out infinite;
        }
      `}</style>
		</main>
	);
}
