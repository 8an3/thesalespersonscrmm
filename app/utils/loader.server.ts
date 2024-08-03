//import { GetUser } from "~/utils/loader.server";
import { redirect } from "@remix-run/node";
import { prisma } from "~/libs";

export async function GetUser(email) {
  if (!email) {
    return redirect('/login')
  }
  let user = await prisma.user.findUnique({
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
      roleId: true,
      profileId: true,
      omvicNumber: true,
      lastSubscriptionCheck: true,
      profile: true,
      activisUserId: true,
      activixEmail: true,
      activixActivated: true,
      newLook: true,
      activixId: true,
      dealerAccountId: true,
      microId: true,
      givenName: true,
      familyName: true,
      identityProvider: true,
      plan: true,
      positions: { select: { position: true } },
      role: { select: { symbol: true, name: true } },
      customerSync: { select: { orderId: true, updatedAt: true } }
    },
  });

  return user
}
