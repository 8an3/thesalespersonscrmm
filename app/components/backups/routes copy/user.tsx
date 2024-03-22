import { Outlet } from "@remix-run/react";
import { Layout } from "~/components";
import { requireUserSession } from "~/helpers";
import { createSitemap } from "~/utils";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { prisma } from "~/libs";
import { getSession } from '~/sessions/auth-session.server';
import Sidebar from "~/components/shared/sidebar";
// <Sidebar />

export const handle = createSitemap();

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email")


  const user = await GetUser(email)
  /// console.log(user, account, 'wquiote loadert')
  if (!user) {
    redirect('/login')
  }
  return user;
}

export async function action({ request }: ActionArgs) {
  await requireUserSession(request);
  return null;
}

export default function Route() {
  return (
    <Layout isSpaced className="bg-slate12">
      <Sidebar />
      <div className="grow bg-slate12">
        <Outlet />
      </div>
    </Layout>
  );
}
