import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 12);
}

export async function verifyPassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	return bcrypt.compare(password, hashedPassword);
}

export async function authenticateAdmin(email: string, password: string) {
	const admin = await prisma.admin.findUnique({
		where: { email },
	});

	if (!admin) {
		return null;
	}

	const isValid = await verifyPassword(password, admin.password);

	if (!isValid) {
		return null;
	}

	return {
		id: admin.id,
		email: admin.email,
		name: admin.name,
	};
}
