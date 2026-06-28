import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

import { query } from "../_generated/server";

export const getPortfolioByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    const portfolio = await ctx.db
      .query("portfolios")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", userId))
      .first();

    return portfolio;
  },
});

export const getPortfolioById = query({
  args: { portfolioId: v.id("portfolios"), email: v.optional(v.string()) },
  handler: async (ctx, { portfolioId, email }) => {
    const portfolio = await ctx.db.get("portfolios", portfolioId);

    if (!portfolio) {
      return null;
    }

    const owner = await ctx.db.get(portfolio.ownerId);

    if (!owner) {
      return null;
    }

    const techStack = portfolio.techStack
      ? await Promise.all(
          portfolio.techStack.map(async (id) => {
            const tech = await ctx.db.get(id);
            return tech?.title;
          }),
        )
      : [];

    let title;

    if (owner?.professionalTitle) {
      title = await ctx.db.get("titles", owner?.professionalTitle);
    }

    let currentUser;

    if (email) {
      currentUser = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();
    }

    let isBookmarked;

    if (currentUser) {
      isBookmarked = await ctx.db
        .query("bookmarks")
        .withIndex("by_ownerId_and_portfolioId", (q) =>
          q.eq("ownerId", currentUser._id).eq("portfolioId", portfolio._id),
        )
        .first();
    }

    return {
      ...portfolio,
      ownerName: owner?.name,
      ownerId: owner?._id,
      ownerImage: owner?.profilePicture,
      ownerTitle: title?.title ?? null,
      ownerGithub: owner.githubUrl,
      ownerLinkedin: owner.linkedinUrl,
      ownerTwitter: owner.twitterUrl,
      ownerFacebook: owner.facebookUrl,
      isBookmarked: !!isBookmarked,
      techStack: techStack.filter((t) => !!t),
      screenshotUrl: portfolio.storageId
        ? await ctx.storage.getUrl(portfolio.storageId)
        : null,
    };
  },
});

export const getPortfolioByUrl = query({
  args: { url: v.string() },
  handler: async (ctx, { url }) => {
    const portfolio = await ctx.db
      .query("portfolios")
      .withIndex("by_url", (q) => q.eq("url", url))
      .collect();

    return portfolio;
  },
});

export const getAllPortfolios = query({
  args: {
    email: v.union(v.string(), v.null()),
    sort: v.union(v.literal("top"), v.literal("latest")),
    search: v.union(v.string(), v.null()),
    titleId: v.union(v.id("titles"), v.null()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { email, sort, search, titleId, paginationOpts }) => {
    let bookmarkedPortfolioIds = new Set<string>();
    if (email) {
      const currentUser = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();

      if (currentUser) {
        const userBookmarks = await ctx.db
          .query("bookmarks")
          .withIndex("by_ownerId", (q) => q.eq("ownerId", currentUser._id))
          .collect();
        bookmarkedPortfolioIds = new Set(
          userBookmarks.map((b) => b.portfolioId),
        );
      }
    }

    const userResults = await ctx.db
      .query("users")
      .filter((q) => {
        const conditions = [
          q.eq(q.field("showPortfolio"), true),
          q.neq(q.field("portfolio"), null),
        ];

        if (titleId) {
          conditions.push(q.eq(q.field("professionalTitle"), titleId));
        }

        return q.and(...conditions);
      })
      .paginate(paginationOpts);

    let portfolios = (
      await Promise.all(
        userResults.page.map(async (user) => {
          const portfolio = user.portfolio
            ? await ctx.db.get(user.portfolio)
            : null;

          if (!portfolio?.storageId) return null;

          const professionalTitle = user.professionalTitle
            ? await ctx.db.get(user.professionalTitle)
            : null;

          return {
            _id: portfolio._id,
            ownerProfilePicture: user.profilePicture,
            ownerName: user.name,
            ownerEmail: user.email,
            ownerTitle: professionalTitle ? professionalTitle.title : null,
            url: portfolio.url,
            isBookmarked: bookmarkedPortfolioIds.has(portfolio._id),
            updatedTime: portfolio.updatedTime,
            creationTime: portfolio._creationTime,
            portfolioId: portfolio._id,
            screenshotUrl: await ctx.storage.getUrl(portfolio.storageId),
          };
        }),
      )
    ).filter((p) => p !== null);

    if (sort === "top") {
      const viewCounts = new Map<string, number>();
      await Promise.all(
        portfolios.map(async (p) => {
          const views = await ctx.db
            .query("portfolioViews")
            .withIndex("by_portfolioId", (q) => q.eq("portfolioId", p._id))
            .collect();
          viewCounts.set(p._id, views.length);
        }),
      );

      portfolios.sort(
        (a, b) => (viewCounts.get(b._id) || 0) - (viewCounts.get(a._id) || 0),
      );
    } else {
      portfolios.sort((a, b) => b.creationTime - a.creationTime);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      portfolios = portfolios.filter((p) =>
        p.ownerName.toLowerCase().includes(searchLower),
      );
    }

    return {
      page: portfolios,
      isDone: userResults.isDone,
      continueCursor: userResults.continueCursor,
    };
  },
});
