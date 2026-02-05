import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Isah Ibn Muhammad - Full-Stack Developer & Software Engineer",
	description:
		"Portfolio of Isah Ibn Muhammad - Experienced Full-Stack Developer specializing in React, Next.js, and SvelteKit. Building modern web applications with exceptional user experiences.",
	generator: "v0.app",
	icons: {
		icon: [
			{
				url: "/icon-light-32x32.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/icon-dark-32x32.png",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/icon.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/apple-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`font-sans antialiased ${_montserrat.className}`}>
				{children}
				<Toaster
					richColors
					position='bottom-center'
				/>
				<Analytics />
			</body>
		</html>
	);
}
