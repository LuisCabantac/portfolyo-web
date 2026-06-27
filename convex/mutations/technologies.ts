import { v } from "convex/values";

import { mutation } from "../_generated/server";

export const addTechnology = mutation({
  args: {
    technologyId: v.id("technologies"),
    portfolioId: v.id("portfolios"),
    email: v.string(),
  },
  handler: async (ctx, { technologyId, portfolioId, email }) => {
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!currentUser) {
      return null;
    }

    const technology = await ctx.db.get("technologies", technologyId);

    if (!technology) {
      return null;
    }

    const portfolio = await ctx.db.get("portfolios", portfolioId);

    if (!portfolio) {
      return null;
    }

    await ctx.db.patch("portfolios", portfolio._id, {
      techStack: portfolio.techStack
        ? [...portfolio.techStack, technology._id]
        : [technology._id],
    });

    return portfolio;
  },
});

export const removeTechnology = mutation({
  args: {
    technologyId: v.id("technologies"),
    portfolioId: v.id("portfolios"),
    email: v.string(),
  },
  handler: async (ctx, { technologyId, portfolioId, email }) => {
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!currentUser) {
      return null;
    }

    const technology = await ctx.db.get("technologies", technologyId);

    if (!technology) {
      return null;
    }

    const portfolio = await ctx.db.get("portfolios", portfolioId);

    if (!portfolio) {
      return null;
    }

    await ctx.db.patch("portfolios", portfolio._id, {
      techStack: portfolio.techStack
        ? portfolio.techStack.filter((id) => id !== technology._id)
        : [],
    });

    return portfolio;
  },
});
