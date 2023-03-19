import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { ButtonLink, PageHeader, RemixLink, RemixLinkText } from "~/components";
import { userModel } from "~/models";
import { authenticator } from "~/services";
import { cn, createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  invariant(userSession);

  const user = await userModel.getUserForSession({ id: userSession.id });
  invariant(user, "User not found");

  const metrics = await userModel.getMetrics({ id: userSession.id });
  invariant(metrics, "User metrics not available");

  return json({ user, metrics });
}

export default function UserDashboardRoute() {
  const { user, metrics } = useLoaderData<typeof loader>();
  const isAdmin = user.role.symbol === "ADMIN";

  return (
    <div data-id="user-dashboard" className="space-y-4">
      <PageHeader size="xs" withBackground={false} withContainer={false}>
        <h1>User Dashboard</h1>
      </PageHeader>

      <section className="space-y-2">
        <h2>Welcome, {user.name}!</h2>
        <h3>
          <span>Dashboard for </span>
          <RemixLinkText to={`/${user.username}`}>
            @{user.username}
          </RemixLinkText>
        </h3>
      </section>

      <section>
        <ul className="grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {metrics.map((metric) => {
            return (
              <li key={metric.id}>
                <RemixLink
                  to={`/${user.username}`}
                  className={cn("card", "flex flex-col p-4 text-center")}
                >
                  <h3 className="text-4xl font-extrabold">{metric.count}</h3>
                  <span className="mt-2 text-sm">{metric.name}</span>
                </RemixLink>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <div className="stack-h-center">
          <ButtonLink variant="danger" size="sm" to="/logout">
            Log out
          </ButtonLink>
          {isAdmin && (
            <ButtonLink variant="info" size="sm" to="/admin">
              Admin
            </ButtonLink>
          )}
        </div>
      </section>
    </div>
  );
}
