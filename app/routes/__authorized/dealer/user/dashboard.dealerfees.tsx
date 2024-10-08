
import { useLoaderData, Form } from '@remix-run/react'
import { type MetaFunction, json, redirect, type ActionFunction, LoaderFunction, } from '@remix-run/node'
import financeFormSchema from '~/overviewUtils/financeFormSchema'
import { getDealerFeesbyEmail, updateDealerFees, updateUser } from '~/utils/user.server'
import * as Toast from '@radix-ui/react-toast';
import React from 'react';
import { prisma } from "~/libs";
import { getSession } from '~/sessions/auth-session.server';
import { requireAuthCookie } from '~/utils/misc.user.server';
import { GetUser } from '~/utils/loader.server';

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/svg", href: "/favicons/settings.svg", },
]

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email")


  const user = await GetUser(email)
  /// console.log(user, account, 'wquiote loadert')
  if (!user) {
    redirect('/login')
  }
  console.log(user, 'email')
  const deFees = await getDealerFeesbyEmail(email)
  return json({ user, deFees });
}

export const action: ActionFunction = async ({ request }) => {
  const formPayload = Object.fromEntries(await request.formData())
  const Input = financeFormSchema.parse(formPayload)
  const fees = await updateDealerFees(Input)
  return (fees)
}

export const meta: MetaFunction = () => {
  return [
    { title: "Dealer Fees || User || Dealer Sales Assistant" },
    {
      property: "og:title",
      content: "Your very own assistant!",
    },
    {
      name: "description",
      content: "To help sales people achieve more. Every automotive dealer needs help, especialy the sales staff. Dealer Sales Assistant will help you close more deals more efficiently.", keywords: 'Automotive Sales, dealership sales, automotive CRM',
    },
  ];
};

export default function Dealerfees() {
  const { deFees } = useLoaderData()
  let finance = ''
  let data = ''
  return (
    <>
      <WelcomeDealerFeesSection deFees={deFees} data={data} finance={deFees} />
    </>
  )
}



export function WelcomeDealerFeesSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto gap-4 ">
      <SalesCard />
      <DealerCard />
    </div>

  )
}

function DealerCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Dealers</CardTitle>
        <CardDescription>
          Some house keeping before you started.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <Bell className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Other Steps</p>
            <p className="text-sm text-muted-foreground">
              All the steps in the sales card are needed to be completed for you as well.
            </p>
          </div>
        </div>
        <NavLink to='/dealer/admin/users/overview'>
          <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
            <User2 className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Adding Employees</p>
              <p className="text-sm text-muted-foreground">
                Here you can add your employees so they can start using the system. Once created you can delegate the previous tasks to them, or take care of them yourself.
              </p>
            </div>
          </div>
        </NavLink>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <Link className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Links</p>
            <p className="text-sm text-muted-foreground">
              Here are the links needed to complete the previous steps, and what position can complete them.
            </p>
            <div className='grid grid-cols-1 justify-center'>

              <NavLink to='/dealer/admin/settings/general'>
                Dealer Fees and Information - Admin / Manager
              </NavLink>
              <NavLink to='/dealer/user/dashboard/templates'>
                Templates - Any
              </NavLink>
              <NavLink to='/dealer/user/dashboard/board'>
                Boards - Any
              </NavLink>
              <NavLink to='/dealer/user/dashboard/scripts'>
                Scripts - Any
              </NavLink>
            </div>
          </div>
        </div>


        <NavLink to='/dealer/admin/importexport/units'>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <Database className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Data</p>
              <p className="text-sm text-muted-foreground">
                To import data from your current CRM.
              </p>
            </div>
          </div>
        </NavLink>
      </CardContent>
    </Card>

  )
}
function SalesCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Sales People</CardTitle>
        <CardDescription>
          Some house keeping before you started.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <NavLink to='/dealer/user/dashboard/dealerFees'>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <Bell className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Dealer Fees</p>
              <p className="text-sm text-muted-foreground">
                First you will need to input your dealer's fees and other values, in your settings section, for the quoting system to populate accurate quotes.
              </p>
            </div>
          </div>
        </NavLink>
        <NavLink to='/dealer/user/dashboard/settings'>
          <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
            <User2 className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Profile</p>
              <p className="text-sm text-muted-foreground">
                Update your profile information as much as you can.
              </p>
            </div>
          </div>
        </NavLink>
        <NavLink to='/dealer/user/dashboard/templates'>

          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <Sheet className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Documents</p>
              <p className="text-sm text-muted-foreground">
                Creating all of your templated documents ahead of time can you alot of it during the sales process, it is worth the initial investment setting everything up. Currently once your done your document you will have to email us the template to have it saved to your clients dashboard so it can be used for every sale. In the future this will be automatic and sending it to us will not be needed.
              </p>
            </div>
          </div>
        </NavLink>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <PauseCircle className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">How to documentation</p>
            <p className="text-sm text-muted-foreground">
              In your drop down, it will display documenation. No matter the page your on it will bring you to that pages video, explaining all the features and abilities that page has. That way you can learn as you go when needed, instead of sitting there for the next 4 hours and only retaining a portain of the information.
            </p>
          </div>
        </div>
        <NavLink to='/dealer/user/dashboard/board'>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <Presentation className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">The Board</p>
              <p className="text-sm text-muted-foreground">
                The board in your settings area is similar to a trello board, it can be used to set up a sale process that works for you and guide you through it when you can't remember, or other ideas like that.
              </p>
            </div>
          </div>
        </NavLink>
        <NavLink to='/dealer/user/dashboard/scripts'>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <ScrollText className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Scripts</p>
              <p className="text-sm text-muted-foreground">
                Building your scripts library now and on the go will save you time when you can reuse that script with the next customer. They're accessible when emailing or texting people so they can come in handy to take care of calls.
              </p>
            </div>
          </div>
        </NavLink>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <Wrench className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Preconfigured</p>
            <p className="text-sm text-muted-foreground">
              Almost everything is pre configured to help you succeed. For example the dashbaord's are already set up to hit the ground running so you don't need to move / hide or display columns for it to be effecient to work with. It is there if you do want it to be different though. Same with scripts, there are already a number that you have access to. Along with a number of other pre configured systems.
            </p>
          </div>
        </div>
        <NavLink to='/dealer/user/dashboard/contact'>
          <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <FileQuestion className="mt-px h-5 w-5" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Suggestions</p>
              <p className="text-sm text-muted-foreground">
                If you see an area/process that can be accomplished more effieciently, let us know and we can update/upgrade it.
              </p>
            </div>
          </div>
        </NavLink>
      </CardContent>
    </Card>

  )
}
