import prisma from "@/lib/db";
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const products = await prisma.product.findMany({
			orderBy: { order: "asc" },
		});
		return NextResponse.json(products);
	} catch (error) {
		console.error("[v0] Products fetch error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch products" },
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
		const product = await prisma.product.create({ data });
		return NextResponse.json(product);
	} catch (error) {
		console.error("[v0] Product create error:", error);
		return NextResponse.json(
			{ error: "Failed to create product" },
			{ status: 500 },
		);
	}
}
