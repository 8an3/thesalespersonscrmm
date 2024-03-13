import { Container } from "@radix-ui/themes";
import { Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import { getSession } from '~/sessions/auth-session.server';
import { prisma } from "~/libs";
import { model } from "~/models";
import Sidebar from "~/components/shared/sidebar";
import { LinksFunction, json } from "@remix-run/node";
import NotificationSystem from "./notifications";
import slider from '~/styles/slider.css'
import secondary from '~/styles/secondary.css'

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: slider },
  { rel: "stylesheet", href: secondary },
];

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email")


  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      subscriptionId: true,
      customerId: true,
      returning: true,
      phone: true,
      dealer: true,
      position: true,
      roleId: true,
      profileId: true,
      omvicNumber: true,
      role: { select: { symbol: true, name: true } },
    },
  });
  /// console.log(user, account, 'wquiote loadert')
  const notifications = await prisma.notificationsUser.findMany({
    where: {
      userId: user.id,
    }
  })
  const notificationsNewLead = await prisma.notificationsUser.findMany({
    where: {
      type: 'New Lead',
    }
  })
  if (!user) {
    redirect('/login')
  }
  return json({ user, notifications, notificationsNewLead });
}

export default function Quote() {
  const { notifications, user } = useLoaderData()
  // <Sidebar user = { user } />
  // <NotificationSystem notifications={notifications} />
  //
  return (
    <html lang="en" className="bg-black" >
      <head className="bg-black">
      </head>
      <body id="__remix" className="m-0 p-0 h-[100vh] bg-black" style={{ background: '#000', margin: 0, padding: 0 }}>
        <Sidebar />
        <NotificationSystem />
        <Outlet />
      </body >
    </html >
  );
}
