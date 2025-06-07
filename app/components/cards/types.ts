export interface DisplayEventCardType {
	title: string;
	date: string;
	price: number | string;
	alt: string;
	imageId: string | null;
	locationId: string | null;
}

export interface EventImageFetcherProps {
	imageId: string | null;
	altText: string;
	titleText: string;
	className?: string;
	sizes?: string;
	fill?: boolean;
	width?: number;
	height?: number;
	priority: true;
}

export interface EventLocationFetcherProps {
	eventLocationId: string | null;
}
