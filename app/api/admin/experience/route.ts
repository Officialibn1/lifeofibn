import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const experiences = await prisma.experience.findMany({
			orderBy: { order: "asc" },
		});
		return NextResponse.json(experiences);
	} catch (error) {
		console.error("[v0] Experience fetch error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch experiences" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const admin = await verifySession();
		if (!admin) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const data = await request.json();
		const experience = await prisma.experience.create({ data });
		return NextResponse.json(experience);
	} catch (error) {
		console.error("[v0] Experience create error:", error);
		return NextResponse.json(
			{ error: "Failed to create experience" },
			{ status: 500 },
		);
	}
}
