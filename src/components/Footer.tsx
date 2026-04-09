import { Link } from "@tanstack/react-router";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="bg-muted mt-20 px-4 pb-14 pt-10">
			<div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
				<Link to="/" className="flex items-center">
					<img src="/logo192.png" className="h-10 w-10" alt="logo" />
					<h2 className="text-foreground m-0 shrink-0 font-heading text-xl font-medium tracking-tight">
						Portfolyo
					</h2>
				</Link>
				<div className="text-muted-foreground flex flex-col gap-2 py-4 text-sm underline md:hidden">
					<Link
						to="/privacy"
						className="hover:text-foreground transition-colors"
					>
						Privacy Policy
					</Link>
					<Link to="/terms" className="hover:text-foreground transition-colors">
						Terms and Conditions
					</Link>
				</div>
				<p className="text-muted-foreground m-0 text-sm">
					&copy; {year}{" "}
					<a
						href="https://luiscabantac.com"
						className="hover:underline transition"
						target="_blank"
						rel="noopener"
					>
						Luis Cabantac
					</a>
					. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
