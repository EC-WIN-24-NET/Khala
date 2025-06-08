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
import type { EventData, EventPackage } from "@api/types"; // Ensure EventPackage is imported
import EventDisplayCardSkeleton from "@components/skeletons/EventDisplayCard";
import CardImageEvent from "@/app/components/cards/event/CardImageEvent";
import CardLocationEvent from "@/app/components/cards/event/CardLocationEvent";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import PackageButton from "@/app/components/button/PackageButton";
import EmailForm from "@/app/components/form/EmailForm";

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
	const [showEmailForm, setShowEmailForm] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState<EventPackage | null>(
		null,
	); // State for selected package

	// Construct the API endpoint for fetching a single event
	const apiEndpoint = eventId ? `/api/events/${eventId}` : null; // Adjust if your API route is different

	const {
		data: responseData,
		error,
		isLoading,
	} = useSWR<EventData>(apiEndpoint, swrFetcher, {
		// Optional: SWR configuration like revalidation settings
		// revalidateOnFocus: false,
	});

	// Got some helped from Google Gemini to solve the Email form and Button
	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setIsOpen(false);
			setShowEmailForm(false);
			setTimeout(() => {
				router.back();
			}, 300);
		}
	};

	// Function to handle showing the email form
	const handleShowEmailForm = (pkg: EventPackage) => {
		// Accept the package
		setSelectedPackage(pkg); // Store the selected package
		setShowEmailForm(true);
	};

	// Function to handle going back from the email form
	const handleGoBackFromEmailForm = () => {
		setShowEmailForm(false);
		setSelectedPackage(null); // Clear selected package
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
			<DialogContent className="max-w-sm sm:max-w-[425px] md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl max-h-[calc(100%-2rem)]">
				{isLoading && <EventModalSkeleton />}
				{error &&
					!isLoading &&
					!responseData &&
					typeof responseData === "undefined" && (
						<>
							<DialogHeader>
								<DialogTitle>Error</DialogTitle>
							</DialogHeader>
							<DialogDescription>
								Failed to load event details. Please try again later.
							</DialogDescription>
						</>
					)}
				{!isLoading && !error && !responseData && (
					<>
						<DialogHeader>
							<DialogTitle>Event Not Found</DialogTitle>
						</DialogHeader>
						<DialogDescription>
							The requested event could not be found.
						</DialogDescription>
					</>
				)}
				{!isLoading && !error && responseData && (
					<div className="flex flex-col h-full gap-4 ">
						<DialogHeader>
							<div className="pt-1000">
								<CardImageEvent
									imageId={responseData.imageId}
									altText={responseData.title}
									titleText={""}
									priority={true}
								/>
							</div>
							<div className="flex content-between justify-between pt-0500">
								<DialogTitle className="">
									{responseData.title || "Event Details"}
								</DialogTitle>
								{responseData.dateTime && (
									<DialogDescription>
										{new Date(responseData.dateTime).toLocaleDateString(
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
						<DialogDescription className="event-location hover:underline cursor-pointer shrink-0">
							{/* Location API Component */}
							<Link
								href={`https://www.google.com/maps/search/?api=1&query=${responseData.location}`}
								target="_blank"
								rel="noreferrer"
							>
								<CardLocationEvent eventLocationId={responseData.location} />
							</Link>
						</DialogDescription>
						<ScrollArea className="rounded-md border p-4 h-100vh xl:max-h-23750 lg:max-h-15000 md:max-h-9375 sm:max-h-3750 xxs:max-h-3750  ">
							<DialogDescription className="event-description whitespace-pre-line pb-1000 ">
								{/* Use a more detailed description if available, e.g., eventData.detailedDescription */}
								{responseData.description || "No description available."}
							</DialogDescription>
							{showEmailForm && selectedPackage ? ( // Ensure selectedPackage is available
								<EmailForm
									onGoBack={handleGoBackFromEmailForm}
									selectedPackageTitle={selectedPackage.title}
									eventId={eventId}
									eventName={responseData.title}
									eventPrice={responseData.price}
								/>
							) : (
								responseData.packages?.map((packageData) => (
									<PackageButton
										key={packageData.id}
										eventPackage={packageData}
										onShowEmailForm={() => handleShowEmailForm(packageData)}
									/>
								))
							)}
						</ScrollArea>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
});

EventModal.displayName = "EventModal";

export default EventModal;
