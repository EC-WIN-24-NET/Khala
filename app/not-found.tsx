"use client";

import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-5">
			<div className="w-full max-w-md space-y-6 rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
						404
					</h1>
					<h2 className="mt-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
						Page Not Found
					</h2>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						The page you&apos;re looking for doesn&apos;t exist or has been
						moved.
					</p>
				</div>

				<Link
					href="/"
					className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
				>
					Return Home
				</Link>
			</div>
		</main>
	);
}
