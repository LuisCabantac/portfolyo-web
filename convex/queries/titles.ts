import { v } from "convex/values";
import { query } from "../_generated/server";

export const getAllTitle = query({
  handler: async (ctx) => {
    const titles = await ctx.db.query("titles").collect();

    return titles;
  },
});

export const getTitleById = query({
  args: { titleId: v.id("titles") },
  handler: async (ctx, { titleId }) => {
    const title = await ctx.db.get("titles", titleId);

    return title;
  },
});
