import { UseCaseFeature } from "@/components/ui/use-case-feature";
import Image from "next/image";
import Link from "next/link";

const FinancePage = () => {
	return (
		<main
			className="min-h-screen w-full bg-[#151515] relative"
			style={{
				backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(249,115,22,0.4), transparent)`,
			}}
		>
			{/* <Header /> */}

			{/* Hero Section */}
			<div className="pt-32 pb-16 px-4">
				<div className="max-w-6xl mx-auto">
					{/* Breadcrumb */}
					<div className="text-center mb-8">
						<span className="text-sm text-muted-foreground">Usecases / </span>
						<span className="text-sm text-foreground">Finance</span>
					</div>

					{/* Main Title */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
							<span className="text-foreground">
								Supercharge Your
								<br />
								Financial Operations
							</span>
						</h1>

						{/* Subtitle */}
						<p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
							Enhance fraud detection, streamline payments, and accelerate KYC
							processes with memory-powered AI that learns from every
							transaction.
						</p>
					</div>

					{/* CTA Button */}
					<div className="text-center mb-16">
						<Link
							href="/platform/signin"
							className="inline-block bg-foreground text-background px-8 py-4 rounded-lg font-medium text-lg transition-colors hover:opacity-90"
						>
							Build Smarter Finance Apps
						</Link>
					</div>
				</div>
			</div>

			{/* Main Content with GIF */}
			<div className="px-4 pb-20">
				<div className="max-w-6xl mx-auto">
					{/* Large Finance GIF Display */}
					<div className="flex justify-center mb-16">
						<div className="relative w-full max-w-5xl bg-card rounded-2xl overflow-hidden border border-border">
							<Image
								src="/use-cases/fintech.gif"
								alt="Finance AI Interface"
								width={1200}
								height={800}
								className="w-full h-auto"
								unoptimized
								priority
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Problems Section */}
			<div className="w-full bg-background py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<span className="text-sm uppercase tracking-wider text-muted-foreground mb-4 inline-block">
							Challenges
						</span>
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
							Problems Faced
						</h2>
						<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
							Legacy financial systems struggle with efficiency, speed, and
							context retention.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Problem 1 */}
						<div className="bg-muted p-6 rounded-xl border border-border">
							<div className="mb-4">
								<div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
									<svg
										className="w-6 h-6 text-foreground/80"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Repetitive Fraud Checks
							</h3>
							<p className="text-muted-foreground">
								Legacy systems reprocess the same entities/devices each time →
								redundant and expensive.
							</p>
						</div>

						{/* Problem 2 */}
						<div className="bg-muted p-6 rounded-xl border border-border">
							<div className="mb-4">
								<div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
									<svg
										className="w-6 h-6 text-foreground/80"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Rigid Payments Logic
							</h3>
							<p className="text-muted-foreground">
								No memory of past issuer quirks or merchant behavior → higher
								declines, lost revenue.
							</p>
						</div>

						{/* Problem 3 */}
						<div className="bg-muted p-6 rounded-xl border border-border">
							<div className="mb-4">
								<div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
									<svg
										className="w-6 h-6 text-foreground/80"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</div>
							</div>
							<h3 className="text-xl font-semibold text-foreground mb-3">
								Fragmented Case Data
							</h3>
							<p className="text-muted-foreground">
								KYC, device, and transaction info live in silos → agents
								can&apos;t act fast or see full context.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="w-full bg-card py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<span className="text-sm uppercase tracking-wider text-muted-foreground mb-4 inline-block">
							Features
						</span>
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
							Intelligent Financial Features
						</h2>
						<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
							Transform financial operations with memory-powered AI that learns
							and adapts from every transaction.
						</p>
					</div>

					{/* Use Case Features Section */}
					<div className="grid md:grid-cols-2 gap-8">
						<UseCaseFeature
							title="Persistent Memory for Fraud Prevention"
							description="Remembers devices and prior entities → avoids duplicate checks → slashes token and infra costs."
							imagePath="/use-cases/fintech/fintech01.png"
							imageAlt="Fraud prevention system showing device and entity memory"
						/>
						<UseCaseFeature
							title="Checkout that Learns Over Time"
							description="Alchemyst retains issuer quirks and merchant-specific logic → faster, more accurate auths."
							imagePath="/use-cases/fintech/fintech02.png"
							imageAlt="Adaptive checkout system with learning capabilities"
						/>
						<UseCaseFeature
							title="Smart Credit & BNPL Routing"
							description="No more sending full loan ledgers → eligibility checks become 70% cheaper and smarter."
							imagePath="/use-cases/fintech/fintech03.png"
							imageAlt="Smart credit routing system showing optimized checks"
						/>
						<UseCaseFeature
							title="Unified View of Financial Cases"
							description="KYC, payments, and user fingerprints stitched into one memory → faster resolution, fewer reruns."
							imagePath="/use-cases/fintech/fintech04.png"
							imageAlt="Unified financial case management interface"
						/>
					</div>
				</div>
			</div>

			{/* Token Optimization Section */}
			<div className="w-full bg-background py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						{/* Left Side Content */}
						<div className="space-y-6">
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
								Cost optimized. Out of the box.
							</h2>
							<p className="text-lg text-muted-foreground mb-8">
								Run agents with more power with lesser cost.
							</p>

							{/* Checklist */}
							<div className="space-y-4">
								<div className="flex items-start space-x-3">
									<div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
										<div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
									</div>
									<span className="text-muted-foreground">
										Does the heavy lifting of memory offloading by itself.
									</span>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
										<div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
									</div>
									<span className="text-muted-foreground">
										Optimizes token expenditure with efficient prompts.
									</span>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
										<div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
									</div>
									<span className="text-muted-foreground">
										Highly capable of handling longer tasks.
									</span>
								</div>
							</div>

							{/* CTA Button */}
							<div className="pt-6">
								<Link
									href="/platform/signin"
									className="inline-block bg-foreground text-background px-8 py-4 rounded-lg font-medium text-lg transition-colors hover:opacity-90"
								>
									Get Started
								</Link>
							</div>
						</div>

						{/* Right Side Cards */}
						<div className="space-y-6">
							{/* Standard Agent Card */}
							<div className="bg-card p-6 rounded-xl border border-border">
								<h3 className="text-lg font-semibold text-foreground mb-4">
									Standard Agent
								</h3>
								<div className="mb-4">
									<div className="flex justify-between items-center mb-2">
										<span className="text-sm text-muted-foreground">
											Token Used (Avg)
										</span>
										<span className="text-sm text-muted-foreground">
											3M tokens
										</span>
									</div>
									{/* Progress Bar */}
									<div className="w-full bg-muted rounded-full h-3">
										<div
											className="bg-foreground h-3 rounded-full"
											style={{ width: "85%" }}
										></div>
									</div>
									<p className="text-xs text-muted-foreground mt-2">
										High token usage, short context window
									</p>
								</div>
							</div>

							{/* Alchemyst-Enhanced Agent Card */}
							<div className="bg-card p-6 rounded-xl border border-border">
								<div className="flex items-center mb-4">
									<div className="w-6 h-6 mr-2">
										<svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
											<circle
												cx="12"
												cy="12"
												r="3"
												fill="currentColor"
												className="text-foreground"
											/>
											<path
												d="M12 1v6m0 8v6m11-7h-6m-8 0H1"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												className="text-foreground"
											/>
										</svg>
									</div>
									<h3 className="text-lg font-semibold text-foreground">
										Alchemyst-enhanced Agent
									</h3>
								</div>
								<div className="mb-4">
									<div className="flex justify-between items-center mb-2">
										<span className="text-sm text-muted-foreground">
											Token Used (Avg)
										</span>
										<span className="text-sm text-muted-foreground">
											1.8M tokens
										</span>
									</div>
									{/* Progress Bar */}
									<div className="w-full bg-muted rounded-full h-3">
										<div
											className="bg-foreground h-3 rounded-full"
											style={{ width: "45%" }}
										></div>
									</div>
									<p className="text-xs text-muted-foreground mt-2">
										Shorter prompt optimized with Alchemyst
									</p>
								</div>
								<div className="flex items-center mt-4">
									<div className="w-2 h-2 bg-muted-foreground rounded-full mr-2"></div>
									<span className="text-xs text-muted-foreground">
										Memory Connected
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Plug and Play Integration */}
			<div className="w-full bg-card py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						{/* Left Side - Code Examples */}
						<div className="space-y-6">
							{/* JavaScript Code Block */}
							<div className="bg-card rounded-lg p-6 border border-border">
								<div className="flex items-center mb-4">
									<div className="bg-muted-foreground text-background px-3 py-1 rounded text-sm font-medium mr-3">
										JavaScript
									</div>
									<div className="bg-muted-foreground text-background px-3 py-1 rounded text-sm font-medium">
										Python
									</div>
								</div>
								<div className="font-mono text-sm">
									<div className="text-muted-foreground">
										import MemoryClient
									</div>
									<span className="text-foreground"> </span>
									<span className="text-muted-foreground"></span>
									<span className="text-foreground"> </span>
									<div className="text-muted-foreground">from</div>
									<span className="text-foreground"> </span>
									<span className="text-muted-foreground">
										&apos;@alchemyst/memory&apos;
									</span>
									<span className="text-foreground">;</span>
									<br />
									<br />
									<div className="text-muted-foreground">const</div>
									<span className="text-foreground"> </span>
									<span className="text-muted-foreground">client</span>
									<span className="text-foreground"> = </span>
									<div className="text-muted-foreground">new</div>
									<span className="text-foreground"> </span>
									<span className="text-muted-foreground">MemoryClient</span>
									<span className="text-foreground">(</span>
									<span className="text-muted-foreground">
										&apos;your-api-key&apos;
									</span>
									<span className="text-foreground">);</span>
								</div>
							</div>

							{/* Python Code Block */}
							<div className="bg-card rounded-lg p-6 border border-border">
								<div className="flex items-center mb-4">
									<div className="bg-muted-foreground text-background px-3 py-1 rounded text-sm font-medium mr-3">
										JavaScript
									</div>
									<div className="bg-muted-foreground text-background px-3 py-1 rounded text-sm font-medium">
										Python
									</div>
								</div>
								<div className="font-mono text-sm">
									<div className="text-muted-foreground">import</div>
									<span className="text-foreground"> </span>
									<span className="text-muted-foreground">os</span>
									<br />
									<div className="text-muted-foreground">from</div>
									<span className="text-foreground"> </span>
									<span className="text-muted-foreground">
										alchemyst.memory
									</span>
									<span className="text-foreground"> </span>
									<div className="text-muted-foreground">import</div>
									<span className="text-foreground"> </span>
									<span className="text-muted-foreground">MemoryClient</span>
									<br />
									<br />
									<span className="text-muted-foreground">client</span>
									<span className="text-foreground"> = </span>
									<span className="text-muted-foreground">MemoryClient</span>
									<span className="text-foreground">(</span>
									<span className="text-muted-foreground">
										&apos;your-api-key&apos;
									</span>
									<span className="text-foreground">)</span>
								</div>
							</div>
						</div>

						{/* Right Side Content */}
						<div className="space-y-6">
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
								Two liner integration
							</h2>
							<p className="text-lg text-muted-foreground mb-8">
								Alchemyst connects seamlessly with your current setup. Just one
								copy-paste command away.
							</p>

							{/* Checklist */}
							<div className="space-y-4">
								<div className="flex items-start space-x-3">
									<div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
										<div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
									</div>
									<span className="text-muted-foreground">
										Huge repertoire of compatible tools.
									</span>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
										<div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
									</div>
									<span className="text-muted-foreground">
										SOC-2 and HIPAA compliant with secure storage.
									</span>
								</div>
								<div className="flex items-start space-x-3">
									<div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1 flex-shrink-0">
										<div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
									</div>
									<span className="text-muted-foreground">
										Observability on runtime.
									</span>
								</div>
							</div>

							{/* CTA Button */}
							<div className="pt-6">
								<Link
									href="/platform/signin"
									className="inline-block bg-foreground text-background px-8 py-4 rounded-lg font-medium text-lg transition-colors hover:opacity-90"
								>
									Integrate Alchemyst
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <Footer /> */}
		</main>
	);
};

export default FinancePage;
