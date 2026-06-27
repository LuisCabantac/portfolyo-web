import { ConvexError, v } from "convex/values";

import { internalMutation, mutation } from "../_generated/server";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    profilePicture: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, { name, email, profilePicture, clerkId }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existingUser) {
      return null;
    }

    const newUser = await ctx.db.insert("users", {
      name,
      email,
      profilePicture,
      clerkId,
      portfolio: null,
      showPortfolio: false,
      professionalTitle: null,
      expoPushToken: null,
      githubUrl: null,
      linkedinUrl: null,
      facebookUrl: null,
      twitterUrl: null,
      updatedTime: Date.now(),
    });

    return newUser;
  },
});

export const updateSocialUrl = mutation({
  args: {
    email: v.string(),
    field: v.union(
      v.literal("linkedin"),
      v.literal("github"),
      v.literal("twitter"),
      v.literal("facebook"),
    ),
    url: v.union(v.string(), v.null()),
  },
  handler: async (ctx, { email, field, url }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!user) {
      return;
    }

    if (field === "linkedin") {
      await ctx.db.patch("users", user._id, {
        linkedinUrl: url,
        updatedTime: Date.now(),
      });
    }

    if (field === "github") {
      await ctx.db.patch("users", user._id, {
        githubUrl: url,
        updatedTime: Date.now(),
      });
    }

    if (field === "twitter") {
      await ctx.db.patch("users", user._id, {
        twitterUrl: url,
        updatedTime: Date.now(),
      });
    }

    if (field === "facebook") {
      await ctx.db.patch("users", user._id, {
        facebookUrl: url,
        updatedTime: Date.now(),
      });
    }

    return;
  },
});

export const updateUserTitle = mutation({
  args: { titleId: v.id("titles"), email: v.string() },
  handler: async (ctx, { titleId, email }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!user) return;

    await ctx.db.patch("users", user._id, {
      professionalTitle: titleId,
      updatedTime: Date.now(),
    });

    return;
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveProfilePicture = mutation({
  args: {
    userId: v.id("users"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { userId, storageId }) => {
    const currentUser = await ctx.db.get("users", userId);

    if (!currentUser) return null;

    const newProfilePicture = await ctx.storage.getUrl(storageId);

    if (!newProfilePicture) {
      throw new ConvexError("Failed to get storage URL");
    }

    if (currentUser.profilePictureStorageId) {
      await ctx.storage.delete(currentUser.profilePictureStorageId);
    }

    await ctx.db.patch("users", userId, {
      profilePicture: newProfilePicture,
      profilePictureStorageId: storageId,
      updatedTime: Date.now(),
    });

    return { storageId };
  },
});

export const deleteUser = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first();

    if (!user) {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkId}`,
      );
      return;
    }

    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", user._id))
      .collect();

    if (bookmarks) {
      for (const bookmark of bookmarks) {
        await ctx.db.delete("bookmarks", bookmark._id);
      }
    }

    const folders = await ctx.db
      .query("folders")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", user._id))
      .collect();

    if (folders) {
      for (const folder of folders) {
        await ctx.db.delete("folders", folder._id);
      }
    }

    const views = await ctx.db
      .query("portfolioViews")
      .withIndex("by_viewerId", (q) => q.eq("viewerId", user._id))
      .collect();

    if (views) {
      for (const view of views) {
        await ctx.db.delete("portfolioViews", view._id);
      }
    }

    const portfolio = await ctx.db
      .query("portfolios")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", user._id))
      .first();

    if (portfolio) {
      if (portfolio.storageId) {
        await ctx.storage.delete(portfolio.storageId);
      }

      await ctx.db.delete("portfolios", portfolio._id);
    }

    if (user.profilePictureStorageId) {
      await ctx.storage.delete(user.profilePictureStorageId);
    }

    await ctx.db.delete("users", user._id);
  },
});

export const createUserInternal = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    profilePicture: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, { name, email, profilePicture, clerkId }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first();

    if (existingUser) {
      return null;
    }

    await ctx.db.insert("users", {
      name,
      email,
      profilePicture,
      clerkId,
      portfolio: null,
      showPortfolio: false,
      professionalTitle: null,
      expoPushToken: null,
      githubUrl: null,
      linkedinUrl: null,
      facebookUrl: null,
      twitterUrl: null,
      updatedTime: Date.now(),
    });
  },
});
