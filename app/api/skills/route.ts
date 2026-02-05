import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		console.log("[DEBUG] Fetching skills...");
		const skills = await prisma.skill.findMany({
			orderBy: { order: "asc" },
		});
		console.log("[DEBUG] Found skills:", skills.length);
		return NextResponse.json(skills);
	} catch (error) {
		console.error("[v0] Failed to fetch skills:", error);
		return NextResponse.json([]);
	}
}
