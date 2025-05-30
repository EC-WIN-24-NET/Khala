import EventCalender from "@/app/components/calendar/eventCalender";
import DisplayEventCard from "@/app/components/cards/displayEventCard";
import HeaderTitle from "@/app/components/layout/header/HeaderTitle";
import starcraftImage from "@images/starcraft-event.jpg";

export default function DashBoard() {
	return (
		<>
			{/* Dynamic Content Start */}
			<div className="content-container bg-gray-20">
				<div
					className="w-full xxs:nax-w-full sm:max-w-full 
							md:max-w-full lg:max-w-8/12"
				>
					<HeaderTitle />
				</div>
			</div>

			<div className="main-content-container bg-gray-20">
				{/* Event Card, will later use an Loop map from RestAPI Service */}
				<div className="content-container xl-max-w-8/12 lg:max-w-8/12 xl:max-w-9/12 w-full">
					<p className="text-title-16 text-gray-100 font-semibold px-1500 pt-1500">
						All Events
					</p>
					<div className="flex w-full flex-col md:flex-row flex-wrap p-3">
						<DisplayEventCard
							title={"Starcraft Event"}
							location={"SkyDome Stadium, Toronto, ON"}
							date={"12/12/2022"}
							price={"$100"}
							image={starcraftImage}
							alt={"Starcraft Event"}
						/>
						<DisplayEventCard
							title={"Starcraft Event"}
							location={"SkyDome Stadium, Toronto, ON"}
							date={"12/12/2022"}
							price={"$100"}
							image={starcraftImage}
							alt={"Starcraft Event"}
						/>
						<DisplayEventCard
							title={"Starcraft Event"}
							location={"SkyDome Stadium, Toronto, ON"}
							date={"12/12/2022"}
							price={"$100"}
							image={starcraftImage}
							alt={"Starcraft Event"}
						/>
					</div>
				</div>
				<div
					className="w-full xxs:nax-w-full sm:max-w-full sm:items-center
                            md:max-w-full lg:max-w-4/12 xl:max-w-3/12"
				>
					<h3 className="text-title-16 text-gray-100 font-semibold  py-1375">
						Upcoming Event
					</h3>
					<EventCalender />
				</div>
			</div>
			{/* Dynamic Content End */}
		</>
	);
}
