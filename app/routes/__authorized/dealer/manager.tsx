import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { json, redirect, type LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getSession, commitSession, authSessionStorage, destroySession } from "~/sessions/auth-session.server";
import { GetUser } from "~/utils/loader.server";
import NotificationSystem from "~/routes/__authorized/dealer/notifications";

import { Separator } from "~/components/ui/separator"
import { SidebarNav } from "~/components/ui/sidebar-nav"
import { prisma } from '~/libs';
import { managerSidebarNav } from '~/components/shared/sidebar'

export async function loader({ request }: LoaderFunction) {
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email")

  let user = await GetUser(email)
  //console.log(user, 'manager')
  //console.log(user, 'manager')
  //if (!user) { return json({ status: 302, redirect: '/login' }); };
  //const symbol = user.role.symbol
  //  if (symbol !== 'ADMIN' && symbol !== 'MANAGER' && symbol !== 'EDITOR') {    return redirect(`/`);  } else {
  return json({ user });
  //}
}





interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="max-w-screen hidden max-h-screen space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Manager Menu</h2>
          <p className="text-muted-foreground">
            Advanced functionality for managers.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={managerSidebarNav} />
          </aside>
          <div className="flex-1 w-[100%] h-[100%]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
