import type { EventImageData } from "@/app/api/types";
import type { EventImageFetcherProps } from "@/app/components/cards/types";
import EventImage from "@/app/components/images/eventImage";
import ImageSkeleton from "@/app/components/skeletons/ImageSkeleton";
import { swrFetcher } from "@/lib/api/swrFetcher";
import { memo } from "react";
import useSWR from "swr";

export default memo(function CardImageEvent({
	imageId,
	altText,
	sizes,
	className,
}: EventImageFetcherProps) {
	const shouldFetch =
		// Checking that we dont have null or invalid image Id
		imageId &&
		imageId !== "00000000-0000-0000-0000-000000000000" &&
		imageId !== null;
	const {
		data: apiResponse,
		error,
		isLoading,
	} = useSWR<EventImageData>(
		shouldFetch ? `/api/Image/${imageId}` : null,
		swrFetcher,
		{
			// Optional: prevent re-fetching on focus if image URLs are stable and cached by browser/NextImage
			revalidateOnFocus: false,
		},
	);

	// 1. Handle the Loading state
	if (isLoading && shouldFetch) {
		return (
			<div className="relative h-[194px]  overflow-hidden">
				<ImageSkeleton />
			</div>
		);
	}

	// 2. Handle the Error state
	// If we are getting an error, show Image placeholder
	if (error || !apiResponse || !apiResponse.path || !shouldFetch) {
		return (
			<>
				<div className="relative h-[194px]  overflow-hidden">
					<EventImage
						image={"/images/Image.svg"}
						alt={`Placeholder for ${altText}`}
						title={"Image Placeholder"}
						fill={true}
						className={`${className} object-cover w-full h-full `}
						sizes={
							sizes ??
							"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						}
					/>
				</div>
			</>
		);
	}

	// 3. Handle the Success state
	// If we get here, we have data to display!

	return (
		<>
			<div className="relative h-[194px]  overflow-hidden">
				<EventImage
					image={apiResponse.path}
					alt={apiResponse.altText}
					title={apiResponse.name}
					fill={true}
					className={`${className} object-cover w-full h-full`}
					sizes={
						sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					}
					priority={true}
				/>
			</div>
		</>
	);
});
