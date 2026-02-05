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
		const project = await prisma.project.update({
			where: { id },
			data,
		});
		return NextResponse.json(project);
	} catch (error) {
		console.error("[v0] Project update error:", error);
		return NextResponse.json(
			{ error: "Failed to update project" },
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
		await prisma.project.delete({ where: { id } });
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[v0] Project delete error:", error);
		return NextResponse.json(
			{ error: "Failed to delete project" },
			{ status: 500 },
		);
	}
}
