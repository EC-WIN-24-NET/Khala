import EventImage from "@/app/components/images/eventImage";
import CalenderIcon from "@icons/CalendarDots.svg";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import Icon from "@/app/components/icons/icon";
import type { DisplayEventCardType } from "./types";

function DisplayEventCard({
	title,
	location,
	date,
	price,
	image,
	alt,
}: DisplayEventCardType) {
	return (
		<>
			<div className="p-0250 md:max-w-1/3">
				<Card className="py-0 gap-0750 h-full flex flex-col">
					{" "}
					<EventImage
						image={image}
						alt={alt}
						title={title}
						fill={false}
						className={""}
						sizes={""}
					/>
					<CardHeader>
						<CardTitle className="event-title">{title}</CardTitle>
						<CardDescription className="event-location">
							<p className="event-location"> {location}</p>
						</CardDescription>
					</CardHeader>
					{/* Add mt-auto to push CardContent to the bottom if cards have varying content height */}
					<CardContent className="flex items-center justify-between pt-0 pb-4 mt-auto">
						<div className="flex items-center">
							<Icon
								iconComponent={CalenderIcon}
								size={16}
								className="text-gray-50"
							/>
							<p className="event-date ml-04375">{date}</p>
						</div>
						<div className="event-price">{price}</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

export default DisplayEventCard;
