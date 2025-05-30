import type { StaticImageData } from "next/image";

export interface EventImageType {
	image: StaticImageData;
	alt: string;
	title: string;
	fill: boolean;
	className: string;
	sizes: string;
}
