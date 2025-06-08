interface FormErrorProps {
	message?: string | null;
	id?: string;
	className?: string;
	title?: string;
}

interface FormResponceProps {
	message?: string | null;
}

interface EmailFormProps {
	onGoBack: () => void;
	selectedPackageTitle?: string;
	eventId?: string;
	eventName?: string;
	eventPrice?: number;
	eventCurrency?: string;
}

interface SubmissionResult {
	success: boolean;
	message: string;
}

interface EmailSendRequest {
	to: string;
	subject: string;
	htmlBody: string;
	plainTextBody: string;
}

export type {
	FormErrorProps,
	FormResponceProps,
	EmailFormProps,
	SubmissionResult,
	EmailSendRequest,
};
