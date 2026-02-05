"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navigation() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? "bg-background/80 backdrop-blur-md shadow-sm"
					: "bg-transparent"
			}`}>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex items-center justify-between'>
					<Link
						href='/'
						className='text-xl font-bold text-foreground'>
						Ibn
					</Link>
					<div className='hidden md:flex items-center gap-8'>
						<a
							href='#experience'
							className='text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors'>
							Experience
						</a>
						<a
							href='#projects'
							className='text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors'>
							Projects
						</a>
						<a
							href='#skills'
							className='text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors'>
							Skills
						</a>
						<a
							href='#products'
							className='text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors'>
							Products
						</a>
						<a href='#contact'>
							<Button size='sm'>Contact Me</Button>
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
}
