import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Badge } from "~/components";
import { model } from "~/models";
import { createSitemap } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userRoles = await model.userRole.query.getAll();
  return json({ userRoles });
}

export default function Route() {
  const { userRoles } = useLoaderData<typeof loader>();

  return (
    <div className='max-w-xl  stack mx-auto justify-center text-foreground'>

      <header>
        <span>All User Roles</span>
      </header>

      {userRoles.length <= 0 && <span>No user roles. Please add.</span>}

      {userRoles.length > 0 && (
        <ul className="stack">
          {userRoles.map((userRole) => {
            return (
              <li key={userRole.symbol} className="card-sm mt-5">
                <div className="queue-center  ">
                  <Badge>{userRole.symbol}</Badge>
                </div>
                <p>{userRole.description}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
