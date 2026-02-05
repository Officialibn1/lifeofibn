import prisma from "./db";

let isInitialized = false;

export async function initializeDatabase() {
	if (isInitialized) return;

	try {
		// Check if tables exist by trying to count records
		await prisma.admin.count();
		console.log("[v0] Database already initialized");
		isInitialized = true;
	} catch (error) {
		console.log("[v0] Database needs initialization, running migrations...");
		// In production, migrations should be run separately
		// This is just for development convenience
		console.error("[v0] Please run: npm run db:setup");
		throw new Error("Database not initialized. Run: npm run db:setup");
	}
}
