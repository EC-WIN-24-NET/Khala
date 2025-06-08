"use client";
import { memo } from "react";
import EventList from "@components/events/EventList";
import HeaderTitle from "@/app/components/layout/header/HeaderTitle";

// export default memo(function EventsList() { // Old component name
export default memo(function EventsPage() {
	// Renamed for clarity
	return (
		<>
			<div className="content-container bg-gray-20">
				<div
					className="w-full xxs:nax-w-full sm:max-w-full 
										md:max-w-full lg:max-w-12/12"
				>
					<HeaderTitle />
				</div>
			</div>
			<EventList
				apiEndpoint="/api/events"
				title="All Events"
				count={4}
				className="rounded-t-2xl"
			/>
		</>
	);
});
