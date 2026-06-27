import { createProxy } from "next-i18next/proxy";
import { clerkMiddleware } from "@clerk/nextjs/server";

import i18nConfig from "../i18n.config";

const i18nMiddleware = createProxy(i18nConfig);

export default clerkMiddleware((auth, req) => {
  return i18nMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
