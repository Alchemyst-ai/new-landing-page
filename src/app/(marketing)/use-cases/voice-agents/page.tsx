"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Check, ChevronDown, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const PERFORMANCE_METRICS = [
	{
		stat: "170ms",
		description: "P50 Latency",
		impact: "Real-time voice AI responses",
	},
	{
		stat: "12X",
		description: "Value Ratio",
		impact: "More intelligence per dollar",
	},
	{
		stat: "83%",
		description: "Cost Savings",
		impact: "vs traditional engines",
	},
	{
		stat: "0.76",
		description: "Memory F1 Score",
		impact: "Superior context retention",
	},
];

const FEATURES = [
	{
		title: "Unmatched Context Speed",
		description:
			"Process complex conversation contexts in 170ms, enabling voice AI that responds instantly without latency delays.",
		icon: "⚡",
	},
	{
		title: "Superior Context Awareness",
		description:
			"Achieve the highest memory F1 score (0.76) in the industry, maintaining conversation continuity with precision.",
		icon: "🧠",
	},
	{
		title: "Enterprise Economics",
		description:
			"Save 83% on costs while delivering 12x more performance value per dollar than competing solutions.",
		icon: "💰",
	},
	{
		title: "Verified & Transparent",
		description:
			"Tested in December 2025 with publicly available benchmarks. No hidden claims, pure results.",
		icon: "✓",
	},
	{
		title: "Pareto Frontier Performance",
		description:
			"Positioned at the efficiency frontier—the optimal balance of cost and performance available today.",
		icon: "📈",
	},
	{
		title: "Easy Integration",
		description:
			"RESTful APIs and SDKs that integrate with your existing voice stack in hours, not months.",
		icon: "🔌",
	},
];

const USE_CASES = [
	{
		title: "Sales & Outbound Calling",
		description:
			"Qualify leads and close deals with context-aware agents that understand customer history and objections.",
		benefit: "3x faster call completion",
	},
	{
		title: "Customer Support",
		description:
			"Resolve issues faster with instant context retrieval on customer history and preferences.",
		benefit: "40% faster resolution",
	},
	{
		title: "Collections & Reminders",
		description:
			"Intelligent due reminders that understand payment history and customer circumstances.",
		benefit: "25% improvement in recovery rates",
	},
	{
		title: "Inbound Call Handling",
		description:
			"Route and handle incoming calls intelligently with complete context on first ring.",
		benefit: "Instant smart routing",
	},
];

const COMPARISON = [
	{
		feature: "P50 Latency",
		standard: "500-800ms",
		alchemyst: "170ms",
		winner: "alchemyst",
	},
	{
		feature: "Memory F1 Score",
		standard: "0.45-0.58",
		alchemyst: "0.76",
		winner: "alchemyst",
	},
	{
		feature: "Value Ratio (Perf/Cost)",
		standard: "1x-2x",
		alchemyst: "12x",
		winner: "alchemyst",
	},
	{
		feature: "Cost Savings",
		standard: "baseline",
		alchemyst: "83% reduction",
		winner: "alchemyst",
	},
	{
		feature: "Setup Time",
		standard: "2-4 weeks",
		alchemyst: "< 24 hours",
		winner: "alchemyst",
	},
];

export default function ContextEngineFastModePage() {
	const [expandedUseCase, setExpandedUseCase] = useState(0);

	return (
		<main
			className="min-h-screen w-full bg-[#151515] relative"
			style={{
				backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(249,115,22,0.4), transparent)`,
			}}
		>
			{/* HERO SECTION */}
			<section
				className="relative pt-32 pb-24 px-6 overflow-hidden"
				// style={{
				// 	backgroundImage: `radial-gradient(circle 600px at 50% 0%, rgba(244, 144, 37, 0.15), transparent)`,
				// }}
			>
				<div className="max-w-5xl mx-auto text-center relative z-10">
					<div className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/10 px-4 py-1.5 text-sm text-muted-foreground bg-white/5">
						<Zap className="w-4 h-4 text-orange-500" />
						<span>Alchemyst Context Engine</span>
					</div>

					<h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
						<span className="bg-gradient-to-r from-[#f49025] via-white/80 to-white/60 bg-clip-text text-transparent">
							Supercharge your Voice AI agent
						</span>
					</h1>

					<p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
						170ms latency. Best-in-class efficiency.{" "}
						<Link
							href="/benchmarks?utm_source=landing_page&utm_medium=website&utm_campaign=efficiency_learn_more_cta&utm_content=learn_more"
							target="_blank"
							className="hover:underline text-accent-foreground"
						>
							Learn More
						</Link>
					</p>

					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<Link
							href="/platform/signin?utm_source=landing_page&utm_medium=website&utm_campaign=hero_voice_agent_use_case&utm_content=get_started_free"
							target="_blank"
						>
							<Button className="px-8 py-3 text-base font-semibold cursor-pointer bg-orange-500 hover:bg-orange-600">
								Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</Link>
						<Button
							variant="outline"
							className="px-8 py-3 text-base font-semibold cursor-pointer"
						>
							Book a Demo
						</Button>
					</div>
				</div>
			</section>

			{/* METRICS SECTION */}
			<section className="py-20 px-6 border-t border-white/5">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
						Benchmark-Proven Performance
					</h2>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{PERFORMANCE_METRICS.map((metric, i) => (
							<div key={i} className="rounded-xl border p-6 transition">
								<div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
									{metric.stat}
								</div>
								<p className="text-white/60 text-sm font-medium mb-3">
									{metric.description}
								</p>
								<p className="text-white/50 text-xs">{metric.impact}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FEATURES GRID */}
			<section className="py-20 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
						Why Voice AI Teams Choose Alchemyst
					</h2>
					<p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
						Verified capabilities built for enterprises deploying voice AI at
						scale
					</p>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{FEATURES.map((feature, i) => (
							<div key={i} className="rounded-xl border p-8 transition">
								<div className="text-4xl mb-4">{feature.icon}</div>
								<h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* USE CASES */}
			<section className="py-20 px-6 border-y">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
						Transform Any Voice Use Case
					</h2>
					<p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
						Deliver superior performance across your entire voice AI stack
					</p>

					<div className="grid md:grid-cols-2 gap-4">
						{USE_CASES.map((useCase, i) => (
							<div
								key={i}
								onClick={() =>
									setExpandedUseCase(expandedUseCase === i ? -1 : i)
								}
								className="rounded-xl border p-6 cursor-pointer transition"
							>
								<div className="flex items-start justify-between mb-3">
									<h3 className="text-lg font-semibold flex-1">
										{useCase.title}
									</h3>
									<span className="text-orange-400">
										{expandedUseCase === i ? "−" : "+"}
									</span>
								</div>

								{expandedUseCase === i && (
									<div className="mt-4 space-y-3">
										<p className="text-muted-foreground text-sm">
											{useCase.description}
										</p>
										<div className="flex items-center gap-2 pt-2 border-t border-white/10">
											<Check className="w-4 h-4 text-orange-400" />
											<span className="text-sm text-white/60 font-medium">
												{useCase.benefit}
											</span>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* COMPARISON TABLE */}
			<section className="py-20 px-6">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
						Alchemyst vs The Rest
					</h2>
					<p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
						How we define the new Pareto Frontier for voice AI context engines
					</p>

					<div className="rounded-xl border border-white/10 overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b">
										<th className="px-6 py-4 text-left text-sm font-semibold">
											Metric
										</th>
										<th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
											Competitors
										</th>
										<th className="px-6 py-4 text-center text-sm font-semibold text-orange-400">
											Alchemyst
										</th>
									</tr>
								</thead>
								<tbody>
									{COMPARISON.map((row, i) => (
										<tr
											key={i}
											className="border-b border-white/10 hover:bg-white/5 transition"
										>
											<td className="px-6 py-4 text-sm font-medium">
												{row.feature}
											</td>
											<td className="px-6 py-4 text-sm text-muted-foreground text-center">
												{row.standard}
											</td>
											<td
												className={`px-6 py-4 text-sm font-semibold text-center ${
													row.winner === "alchemyst"
														? "text-orange-400"
														: "text-muted-foreground"
												}`}
											>
												{row.alchemyst}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>

			{/* INTEGRATION SECTION */}
			<section className="py-20 px-6 border-y">
				<div className="max-w-4xl mx-auto text-center">
					<Brain className="w-16 h-16 text-orange-400 mx-auto mb-6" />
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Works With Your Voice Stack
					</h2>
					<p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
						Integrates seamlessly with Plivo, Twilio, and any existing voice
						infrastructure. Deploy in under 24 hours with our production-ready
						APIs.
					</p>

					<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center">
						{["Plivo", "Twilio", "OpenAI", "Anthropic"].map((partner) => (
							<div
								key={partner}
								className="rounded-lg border border-white/10 px-4 py-3 text-muted-foreground text-sm font-medium bg-secondary hover:border-accent-foreground transition"
							>
								{partner}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FINAL CTA */}
			<section className="py-24 px-6">
				<div className="max-w-3xl mx-auto rounded-2xl border border-orange-500/30 bg-gradient-to-br from-white/5 via-orange-500/10 to-white/5 p-12 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to Supercharge Your Voice AI Agent?
					</h2>
					<p className="text-muted-foreground mb-8 max-w-xl mx-auto">
						Join leading voice AI startups and enterprises already transforming
						their voice stacks with Alchemyst's verified Context Engine.
					</p>

					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<Link
							href="/platform/signin?utm_source=landing_page&utm_medium=website&utm_campaign=footer_hero_voice_agent_use_case&utm_content=get_started_free"
							target="_blank"
						>
							<Button className="px-8 py-3 text-base font-semibold cursor-pointer">
								Get Started Free
							</Button>
						</Link>
						<Button
							variant="outline"
                      onClick={() => {
                        window.dispatchEvent(new Event("open-founder-cal-voice"));
                      }}
							className="px-8 py-3 text-base font-semibold cursor-pointer"
						>
							Schedule Demo Call
						</Button>
					</div>

					<p className="text-white/50 text-sm mt-6">
						No credit card required &bull; Deploy in &lt; 24 hours &bull; 30-day
						free trial
					</p>
				</div>
			</section>

			{/* FAQ SECTION */}
			<section className="py-20 px-6 border-t">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
						Frequently Asked Questions
					</h2>

					<div className="space-y-4">
						{[
							{
								q: "What makes Alchemyst different?",
								a: "We're the only AI context engine with verified, publicly available benchmarks. Our 170ms P50 latency and 0.76 memory F1 score are tested and proven—no marketing claims.",
							},
							{
								q: "How much can we save?",
								a: "Alchemyst delivers 12x more value per dollar with 83% cost savings vs traditional engines. A typical enterprise saves $50K-500K annually depending on call volume.",
							},
							{
								q: "How quickly can we deploy?",
								a: "Less than 24 hours. Our APIs are designed for rapid integration with Twilio, Plivo, or any custom telephony system.",
							},
							{
								q: "Is there a setup cost or long-term contract?",
								a: "No setup fees or contracts. You only pay for what you use. Start free with our 30-day trial and full production access.",
							},
						].map((faq, i) => (
							<details
								key={i}
								className="group rounded-lg border p-6 cursor-pointer hover:border-accent-foreground transition"
							>
								<summary className="flex justify-between items-center font-semibold cursor-pointer">
									{faq.q}
									<span className="group-open:rotate-180 transition">
										<ChevronDown />
									</span>
								</summary>
								<p className="mt-4 text-muted-foreground">{faq.a}</p>
							</details>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
