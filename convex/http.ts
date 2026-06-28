import { Webhook } from "svix";
import { httpRouter } from "convex/server";
import type { WebhookEvent } from "@clerk/backend";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const event = await validateRequest(request);
    if (!event) {
      return new Response("Error occured", { status: 400 });
    }
    switch (event.type) {
      case "user.created": {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        await ctx.runMutation(internal.mutations.users.createUserInternal, {
          clerkId: id!,
          name: [first_name, last_name].filter(Boolean).join(" ") || "Unknown",
          email: email_addresses?.[0]?.email_address ?? "",
          profilePicture: image_url ?? "",
        });
        break;
      }
      case "user.deleted": {
        const clerkId = event.data.id!;
        await ctx.runMutation(internal.mutations.users.deleteUser, { clerkId });
        break;
      }
      default:
        console.log("Ignored Clerk webhook event", event.type);
    }

    return new Response(null, { status: 200 });
  }),
});

async function validateRequest(req: Request): Promise<WebhookEvent | null> {
  const payloadString = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  try {
    return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook event", error);
    return null;
  }
}

export default http;
