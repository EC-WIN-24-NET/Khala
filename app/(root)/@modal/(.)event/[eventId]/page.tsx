"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState, use, memo } from "react";
import useSWR from "swr";
import { swrFetcher } from "@lib/api/swrFetcher"; // Assuming you have this
import type { EventData } from "@api/types"; // Assuming a suitable type
import EventDisplayCardSkeleton from "@components/skeletons/EventDisplayCard";
import CardImageEvent from "@/app/components/cards/event/CardImageEvent";
import CardLocationEvent from "@/app/components/cards/event/CardLocationEvent";

// Skeleton component for the modal content
const EventModalSkeleton = () => (
	<>
		<DialogHeader>
			<DialogTitle>Getting event details...</DialogTitle>
			<DialogDescription>
				Please wait while we are getting the event details.
			</DialogDescription>
		</DialogHeader>
		<div className="p-0250 w-full items-center">
			<EventDisplayCardSkeleton />
		</div>
	</>
);

const EventModal = memo(function EventModal({
	params: paramsPromise,
}: { params: Promise<{ eventId: string }> }) {
	const params = use(paramsPromise);
	const eventId = params.eventId;
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(true);

	// Construct the API endpoint for fetching a single event
	const apiEndpoint = eventId ? `/api/events/${eventId}` : null; // Adjust if your API route is different

	const {
		data: eventData,
		error,
		isLoading,
	} = useSWR<EventData>(apiEndpoint, swrFetcher, {
		// Optional: SWR configuration like revalidation settings
		// revalidateOnFocus: false,
	});

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setIsOpen(false);
			setTimeout(() => {
				router.back();
			}, 300); // Delay for animation
		}
	};

	// Early return if eventId is not available (should ideally be caught by routing)
	if (!eventId) {
		// This case should ideally not be reached if the route parameter is always present
		return (
			<Dialog open={isOpen} onOpenChange={handleOpenChange}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Error</DialogTitle>
					</DialogHeader>
					<DialogDescription>Event ID is missing.</DialogDescription>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className="max-w-sm sm:max-w-[425px] md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
				{isLoading && <EventModalSkeleton />}
				{error &&
					!isLoading &&
					!eventData &&
					typeof eventData === "undefined" && (
						<>
							<DialogHeader>
								<DialogTitle>Error</DialogTitle>
							</DialogHeader>
							<DialogDescription>
								Failed to load event details. Please try again later.
							</DialogDescription>
						</>
					)}
				{!isLoading && !error && !eventData && (
					<>
						<DialogHeader>
							<DialogTitle>Event Not Found</DialogTitle>
						</DialogHeader>
						<DialogDescription>
							The requested event could not be found.
						</DialogDescription>
					</>
				)}
				{!isLoading && !error && eventData && (
					<>
						<DialogHeader>
							<div className="pt-1000">
								<CardImageEvent
									imageId={eventData.imageId}
									altText={eventData.title}
									titleText={""}
									priority={true}
								/>
							</div>
							<div className="flex content-between justify-between pt-0500">
								<DialogTitle className="">
									{eventData.title || "Event Details"}
								</DialogTitle>
								{eventData.dateTime && (
									<DialogDescription>
										{new Date(eventData.dateTime).toLocaleDateString(
											undefined,
											{
												year: "numeric",
												month: "long",
												day: "numeric",
											},
										)}
									</DialogDescription>
								)}
							</div>
						</DialogHeader>
						<DialogDescription className="event-location">
							{/* Location API Component */}
							<CardLocationEvent eventLocationId={eventData.location} />
						</DialogDescription>
						<DialogDescription className="event-description whitespace-pre-line">
							{/* Use a more detailed description if available, e.g., eventData.detailedDescription */}
							{eventData.description || "No description available."}
						</DialogDescription>
						<div className="py-4">
							{/* Here you can add more components that might have their own API calls */}
							{/* For example, a component to show attendees, or related events */}
							{/* <EventAttendees eventId={eventData.id} /> */}
							{/* <RelatedEvents categoryId={eventData.categoryId} /> */}
							<p>
								Price:{" "}
								{typeof eventData.price === "number"
									? `$${eventData.price.toFixed(2)}`
									: eventData.price || "Not specified"}
							</p>
							{/* Render more event details here based on eventData */}
						</div>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
});

EventModal.displayName = "EventModal";

export default EventModal;
