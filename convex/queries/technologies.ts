import { v } from "convex/values";

import { query } from "../_generated/server";

export const getAllTechnologies = query({
  handler: async (ctx) => {
    const technologies = await ctx.db.query("technologies").collect();

    return technologies;
  },
});

export const getAllTechnologiesByUserEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!currentUser || !currentUser?.portfolio) {
      return null;
    }

    const portfolio = await ctx.db.get("portfolios", currentUser.portfolio);

    if (!portfolio) {
      return null;
    }

    const technologies = await ctx.db.query("technologies").collect();

    const usedTechStack = new Set(portfolio.techStack ?? []);

    const availableTechnologies = technologies.filter(
      (tech) => !usedTechStack.has(tech._id),
    );

    return availableTechnologies;
  },
});

export const getAllTechnologiesByPorfolioId = query({
  args: { portfolioId: v.id("portfolios") },
  handler: async (ctx, { portfolioId }) => {
    const portfolio = await ctx.db.get("portfolios", portfolioId);

    if (!portfolio || !portfolio.techStack) {
      return null;
    }

    const technologies = await Promise.all(
      portfolio.techStack.map((techId) => ctx.db.get(techId)),
    );

    return technologies.filter((tech) => tech !== null);
  },
});
