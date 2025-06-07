// Define the ErrorHeaderProps interface
interface ErrorHeaderProps {
	title: string;
	message: string;
}

/**
 * Renders a header section for displaying error information.
 *
 * @param {ErrorHeaderProps} props - The props for the component.
 * @param {string} props.title - The main title of the error.
 * @param {string} props.message - A descriptive message for the error.
 * @returns {JSX.Element} A div element containing the error title and message, styled for an error display.
 */
function ErrorHeader({ title, message }: ErrorHeaderProps) {
	return (
		<div className="content-container bg-gray-20 m-auto w-full h-full">
			<div
				className="w-full xxs:nax-w-full sm:max-w-full 
                            md:max-w-full lg:max-w-12/12 "
			>
				<div className="text-center space-y-3">
					<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
					<p className="text-gray-600">{message}</p>
				</div>
			</div>
		</div>
	);
}

// Export the ErrorHeader component
export default ErrorHeader;
