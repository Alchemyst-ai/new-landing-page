import ConditionalFooter from "@/components/conditional-footer";
import { CalBooking } from "@/components/sections/cal-booking";
import { CalBookingVoice } from "@/components/sections/cal-booking-voice";
import { Header } from "@/components/sections/header";
import { StructuredData } from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import TripettoPopup from "@/components/TripettoPopup";
import { siteConfig } from "@/lib/config";
import { cn, constructMetadata } from "@/lib/utils";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = constructMetadata({
	title: `${siteConfig.name} | ${siteConfig.description}`,
});

export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "#151515" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${GeistSans.variable} ${GeistMono.variable}`}
		>
			<GoogleTagManager gtmId="GTM-558WGZR4" />
			<StructuredData />
			<Script
				id="apollo-tracker"
				strategy="afterInteractive"
			>{`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"6818f0f981e37f001936f9c3"})},
document.head.appendChild(o)}initApollo()`}</Script>
			<body
				className={cn(
					"min-h-screen bg-background antialiased w-full mx-auto scroll-smooth font-sans",
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
				>
					{/* Wrapper adds bottom padding to prevent content being hidden under sticky footer */}
					<Toaster richColors theme="dark" position="bottom-right" />
					<div className="pb-10 sm:pb-12">
						<Header />
						{children}
						<CalBooking />
						<CalBookingVoice />
						<TripettoPopup />
						<ConditionalFooter />
						{/* <Footer /> */}
					</div>
					{/* <ThemeToggle /> */}
					{/* <StickyAdFooter /> */}
				</ThemeProvider>
				<GoogleAnalytics gaId="G-WHNWY5LTDN" />
			</body>
		</html>
	);
}
