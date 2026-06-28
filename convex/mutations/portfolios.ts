import { ConvexError, v } from "convex/values";

import { internal } from "../_generated/api";
import { mutation } from "../_generated/server";

export const createPortfolio = mutation({
  args: {
    portfolioId: v.union(v.id("portfolios"), v.null()),
    ownerId: v.id("users"),
    url: v.string(),
    description: v.union(v.string(), v.null()),
    techStack: v.union(v.array(v.id("technologies")), v.null()),
    token: v.string(),
    field: v.optional(
      v.union(v.literal("url"), v.literal("description"), v.literal("create")),
    ),
  },
  handler: async (
    ctx,
    { portfolioId, ownerId, url, techStack, description, token, field },
  ) => {
    const normalizedUrl = url.replace(/\/+$/, "");

    if (field !== "description") {
      const existingUrlPortfolio = await ctx.db
        .query("portfolios")
        .filter((q) => q.eq(q.field("url"), normalizedUrl))
        .first();

      if (existingUrlPortfolio && existingUrlPortfolio._id !== portfolioId) {
        throw new ConvexError("This portfolio URL already exists");
      }
    }

    if (field !== "description") {
      await ctx.scheduler.runAfter(
        0,
        internal.actions.portfolios.updatePortfolioScreenshot,
        { portfolioId, token },
      );
    }

    const existingPortfolio = await ctx.db
      .query("portfolios")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", ownerId))
      .first();

    if (existingPortfolio && portfolioId) {
      if (field === "description") {
        await ctx.db.patch("portfolios", portfolioId, {
          description,
        });
      } else if (field === "url") {
        const existingNormalizedUrl = existingPortfolio.url.replace(/\/+$/, "");
        if (existingNormalizedUrl === normalizedUrl) {
          throw new ConvexError("New URL is the same as current URL");
        }

        await ctx.db.patch("portfolios", portfolioId, {
          url: normalizedUrl,
          updatedTime: Date.now(),
        });
      } else {
        await ctx.db.patch("portfolios", portfolioId, {
          url: normalizedUrl,
          description,
          updatedTime: Date.now(),
        });
      }

      return existingPortfolio;
    }

    const newPortfolio = await ctx.db.insert("portfolios", {
      ownerId,
      url: normalizedUrl,
      description,
      techStack,
      storageId: null,
      updatedTime: Date.now(),
    });

    const portfolio = await ctx.db.get("portfolios", newPortfolio);

    if (portfolio) {
      await ctx.scheduler.runAfter(
        0,
        internal.actions.portfolios.updatePortfolioScreenshot,
        { portfolioId: portfolio?._id, token },
      );
    }

    await ctx.db.patch("users", ownerId, {
      portfolio: portfolio?._id,
      updatedTime: Date.now(),
    });

    return portfolio;
  },
});

export const deletePortfolio = mutation({
  args: { portfolioId: v.id("portfolios") },
  handler: async (ctx, { portfolioId }) => {
    const portfolio = await ctx.db.get("portfolios", portfolioId);

    if (!portfolio) return;

    await ctx.db.delete("portfolios", portfolioId);
    await ctx.db.patch("users", portfolio.ownerId, {
      portfolio: null,
    });
    return;
  },
});

export const toggleShowPortfolio = mutation({
  args: { portfolioId: v.id("portfolios"), showPortfolio: v.boolean() },
  handler: async (ctx, { portfolioId, showPortfolio }) => {
    const existingPortfolio = await ctx.db.get("portfolios", portfolioId);

    if (!existingPortfolio) {
      return;
    }

    await ctx.db.patch("users", existingPortfolio.ownerId, {
      showPortfolio,
      updatedTime: Date.now(),
    });

    const toggledShowPortfolio = await ctx.db.get(
      "users",
      existingPortfolio.ownerId,
    );

    return toggledShowPortfolio?.showPortfolio ?? null;
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const savePortfolioScreenshot = mutation({
  args: {
    portfolioId: v.id("portfolios"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { portfolioId, storageId }) => {
    await ctx.db.patch(portfolioId, {
      storageId: storageId,
      updatedTime: Date.now(),
    });

    return { storageId };
  },
});

export const deletePortfolioScreenshot = mutation({
  args: {
    portfolioId: v.id("portfolios"),
  },
  handler: async (ctx, { portfolioId }) => {
    const portfolio = await ctx.db.get("portfolios", portfolioId);

    if (!portfolio) return;

    if (!portfolio.storageId) return;

    await ctx.storage.delete(portfolio.storageId);

    await ctx.db.patch(portfolioId, {
      storageId: null,
    });

    return portfolio;
  },
});

export const addPortfolioView = mutation({
  args: {
    portfolioId: v.id("portfolios"),
    userEmail: v.string(),
  },
  handler: async (ctx, { portfolioId, userEmail }) => {
    const portfolio = await ctx.db.get("portfolios", portfolioId);

    if (!portfolio) {
      return;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", userEmail))
      .first();

    if (!user) {
      return;
    }

    if (user._id === portfolio.ownerId) {
      return;
    }

    const existingView = await ctx.db
      .query("portfolioViews")
      .withIndex("by_portfolioId_and_viewerId", (q) =>
        q.eq("portfolioId", portfolioId).eq("viewerId", user._id),
      )
      .collect();

    if (existingView.length) {
      return;
    }

    const newView = await ctx.db.insert("portfolioViews", {
      portfolioId,
      viewerId: user._id,
      viewedTime: Date.now(),
    });

    return newView;
  },
});
