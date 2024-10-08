import { type model } from "~/models";
import { authenticator } from "~/services/auth";
import { getSession } from "~/sessions/auth-session.server";
import { invariant } from "~/utils";
import { prisma } from "~/libs";
import { getSession as sessionGet, getUserByEmail } from '~/utils/user/get'



import type { Prisma, UserRole } from "@prisma/client";

// User Sesson is a limited user data stored in the auth cookie
export type UserSession = {
  id: string
  name: string
  username: string
  email: string
  profileId: string
  phone: string
  roleId: string
  subscriptionId: string
  returning: string
  lastSubscriptionCheck: string
  customerId: string
  plan: string
  omvicNumber: string
  dealer: string
  dept: string
  order: number
  activixActivated: string
  activixEmail: string
  activisUserId: string
  activixId: string
  dealerAccountId: string
  microId: string
  givenName: string
  familyName: string
  identityProvider: string
  userRoleId: string
  dealerId: number
};

// User Data is a more complete user data that can be retrieved,
// but not stored in the auth cookie
export type UserData = NonNullable<
  Prisma.PromiseReturnType<typeof model.user.query.getForSession>
>;

// Remix way to protect routes
// Can only be used server-side
// https://remix.run/docs/en/main/pages/faq#md-how-can-i-have-a-parent-route-loader-validate-the-user-and-protect-all-child-routes
export async function requireUserSession(
  request: Request,
  expectedRoleSymbols?: UserRole["symbol"][]
) {
  // Get user session from app cookie
  //const userSession = await authenticator.isAuthenticated(request, {
  // failureRedirect: "/login",
  //});
  const userSession = await sessionGet(request.headers.get("Cookie"));



  if (!userSession) {
    await authenticator.logout(request, { redirectTo: "/login" });
  }
  invariant(userSession, "User Session is not available");

  // Get user data from database
  //const user = await model.user.query.getForSession({ id: userSession.id });
  const email = userSession.get("email")
  const user = await getUserByEmail(email)
  if (!user) {
    await authenticator.logout(request, { redirectTo: "/login" });
  }
  invariant(user, "User is not available");

  // Check role if expectedRoleSymbols exist
  const userIsAllowed = expectedRoleSymbols
    ? requireUserRole(user, expectedRoleSymbols)
    : true;

  return {
    userSession,
    user,
    userIsAllowed,
  };
}

export async function requireUserSessiontwo(
  request: Request,
) {
  // Get user session from app cookie
  //const userSession = await authenticator.isAuthenticated(request, {
  // failureRedirect: "/login",
  //});
  const userSession = await sessionGet(request.headers.get("Cookie"));



  if (!userSession) {
    await authenticator.logout(request, { redirectTo: "/login" });
  }
  invariant(userSession, "User Session is not available");

  // Get user data from database
  //const user = await model.user.query.getForSession({ id: userSession.id });
  const email = userSession.get("email")
  const user = await getUserByEmail(email)
  if (!user) {
    await authenticator.logout(request, { redirectTo: "/login" });
  }
  invariant(user, "User is not available");

  return {
    userSession,
    user,
  };
}

// Can be used client-side or server-side
// This simulate a limited RBAC (Role Based Access Control) functionality
// but obviously not perfect
export function requireUserRole(
  user: UserData,
  expectedRoleSymbols?: UserRole["symbol"][]
) {
  // Find if user's role is available in the list
  const userIsAllowed = getUserIsAllowed(user, expectedRoleSymbols);

  // If user's role is not as expected to be allowed
  if (!userIsAllowed) {
    return false;
  } else {
    return true;
  }
}

export async function getUserSession(request: Request) {
  return authenticator.isAuthenticated(request);
}

export async function getUserRedirect(request: Request) {
  const url = new URL(request.url);
  return authenticator.isAuthenticated(request, {
    failureRedirect: `/login?redirect=${url.pathname}`,
  });
}

export async function getAuthErrorSession(request: Request) {
  const session = await getSession(request.headers.get("cookie"));
  const errorSession = session.get(authenticator.sessionErrorKey);
  return errorSession;
}

export function getUserIsAllowed(user?: UserData, expectedRoleSymbols?: UserRole["symbol"][]) {
  if (!user) { return false; }
  const userIsAllowed = expectedRoleSymbols?.find((symbol) =>
    user?.role?.symbol === symbol ||
    user?.role?.symbol === 'ADMINISTRATION' ||
    user?.role?.symbol === 'DEV'
  );
  return userIsAllowed ? true : false;
}
