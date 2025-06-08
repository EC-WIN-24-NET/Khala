import { Button } from "@/components/ui/button";
import type { EventPackage } from "@api/types";

function PackageButton({
	eventPackage,
	onShowEmailForm,
}: {
	eventPackage: EventPackage;
	onShowEmailForm: () => void;
}) {
	return (
		<div className="flex flex-col gap-2.5 p-0500">
			<Button
				onClick={onShowEmailForm}
				className="bg-secondary-100 hover:bg-primary-90 h-3750 cursor-pointer"
			>
				{eventPackage.title} | {eventPackage.price} {eventPackage.currency}
			</Button>
		</div>
	);
}

export default PackageButton;
