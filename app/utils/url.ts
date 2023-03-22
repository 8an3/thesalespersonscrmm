import { useSearchParams } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";

// React hooks
export function useRedirectTo() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || undefined;

  return { searchParams, redirectTo };
}

// Utilify for server-side
export function getRedirectTo(request: Request) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") || undefined;

  return redirectTo;
}

// Utilify for Remix action
export function getAllSearchQuery({ request }: Pick<LoaderArgs, "request">) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  return {
    q,
  };
}
