import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{
				title: "Portfolyo - Show your craft",
			},
			{
				name: "description",
				content:
					"Portfolyo is a community-driven platform for developers to share their work, discover inspiration, and connect through projects.",
			},
		],
	}),
	component: App,
});

function App() {
	return (
		<main className="page-wrap px-4 pb-8 pt-14">
			<section className="relative overflow-hidden rounded-[2rem] md:px-6 md:py-28 py-10">
				<div className="flex md:flex-row flex-col items-center justify-between md:gap-0 gap-12">
					<div>
						<h1 className="text-foreground mb-5 max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
							The stage for your professional story.
						</h1>
						<p className="text-muted-foreground font-heading mb-8 max-w-2xl text-base sm:text-lg">
							Stop overthinking your "About Me" page. Portfolyo is a
							community-driven platform for developers to share their work,
							discover top-tier inspiration, and connect through the projects
							they build.
						</p>

						<a
							href="https://play.google.com/store/apps/details?id=com.luiscabantac.portfolyo"
							target="_blank"
							rel="noopener"
						>
							<img
								src="/google-play-badge.png"
								className="h-10"
								alt="google play store badge"
							/>
						</a>
					</div>

					<img src="/hero-image.png" alt="hero" className="md:h-96 h-128" />
				</div>
			</section>

			<section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{[
					[
						"Unified Presence",
						"One beautiful profile for your links, tech stack, and experience.",
					],
					[
						"Live Screen-caps",
						"Automatic high-quality previews of your live portfolio index.",
					],
					[
						"Community Feed",
						"Discover how other developers are building and designing today.",
					],
					[
						"Smart Bookmarks",
						"Save the designs and stacks that inspire your next big update.",
					],
				].map(([title, desc], index) => (
					<article
						key={title}
						className="island-shell feature-card rise-in rounded-2xl p-5"
						style={{ animationDelay: `${index * 90 + 80}ms` }}
					>
						<h2 className="text-foreground mb-2 text-base font-semibold">
							{title}
						</h2>
						<p className="text-muted-foreground m-0 text-sm">{desc}</p>
					</article>
				))}
			</section>
		</main>
	);
}
