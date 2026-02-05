import { product } from "@/generated/prisma";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
	console.log("Starting database seed...");

	// Create admin user
	const hashedPassword = await bcrypt.hash("admin123", 10);
	const admin = await prisma.admin.upsert({
		where: { email: "admin@example.com" },
		update: {},
		create: {
			email: "admin@example.com",
			password: hashedPassword,
			name: "Admin User",
		},
	});
	console.log("Created admin user:", admin.email);

	// Create experiences based on updated CV
	const experiences = [
		{
			company: "Trade Modernization Project",
			role: "Frontend Developer",
			type: "Hybrid",
			startDate: "2025",
			endDate: "Present",
			description:
				"Development of the Revenue Reporting System for B'Odogwu Nigeria Customs Service trading platform",
			achievements: JSON.stringify([
				"Developed Revenue Reporting System using NextJS, TypeScript, TailwindCSS and RTK Query",
				"Achieved significant speed improvements in revenue report generation",
				"Enhanced user experience (UX) for revenue reporting workflows",
			]),
			order: 1,
		},
		{
			company: "Nigeria Customs Service",
			role: "Full-Stack Developer (NYSC)",
			type: "Onsite",
			startDate: "2024",
			endDate: "2025",
			description:
				"Development and deployment of a full-stack Digital Mail and File Tracking System",
			achievements: JSON.stringify([
				"Built Digital Mail & File Tracking System using Next.js, TypeScript, Prisma ORM, SQL, and PostgreSQL",
				"Achieved 50x acceleration in file lookup speeds",
				"Modernized and digitized operations within the Nigeria Customs Service ICT department",
				"Implemented fully transparent digital operation system",
			]),
			order: 2,
		},
		{
			company: "Freelance",
			role: "Frontend Developer",
			type: "Remote/Contract",
			startDate: "2022",
			endDate: "Present",
			description:
				"Partnering with clients to design and develop responsive full-stack applications and websites",
			achievements: JSON.stringify([
				"Drove average 30-50% increase in client sales funnels and revenue",
				"Resolved critical frontend performance and responsiveness issues",
				"Translated complex client requirements into simple, visually appealing UI/UX designs using Figma",
				"Saved clients significant resources while enhancing overall User Experience",
			]),
			order: 3,
		},
	];

	for (const exp of experiences) {
		await prisma.experience.upsert({
			where: { id: `exp-${exp.company.toLowerCase().replace(/\s+/g, "-")}` },
			update: exp,
			create: {
				...exp,
				id: `exp-${exp.company.toLowerCase().replace(/\s+/g, "-")}`,
			},
		});
	}
	console.log("Created experiences");

	// Create projects based on selected projects
	const projects = [
		{
			title: "NCS Digital Mail & File Tracking System",
			description:
				"Full-Stack Application designed to replace manual logging at Nigeria Customs Service",
			technologies: JSON.stringify([
				"Next.js",
				"TypeScript",
				"Prisma ORM",
				"SQL",
				"PostgreSQL",
			]),
			impact:
				"Increased file accountability and reduced file lookup time by 50x",
			featured: true,
			order: 1,
		},
		{
			title: "NCS B'Odogwu Tax Reporting System",
			description:
				"Frontend Application with critical reporting dashboard for tax collection revenue reports",
			technologies: JSON.stringify([
				"React",
				"Next.js",
				"TypeScript",
				"TailwindCSS",
				"RTK Query",
				"Tanstack Table",
				"RechartsJS",
			]),
			impact:
				"Generates verified tax collection revenue reports with optimal performance",
			featured: true,
			order: 2,
		},
		{
			title: "Ekele Audu & Associates Website",
			description:
				"Full-Stack client-facing website and Content Management System with CI/CD pipeline",
			technologies: JSON.stringify([
				"Next.js",
				"PostgreSQL",
				"TypeScript",
				"TailwindCSS",
				"Prisma ORM",
				"GitHub Actions",
				"DigitalOcean",
			]),
			impact: "Complete web presence with automated deployment pipeline",
			featured: true,
			order: 3,
		},
	];

	for (const project of projects) {
		await prisma.project.create({ data: project });
	}
	console.log("Created projects");

	// Create skills based on technical skills
	const skills = [
		// Languages
		{ name: "JavaScript", category: "Languages", icon: "javascript", order: 1 },
		{ name: "TypeScript", category: "Languages", icon: "typescript", order: 2 },
		{ name: "HTML", category: "Languages", icon: "html", order: 3 },
		{ name: "CSS", category: "Languages", icon: "css", order: 4 },
		{ name: "SASS", category: "Languages", icon: "sass", order: 5 },
		{ name: "GraphQL SDL", category: "Languages", icon: "graphql", order: 6 },

		// Frontend
		{ name: "React", category: "Frontend", icon: "react", order: 7 },
		{ name: "Next.js", category: "Frontend", icon: "nextjs", order: 8 },
		{ name: "SvelteKit", category: "Frontend", icon: "svelte", order: 9 },
		{ name: "Redux Toolkit", category: "Frontend", icon: "redux", order: 10 },
		{ name: "RTK Query", category: "Frontend", icon: "redux", order: 11 },
		{ name: "Framer Motion", category: "Frontend", icon: "framer", order: 12 },
		{
			name: "React Native (Expo)",
			category: "Frontend",
			icon: "react",
			order: 13,
		},

		// Styling
		{ name: "Tailwind CSS", category: "Styling", icon: "tailwind", order: 14 },
		{ name: "ShadCN", category: "Styling", icon: "shadcn", order: 15 },
		{
			name: "Styled Components",
			category: "Styling",
			icon: "styled-components",
			order: 16,
		},

		// Backend & Database
		{ name: "Node.js", category: "Backend", icon: "nodejs", order: 17 },
		{ name: "Express.js", category: "Backend", icon: "express", order: 18 },
		{ name: "SQL", category: "Database", icon: "sql", order: 19 },
		{ name: "MySQL", category: "Database", icon: "mysql", order: 20 },
		{ name: "PostgreSQL", category: "Database", icon: "postgresql", order: 21 },
		{ name: "Prisma ORM", category: "Database", icon: "prisma", order: 22 },
		{ name: "MongoDB", category: "Database", icon: "mongodb", order: 23 },
		{ name: "Firebase", category: "Database", icon: "firebase", order: 24 },
		{ name: "Apollo Server", category: "Backend", icon: "apollo", order: 25 },
		{ name: "Apollo Client", category: "Frontend", icon: "apollo", order: 26 },

		// Tools & DevOps
		{ name: "Git", category: "DevOps", icon: "git", order: 27 },
		{ name: "GitHub", category: "DevOps", icon: "github", order: 28 },
		{ name: "Docker", category: "DevOps", icon: "docker", order: 29 },
		{ name: "GitHub Actions", category: "DevOps", icon: "github", order: 30 },
		{ name: "Postman", category: "Tools", icon: "postman", order: 31 },
		{ name: "Stripe", category: "Tools", icon: "stripe", order: 32 },
		{
			name: "AI/LLM Tools (Gemini, OpenAI)",
			category: "Tools",
			icon: "ai",
			order: 33,
		},
	];

	for (const skill of skills) {
		await prisma.skill.upsert({
			where: { name: skill.name },
			update: skill,
			create: skill,
		});
	}
	console.log("Created skills");

	// Create products
	const products: Omit<product, "id" | "createdAt" | "updatedAt">[] = [
		{
			name: "Retail POS Dashboard",
			description: "Complete point-of-sale system for retail businesses",
			features: JSON.stringify([
				"Inventory management",
				"Sales tracking",
				"Customer management",
				"Real-time analytics",
				"Multi-store support",
			]),
			status: "IN_DEVELOPMENT",
			image: null,
			link: null,
			order: 1,
		},
	];

	for (const product of products) {
		await prisma.product.create({ data: product });
	}
	console.log("Created products");

	console.log("Database seeded successfully!");
}

main()
	.catch((e) => {
		console.error("Error seeding database:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
