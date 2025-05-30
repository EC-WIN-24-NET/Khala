"use client";

import { navItems } from "@/app/components/layout/header/navigation";
import { usePathname } from "next/navigation";

/**
 * Renders the title for the current page based on the active navigation item.
 * It uses the current pathname to find the corresponding navigation item from
 * a predefined list (`navItems`) and displays its label.
 *
 * @returns A paragraph element containing the label of the current navigation item,
 * or an empty paragraph if no matching navigation item is found.
 */
export default function HeaderTitle() {
	const pathName = usePathname();
	const currentNavItem = navItems.find((item) => item.to === pathName);

	return (
		<>
			<div className="px-1625 py-1375">
				<h4>{currentNavItem?.label}</h4>

				<p className="text-title-12 text-gray-70">Welcome to {currentNavItem?.label}</p>
			</div>
		</>
	);
}
