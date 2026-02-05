import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
	return (
		<section className='relative min-h-screen flex items-center justify-center px-4 py-20'>
			<div className='container mx-auto max-w-6xl'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<div className='space-y-8'>
						<div className='space-y-4'>
							<p className='text-sm font-medium text-muted-foreground tracking-wide uppercase'>
								Full-Stack Developer
							</p>
							<h1 className='text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight'>
								Building Digital
								<br />
								<span className='text-primary'>Experiences</span> That
								<br />
								Matter
							</h1>
							<p className='text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl'>
								Highly experienced Software Engineer with 3+ years specializing
								in React, Next.js, and SvelteKit. I architect clean, optimized
								applications that deliver exceptional user experiences and
								measurable business impact.
							</p>
						</div>
						<div className='flex flex-wrap gap-4'>
							<Link href='#contact'>
								<Button
									size='lg'
									className='gap-2'>
									Get In Touch <ArrowRight className='w-4 h-4' />
								</Button>
							</Link>
							<Link href='#projects'>
								<Button
									size='lg'
									variant='outline'>
									View My Work
								</Button>
							</Link>
						</div>
						<div className='flex items-center gap-4 pt-4'>
							<Link
								href='https://github.com/Officialibn1'
								target='_blank'
								rel='noopener noreferrer'
								className='text-muted-foreground hover:text-foreground transition-colors'>
								<Github className='w-5 h-5' />
							</Link>
							<Link
								href='https://www.linkedin.com/in/isah-ibn-muhammad'
								target='_blank'
								rel='noopener noreferrer'
								className='text-muted-foreground hover:text-foreground transition-colors'>
								<Linkedin className='w-5 h-5' />
							</Link>
							<Link
								href='mailto:officialibn001@gmail.com'
								className='text-muted-foreground hover:text-foreground transition-colors'>
								<Mail className='w-5 h-5' />
							</Link>
						</div>
					</div>
					<div className='relative'>
						<div className='relative w-full aspect-square max-w-md mx-auto'>
							<div className='absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-full blur-3xl' />
							<div className='relative rounded-full overflow-hidden border-4 border-background shadow-2xl'>
								<Image
									src='/lifeofibn.webp'
									alt='Isah Ibn Muhammad'
									width={500}
									height={500}
									className='w-full h-full object-cover'
									priority
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
