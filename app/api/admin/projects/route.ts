import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const projects = await prisma.project.findMany({
			orderBy: { order: "asc" },
		});
		return NextResponse.json(projects);
	} catch (error) {
		console.error("[v0] Projects fetch error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch projects" },
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
		const project = await prisma.project.create({ data });
		return NextResponse.json(project);
	} catch (error) {
		console.error("[v0] Project create error:", error);
		return NextResponse.json(
			{ error: "Failed to create project" },
			{ status: 500 },
		);
	}
}
