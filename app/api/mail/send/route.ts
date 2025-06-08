import type { NextRequest } from "next/server";
import { genericApiHandler, type HandlerConfig } from "@api/genericApiHandler";
// You might want a specific type for the response from your /Mail/send APIM endpoint
// and for what this /api/mail/send route returns to its caller.
// For simplicity, let's assume SubmissionResult can be adapted or a new simple type is used.
import type { SubmissionResult } from "@/app/components/form/types"; // Or a more specific MailSendResult type

// Define the expected raw response from your APIM's /Mail/send endpoint
interface ApimMailSendActualResponse {
	messageId?: string;
	status: string;
	details?: string;
	error?: string;
}

/**
 * @swagger
 * /api/mail/send:
 *   post:
 *     summary: Sends an email.
 *     description: Receives an email payload (to, subject, htmlBody, plainTextBody) and proxies the request to the backend APIM /Mail/send service.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - subject
 *               - htmlBody
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               htmlBody:
 *                 type: string
 *               plainTextBody:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email processed by the backend (e.g., sent or queued).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubmissionResult' # Or a more specific MailSendResult
 *       400:
 *         description: Invalid request body.
 *       405:
 *         description: Method Not Allowed.
 *       500:
 *         description: Internal Server Error or error from APIM.
 */
export async function POST(req: NextRequest) {
	const mailConfig: HandlerConfig<
		ApimMailSendActualResponse,
		SubmissionResult
	> = {
		endpointPath: "/voidmail/api/Mail/send",
		allowedMethod: "POST",
		dataMapper: (apimResponse) => {
			const isSuccess =
				apimResponse.status === "sent" ||
				apimResponse.status === "queued" ||
				apimResponse.status === "Success";

			console.log(apimResponse);
			return {
				success: isSuccess,
				message:
					apimResponse.details ||
					apimResponse.error ||
					(isSuccess
						? "Email processed successfully."
						: `Email status: ${apimResponse.error}`),
			};
		},
	};

	return genericApiHandler<ApimMailSendActualResponse, SubmissionResult>(
		req,
		mailConfig,
	);
}
