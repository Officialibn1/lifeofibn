"use client";

export function FloatingIcons() {
	const icons = [
		{
			name: "React",
			position: "top-20 left-[10%]",
			delay: "0s",
			animation: "animate-float",
		},
		{
			name: "Next.js",
			position: "top-40 right-[15%]",
			delay: "1s",
			animation: "animate-float-delayed",
		},
		{
			name: "TypeScript",
			position: "top-[60%] left-[5%]",
			delay: "2s",
			animation: "animate-float-slow",
		},
		{
			name: "Svelte",
			position: "top-[70%] right-[10%]",
			delay: "0.5s",
			animation: "animate-float",
		},
		{
			name: "Tailwind",
			position: "top-[30%] left-[8%]",
			delay: "1.5s",
			animation: "animate-float-delayed",
		},
		{
			name: "Node.js",
			position: "top-[50%] right-[8%]",
			delay: "2.5s",
			animation: "animate-float-slow",
		},
		{
			name: "SQL",
			position: "top-[15%] left-[25%]",
			delay: "1.2s",
			animation: "animate-float-delayed",
		},
		{
			name: "PostgreSQL",
			position: "top-[45%] left-[20%]",
			delay: "0.8s",
			animation: "animate-float",
		},
		{
			name: "MySQL",
			position: "top-[75%] left-[35%]",
			delay: "2.2s",
			animation: "animate-float-slow",
		},
		{
			name: "Python",
			position: "top-[35%] right-[25%]",
			delay: "1.8s",
			animation: "animate-float",
		},
		{
			name: "Git",
			position: "top-[65%] right-[30%]",
			delay: "0.3s",
			animation: "animate-float-delayed",
		},
	];

	return (
		<div className='fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30'>
			{icons.map((icon, index) => (
				<div
					key={index}
					className={`absolute ${icon.position} ${icon.animation}`}
					style={{ animationDelay: icon.delay }}>
					<div className='text-4xl md:text-5xl text-muted-foreground/40 font-mono'>
						{icon.name}
					</div>
				</div>
			))}
		</div>
	);
}
