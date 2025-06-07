import type { StaticImageData } from "next/image";

export interface EventImageType {
	image: StaticImageData | string;
	alt: string;
	title: string;
	fill: boolean;
	className: string;
	sizes: string;
	width?: number;
	height?: number;
	priority?: boolean;
	onImageLoadedCallback?: () => void;
}
