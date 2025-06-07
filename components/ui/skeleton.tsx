import { cn } from "@/lib/utils";

export type SkeletonProps = React.ComponentProps<"div"> & {
	className?: string;
};

export function Skeleton({ className, ...props }: SkeletonProps) {
	return (
		<div
			data-slot="skeleton"
			className={cn("bg-gray-300 animate-pulse ", className)}
			{...props}
		/>
	);
}
