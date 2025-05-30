"use client";

import Link from "next/link";
import eventIcon from "@icons/events.svg";
import dashBoardIcon from "@icons/DashboardIcon.svg";
import Icon from "@/app/components/icons/icon";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";

// Inspired and got helped to Developed from Ilir

export interface NavigationItemType {
	to: string;
	label: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	color?: string;
	liClassName?: string;
}

// Navigation items
export const navItems: NavigationItemType[] = [
	{
		to: "/",
		label: "Dashboard",
		icon: dashBoardIcon,
		color: "text-secondary-100",
		liClassName: "",
	},
	{
		to: "/events",
		label: "Events",
		icon: eventIcon,
		color: "text-secondary-100",
		liClassName: "",
	},
];

// A dedicated component for rendering each navigation link
const NavigationLink = ({
	item,
	onClick,
}: { item: NavigationItemType; onClick: () => void }) => {
	const { to, label, icon: ItemIconComponent, color: initialIconColor } = item;
	const pathname = usePathname();
	const isActive = pathname === to;

	// Base classes for the Link element
	const linkBaseClasses =
		"relative group flex items-center gap-2 p-2 rounded-md transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-100";

	// Classes for the active state (full background)
	const activeStateClasses = "text-primary-100 bg-gray-200";

	// Use the custom class defined in your CSS file
	const inactiveStateClasses = "nav-link-inactive-hover";

	return (
		<Link
			href={to}
			className={`
                ${linkBaseClasses}
                ${isActive ? activeStateClasses : inactiveStateClasses}
            `}
			onClick={onClick}
		>
			{/* Ensure content is above the pseudo-element background */}
			<span className="relative">
				<Icon
					iconComponent={ItemIconComponent}
					className={`text-[20px] transition-colors duration-150 ease-in-out ${
						isActive ? "text-primary-100" : initialIconColor || "text-inherit"
					}`}
				/>
			</span>
			<span className="relative">{label}</span>
		</Link>
	);
};

function Navigation() {
	return (
		<nav
			className="header flex flex-col flex-grow" // This allows <nav> to fill vertical space in its parent
			aria-label="Menu Navigation"
		>
			<div className="flex flex-col gap-2 flex-grow min-h-0">
				<ul>
					{navItems.map((item) => (
						<li key={item.to} className={item.liClassName}>
							<NavigationLink
								item={item}
								// Example onClick, customize as needed
								onClick={() => console.log(`Clicked ${item.label}`)}
							/>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
