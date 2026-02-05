"use server";

import { sendNewserviceInquiryEmail } from "@/lib/email-helpers";
import { ProjectEnquiryForm } from "@/lib/schema/project-enquiry-form-schema";

type FormState = {
	message: string;
	success?: boolean;
};

export const sendContactEmail = async (
	prevState: FormState, // This is the key change - add previous state parameter
	formData: FormData,
): Promise<FormState> => {
	try {
		const values: ProjectEnquiryForm = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			phoneNumber: formData.get("phoneNumber") as string,
			projectType: formData.get(
				"projectType",
			) as ProjectEnquiryForm["projectType"],
			projectTimeLine: formData.get(
				"projectTimeLine",
			) as ProjectEnquiryForm["projectTimeLine"],
			estimatedProjectBudget: formData.get(
				"estimatedProjectBudget",
			) as unknown as ProjectEnquiryForm["estimatedProjectBudget"],
			projectDetails: formData.get("projectDetails") as string,
		};

		await sendNewserviceInquiryEmail(values);

		return {
			message: "Your message has been sent successfully!",
			success: true,
		};
	} catch (error) {
		console.error("Error sending contact email:", error);
		return {
			message:
				"There was an error sending your message. Please try again later.",
			success: false,
		};
	}
};
