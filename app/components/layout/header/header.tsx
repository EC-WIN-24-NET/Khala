"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import DashBoard from "@/app/components/dashBoard/dashBoard";

function Header() {
	const pathname = usePathname();
	/// Was thinking to do the same solution as we did with header Hero section to be rended
	/// based on routing, we are doing the same with Header scss to able to style from Contact section
	/// url based header modification
	const isHomePage = pathname === "/" || pathname === "/home";
	const isContactPage = pathname === "/contact";

	return (
		<header
			aria-label="Navigation & Logo"
			// Coalescent if statement
			className={`header-wrapper ${isContactPage ? "contact-header" : ""}`}
		>
			<nav className="header" aria-label="Menu Navigation">
				<Link href="/">Image here</Link>
			</nav>
			{isHomePage && <DashBoard />}
		</header>
	);
}

export default Header;
