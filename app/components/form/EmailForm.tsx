// This is a copy of the ContactForm, but with a different endpoint and schema
import { Button } from "@/components/ui/button";
import type {
	EmailFormProps, // EmailFormProps will now include selectedPackageTitle and eventId
	SubmissionResult,
	EmailSendRequest,
} from "./types";
import type { apiResponseProp } from "@api/types";
import { useState } from "react";
import { subscriptionSchema } from "@lib/validation/schemas/subscription"; // Still useful for email validation
import type { SubscriptionSchema } from "@lib/validation/schemas/subscription"; // Represents the form data shape
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postToApi } from "@lib/api/postToApi";
import { Label } from "@/components/ui/label";

/**
 * This code was used from https://github.com/Chugarah/MonoConnect/tree/main/apps/silicon-ab-2
 * and refactored and inmproved by Google Gemini to use my genericApiHandler
 * @component EmailForm
 * @description A form component for sending a predefined email.
 * It uses `react-hook-form` for form management and `zod` for email validation.
 * The form allows users to enter their email address, and upon submission,
 * a predefined email is sent to that address.
 * It handles API calls for sending the email, displays loading states, and shows success or error messages
 * based on the API response.
 *
 * @param {EmailFormProps} props - The props for the component.
 * @param {() => void} props.onGoBack - A callback function that is invoked when the "Go Back" button is clicked.
 *
 * @example
 * ```tsx
 * <EmailForm onGoBack={() => console.log("Go back clicked")} />
 * ```
 *
 * @returns {JSX.Element} The rendered email sending form.
 *
 * @remarks
 * The component manages its own loading state (`isLoading`) and API response state (`emailSendApiResponse`).
 * On successful submission, the form is reset.
 * Error messages from form validation and API responses are displayed to the user.
 * The API endpoint for sending the email is hardcoded as "/api/mail/send".
 * It utilizes a generic `postToApi` function for making the API request.
 * Styling is handled using Tailwind CSS classes, with conditional styling for errors and API responses.
 */
function EmailForm({
	onGoBack,
	selectedPackageTitle,
	eventId,
	eventName,
}: EmailFormProps) {
	// Setting up states for the form
	const [isLoading, setIsLoading] = useState(false);
	// State for the API call (sending the complex email)
	const [emailSendApiResponse, setEmailSendApiResponse] =
		useState<apiResponseProp<SubmissionResult> | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SubscriptionSchema>({
		// SubscriptionSchema is used for the shape { email: string }
		resolver: zodResolver(subscriptionSchema),
	});

	const onSubmit = async (data: SubscriptionSchema) => {
		setIsLoading(true);
		setEmailSendApiResponse(null);

		// Directly send the predefined complex email
		const emailRecipient = data.email;

		// Simplified subject construction
		let emailSubject = "Your Event Sign-Up Confirmation";
		if (selectedPackageTitle) {
			emailSubject = `Confirmation: ${selectedPackageTitle}`;
			if (eventName) {
				emailSubject += ` (Event: ${eventName})`;
			}
		} else if (eventName) {
			emailSubject = `Confirmation for Event: ${eventName}`;
		}

		// Simplified body content, got Assisted with Google Gemini reagarding heavy work to write the HTML and text versions
		let mainMessageHtml =
			"<p>Thank you for signing up! Please save this email for your records.</p>";
		let mainMessageText =
			"Thank you for signing up! Please save this email for your records.";

		if (selectedPackageTitle && eventName) {
			mainMessageHtml = `<p>You have signed up for the <strong>${selectedPackageTitle}</strong> package for event <strong>${eventName}</strong>.</p><p>Thank you and please save this email for your records.</p>`;
			mainMessageText = `You have signed up for the ${selectedPackageTitle} package for event ${eventName}.\n\nThank you and please save this email for your records.`;
		}

		// Generated email body, using
		const generatedHtmlBody = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${emailSubject}</title></head><body><h1>Hello ${emailRecipient},</h1>${mainMessageHtml}<p>If you have any questions, feel free to reply to this email.</p><p>Best regards,<br>The Example Team</p></body></html>`;
		const generatedPlainTextBody = `Hello ${emailRecipient},\n\n${mainMessageText}\n\nBest regards,\nThe Zealot Team`;

		// Payload for the /api/mail/send endpoint
		// Student Note: This is the shape defined in EmailSendRequest
		const emailPayload: EmailSendRequest = {
			to: emailRecipient,
			subject: emailSubject,
			htmlBody: generatedHtmlBody,
			plainTextBody: generatedPlainTextBody,
		};

		// Call the /api/mail/send endpoint
		const sendEmailResponse = await postToApi<
			EmailSendRequest,
			SubmissionResult
		>("/api/mail/send", emailPayload);

		// Store and display this status
		setEmailSendApiResponse(sendEmailResponse);

		// Log the result
		if (sendEmailResponse.success) {
			// Student Note: This is a good place to add analytics or other side-effects.
			console.log(
				`Successfully sent email to: ${emailRecipient} regarding package: ${selectedPackageTitle}, event: ${eventId}`,
			);
			reset();
		} else {
			console.error(
				`Failed to send email for package: ${selectedPackageTitle}, event: ${eventId}:`,
				sendEmailResponse.message,
			);
		}
		setIsLoading(false);
	};

	return (
		<div className="w-full p-4 md:p-6 space-y-4">
			<h2 className="text-2xl font-semibold text-center">
				Sign up to: {selectedPackageTitle || "this Event"}
			</h2>{" "}
			{/* Changed title */}
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
				<div className="space-y-2">
					<Label htmlFor="email">Your Email Address</Label>
					<Input
						id="email"
						type="email"
						placeholder="you@example.com"
						{...register("email")}
						className={cn(errors.email ? "border-red-500" : " h-3750")}
						disabled={isLoading}
					/>
					{errors.email && (
						<p className="text-sm text-red-600">{errors.email.message}</p>
					)}
				</div>

				{/* Display email send API response */}
				{emailSendApiResponse && (
					<div
						className={cn(
							"p-3 rounded-md text-sm",
							emailSendApiResponse.success
								? "bg-green-100 text-green-700"
								: "bg-red-100 text-red-700",
						)}
					>
						{/* Student Note: This is a good place to add analytics or other side-effects. */}
						Email Status: {emailSendApiResponse.message}
						{!emailSendApiResponse.success &&
							emailSendApiResponse.error?.message && (
								<pre className="mt-2 text-xs whitespace-pre-wrap">
									{JSON.stringify(emailSendApiResponse.error?.message, null, 2)}
								</pre>
							)}
					</div>
				)}
				<div className="flex flex-col sm:flex-row gap-2.5">
					<Button
						type="submit"
						className="flex-1 h-3750 bg-secondary-100 hover:bg-primary-90 cursor-pointer"
						disabled={isLoading}
					>
						{isLoading ? "Signing up..." : "Signing me up!"}
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={onGoBack}
						className="flex-1 bg-cool-gray-70 hover:bg-secondary-60 h-3750  cursor-pointer"
						disabled={isLoading}
					>
						Go Back
					</Button>
				</div>
			</form>
		</div>
	);
}

export default EmailForm;
