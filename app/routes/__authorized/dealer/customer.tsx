/* eslint-disable tailwindcss/classnames-order */
import { Form, Outlet, useFetcher, useLoaderData, useParams, useSubmit, Link, useNavigate, } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "~/components/ui/card";
import { type LoaderFunction, type DataFunctionArgs, redirect, type V2_MetaFunction, type ActionFunction, json, LinksFunction, } from '@remix-run/node'
import { getDealerFeesbyEmail } from "~/utils/user.server";
import { getAllFinanceNotes } from '~/utils/financeNote/get.server';
import { getClientListMerged, getMergedFinanceOnFinance } from "~/utils/dashloader/dashloader.server";
import React, { useEffect, useState } from "react";
import { prisma } from "~/libs";
import { Flex, Text, Box, TextArea, TextField, Heading, Select, Theme, ThemePanel, Inset, Grid, Avatar } from '@radix-ui/themes';
import { Badge } from "~/ui/badge";
import { getSession } from "~/sessions/auth-session.server";
import { GetUser } from "~/utils/loader.server";
import { getSession as sixSession, commitSession as sixCommit, } from '~/utils/misc.user.server'
import { getSession as sixsix, commitSession as sixsixcommit, } from '~/utils/pref.server'
import { Separator } from "~/components/ui/separator"
import { cn } from "~/components/ui/utils"
import { Button, buttonVariants } from "~/components/ui/button"
import secondary from "~/styles/secondary.css";
import { toast } from "sonner";

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/svg", sizes: "32x32", href: "/money24.svg", },
  { rel: "icon", type: "image/svg", sizes: "16x16", href: "/money16.svg", },
  { rel: "stylesheet", href: secondary },

]


export function SidebarNav({ mergedFinanceList, }) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0  ",
      )}
    >
      {mergedFinanceList && mergedFinanceList.map((item) => (
        <Link
          key={item.to}
          to={`/dealer/customer/${item.clientfileId}/${item.financeId}`}
          className="justify-start py-3" >
          <p variant='ghost' className="bg-muted hover:bg-muted hover:bg-transparent hover:underline" >
            <div>
              <p>
                {item.year} {item.brand}
              </p>
            </div>
            <div>
              <p>
                {item.model.toString().slice(0, 28)}
              </p>
            </div>
            <Badge className="">{item.customerState}</Badge>

          </p>
        </Link>
      ))
      }
    </nav >
  )
}

export async function loader({ request, params }: LoaderFunction) {
  const session2 = await getSession(request.headers.get("Cookie"));
  const email = session2.get("email")
  const user = await GetUser(email)

  if (!user) { redirect('/login') }
  return json({ user })

}



export default function SettingsLayout() {

  return (
    <div className='max-w-full w-full overflow-x-clip'>
      <Outlet />
    </div>
  )
}
/** <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Client File</h2>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/6">
            {/*  <SidebarNav mergedFinanceList={mergedFinanceList} />*
            </aside>
            <div className="flex-1 mr-3">
              <Outlet />
            </div>
          </div>
        </div> */
