import { ShimmerSkeleton } from "@/app/components/skeletons/ShimmerSkeleton";

function EventDisplayCardSkeleton() {
	return (
		<div className="p-0250 w-full items-center">
			<div className="bg-white p-4 rounded-2xl">
				{/* No more animation classes on the wrapper div */}
				<div className="space-y-4">
					<ShimmerSkeleton className="w-full h-48 rounded-t-md" />
					<div className="space-y-2">
						<ShimmerSkeleton className="h-6 w-3/4" />
						<ShimmerSkeleton className="h-4 w-1/2" />
					</div>
					<div className="flex items-center justify-between pt-2">
						<div className="flex items-center space-x-2">
							<ShimmerSkeleton className="w-4 h-4 rounded-full" />
							<ShimmerSkeleton className="h-4 w-24" />
						</div>
						<ShimmerSkeleton className="h-4 w-1/4" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default EventDisplayCardSkeleton;
