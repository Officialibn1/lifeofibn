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
		const experience = await prisma.experience.update({
			where: { id },
			data,
		});
		return NextResponse.json(experience);
	} catch (error) {
		console.error("[v0] Experience update error:", error);
		return NextResponse.json(
			{ error: "Failed to update experience" },
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
		await prisma.experience.delete({ where: { id } });
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[v0] Experience delete error:", error);
		return NextResponse.json(
			{ error: "Failed to delete experience" },
			{ status: 500 },
		);
	}
}
