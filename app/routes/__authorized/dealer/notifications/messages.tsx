import { prisma } from "~/libs";
import { json, type LoaderArgs, type LoaderFunction } from "@remix-run/node";
import { getSession } from '~/sessions/auth-session.server'
import { model } from "~/models";
import { GetUser } from "~/utils/loader.server";

export async function loader({ request, params }: LoaderFunction) {
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email")

  // const notifications = await prisma.notificationsUser.findMany({    where: {      userEmail: email,    }  })
  // let messages = notifications.filter(notification =>    notification.to === user.email && notification.type == 'messages'  );
  const notiMessages = await prisma.notificationsUser.findMany({
    where: {
      type: 'messages',
    },
    select: {
      id: true,
      title: true,
      content: true,
      dismiss: true,
      type: true,
      subType: true,
      financeId: true,
      clientfileId: true,
      to: true,
      from: true,
      userEmail: true,
      read: true,
    },
    orderBy: {
      createdAt: 'desc', // Optional: Order by creation date
    },
  });
  const getMessages = () => {
    return notiMessages.map(notification => ({
      ...notification,
      read: notification.reads[0]?.read || false, // Extract read status
    }));
  }
  const messages = getMessages()

  return messages
}
