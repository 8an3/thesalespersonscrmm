import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import { NewLeadsNot } from '~/helpers/notifications'
import type { UserData, UserSession } from "~/helpers";
import type { getEnv } from "~/utils";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect = "/"
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }
  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }
  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} routeId The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */

export type RootLoaderData = {
  ENV: ReturnType<typeof getEnv>;
  userSession: UserSession | undefined;
  user: UserData | undefined;
  notificationsNewLead: any;
};

export function useMatchesData(
  routeId: string
): Record<string, unknown> | RootLoaderData {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === routeId),
    [matchingRoutes, routeId]
  );

  return route?.data;
}

/**
 * Get data from the root route loader
 */
export function useRootLoaderData() {
  const data = useMatchesData("root") as RootLoaderData;
  const NewLeadsNotifications = NewLeadsNot()

  return {
    ENV: data?.ENV,
    userSession: data?.userSession,
    user: data?.user,
    notifications: NewLeadsNotifications,
  };
}
