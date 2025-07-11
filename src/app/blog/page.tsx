import Link from "next/link";
import React from "react";
import { fetchPages } from "@/lib/notion";

export default async function page() {
	const pages = await fetchPages();

	return (
		<div>
			{pages.results.map((page) => (
				<div key={page.id} className="flex flex-col gap-2 text-2xl my-5">
					<Link
						key={page.id}
						href={`/blog/${page.properties.slug.rich_text[0].plain_text}`}
					>
						{page.properties.title.title[0].plain_text}
					</Link>
				</div>
			))}
		</div>
	);
}
