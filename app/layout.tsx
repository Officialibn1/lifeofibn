import type React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const _montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Isah Ibn Muhammad - Full-Stack Developer & Software Engineer",
	description:
		"Portfolio of Isah Ibn Muhammad - Experienced Full-Stack Developer specializing in React, Next.js, and SvelteKit. Building modern web applications with exceptional user experiences.",
	icons: {
		icon: [
			{
				url: "/icon.svg",
				type: "image/svg+xml",
			},
		],
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
