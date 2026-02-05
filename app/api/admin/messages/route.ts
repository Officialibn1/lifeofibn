import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const admin = await verifySession();
		if (!admin) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const messages = await prisma.contact_message.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(messages);
	} catch (error) {
		console.error("[v0] Messages fetch error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch messages" },
			{ status: 500 },
		);
	}
}
