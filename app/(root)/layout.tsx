import type { Metadata } from "next";
import "@/app/globals.css";
import Navigation from "@/app/components/layout/header/navigation";
import Logo from "@/app/components/layout/header/logo";
import MainContent from "@/app/components/layout/mainContent";

/**
 * Metadata configuration for the application
 * @type {Metadata}
 * @property {string} title - The title of the application shown in browser tabs and search results
 * @property {string} description - A brief description of the application for SEO purposes
 */
export const metadata: Metadata = {
	title: "Khala",
	description: "All your Events in One App",
};

/** Inspired and redid the core of how we load in pages and also our
 * Providers, took quite some learning from the video below
 * https://www.youtube.com/watch?v=Zq5fmkH0T78
 * Revalidation time in seconds for static page regeneration
 * @constant {number}
 */
export const revalidate = 3600;

// https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes#defaultjs
export default function RootLayout({
	children,
	modal, // Crucial: This prop receives the content from the @modal slot
}: {
	children: React.ReactNode;
	modal: React.ReactNode; // Crucial: Type for the modal prop
}) {
	return (
		<html lang="en">
			{/* We are supressing Hydration warning becouse I have Clickup Extension that interfers with Body tag */}
			<body suppressContentEditableWarning>
				<div className="skeleton-container">
					<div className="lg:w-2/12 xl:w-2/12 rounded-2xl bg-cool-gray-10 flex flex-col ">
						<Logo />
						<Navigation />
					</div>

					<div className="flex flex-1 flex-col px-3 ">
						{/* Dynamic Content Start */}
						<MainContent>{children}</MainContent>
						{modal}
						{/* This is where the intercepted route's modal will render */}
						{/* Dynamic Content End */}
						<div className="mt-auto content-container bg-gray-20 px-1625 py-1375">
							<p className="text-title-12 text-gray-70 font-semibold">
								Copyright © 2025 The Greate Zealot
							</p>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
