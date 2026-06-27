import { v } from "convex/values";

import { mutation } from "../_generated/server";

export const bookmarkPortfolio = mutation({
  args: { portfolioId: v.id("portfolios"), userId: v.id("users") },
  handler: async (ctx, { portfolioId, userId }) => {
    const portfolio = await ctx.db.get("portfolios", portfolioId);

    if (!portfolio) {
      return null;
    }

    const existingBookmark = await ctx.db
      .query("bookmarks")
      .withIndex("by_ownerId_and_portfolioId", (q) =>
        q.eq("ownerId", userId).eq("portfolioId", portfolioId),
      )
      .first();

    if (existingBookmark) {
      await ctx.db.delete("bookmarks", existingBookmark._id);
      return null;
    }

    const newBookmark = await ctx.db.insert("bookmarks", {
      ownerId: userId,
      portfolioId,
      folderId: null,
    });

    return newBookmark;
  },
});
