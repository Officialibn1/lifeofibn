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
		const product = await prisma.product.update({
			where: { id },
			data,
		});
		return NextResponse.json(product);
	} catch (error) {
		console.error("[v0] Product update error:", error);
		return NextResponse.json(
			{ error: "Failed to update product" },
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
		await prisma.product.delete({ where: { id } });
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[v0] Product delete error:", error);
		return NextResponse.json(
			{ error: "Failed to delete product" },
			{ status: 500 },
		);
	}
}
