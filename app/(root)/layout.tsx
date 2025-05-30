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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="skeleton-container">
				<div className="lg:w-2/12 xl:w-2/12 rounded-2xl bg-cool-gray-10 flex flex-col ">
					<Logo />
					<Navigation />
				</div>

				<div className="flex flex-1 flex-col px-3 ">
					{/* Dynamic Content Start */}
					<MainContent>{children}</MainContent>
					{/* Dynamic Content End */}

					<div className="mt-auto content-container bg-gray-20 px-1625 py-1375">
						<p className="text-title-12 text-gray-70 font-semibold">
							Copyright © 2025 The Greate Zealot
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
