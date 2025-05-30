/**
 * Props for the Icon component.
 *
 * @property iconComponent - A valid React component that renders an SVG element.
 *                           This component should accept SVG props.
 * @property size - Optional. The size of the icon, applied as the `width` and `height`
 *                  on the SVG element. Can be a string (e.g., "24px", "2em") or a number
 * @extends React.SVGProps<SVGSVGElement> - Inherits standard SVG attributes such as `fill`, `stroke`, `width`, and `height`.
 *                  or a number (interpreted as pixels).
 * @extends React.SVGProps<SVGSVGElement> - Inherits standard SVG attributes.
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
	iconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	size?: string | number;
}
