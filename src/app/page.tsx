"use client";
import { animate } from "motion/react";
import { useEffect, useRef } from "react";

export default function Home() {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (!videoRef.current) return;

		// Create a custom timeline sequence using Motion's animate function
		const runTimeline = async () => {
			const element = videoRef.current;
			if (!element) return;

			// Phase 1: Initial state - video is blurred, small, and transparent
			await animate(
				element,
				{
					filter: "blur(20px)",
					opacity: 0,
					scale: 0.1,
					borderRadius: "20%",
					aspectRatio: 1,
					width: 0,
					height: 0,
					objectFit: "cover",
					objectPosition: "center",
				},
				{ duration: 0 },
			);

			await animate(
				element,
				{
					filter: "blur(0px)",
					opacity: 1,
					scale: 0.5,
					borderRadius: "100%",
					aspectRatio: 1,
					width: 800,
					height: 800,
					objectFit: "cover",
					objectPosition: "center",
				},
				{
					duration: 0.4,
					damping: 20,
					stiffness: 100,
					type: "spring",
				},
			);

			await animate(
				element,
				{
					filter: "blur(0px)",
					opacity: 1,
					scale: 1,
					borderRadius: "0%",
					aspectRatio: 16 / 9,
					width: "100%",
					height: "100%",
					objectFit: "cover",
					objectPosition: "center",
					overflow: "hidden",
				},
				{
					duration: 0.3,
					damping: 20,
					stiffness: 100,
					// delay: 0.3,
					type: "spring",
				},
			);
		};

		runTimeline();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-black overflow-hidden">
			<video
				ref={videoRef}
				preload="auto"
				playsInline
				src="/hero.mp4"
				autoPlay
				muted
				loop
				className="w-full h-full object-cover"
			/>
		</div>
	);
}
