import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import type { Metadata } from "next";
import Image from "next/image";
import { fetchBySlug, fetchPageBlocks, notion } from "@/lib/notion";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const { slug } = await params;
	const page = await fetchBySlug(slug);
	return {
		title: page?.properties.title.title[0].plain_text,
		openGraph: {
			title: page?.properties.title.title[0].plain_text,
			images: {
				url: page?.cover?.file?.url,
			},
		},
	};
}

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = await params;

	const page = await fetchBySlug(slug);
	console.log(page);

	if (!page) {
		return <div>Page not found</div>;
	}

	const content = await fetchPageBlocks(page.id);

	const renderer = new NotionRenderer({
		client: notion,
	});

	renderer.use(hljsPlugin({}));

	const html = await renderer.render(...content);

	// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
	return (
		<div className="flex flex-col gap-5">
			<Image
				src={page.cover?.file?.url}
				alt={page.properties.title.title[0].plain_text}
				width={1000}
				height={1000}
			/>
			<div dangerouslySetInnerHTML={{ __html: html }}></div>
		</div>
	);
}
