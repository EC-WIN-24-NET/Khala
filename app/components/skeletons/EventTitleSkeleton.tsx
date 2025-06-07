interface TextLineSkeletonProps {
	className?: string;
}
export default function TextLineSkeleton({
	className = "h-4 bg-gray-300 rounded w-3/4",
}: TextLineSkeletonProps) {
	return <div className={`animate-pulse ${className}`} />;
}
