/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions_portfolios from "../actions/portfolios.js";
import type * as http from "../http.js";
import type * as mutations_bookmarks from "../mutations/bookmarks.js";
import type * as mutations_portfolios from "../mutations/portfolios.js";
import type * as mutations_technologies from "../mutations/technologies.js";
import type * as mutations_users from "../mutations/users.js";
import type * as queries_bookmarks from "../queries/bookmarks.js";
import type * as queries_portfolios from "../queries/portfolios.js";
import type * as queries_technologies from "../queries/technologies.js";
import type * as queries_titles from "../queries/titles.js";
import type * as queries_users from "../queries/users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "actions/portfolios": typeof actions_portfolios;
  http: typeof http;
  "mutations/bookmarks": typeof mutations_bookmarks;
  "mutations/portfolios": typeof mutations_portfolios;
  "mutations/technologies": typeof mutations_technologies;
  "mutations/users": typeof mutations_users;
  "queries/bookmarks": typeof queries_bookmarks;
  "queries/portfolios": typeof queries_portfolios;
  "queries/technologies": typeof queries_technologies;
  "queries/titles": typeof queries_titles;
  "queries/users": typeof queries_users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
