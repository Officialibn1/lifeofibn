import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const skills = await prisma.skill.findMany({
			orderBy: { order: "asc" },
		});
		return NextResponse.json(skills);
	} catch (error) {
		console.error("[v0] Skills fetch error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch skills" },
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
		const skill = await prisma.skill.create({ data });
		return NextResponse.json(skill);
	} catch (error) {
		console.error("[v0] Skill create error:", error);
		return NextResponse.json(
			{ error: "Failed to create skill" },
			{ status: 500 },
		);
	}
}
