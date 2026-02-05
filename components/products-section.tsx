"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
	id: number;
	name: string;
	description: string;
	features: string;
	status: string;
	image: string | null;
	link: string | null;
	order: number;
}

export function ProductsSection() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/products")
			.then((res) => res.json())
			.then((data) => {
				setProducts(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("[v0] Failed to load products:", error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<section
				id='products'
				className='relative py-24 px-4 bg-muted/30'>
				<div className='container mx-auto max-w-6xl'>
					<div className='space-y-4 mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-balance'>
							Products & Solutions
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl'>
							Enterprise-ready software solutions designed for modern
							businesses. Currently developing innovative products for retail
							and business management.
						</p>
					</div>
					<Card className='p-8 text-center'>
						<p className='text-muted-foreground'>Loading products...</p>
					</Card>
				</div>
			</section>
		);
	}

	if (products.length === 0) {
		return (
			<section
				id='products'
				className='relative py-24 px-4 bg-muted/30'>
				<div className='container mx-auto max-w-6xl'>
					<div className='space-y-4 mb-16'>
						<h2 className='text-4xl md:text-5xl font-bold text-balance'>
							Products & Solutions
						</h2>
						<p className='text-lg lg:text-xl text-muted-foreground max-w-2xl'>
							Enterprise-ready software solutions designed for modern
							businesses. Currently developing innovative products for retail
							and business management.
						</p>
					</div>
					<Card className='p-8 text-center'>
						<p className='text-muted-foreground'>
							No products available. Please run database setup.
						</p>
					</Card>
				</div>
			</section>
		);
	}

	return (
		<section
			id='products'
			className='relative py-24 px-4 bg-muted/30'>
			<div className='container mx-auto max-w-6xl'>
				<div className='space-y-4 mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-balance'>
						Products & Solutions
					</h2>
					<p className='text-lg text-muted-foreground max-w-2xl'>
						Enterprise-ready software solutions designed for modern businesses.
						Currently developing innovative products for retail and business
						management.
					</p>
				</div>
				<div className='space-y-8'>
					{products.map((product) => {
						const features = JSON.parse(product.features) as string[];
						return (
							<Card
								key={product.id}
								className='p-8 hover:shadow-xl transition-shadow'>
								<div className='grid lg:grid-cols-2 gap-8'>
									<div className='space-y-6'>
										<div>
											<div className='flex items-center gap-3 mb-4'>
												<h3 className='text-3xl font-bold'>{product.name}</h3>
												<Badge>{product.status}</Badge>
											</div>
											<p className='text-muted-foreground leading-relaxed'>
												{product.description}
											</p>
										</div>
										<div>
											<h4 className='font-semibold mb-3'>Key Features:</h4>
											<ul className='space-y-2'>
												{features.map((feature, index) => (
													<li
														key={index}
														className='flex gap-2 text-sm'>
														<span className='text-primary mt-1'>✓</span>
														<span>{feature}</span>
													</li>
												))}
											</ul>
										</div>
										{product.link && (
											<Button className='gap-2'>
												Learn More <ArrowRight className='w-4 h-4' />
											</Button>
										)}
									</div>
									<div className='relative h-full min-h-[300px] bg-muted rounded-lg overflow-hidden'>
										{product.image ? (
											<Image
												src={product.image || "/placeholder.svg"}
												alt={product.name}
												fill
												className='object-cover'
											/>
										) : (
											<div className='flex items-center justify-center h-full'>
												<p className='text-muted-foreground'>Product Preview</p>
											</div>
										)}
									</div>
								</div>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
