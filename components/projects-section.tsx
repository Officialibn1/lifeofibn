"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Project {
	id: number;
	title: string;
	description: string;
	technologies: string;
	image: string | null;
	link: string | null;
	impact: string | null;
	order: number;
}

export function ProjectsSection() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/projects")
			.then((res) => res.json())
			.then((data) => {
				setProjects(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("[v0] Failed to load projects:", error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<section
				id='projects'
				className='relative py-24 px-4 bg-muted/30'>
				<div className='container mx-auto max-w-6xl'>
					<div className='space-y-4 mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent'>
							Featured Projects
						</h2>
						<p className='text-lg lg:text-xl text-muted-foreground max-w-2xl'>
							A selection of projects showcasing expertise in full-stack
							development, system architecture, and delivering measurable
							impact.
						</p>
					</div>
					<div className='grid md:grid-cols-2 gap-8'>
						{[1, 2].map((i) => (
							<Card
								key={i}
								className='overflow-hidden'>
								<Skeleton className='h-48 w-full rounded-none' />
								<div className='p-6 space-y-4'>
									<Skeleton className='h-6 w-3/4' />
									<Skeleton className='h-4 w-full' />
									<Skeleton className='h-4 w-5/6' />
									<div className='flex gap-2'>
										<Skeleton className='h-6 w-16' />
										<Skeleton className='h-6 w-20' />
										<Skeleton className='h-6 w-16' />
									</div>
									<Skeleton className='h-9 w-32' />
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (projects.length === 0) {
		return (
			<section
				id='projects'
				className='relative py-24 px-4 bg-muted/30'>
				<div className='container mx-auto max-w-6xl'>
					<div className='space-y-4 mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent'>
							Featured Projects
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl'>
							A selection of projects showcasing expertise in full-stack
							development, system architecture, and delivering measurable
							impact.
						</p>
					</div>
					<Card className='p-8 text-center'>
						<p className='text-muted-foreground'>
							No projects available. Please run database setup.
						</p>
					</Card>
				</div>
			</section>
		);
	}

	return (
		<section
			id='projects'
			className='relative py-24 px-4 bg-muted/30'>
			<div className='container mx-auto max-w-6xl'>
				<ScrollReveal>
					<div className='space-y-4 mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent'>
							Featured Projects
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl'>
							A selection of projects showcasing expertise in full-stack
							development, system architecture, and delivering measurable
							impact.
						</p>
					</div>
				</ScrollReveal>
				<div className='grid md:grid-cols-2 gap-8'>
					{projects.map((project, index) => {
						const technologies = JSON.parse(project.technologies) as string[];
						return (
							<ScrollReveal
								key={project.id}
								delay={index * 0.1}>
								<Card className='overflow-hidden group hover:shadow-xl transition-all'>
									{project.image && (
										<div className='relative h-48 bg-muted overflow-hidden'>
											<Image
												src={project.image || "/placeholder.svg"}
												alt={project.title}
												fill
												className='object-cover group-hover:scale-105 transition-transform duration-300'
											/>
										</div>
									)}
									<div className='p-6 space-y-4'>
										<div>
											<h3 className='text-xl font-bold mb-2'>
												{project.title}
											</h3>
											<p className='text-sm text-muted-foreground leading-relaxed'>
												{project.description}
											</p>
										</div>
										{project.impact && (
											<p className='text-sm font-medium text-primary'>
												Impact: {project.impact}
											</p>
										)}
										<div className='flex flex-wrap gap-2'>
											{technologies.map((tech, index) => (
												<Badge
													key={index}
													variant='secondary'
													className='text-xs'>
													{tech}
												</Badge>
											))}
										</div>
										{project.link && (
											<Button
												variant='outline'
												size='sm'
												className='gap-2 bg-transparent'>
												View Project <ExternalLink className='w-3 h-3' />
											</Button>
										)}
									</div>
								</Card>
							</ScrollReveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
