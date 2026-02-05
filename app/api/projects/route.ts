import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
	try {
		const projects = await prisma.project.findMany({
			orderBy: { order: "asc" },
		});
		return NextResponse.json(projects);
	} catch (error) {
		console.error("[v0] Failed to fetch projects:", error);
		return NextResponse.json([]);
	}
}
