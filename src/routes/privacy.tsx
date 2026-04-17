import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
	head: () => ({
		meta: [
			{
				title: "Portfolyo - Privacy Policy",
			},
			{
				name: "description",
				content:
					"Learn how Portfolyo handles your data, from profile management to media permissions. We prioritize your privacy and give you full control over your portfolio visibility.",
			},
		],
	}),
	component: Privacy,
});

function Privacy() {
	const privacyPolicy = [
		{
			id: 1,
			title: "Information We Collect",
			description:
				"We only collect information that is necessary to provide the core services of Portfolyo.",
			items: [
				{
					label: "Account Information",
					content:
						"When you sign up via your Google or GitHub account, we receive your name, email address, and profile picture.",
				},
				{
					label: "Portfolio Data",
					content:
						"We store the information you provide about your work, including portfolio URLs, descriptions, technology stacks, and screenshots.",
				},
				{
					label: "Usage Information",
					content:
						"We track 'views' on portfolios to help you see engagement with your work.",
				},
				{
					label: "Device Data",
					content:
						"We may collect your Expo Push Token if you enable notifications, and basic device information provided by the Expo framework.",
				},
			],
		},
		{
			id: 2,
			title: "How We Use Your Information",
			description:
				"Your data is used solely to provide and improve the Portfolyo experience.",
			items: [
				{
					label: "Profile Management",
					content: "To create and maintain your professional profile.",
				},
				{
					label: "Community Discovery",
					content:
						"To display your portfolio to other users in the 'Explore' section if you enable visibility.",
				},
				{
					label: "Engagement",
					content: "To allow users to bookmark portfolios they find inspiring.",
				},
				{
					label: "Maintenance",
					content:
						"To improve the app experience and troubleshoot technical issues.",
				},
			],
		},
		{
			id: 3,
			title: "Third-Party Services",
			description:
				"We use reliable third-party providers to power the app's infrastructure.",
			items: [
				{
					label: "Authentication",
					content: "Secure sign-in via trusted OAuth providers.",
				},
				{
					label: "Storage",
					content:
						"Cloud database management and secure file storage for screenshots.",
				},
				{
					label: "Performance",
					content: "Integrated tools for app delivery and background updates.",
				},
			],
		},
		{
			id: 4,
			title: "Data Visibility & Control",
			description: "You have full control over your data and its visibility.",
			items: [
				{
					label: "Visibility Toggle",
					content:
						"By default, your portfolio is only discoverable if you opt-in via settings.",
				},
				{
					label: "Account Deletion",
					content:
						"Closing your account permanently deletes your profile and portfolio data from our active databases.",
				},
			],
		},
		{
			id: 5,
			title: "Media Permissions",
			description:
				"The app requests specific permissions to function correctly.",
			items: [
				{
					label: "Library Access",
					content:
						"Used only to allow you to upload images of your work. We do not access other photos.",
				},
			],
		},
	];

	return (
		<main className="page-wrap px-4 py-12">
			<section className="island-shell mb-8 rounded-2xl md:px-6 py-6 sm:p-8">
				<p className="island-kicker mb-2">Last updated: April 5, 2026</p>
				<h1 className="display-title mb-3 text-4xl font-bold text-foreground sm:text-5xl">
					Privacy Policy
				</h1>
				<p className="m-0 text-base leading-8 text-muted-foreground">
					This policy explains what information we collect and how we use it.
				</p>
			</section>

			<div className="flex flex-col gap-6">
				{privacyPolicy.map((section) => (
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
