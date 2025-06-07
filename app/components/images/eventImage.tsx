import Image from "next/image";
import type { EventImageType } from "./types";

function EventImage({
	image,
	alt,
	title,
	fill,
	className,
	sizes,
	width,
	height,
	priority = true,
}: EventImageType) {
	if (fill) {
		return (
			<Image
				src={image}
				alt={alt}
				title={title}
				fill={fill}
				className={className}
				sizes={sizes}
				priority={priority}
			/>
		);
	}

	return (
		<Image
			src={image}
			priority={priority}
			alt={alt}
			title={title}
			width={width}
			height={height}
			className={className}
			sizes={sizes}
		/>
	);
}

export default EventImage;
