
import { useMatches } from '@remix-run/react'
import { useMemo } from 'react'

const DEFAULT_REDIRECT = '/'

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  if (!to || typeof to !== 'string') {
    return defaultRedirect
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return defaultRedirect
  }

  return to
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(id) {
  const matchingRoutes = useMatches()
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  )
  return route?.data
}

function isUser(user) {
  return user && typeof user === 'object' && typeof user.email === 'string'
}

export function useOptionalUser() {
  const data = useMatchesData('root')
  if (!data || !isUser(data.user)) {
    return undefined
  }
  return data.user
}

export function useUser() {
  const maybeUser = useOptionalUser()
  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.',
    )
  }
  return maybeUser
}

export function validateEmail(email) {
  return typeof email === 'string' && email.length > 3 && email.includes('@')
}

export * from "./avatar";
export * from "./cache.server";
export * from "./console";
export * from "./currency";
export * from "./datetime";
export * from "./env.server";
export * from "./http";
export * from "./invariant";
export * from "./json";
export * from "./meta";
export * from "./nanoid";
export * from "./number";
export * from "./pluralize";
export * from "./prettyjson.server";
export * from "./random";
export * from "./react";
export * from "./seo";
export * from "./sleep";
export * from "./slug";
export * from "./text";
export * from "./url";
export * from './db.server'
export * from './env.server'
export * from './misc'
export { cn } from './misc'
