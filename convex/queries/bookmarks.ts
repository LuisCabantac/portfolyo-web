import { v } from "convex/values";

import { query } from "../_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getBookmarksByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!user) {
      return null;
    }

    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", user._id))
      .collect();

    return bookmarks;
  },
});

export const getBookmarkedPortfolios = query({
  args: {
    email: v.union(v.string(), v.null()),
    search: v.union(v.string(), v.null()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { email, search, paginationOpts }) => {
    if (!email) {
      return { page: [], isDone: true, continueCursor: "" };
    }

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!currentUser) {
      return { page: [], isDone: true, continueCursor: "" };
    }

    const bookmarkResults = await ctx.db
      .query("bookmarks")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", currentUser._id))
      .paginate(paginationOpts);

    let portfolios = (
      await Promise.all(
        bookmarkResults.page.map(async (bookmark) => {
          const portfolio = await ctx.db.get(bookmark.portfolioId);

          if (!portfolio?.storageId) return null;

          const owner = await ctx.db.get(portfolio.ownerId);

          if (!owner) return null;

          const professionalTitle = owner.professionalTitle
            ? await ctx.db.get(owner.professionalTitle)
            : null;

          return {
            _id: portfolio._id,
            ownerProfilePicture: owner.profilePicture,
            ownerName: owner.name,
            ownerEmail: owner.email,
            ownerTitle: professionalTitle ? professionalTitle.title : null,
            url: portfolio.url,
            isBookmarked: true,
            updatedTime: portfolio.updatedTime,
            portfolioId: portfolio._id,
            screenshotUrl: await ctx.storage.getUrl(portfolio.storageId),
          };
        }),
      )
    ).filter((p) => p !== null);

    if (search) {
      const searchLower = search.toLowerCase();
      portfolios = portfolios.filter((p) =>
        p.ownerName.toLowerCase().includes(searchLower),
      );
    }

    return {
      page: portfolios,
      isDone: bookmarkResults.isDone,
      continueCursor: bookmarkResults.continueCursor,
    };
  },
});
