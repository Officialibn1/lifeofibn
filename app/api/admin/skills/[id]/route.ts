import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const admin = await verifySession();
		if (!admin) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;
		const data = await request.json();
		const skill = await prisma.skill.update({
			where: { id },
			data,
		});
		return NextResponse.json(skill);
	} catch (error) {
		console.error("[v0] Skill update error:", error);
		return NextResponse.json(
			{ error: "Failed to update skill" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const admin = await verifySession();
		if (!admin) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;
		await prisma.skill.delete({ where: { id } });
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[v0] Skill delete error:", error);
		return NextResponse.json(
			{ error: "Failed to delete skill" },
			{ status: 500 },
		);
	}
}
