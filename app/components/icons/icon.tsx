import type { JSX } from "react";
import type { IconProps } from "./types";

/**
 * @typedef IconProps
 * @property {React.FC<React.SVGProps<SVGSVGElement>>} iconComponent - The SVG component to be rendered.
 * @property {number} [size=24] - The width and height of the icon.
 * @property {string} [className] - Optional CSS class name for styling the icon.
 * @property {string} [fill="currentColor"] - The fill color of the icon.
 * @property {React.SVGProps<SVGSVGElement>} [props] - Additional SVG props to pass to the SVG component.
 */

/**
 * A generic component for rendering SVG icons.
 * It takes an SVG component as a prop and applies common styling attributes like size, className, and fill.
 *
 * @param {IconProps} props - The props for the Icon component.
 * @returns {JSX.Element} The rendered SVG icon.
 *
 * @example
 * ```tsx
 * import { SomeIcon } from './path/to/some-icon';
 *
 * const MyComponent = () => {
 *   return <Icon iconComponent={SomeIcon} size={32} className="my-custom-icon" fill="blue" />;
 * };
 * ```
 */
const Icon: React.FC<IconProps> = ({
	iconComponent: SvgIconComponent,
	size = 24,
	className,
	fill = "currentColor",
	...props
}: IconProps): JSX.Element => {
	return (
		<SvgIconComponent
			width={size}
			height={size}
			className={className}
			fill={fill}
			{...props}
		/>
	);
};

export default Icon;
