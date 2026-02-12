"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import projectEnquiryForm, {
	type ProjectEnquiryForm,
	projectTypes,
	projectTimeLines,
} from "@/lib/schema/project-enquiry-form-schema";
import { sendContactEmail } from "@/app/actions/contact-form-action";

export function ContactSection() {
	const [state, formAction, isPending] = useActionState(sendContactEmail, {
		message: "",
	});

	const form = useForm<ProjectEnquiryForm>({
		resolver: zodResolver(projectEnquiryForm),
		defaultValues: {
			name: "",
			email: "",
			phoneNumber: "",
			projectType: undefined,
			projectTimeLine: undefined,
			estimatedProjectBudget: 0,
			projectDetails: "",
		},
	});

	// Handle server action response
	useEffect(() => {
		if (state.message) {
			if (state.success) {
				toast.success("Message sent!", {
					description: state.message,
				});
				form.reset();
			} else {
				toast.error("Error", {
					description: state.message,
				});
			}
		}
	}, [state, form]);

	async function onSubmit(values: ProjectEnquiryForm) {
		// Validate the form first
		const isValid = await form.trigger();
		if (!isValid) return;

		// Create FormData and submit via server action
		const formData = new FormData();
		formData.append("name", values.name);
		formData.append("email", values.email);
		formData.append("phoneNumber", values.phoneNumber);
		formData.append("projectType", values.projectType);
		formData.append("projectTimeLine", values.projectTimeLine);
		formData.append(
			"estimatedProjectBudget",
			values.estimatedProjectBudget.toString(),
		);
		formData.append("projectDetails", values.projectDetails);

		startTransition(() => {
			formAction(formData);
		});
	}

	return (
		<section
			id='contact'
			className='relative py-24 px-4'>
			<div className='container mx-auto max-w-4xl'>
				<ScrollReveal>
					<div className='space-y-4 mb-16 text-center'>
						<h2 className='text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent'>
							Let's Work Together
						</h2>
						<p className='text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto'>
							Have a project in mind or want to discuss opportunities? I'd love
							to hear from you.
						</p>
					</div>
				</ScrollReveal>
				<ScrollReveal delay={0.2}>
					<Card className='p-8'>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-6'>
								{/* Name and Email */}
								<div className='grid md:grid-cols-2 gap-6'>
									<FormField
										control={form.control}
										name='name'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Full Name *</FormLabel>
												<FormControl>
													<Input
														placeholder='Your full name'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email *</FormLabel>
												<FormControl>
													<Input
														type='email'
														placeholder='your@email.com'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{/* Phone Number */}
								<FormField
									control={form.control}
									name='phoneNumber'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number *</FormLabel>
											<FormControl>
												<Input
													placeholder='+1 (555) 000-0000'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Project Type and Timeline */}
								<div className='grid md:grid-cols-2 gap-6'>
									<FormField
										control={form.control}
										name='projectType'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Project Type *</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<FormControl>
														<SelectTrigger className='w-full'>
															<SelectValue placeholder='Select a project type' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{projectTypes.map((type) => (
															<SelectItem
																key={type}
																value={type}>
																{type}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='projectTimeLine'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Project Timeline *</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<FormControl>
														<SelectTrigger className='w-full'>
															<SelectValue placeholder='Select project timeline' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{projectTimeLines.map((timeline) => (
															<SelectItem
																key={timeline}
																value={timeline}>
																{timeline}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								{/* Estimated Budget */}
								<FormField
									control={form.control}
									name='estimatedProjectBudget'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Estimated Project Budget (USD) *</FormLabel>
											<FormControl>
												<Input
													type='number'
													min='50'
													placeholder='Enter your budget (minimum $50)'
													{...field}
													onChange={(e) =>
														field.onChange(Number(e.target.value))
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Project Details */}
								<FormField
									control={form.control}
									name='projectDetails'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Project Description *</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Tell me about your project, goals, and any specific requirements...'
													rows={6}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									type='submit'
									size='lg'
									className='w-full'
									disabled={isPending || form.formState.isSubmitting}>
									{isPending || form.formState.isSubmitting ? (
										<>
											<Loader2 className='w-4 h-4 mr-2 animate-spin' />
											Sending...
										</>
									) : (
										"Send Message"
									)}
								</Button>
							</form>
						</Form>
					</Card>
				</ScrollReveal>
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
