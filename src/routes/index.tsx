import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Portfolyo - Developer Portfolios",
      },
      {
        name: "description",
        content:
          "Discover developer portfolios, get inspired, and save ideas for your own.",
      },
    ],
  }),
  component: App,
});

function App() {
  return (
    <main className="page-wrap px-4 min-h-[90dvh] flex items-center justify-center">
      <section className="relative overflow-hidden rounded-[2rem] md:px-6 md:py-28 py-10">
        <div className="flex md:flex-row flex-col items-center justify-between md:gap-0 gap-12">
          <div>
            <h1 className="text-foreground mb-5 max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              Discover the best developer portfolios.
            </h1>
            <p className="text-muted-foreground font-heading mb-8 max-w-2xl text-base sm:text-lg">
              Find developer portfolios from around the world, get inspired by
              their work, and save ideas for your own.
            </p>

            <a
              href="https://play.google.com/store/apps/details?id=com.luiscabantac.portfolyo"
              target="_blank"
              rel="noopener"
            >
              <img
                src="/google-play-badge.png"
                className="h-10 select-none"
                alt="google play store badge"
                draggable={false}
              />
            </a>
          </div>

          <img
            src="/hero-image.png"
            alt="hero"
            className="md:h-96 h-128 select-none"
            draggable={false}
          />
        </div>
      </section>

      {/* <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
			</section> */}
    </main>
  );
}
