"use client";

import Link from "next/link";
import Script from "next/script";

interface FeedspaceWOLProps {
	pageId: string;
	className?: string;
}

export default function FeedspaceWOL({
	pageId,
	className = "",
}: FeedspaceWOLProps) {
	return (
		<section className="flex flex-col items-center justify-center py-16">
			<div className="text-center mb-10">
				<h2 className="text-3xl md:text-4xl font-bold">Testimonials</h2>
				<p className="text-gray-400 mt-2 text-base md:text-lg">
					A sneak peek from the community - what they think about{" "}
					<Link
						href="/platform/signin?utm_source=website&utm_campaign=feedspace_wol&utm_medium=website&utm_content=sneak_peek"
						target="_blank"
						className="inline-flex items-center space-x-1 underline"
					>
						<span className="font-semibold text-gray-400 hover:text--white transition-colors">
							Alchemyst
						</span>
					</Link>
				</p>
			</div>

			<div
				className={`w-full md:w-[65%] mx-auto feedspace-embed ${className}`}
				data-id={pageId}
			/>

			<Script
				src="https://js.feedspace.io/v1/embed/embed.min.js"
				strategy="lazyOnload"
			/>
		</section>
	);
}
