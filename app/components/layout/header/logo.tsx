import Link from "next/link";
import Image from "next/image";

function Logo() {
	return (
		<div
			aria-label="Logo"
			className="
		text-secondary-110 text-2xl pb-1125 p-1750"
		>
			<Link href="/" className="flex items-center gap-3.5">
				<Image
					src="/images/ventixe-logo.svg"
					alt="Logo"
					width={24}
					height={24}
					className="text-gray-50"
				/>
				Ventixe
			</Link>
		</div>
	);
}

export default Logo;
