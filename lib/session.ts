import { cookies } from "next/headers";
import prisma from "@/lib/db"; // Declare the prisma variable

export async function createSession(adminId: string) {
	const cookieStore = await cookies();
	cookieStore.set("admin-session", adminId, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 7, // 1 week
	});
}

export async function getSession() {
	const cookieStore = await cookies();
	return cookieStore.get("admin-session")?.value;
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("admin-session");
}

export async function verifySession() {
	const sessionId = await getSession();

	if (!sessionId) {
		return null;
	}

	const admin = await prisma.admin.findUnique({
		where: { id: sessionId },
		select: {
			id: true,
			email: true,
			name: true,
		},
	});

	return admin;
}
