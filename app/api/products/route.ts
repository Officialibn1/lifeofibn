import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
	try {
		const products = await prisma.product.findMany({
			orderBy: { order: "asc" },
		});
		return NextResponse.json(products);
	} catch (error) {
		console.error("[v0] Failed to fetch products:", error);
		return NextResponse.json([]);
	}
}
