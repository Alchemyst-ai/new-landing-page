import { siteConfig } from "@/lib/config";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
	const footerLinks = {
		product: [
			// { name: "Features", href: "#features", external: false },
			{ name: "Pricing", href: "/pricing", external: false },
			{ name: "Security", href: "/security", external: false },
			{ name: "Research", href: "/research", external: false },
			{ name: "Spaces", href: "/spaces", external: false },
		],
		useCases: [
			{ name: "Finance", href: "/use-cases/finance", external: false },
			{
				name: "Customer Support",
				href: "/use-cases/customer-support",
				external: false,
			},
			{ name: "EdTech", href: "/use-cases/edtech", external: false },
			{ name: "Healthcare", href: "/use-cases/healthcare", external: false },
			{ name: "Voice", href: "/use-cases/voice-agents", external: false },
		],

		resources: [
			{ name: "Documentation", href: "/docs", external: true },
			{ name: "Blog", href: "/blog", external: false },
			{ name: "Community", href: siteConfig.links.discord, external: true },
			{ name: "Benchmarks", href: "/benchmarks", external: false },
		],
		company: [
			{ name: "About Us", href: "/about-us", external: false },
			{ name: "Careers", href: "/careers", external: false },
			{ name: "Terms of Use", href: "/terms-of-use", external: false },
			{ name: "Privacy Policy", href: "/privacy-policy", external: false },
		],
	};

	return (
		<footer className=" w-full">
			<div className="w-full flex justify-center">
				<div className="w-[80%]">
					{/* Main Footer Content */}
					<div className="border-t w-full">
						<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-8 md:p-12 lg:px-16 xl:px-24 w-full">
							{/* Brand Section - Left Side */}
							<div className="flex-shrink-0 space-y-4 lg:min-w-[300px]">
								<div className="w-full">
									<div className="w-full mb-6">
										<Image
											src="/signlogo.png"
											alt="Alchemyst AI"
											width={147}
											height={59}
											className="h-auto w-auto max-w-[137px] lg:max-w-[157px] object-contain"
											priority
										/>
									</div>
									<p className="text-sm text-muted-foreground max-w-sm mt-6">
										The ONLY AI context engine that you can verify. Carry your
										context everywhere.
									</p>
								</div>

								{/* Contact Info */}
								<div className="space-y-2 text-sm text-muted-foreground">
									<div className="flex items-center gap-2">
										<Mail className="h-4 w-4" />
										<a
											href={`mailto:${siteConfig.links.email}`}
											className="hover:text-foreground transition-colors"
										>
											{siteConfig.links.email}
										</a>
									</div>
								</div>

								{/* Social Links */}
								<div className="flex items-center gap-4 pt-2">
									{siteConfig.footer.socialLinks.map((link, index) => {
										const getAriaLabel = (url: string) => {
											if (url.includes("twitter") || url.includes("x.com"))
												return "Twitter";
											if (url.includes("github")) return "GitHub";
											if (url.includes("linkedin")) return "LinkedIn";
											if (url.includes("discord") || url.includes("dub.sh"))
												return "Discord";
											return "Social Media";
										};

										return (
											<a
												key={index}
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-all duration-200 ease-linear hover:text-foreground hover:scale-110"
												aria-label={`Visit our ${getAriaLabel(link.url)}`}
											>
												{link.icon}
											</a>
										);
									})}
								</div>
							</div>

							{/* Navigation Links - Right Side - All headings in one row */}
							<div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
								{/* Product Links */}
								<div className="space-y-4">
									<h3 className="text-sm font-semibold tracking-tight uppercase">
										Product
									</h3>
									<ul className="space-y-3">
										{footerLinks.product.map((link, index) => (
											<li key={index}>
												{link.external ? (
													<a
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
													>
														{link.name}
													</a>
												) : (
													<Link
														href={link.href}
														className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
													>
														{link.name}
													</Link>
												)}
											</li>
										))}
									</ul>
								</div>

								{/* Use Cases */}
								<div className="space-y-4">
									<h3 className="text-sm font-semibold tracking-tight uppercase">
										Use Cases
									</h3>
									<ul className="space-y-3">
										{footerLinks.useCases.map((link, index) => (
											<li key={index}>
												{link.external ? (
													<a
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
													>
														{link.name}
													</a>
												) : (
													<Link
														href={link.href}
														className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
													>
														{link.name}
													</Link>
												)}
											</li>
										))}
									</ul>
								</div>

								{/* Resources Links */}
								<div className="space-y-4">
									<h3 className="text-sm font-semibold tracking-tight uppercase">
										Resources
									</h3>
									<ul className="space-y-3">
										{footerLinks.resources.map((link, index) => (
											<li key={index}>
												{link.external ? (
													<a
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
													>
														{link.name}
													</a>
												) : (
													<Link
														href={link.href}
														className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
													>
														{link.name}
													</Link>
												)}
											</li>
										))}
									</ul>
								</div>

								{/* Company Links */}
								<div className="space-y-4">
									<h3 className="text-sm font-semibold tracking-tight uppercase">
										Company
									</h3>
									<ul className="space-y-3">
										{footerLinks.company.map((link, index) => (
											<li key={index}>
												{link.href.startsWith("mailto:") ? (
													<a
														href={link.href}
														className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
													>
														{link.name}
													</a>
												) : (
													<Link
														href={link.href}
														className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
													>
														{link.name}
													</Link>
												)}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom Bar */}
					<div className=" w-full">
						<div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 md:p-8 lg:px-16 xl:px-24 text-sm text-muted-foreground w-full">
							<div className="text-center sm:text-left">
								<p className="font-medium">
									© 2025 XAlchemyst Technologies Pvt. Ltd.
								</p>
								<p>All rights reserved.</p>
							</div>
							<div className="flex items-center gap-2 text-xs">
								<span>Built with</span>
								<span className="text-orange-500">❤️</span>
								<span>by Team Alchemyst AI</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
