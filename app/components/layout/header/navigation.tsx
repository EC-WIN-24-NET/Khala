"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react"; // Import useState

// Inspired and got helped to Developed from Ilir

export interface NavigationItemType {
	to: string;
	label: string;
	icon: string;
	activeHoverIcon: string;
	color?: string;
	liClassName?: string;
}

// Navigation items
/**
 * An array of navigation items used to populate the main navigation menu.
 * Each item in the array is an object of type `NavigationItemType`,
 * defining the properties for a single navigation link.
 *
 * @remarks
 * This array typically includes:
 * - `to`: The URL path for the navigation link.
 * - `label`: The text displayed for the navigation link.
 * - `icon`: The path to the default icon for the link.
 * - `activeHoverIcon`: The path to the icon displayed when the link is active or hovered.
 * - `color`: (Optional) A CSS class for the text color of the link.
 * - `liClassName`: (Optional) Additional CSS classes for the list item (`<li>`) element.
 */
export const navItems: NavigationItemType[] = [
	{
		to: "/",
		label: "Dashboard",
		icon: "/icons/DashboardIcon.svg",
		activeHoverIcon: "/icons/DashboardIconActive.svg",
		color: "text-secondary-100",
		liClassName: "",
	},
	{
		to: "/events",
		label: "Events",
		icon: "/icons/Events.svg",
		activeHoverIcon: "/icons/EventsActive.svg",
		liClassName: "",
	},
];

/**
 * Renders a navigation link with an icon and label.
 *
 * The link's appearance changes based on whether it's the currently active route
 * or if the mouse is hovering over it. It displays an `activeHoverIcon` when
 * active or hovered (if provided), otherwise it shows a `defaultIcon`.
 *
 * @param {object} props - The component's props.
 * @param {NavigationItemType} props.item - An object containing the navigation item's details:
 *   - `to`: The path the link navigates to.
 *   - `label`: The text label for the link.
 *   - `icon`: The path to the default icon image.
 *   - `activeHoverIcon`: (Optional) The path to the icon image displayed on hover or when active.
 * @param {() => void} props.onClick - A callback function to be executed when the link is clicked.
 * @returns {JSX.Element} A Next.js `Link` component styled as a navigation item.
 */
const NavigationLink = ({
	item,
	onClick,
}: {
	item: NavigationItemType;
	onClick: () => void;
}) => {
	const { to, label, icon: defaultIcon, activeHoverIcon } = item;
	const pathname = usePathname();
	const isActive = pathname === to;
	const [isHovered, setIsHovered] = useState(false);

	// Determine which icon to display
	const currentIcon =
		(isActive || isHovered) && activeHoverIcon ? activeHoverIcon : defaultIcon;

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
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Ensure content is above the pseudo-element background */}
			<span className="relative">
				<Image
					src={currentIcon}
					alt={`${label} Icon`}
					width={24}
					height={24}
					className=""
				/>
			</span>
			<span
				className={`relative ${
					isActive ? "" : "group-hover:text-primary-100"
				} transition-colors duration-150 ease-in-out`}
			>
				{label}
			</span>
		</Link>
	);
};

/**
 * Renders the main navigation menu for the header.
 *
 * This component displays a list of navigation links based on the `navItems` array.
 * Each link is represented by the `NavigationLink` component.
 * It is designed to be flexible and grow within its container.
 *
 * @returns {JSX.Element} The navigation menu component.
 *
 * @example
 * ```tsx
 * // Assuming navItems and NavigationLink are defined elsewhere
 * <Navigation />
 * ```
 *
 * @remarks
 * The `navItems` array (not shown in this snippet) should contain objects with at least `to`, `label`, and optionally `liClassName` properties.
 * The `NavigationLink` component (not shown in this snippet) is responsible for rendering individual navigation items and handling their specific behavior.
 * The `onClick` handler in this example is for demonstration purposes and should be customized as needed.
 */
function Navigation() {
	return (
		<nav
			className="header flex flex-col flex-grow"
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
