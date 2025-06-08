"use client";
import { memo } from "react";
import EventList from "@components/events/EventList";
import HeaderTitle from "@/app/components/layout/header/HeaderTitle";
import EventCalender from "@/app/components/calendar/eventCalender";

/**
 * `EventsPage` component.
 *
 * This component serves as the main page for displaying events. It is structured
 * with a header section and a main content area. The main content area is
 * designed to be responsive, showing a list of events and an event calendar
 * side-by-side on larger screens (lg and up), and stacking them on smaller screens.
 *
 * The component is memoized using `React.memo` for performance optimization,
 * preventing re-renders if props do not change.
 *
 * @returns {JSX.Element} The rendered events page, including a header,
 * an event list, and an event calendar.
 *
 * @example
 * ```tsx
 * // Typically used as a page component in a routing setup
 * <Route path="/events" element={<EventsPage />} />
 * ```
 */
export default memo(function EventsPage() {
	return (
		<>
			{/* Header container */}
			<div className="content-container bg-gray-20">
				<div
					className="w-full xxs:nax-w-full sm:max-w-full 
                                        md:max-w-full lg:max-w-12/12"
				>
					<HeaderTitle />
				</div>
			</div>

			{/* Main content container for side-by-side layout on larger screens */}
			<div className="main-content-container bg-gray-20 flex flex-wrap lg:flex-nowrap gap-4">
				<div className="content-container w-full lg:w-12/12">
					<EventList
						apiEndpoint="/api/events"
						title="All Events"
						count={4}
						lgColClass="lg:grid-cols-3"
						className="rounded-t-2xl"
					/>
				</div>
				{/* EventCalender container: Adjust width e.g., lg:w-3/12 */}
				<div className="w-full lg:w-3/12">
					<h3 className="text-title-16 text-gray-100 font-semibold py-1375">
						Upcoming Event
					</h3>
					<EventCalender />
				</div>
			</div>
		</>
	);
});
