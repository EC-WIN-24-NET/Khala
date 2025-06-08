import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Fonts
const geistSans = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Ventixe",
	description: "Event Management Platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning
				className={`${geistSans.variable}  antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
