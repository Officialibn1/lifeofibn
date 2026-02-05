"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const PROJECT_TYPES = [
	"API Integration",
	"Frontend Development",
	"Full-Stack Development",
	"CI/CD Pipeline",
	"Figma Design",
	"Landing Page",
	"Web Application",
	"Usability Testing",
	"Code Review",
	"Project Management",
	"Database Management",
	"Report Generation with SQL",
];

const BUDGET_RANGES = [
	"$5,000 - $10,000",
	"$10,000 - $25,000",
	"$25,000 - $50,000",
	"$50,000 - $100,000",
	"$100,000+",
];

const PROJECT_TIMELINES = [
	"1-2 weeks",
	"3-4 weeks",
	"1-2 months",
	"2-3 months",
	"3+ months",
];

export function ContactSection() {
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.currentTarget);
		const data = {
			fullName: formData.get("fullName"),
			email: formData.get("email"),
			officialEmail: formData.get("officialEmail") || null,
			phoneNumber: formData.get("phoneNumber"),
			projectType: formData.get("projectType"),
			projectBudget: formData.get("projectBudget") || null,
			projectTimeline: formData.get("projectTimeline") || null,
			message: formData.get("message"),
		};

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				toast({
					title: "Message sent!",
					description: "Thank you for reaching out. I'll get back to you soon.",
				});
				e.currentTarget.reset();
			} else {
				throw new Error("Failed to send message");
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to send message. Please try again.",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<section
			id='contact'
			className='relative py-24 px-4'>
			<div className='container mx-auto max-w-4xl'>
				<div className='space-y-4 mb-16 text-center'>
					<h2 className='text-4xl md:text-5xl font-bold text-balance'>
						Let's Work Together
					</h2>
					<p className='text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto'>
						Have a project in mind or want to discuss opportunities? I'd love to
						hear from you.
					</p>
				</div>
				<Card className='p-8'>
					<form
						onSubmit={handleSubmit}
						className='space-y-6'>
						{/* Full Name and Email */}
						<div className='grid md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<Label htmlFor='fullName'>Full Name *</Label>
								<Input
									id='fullName'
									name='fullName'
									placeholder='Your full name'
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email *</Label>
								<Input
									id='email'
									name='email'
									type='email'
									placeholder='your@email.com'
									required
								/>
							</div>
						</div>

						{/* Official Email and Phone */}
						<div className='grid md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<Label htmlFor='officialEmail'>Official Email (Optional)</Label>
								<Input
									id='officialEmail'
									name='officialEmail'
									type='email'
									placeholder='official@company.com'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='phoneNumber'>Phone Number *</Label>
								<Input
									id='phoneNumber'
									name='phoneNumber'
									placeholder='+1 (555) 000-0000'
									required
								/>
							</div>
						</div>

						{/* Project Type and Budget */}
						<div className='grid md:grid-cols-2 gap-6'>
							<div className='space-y-2'>
								<Label htmlFor='projectType'>Project Type *</Label>
								<select
									id='projectType'
									name='projectType'
									className='w-full px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
									required>
									<option value=''>Select a project type</option>
									{PROJECT_TYPES.map((type) => (
										<option
											key={type}
											value={type}>
											{type}
										</option>
									))}
								</select>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='projectBudget'>Project Budget (Optional)</Label>
								<select
									id='projectBudget'
									name='projectBudget'
									className='w-full px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'>
									<option value=''>Select budget range</option>
									{BUDGET_RANGES.map((range) => (
										<option
											key={range}
											value={range}>
											{range}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Project Timeline */}
						<div className='space-y-2'>
							<Label htmlFor='projectTimeline'>
								Project Timeline (Optional)
							</Label>
							<select
								id='projectTimeline'
								name='projectTimeline'
								className='w-full px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'>
								<option value=''>Select project timeline</option>
								{PROJECT_TIMELINES.map((timeline) => (
									<option
										key={timeline}
										value={timeline}>
										{timeline}
									</option>
								))}
							</select>
						</div>

						{/* Message */}
						<div className='space-y-2'>
							<Label htmlFor='message'>Project Description *</Label>
							<Textarea
								id='message'
								name='message'
								placeholder='Tell me about your project, goals, and any specific requirements...'
								rows={6}
								required
							/>
						</div>

						<Button
							type='submit'
							size='lg'
							className='w-full'
							disabled={loading}>
							{loading ? (
								<>
									<Loader2 className='w-4 h-4 mr-2 animate-spin' />
									Sending...
								</>
							) : (
								"Send Message"
							)}
						</Button>
					</form>
				</Card>
				<div className='mt-12 text-center space-y-4'>
					<p className='text-lg text-muted-foreground'>
						Or reach me directly at
					</p>
					<div className='flex flex-col lg:flex-row items-center justify-center gap-4'>
						<a
							href='mailto:officialibn001@gmail.com'
							className='text-sm font-semibold text-muted-foreground hover:text-primary transition-colors'>
							lifeofibn@gmail.com
						</a>

						<a
							href='mailto:officialibn001@gmail.com'
							className='text-sm font-semibold text-muted-foreground hover:text-primary transition-colors'>
							officialibn001@gmail.com
						</a>
						<span className='hidden sm:inline text-muted-foreground'>•</span>
						<a
							href='tel:+2349038880282'
							className='text-sm font-semibold text-muted-foreground hover:text-primary transition-colors'>
							+234 903 888 0282
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
