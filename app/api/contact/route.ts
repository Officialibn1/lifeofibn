import prisma from "@/lib/db";
import { sendContactEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const {
			fullName,
			email,
			officialEmail,
			phoneNumber,
			projectType,
			projectBudget,
			projectTimeline,
			message,
		} = await request.json();

		// Validate required fields
		if (!fullName || !email || !phoneNumber || !projectType || !message) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Save to database
		const contactMessage = await prisma.contact_message.create({
			data: {
				fullName,
				email,
				officialEmail,
				phoneNumber,
				projectType,
				projectBudget,
				projectTimeline,
				message,
			},
		});

		// Send email notifications
		try {
			await sendContactEmail({
				fullName,
				email,
				officialEmail,
				phoneNumber,
				projectType,
				projectBudget,
				projectTimeline,
				message,
			});
		} catch (emailError) {
			console.error(
				"[v0] Email sending failed, but message saved:",
				emailError,
			);
			// Don't fail the request if email fails - message is still saved in DB
		}

		return NextResponse.json({ success: true, id: contactMessage.id });
	} catch (error) {
		console.error("[v0] Contact form error:", error);
		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 },
		);
	}
}
