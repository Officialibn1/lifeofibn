import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
	try {
		const experiences = await prisma.experience.findMany({
			orderBy: { order: "asc" },
		});
		return NextResponse.json(experiences);
	} catch (error) {
		console.error("[v0] Failed to fetch experiences:", error);
		return NextResponse.json([]);
	}
}
