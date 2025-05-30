import Link from "next/link";
import LogoSvgComponent from "@images/ventixe-logo.svg";

function Logo() {
	return (
		<div
			aria-label="Logo"
			className="
		text-secondary-110 text-2xl pb-1125 p-1750"
		>
			<Link href="/" className="flex items-center gap-3.5">
				<LogoSvgComponent alt="Khala Logo" />
				Ventixe
			</Link>
		</div>
	);
}

export default Logo;
