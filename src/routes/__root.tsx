import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
} from "@tanstack/react-router";

import ClerkProvider from "../integrations/clerk/provider";
import ConvexProvider from "../integrations/convex/provider";

import Header from "../components/Header";
import Footer from "../components/Footer";

import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Portfolyo - Developer Portfolios",
      },
      {
        name: "description",
        content:
          "Discover developer portfolios and portfolio inspiration from developers worldwide. Save and explore ideas for your own portfolio.",
      },
      {
        property: "og:title",
        content: "Portfolyo - Developer Portfolios",
      },
      {
        property: "og:description",
        content:
          "Discover developer portfolios, get inspired, and save ideas for your own.",
      },
      {
        property: "og:image",
        content: "https://portfolyo.luiscabantac.com/og.jpg",
      },
      {
        property: "og:url",
        content: "https://portfolyo.luiscabantac.com",
      },
      {
        property: "og:site_name",
        content: "Portfolyo",
      },
      {
        property: "og:locale",
        content: "en_US",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "twitter:title",
        content: "Portfolyo - Developer Portfolios",
      },
      {
        property: "twitter:description",
        content:
          "Discover developer portfolios, get inspired, and save ideas for your own.",
      },
      {
        property: "twitter:image",
        content: "https://portfolyo.luiscabantac.com/twitter-og.jpg",
      },
      {
        name: "theme-color",
        content: "#775b1b",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        href: "/logo192.png",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
    ],
  }),
  notFoundComponent: () => {
    return (
      <main className="page-wrap px-4 min-h-[90dvh] flex flex-col items-center justify-center">
        <section className="island-shell mb-8 rounded-2xl md:px-6 py-6 sm:p-8 flex flex-col items-center gap-2">
          <h1 className="display-title mb-3 text-4xl font-bold text-foreground sm:text-5xl">
            Page not found
          </h1>
          <Link
            to="/"
            className="rounded-full bg-primary px-5 py-2.5 text-sm text-background font-semibold no-underline transition"
          >
            Go home
          </Link>
        </section>
      </main>
    );
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased wrap-anywhere">
        <ClerkProvider>
          <ConvexProvider>
            <Header />
            {children}
            <Footer />
            <TanStackDevtools
              config={{
                position: "bottom-right",
              }}
              plugins={[
                {
                  name: "Tanstack Router",
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
          </ConvexProvider>
        </ClerkProvider>
        <Scripts />
      </body>
    </html>
  );
}
