"use node";

import { v } from "convex/values";

import { action, internalAction } from "../_generated/server";

export const updatePortfolioScreenshot = internalAction({
  args: {
    portfolioId: v.union(v.id("portfolios"), v.null()),
    token: v.string(),
  },
  handler: async (ctx, { portfolioId, token }) => {
    const response = await fetch(
      `${
        process.env.BACKEND_API_URL
      }/v1/api/portfolios/${portfolioId}/screenshot`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return data;
  },
});

export const updatePortfolioScreenshotAction = action({
  args: {
    portfolioId: v.union(v.id("portfolios"), v.null()),
    token: v.string(),
  },
  handler: async (ctx, { portfolioId, token }) => {
    const response = await fetch(
      `${
        process.env.BACKEND_API_URL
      }/v1/api/portfolios/${portfolioId}/screenshot`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return data;
  },
});
