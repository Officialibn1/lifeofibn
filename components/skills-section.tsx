"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Skill {
	id: number;
	name: string;
	category: string;
	order: number;
}

export function SkillsSection() {
	const [skills, setSkills] = useState<Skill[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/skills")
			.then((res) => res.json())
			.then((data) => {
				setSkills(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("[v0] Failed to load skills:", error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<section
				id='skills'
				className='relative py-24 px-4'>
				<div className='container mx-auto max-w-6xl'>
					<div className='space-y-4 mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-balance'>
							Technical Skills
						</h2>
						<p className='text-lg lg:text-xl text-muted-foreground max-w-2xl'>
							A comprehensive toolkit spanning frontend, backend, and DevOps
							technologies to build modern, scalable applications.
						</p>
					</div>
					<Card className='p-8 text-center'>
						<p className='text-muted-foreground'>Loading skills...</p>
					</Card>
				</div>
			</section>
		);
	}

	if (skills.length === 0) {
		return (
			<section
				id='skills'
				className='relative py-24 px-4'>
				<div className='container mx-auto max-w-6xl'>
					<div className='space-y-4 mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-balance'>
							Technical Skills
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl'>
							A comprehensive toolkit spanning frontend, backend, and DevOps
							technologies to build modern, scalable applications.
						</p>
					</div>
					<Card className='p-8 text-center'>
						<p className='text-muted-foreground'>
							No skills data available. Please run database setup.
						</p>
					</Card>
				</div>
			</section>
		);
	}

	// Group skills by category
	const groupedSkills = skills.reduce(
		(acc, skill) => {
			if (!acc[skill.category]) {
				acc[skill.category] = [];
			}
			acc[skill.category].push(skill);
			return acc;
		},
		{} as Record<string, Skill[]>,
	);

	return (
		<section
			id='skills'
			className='relative py-24 px-4'>
			<div className='container mx-auto max-w-6xl'>
				<div className='space-y-4 mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-balance'>
						Technical Skills
					</h2>
					<p className='text-lg text-muted-foreground max-w-2xl'>
						A comprehensive toolkit spanning frontend, backend, and DevOps
						technologies to build modern, scalable applications.
					</p>
				</div>
				<div className='grid md:grid-cols-3 gap-8'>
					{Object.entries(groupedSkills).map(([category, categorySkills]) => (
						<Card
							key={category}
							className='p-6'>
							<h3 className='text-xl font-bold mb-4'>{category}</h3>
							<div className='flex flex-wrap gap-2'>
								{categorySkills.map((skill) => (
									<Badge
										key={skill.id}
										variant='secondary'
										className='text-sm'>
										{skill.name}
									</Badge>
								))}
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
