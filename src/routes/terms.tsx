import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
	component: Terms,
});

function Terms() {
	const termsAndConditions = [
		{
			id: 1,
			title: "Service for Users",
			description:
				"General guidelines for using the Portfolyo community platform.",
			items: [
				{
					label: "Purpose",
					content:
						"A community for users to showcase professional work and find inspiration.",
				},
				{
					label: "Availability",
					content:
						"The service is provided 'as is' and requires an active internet connection.",
				},
			],
		},
		{
			id: 2,
			title: "User Responsibilities",
			description: "Your commitments as a member of the community.",
			items: [
				{
					label: "Content Ownership",
					content:
						"You retain full ownership of the portfolios and descriptions you share.",
				},
				{
					label: "Conduct",
					content:
						"Users agree not to upload illegal, offensive, or impersonating content.",
				},
				{
					label: "Security",
					content:
						"You are responsible for the security of your own login credentials.",
				},
			],
		},
		{
			id: 3,
			title: "Data and Deletion",
			description: "How your data is managed over time.",
			items: [
				{
					label: "Persistence",
					content:
						"We do not guarantee permanent storage; please maintain your own backups.",
				},
				{
					label: "Finality",
					content: "Account deletion is permanent and cannot be reversed.",
				},
			],
		},
		{
			id: 4,
			title: "Legal Disclaimers",
			description: "Standard legal protections for the service.",
			items: [
				{
					label: "Liability",
					content:
						"The developer is not responsible for loss of data or professional opportunities.",
				},
				{
					label: "Updates",
					content:
						"Continued use of the app constitutes acceptance of any updated terms.",
				},
			],
		},
	];

	return (
		<main className="page-wrap px-4 py-12">
			<section className="island-shell mb-8 rounded-2xl md:px-6 py-6 sm:p-8">
				<p className="island-kicker mb-2">Last updated: April 5, 2026</p>
				<h1 className="display-title mb-3 text-4xl font-bold text-foreground sm:text-5xl">
					Terms & Conditions
				</h1>
				<p className="m-0 max-w-3xl text-base leading-8 text-muted-foreground">
					Welcome to Portfolyo. By using our service, you agree to these terms.
					Please read them carefully.
				</p>
			</section>

			<div className="flex flex-col gap-6">
				{termsAndConditions.map((section) => (
					<section
						key={section.id}
						className="island-shell rounded-2xl md:px-6 py-6 sm:p-8"
					>
						<h2 className="mb-2 text-2xl font-bold text-foreground">
							{section.title}
						</h2>
						<p className="mb-6 text-base text-muted-foreground">
							{section.description}
						</p>
						<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							{section.items.map((item) => (
								<li key={item.label} className="flex flex-col gap-1">
									<span className="font-semibold text-foreground">
										{item.label}
									</span>
									<p className="text-sm leading-6 text-muted-foreground">
										{item.content}
									</p>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</main>
	);
}
