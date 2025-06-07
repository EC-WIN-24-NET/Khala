// @/components/ui/ShimmerSkeleton.tsx
import { motion, type Variants } from "framer-motion";
import { Skeleton, type SkeletonProps } from "@chadComponents/ui/skeleton";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// Define the animation variants for the shimmer effect
const shimmerVariants: Variants = {
	initial: {
		x: "-100%", // Start completely off-screen to the left
	},
	animate: {
		x: "100%", // Move completely off-screen to the right
	},
};

// Define the ShimmerSkeleton component
// It accepts all the same props as the original Skeleton component
export function ShimmerSkeleton({ className, ...props }: SkeletonProps) {
	return (
		<Skeleton className={cn("relative overflow-hidden", className)} {...props}>
			{/* This is the shimmer wave */}
			<motion.div
				className="absolute inset-0"
				variants={shimmerVariants}
				initial="initial"
				animate="animate"
				transition={{
					repeat: Number.POSITIVE_INFINITY,
					duration: 2,
					ease: "linear",
				}}
				style={{
					background:
						"linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent)",
				}}
			/>
		</Skeleton>
	);
}
