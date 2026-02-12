"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useEffect, useState } from "react";

interface Experience {
	id: number;
	company: string;
	role: string;
	type: string;
	startDate: string;
	endDate: string;
	description: string;
	achievements: string;
	order: number;
}

export function ExperienceSection() {
	const [experiences, setExperiences] = useState<Experience[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/experience")
			.then((res) => res.json())
			.then((data) => {
				setExperiences(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("[v0] Failed to load experiences:", error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<section
				id='experience'
				className='relative py-24 px-4'>
				<div className='container mx-auto max-w-6xl'>
					<div className='space-y-4 mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent'>
							Professional Experience
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl'>
							Building impactful solutions across government projects,
							modernization initiatives, and client partnerships.
						</p>
					</div>
					<div className='space-y-8'>
						{[1, 2].map((i) => (
							<Card
								key={i}
								className='p-6 md:p-8'>
								<div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4'>
									<div className='space-y-2'>
										<Skeleton className='h-8 w-64' />
										<Skeleton className='h-5 w-48' />
									</div>
									<div className='flex items-center gap-2'>
										<Skeleton className='h-6 w-24' />
										<Skeleton className='h-4 w-32' />
									</div>
								</div>
								<Skeleton className='h-5 w-full mb-4' />
								<div className='space-y-2'>
									<Skeleton className='h-4 w-full' />
									<Skeleton className='h-4 w-5/6' />
									<Skeleton className='h-4 w-4/5' />
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (experiences.length === 0) {
		return (
			<section
				id='experience'
				className='relative py-24 px-4'>
				<div className='container mx-auto max-w-6xl'>
					<div className='space-y-4 mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-balance'>
							Professional Experience
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl'>
							Building impactful solutions across government projects,
							modernization initiatives, and client partnerships.
						</p>
					</div>
					<Card className='p-8 text-center'>
						<p className='text-muted-foreground'>
							No experience data available. Please run database setup.
						</p>
					</Card>
				</div>
			</section>
		);
	}

	return (
		<section
			id='experience'
			className='relative py-24 px-4'>
			<div className='container mx-auto max-w-6xl'>
				<ScrollReveal>
					<div className='space-y-4 mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent'>
							Professional Experience
						</h2>
						<p className='text-lg lg:text-xl text-muted-foreground max-w-2xl'>
							Building impactful solutions across government projects,
							modernization initiatives, and client partnerships.
						</p>
					</div>
				</ScrollReveal>
				<div className='space-y-8'>
					{experiences.map((exp, index) => {
						const achievements = JSON.parse(exp.achievements) as string[];
						return (
							<ScrollReveal
								key={exp.id}
								delay={index * 0.15}>
								<Card className='p-6 md:p-8 hover:shadow-lg transition-shadow'>
									<div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4 '>
										<div>
											<h3 className='text-3xl font-bold mb-1'>{exp.role}</h3>
											<p className='text-lg text-muted-foreground font-medium'>
												{exp.company}
											</p>
										</div>
										<div className='flex items-center gap-2'>
											<Badge variant='secondary'>{exp.type}</Badge>
											<span className='text-sm text-muted-foreground whitespace-nowrap'>
												{exp.startDate} - {exp.endDate}
											</span>
										</div>
									</div>
									<p className='text-muted-foreground text-xl mb-4 font-semibold'>
										{exp.description}
									</p>
									<ul className='space-y-2'>
										{achievements.map((achievement, index) => (
											<li
												key={index}
												className='flex gap-2 text-lg'>
												<span className='text-primary mt-1'>•</span>
												<span>{achievement}</span>
											</li>
										))}
									</ul>
								</Card>
							</ScrollReveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
