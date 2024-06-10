import { prisma } from "~/libs";
import { json, type LoaderArgs, type LoaderFunction } from "@remix-run/node";
import { getSession } from '~/sessions/auth-session.server'
import { model } from "~/models";
import { GetUser } from "~/utils/loader.server";

export async function loader({ request, params }: LoaderFunction) {
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email")

  const user = await GetUser(email)
  const upcoming = await prisma.notificationsUser.findMany({ where: { userEmail: email } })

  const notifications = await prisma.notificationsUser.findMany({ where: { userEmail: email } })
  let newUpdates = notifications.filter(notification => notification.userEmail === email && notification.type === 'updates');
  return json({ user, newUpdates })
}
