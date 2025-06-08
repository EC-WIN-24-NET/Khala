"use client";
import { memo } from "react";
import useSWR from "swr";
import { swrFetcher } from "@lib/api/swrFetcher";
import type { EventData } from "@api/types";
import DisplayEventCard from "@components/cards/displayEventCard";
import EventDisplayCardSkeleton from "@components/skeletons/EventDisplayCard";
import ErrorHeader from "@/app/components/error/ErrorHeader";

// Props for the page loading skeleton
interface PageLoadingSkeletonProps {
	count?: number;
}

// Component for page loading skeleton
const PageLoadingSkeleton = ({ count = 4 }: PageLoadingSkeletonProps) => {
	const skeletonPlaceholders = Array.from({ length: count }, (_, i) => ({
		id: `skel-item-${i + 1}`,
	}));

	return (
		<div className="main-content-container bg-gray-20">
			<div className="content-container xl-max-w-12/12 lg:max-w-12/12 xl:max-w-12/12 w-full">
				<p className="text-title-16 text-gray-100 font-semibold px-1500 pt-1500">
					Events
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{skeletonPlaceholders.map((placeholder) => (
						<div key={placeholder.id} className="p-0250 w-full items-center">
							<EventDisplayCardSkeleton />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

interface EventListProps {
	apiEndpoint: string;
	title?: string;
	count?: number;
	lgColClass?: string;
	className?: string;
}

const EventList = memo(function EventList({
	apiEndpoint,
	title = "Events",
	count = 4,
	lgColClass = "lg:grid-cols-4",
	className,
}: EventListProps) {
	const {
		data: events,
		error,
		isLoading,
	} = useSWR<EventData[]>(apiEndpoint, swrFetcher);

	// 1. Handle the Loading state
	if (isLoading) {
		// Pass the lgColClass to PageLoadingSkeleton if it also needs to be dynamic
		// For now, assuming PageLoadingSkeleton's lg:grid-cols-4 is acceptable or will be updated separately
		return <PageLoadingSkeleton count={count} />;
	}

	// 2. Handle the Error state
	if (error) {
		return (
			<ErrorHeader
				title="Error"
				message={`Error fetching data from ${apiEndpoint}`}
			/>
		);
	}

	// 3. Handle the No Data state
	if (!events || events.length === 0) {
		return <ErrorHeader title={title} message="No events found" />;
	}

	// 4. Handle the Success state
	const displayedEvents = events.slice(0, count);

	return (
		<div className="main-content-container bg-gray-20 px-6">
			<div className="content-container xl-max-w-12/12 lg:max-w-12/12 xl:max-w-12/12 w-full">
				<p className="text-title-16 text-gray-100 font-semibold px-1500 pt-1500">
					{title}
				</p>
				<div className={`grid grid-cols-1 md:grid-cols-2 ${lgColClass} gap-4 `}>
					{displayedEvents.map((event: EventData) => {
						let formattedDate = "Date not available";
						if (event.dateTime) {
							const dateObj = new Date(event.dateTime);
							if (!Number.isNaN(dateObj.getTime())) {
								formattedDate = dateObj.toLocaleDateString(undefined, {
									year: "numeric",
									month: "long",
									day: "numeric",
								});
							} else {
								console.warn(
									"Encountered an invalid dateTime string:",
									event.dateTime,
								);
								formattedDate = "Invalid Date";
							}
						}

						const displayProps = {
							eventId: event.id,
							title: event.title,
							date: formattedDate,
							price: event.price,
							alt: event.title,
							imageId: event.imageId,
							locationId: event.location,
							className: className,
						};
						return <DisplayEventCard key={event.id} {...displayProps} />;
					})}
				</div>
			</div>
		</div>
	);
});

export default EventList;
