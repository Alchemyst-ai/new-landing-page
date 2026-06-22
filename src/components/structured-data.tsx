import { siteConfig } from "@/lib/config";

/**
 * Site-wide JSON-LD structured data for GEO / AI engines.
 * Emits Organization, SoftwareApplication and FAQPage in a single @graph.
 * Rendered once in the root layout so the brand entity is fed straight
 * into AI knowledge graphs (ChatGPT, Claude, Perplexity, Gemini).
 */
export function StructuredData() {
	const url = siteConfig.url;

	const graph = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${url}/#organization`,
				name: "Alchemyst AI",
				legalName: "XAlchemyst Technologies Pvt. Ltd.",
				url: url,
				logo: `${url}/logo.png`,
				email: "founders@getalchemystai.com",
				description:
					"Alchemyst AI is a verifiable AI context engine that provides AI applications and agents with persistent memory, business data, and operational context so they remain accurate, reliable, and production-ready.",
				sameAs: [
					"https://x.com/getalchemyst",
					"https://www.linkedin.com/company/alchemystai",
					"https://github.com/alchemyst-ai",
					"https://www.instagram.com/alchemyst.ai",
					"https://dub.sh/context-community",
				],
			},
			{
				"@type": "SoftwareApplication",
				"@id": `${url}/#software`,
				name: "Alchemyst AI",
				url: url,
				applicationCategory: "DeveloperApplication",
				operatingSystem: "Web, Cloud",
				description:
					"The ONLY AI context engine that you can verify. An auditable context layer for AI agents, providing persistent memory, intent detection, and data-aware reasoning through APIs, SDKs, MCPs, and a browser extension.",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				publisher: {
					"@id": `${url}/#organization`,
				},
			},
			{
				"@type": "FAQPage",
				"@id": `${url}/#faq`,
				mainEntity: [
					{
						"@type": "Question",
						name: "What is Alchemyst AI?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Alchemyst AI is a context engine that provides AI applications with persistent memory, business data, and operational context so agents remain accurate, reliable, and production-ready. It is a standalone context layer that can be integrated into your stack through our APIs, SDKs and MCPs.",
						},
					},
					{
						"@type": "Question",
						name: "How can I use Alchemyst AI?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "You can wire Alchemyst AI into your stack through our APIs, SDKs, MCPs, and browser extension - whatever fits your workflow best. Check more details in our documentation at https://getalchemystai.com/docs.",
						},
					},
					{
						"@type": "Question",
						name: "What is an AI memory layer and why is it important?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "An AI memory layer lets agents remember previous interactions, user preferences, tasks, and business data. It improves accuracy, reduces hallucinations, and allows AI systems to operate with human-like context. Alchemyst AI provides a built-in memory layer designed for production-grade agents.",
						},
					},
					{
						"@type": "Question",
						name: "How does a context engine improve AI agent performance?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "A context engine organizes and stores long-term and short-term information so AI agents can make better decisions. Alchemyst AI's context engine adds persistent memory, intent detection, and data-aware reasoning to enhance agent reliability.",
						},
					},
					{
						"@type": "Question",
						name: "Can AI agents have long-term memory across conversations?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Yes. With systems like Alchemyst AI, agents keep persistent memory across sessions, users, and workflows. This enables personalization and consistent task execution over time.",
						},
					},
					{
						"@type": "Question",
						name: "How do context-aware AI agents compare to regular chatbots?",
						acceptedAnswer: {
							"@type": "Answer",
							text: "Context-aware agents remember past interactions, reference enterprise data, and perform end-to-end tasks. Regular chatbots usually respond only to the latest prompt.",
						},
					},
				],
			},
		],
	};

	return (
		<script
			type="application/ld+json"
			suppressHydrationWarning
			dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
		/>
	);
}
