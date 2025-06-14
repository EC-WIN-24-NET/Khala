import type { EventLocationData } from "@/app/api/types";
import type { EventLocationFetcherProps } from "@/app/components/cards/types";
import TextSkeleton from "@/app/components/skeletons/TextSkeleton";
import { swrFetcher } from "@/lib/api/swrFetcher";
import { memo } from "react";
import useSWR from "swr";

export default memo(function CardLocationEvent({
	eventLocationId,
}: EventLocationFetcherProps) {
	const shouldFetch =
		// Checking that we dont have null or invalid location Id
		eventLocationId &&
		eventLocationId !== "00000000-0000-0000-0000-000000000000" &&
		eventLocationId !== null;
	const {
		data: apiResponse,
		error,
		isLoading,
	} = useSWR<EventLocationData>(
		shouldFetch ? `/api/Nexuspoint/${eventLocationId}` : null,
		swrFetcher,
		{
			// Optional: prevent re-fetching on focus if location URLs are stable and cached by browser/NextImage
			revalidateOnFocus: false,
		},
	);

	// 1. Handle the Loading state
	if (isLoading && shouldFetch) {
		return <TextSkeleton />;
	}

	// 2. Handle the Error state
	// If we are getting an error, show location placeholder
	if (error || !apiResponse || !apiResponse.id || !shouldFetch) {
		return (
			<>
				<div className="w-full h-full">
					<span className="event-location"> Could not load location</span>
				</div>
			</>
		);
	}

	// 3. Handle the Success state
	// If we get here, we have data to display!

	return (
		<>
			<span className="event-location ">
				{apiResponse.streetName} , {apiResponse.city} , {apiResponse.state}
			</span>
		</>
	);
});
