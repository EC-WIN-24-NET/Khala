"use client";

import { Calendar } from "@/components/ui/calendar";
import React from "react";

function EventCalender() {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return (
		<Calendar
			mode="single"
			selected={date}
			onSelect={setDate}
			className="rounded-md text-title-14 text-gray-90 bg-white rounded-2xl"
		/>
	);
}

export default EventCalender;
