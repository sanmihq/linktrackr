 import { mutation, query } from "./_generated/server";
 import { v } from "convex/values";
 import { nanoid } from "nanoid";

 const DOMAIN = "http://localhost:3000";

 export const createTrackingLink = mutation({
   args: {
     originalUrl: v.string(),
     userId: v.optional(v.string()),
   },
   handler: async (ctx, args) => {
     const trackingId = nanoid(8);
     const newUrlId = nanoid(6);
     const newUrl = `${DOMAIN}/${newUrlId}`;
     const accessLink = `${DOMAIN}/track/${trackingId}`;

     await ctx.db.insert("links", {
       originalUrl: args.originalUrl,
       newUrlId,
       newUrl,
       trackingId,
       accessLink,
       userId: args.userId,
       createdAt: Date.now(),
     });

     return { accessLink, newUrl, trackingId };
   },
 });

 export const getTrackingLink = query({
   args: {
     trackingId: v.string(),
   },
   handler: async (ctx, args) => {
     const link = await ctx.db
       .query("links")
       .filter((q) => q.eq(q.field("trackingId"), args.trackingId))
       .first();

     if (!link) return null;
     return link;
   },
 });

 export const deleteTrackingLink = mutation({
   args: {
     trackingId: v.string(),
   },
   handler: async (ctx, args) => {
     const link = await ctx.db
       .query("links")
       .filter((q) => q.eq(q.field("trackingId"), args.trackingId))
       .first();

     if (link) {
       await ctx.db.delete(link._id);
     }
   },
 });

 export const getUserLinks = query({
   args: {
     userId: v.optional(v.string()),
   },
   handler: async (ctx, args) => {
     const userLinks = await ctx.db
       .query("links")
       .filter((q) => q.eq(q.field("userId"), args.userId))
       .collect();

     return userLinks;
   },
 });
