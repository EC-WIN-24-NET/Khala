"use client";
import { memo } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@chadComponents/ui/card";
import type { DisplayEventCardType } from "./types";
import Image from "next/image";
import CardImageEvent from "@/app/components/cards/event/CardImageEvent";
import CardLocationEvent from "@/app/components/cards/event/CardLocationEvent";

// Wrap the component function with memo
// If you see that you are making double API Cals it's becouse you are in
// development mode with React Strict Mode ON.
const DisplayEventCard = memo(function DisplayEventCard({
	// Add function name for displayName
	title,
	date,
	price,
	alt,
	imageId,
	locationId,
}: DisplayEventCardType) {
	return (
		<>
			<div className="p-0250 w-full">
				{/* Added w-full for grid consistency */}
				<Card className="py-0 gap-0750 h-full flex flex-col rounded-t-2xl">
					{/* Image API Component */}
					<CardImageEvent
						imageId={imageId}
						altText={alt}
						titleText={""}
						priority={true}
					/>

					<CardHeader>
						<CardTitle className="event-title">{title}</CardTitle>
						<CardDescription className="event-location">
							<CardLocationEvent eventLocationId={locationId} />
						</CardDescription>
					</CardHeader>
					<CardContent className="flex items-center justify-between pt-0 pb-4 mt-auto">
						<div className="flex items-center">
							<Image
								src="/icons/CalendarDots.svg"
								alt="Calender Icon"
								width={16}
								height={16}
								className="text-gray-50"
							/>
							<p className="event-date ml-04375">{date}</p>
						</div>
						{/* Ensure price is formatted as needed, e.g., currency */}
						<div className="event-price">
							{typeof price === "number"
								? `$${(price as unknown as number).toFixed(2)}`
								: price}
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
});

DisplayEventCard.displayName = "DisplayEventCard";

export default DisplayEventCard;
