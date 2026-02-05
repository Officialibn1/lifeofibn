import { z } from "zod";

const projectEnquiryForm = z.object({
	name: z
		.string({
			required_error: "Please enter your full name",
		})
		.min(5, "Please enter your full name"),
	email: z
		.string({
			required_error: "Enter a valid email address",
		})
		.email({
			message: "Enter a valid email address",
		}),
	phoneNumber: z
		.string({
			required_error: "Please enter your phone number",
		})
		.min(5, {
			message: "Please enter your phone number",
		}),
	projectType: z.enum(
		[
			"E-Commerce",
			"Dropshipping Website",
			"Personal Portfolio",
			"UI/UX Design (Figma)",
			"Real-Estate Portfolio",
			"Car Agent/Agency Portfolio",
			"Visa Agent/Agency Portfolio",
			"Content Management System (CMS)",
			"Agency Website",
			"Landing Page",
			"Website Development (Frontend Only)",
			"Website Development (Serverless Full-Stack)",
			"API Integration",
			"Booking website (Airline)",
			"Booking website (Hotel & Reservations)",
			"Schorlarship Website",
			"Airline Website",
			"Computer Base Test (CBT) Web App",
			"Mobile Development",
		],
		{
			required_error: "Please select your project type.",
		},
	),
	projectTimeLine: z.enum(
		[
			"As soon as possible",
			"Flexible",
			"Less than a month",
			"In 1 - 3 months",
			"In 3 - 6 months",
			"In a year",
			"More than a year",
		],
		{
			required_error: "Please select your estimated timeline.",
		},
	),
	estimatedProjectBudget: z
		.number({
			required_error: "Your budget should be more than $70.",
		})
		.min(50, "Your budget should be more than $70."),
	projectDetails: z
		.string({
			required_error: "Please add more content to the projects description.",
		})
		.min(
			20,
			"Please add more content to the projects description (Min 20 characters).",
		),
});

export type ProjectEnquiryForm = z.infer<typeof projectEnquiryForm>;

export const projectTypes = projectEnquiryForm.shape.projectType.options;
export const projectTimeLines =
	projectEnquiryForm.shape.projectTimeLine.options;

export default projectEnquiryForm;
