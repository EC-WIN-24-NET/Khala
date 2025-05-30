import type { StaticImageData } from "next/image";

export interface DisplayEventCardType {
	title: string;
	location: string;
	date: string;
	price: string;
	image: StaticImageData;
	alt: string;
}
