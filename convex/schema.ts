import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    profilePicture: v.string(),
    clerkId: v.string(),
    portfolio: v.union(v.id("portfolios"), v.null()),
    showPortfolio: v.boolean(),
    professionalTitle: v.union(v.id("titles"), v.null()),
    expoPushToken: v.union(v.string(), v.null()),
    githubUrl: v.union(v.string(), v.null()),
    linkedinUrl: v.union(v.string(), v.null()),
    facebookUrl: v.union(v.string(), v.null()),
    twitterUrl: v.union(v.string(), v.null()),
    profilePictureStorageId: v.optional(v.id("_storage")),
    updatedTime: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"]),
  portfolios: defineTable({
    ownerId: v.id("users"),
    url: v.string(),
    description: v.union(v.string(), v.null()),
    techStack: v.union(v.array(v.id("technologies")), v.null()),
    storageId: v.union(v.id("_storage"), v.null()),
    updatedTime: v.number(),
  })
    .index("by_url", ["url"])
    .index("by_ownerId", ["ownerId"]),
  portfolioViews: defineTable({
    portfolioId: v.id("portfolios"),
    viewerId: v.id("users"),
    viewedTime: v.number(),
  })
    .index("by_portfolioId", ["portfolioId"])
    .index("by_viewerId", ["viewerId"])
    .index("by_portfolioId_and_viewerId", ["portfolioId", "viewerId"]),
  bookmarks: defineTable({
    ownerId: v.id("users"),
    portfolioId: v.id("portfolios"),
    folderId: v.union(v.id("folders"), v.null()),
  })
    .index("by_ownerId", ["ownerId"])
    .index("by_ownerId_and_portfolioId", ["ownerId", "portfolioId"]),
  folders: defineTable({
    ownerId: v.id("users"),
  }).index("by_ownerId", ["ownerId"]),
  titles: defineTable({
    title: v.string(),
  }),
  technologies: defineTable({
    title: v.string(),
  }),
});
