import Image from "next/image";
import type { EventImageType } from "./types";

function EventImage({
	image,
	alt,
	title,
	fill,
	className,
	sizes,
}: EventImageType) {
	return (
		<div className="event-image-container">
			<Image
				src={image}
				alt={alt}
				title={title}
				fill={fill}
				className={className}
				sizes={sizes}
			/>
		</div>
	);
}

export default EventImage;
