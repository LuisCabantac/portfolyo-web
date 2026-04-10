import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Footer from "../components/Footer";
import Header from "../components/Header";

import ClerkProvider from "../integrations/clerk/provider";

import ConvexProvider from "../integrations/convex/provider";

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
				title: "Portfolyo - Show your craft",
			},
			{
				name: "description",
				content:
					"Portfolyo is a community-driven platform for developers to share their work, discover inspiration, and connect through projects.",
			},
			{
				property: "og:title",
				content: "Portfolyo - Show your craft",
			},
			{
				property: "og:description",
				content: "The stage for your professional story.",
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
				content: "Portfolyo - Show your craft",
			},
			{
				property: "twitter:description",
				content: "The stage for your professional story.",
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
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
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
