import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { json, redirect, } from "@remix-run/node";
import { Form, Link, useLoaderData, useLocation, Await, useFetcher, useSubmit, useNavigate } from "@remix-run/react";
import React, { useEffect, useRef, useState, Suspense } from "react";
import { useEventSource } from "remix-utils";
import { emitter } from "~/services/emitter";
import { getSession } from '~/sessions/auth-session.server'
import { model } from "~/models";
import { toast } from "sonner";
import { useRootLoaderData } from '~/hooks/use-root-loader-data';
import { GetUser } from "~/utils/loader.server";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs"
import { Bell, BellRing, BookOpenCheck, Mail, Milestone, X } from 'lucide-react';
import { Button, Input, Label } from "~/components/ui";
import useSWR, { SWRConfig, mutate } from 'swr';
import EmailMessages from "./notifications/email";
import {
  CalendarIcon,
  CheckIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command"
import Handler from "../IFrameComp/newEmails";
import { cn } from "~/utils";
import { testInbox } from "~/components/microsoft/GraphService";
import {
  IoIosMailUnread,
  IoIosMail,
  IoMdAlert,
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";
import { prisma } from "~/libs/prisma.server";
import financeFormSchema from '~/overviewUtils/financeFormSchema';
import InterruptionsForm from "~/components/shared/interruptionsForm";

function NotificationSkeleton() {
  return (
    <p className='text-[#fff]'>No notifications</p>
  )
}

let url4 = 'http://localhost:3000/dealer/notifications/email'
let url3 = 'http://localhost:3000/dealer/notifications/newLead'
let url2 = 'http://localhost:3000/dealer/notifications/updates'
let url1 = 'http://localhost:3000/dealer/notifications/messages'

export default function NotificationSystem(interruptionsData) {
  const { } = useLoaderData()
  const [notifications, setNotifications] = useState()
  const [emails, setEmails] = useState([])
  const [emailsCount, setEmailsCount] = useState(0)
  const [value, setValue] = React.useState("")
  const [open, setOpen] = useState(false)
  const submit = useSubmit();
  const fetcher = useFetcher()

  useEffect(() => {
    const getEmails = window.localStorage.getItem("emails");
    const parseemailData = getEmails ? JSON.parse(getEmails) : [];
    setEmails(parseemailData);
  }, []);

  const $form = useRef<HTMLFormElement>(null);
  const { key } = useLocation();
  useEffect(
    function clearFormOnSubmit() {
      $form.current?.reset();
    },
    [key],
  );

  const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
  };
  const useSWRWithInterval = (url, refreshInterval) => {
    return useSWR(url, fetchData, { refreshInterval });
  };

  const userMessages = useSWRWithInterval(url1, 180000);
  const newUpdates = useSWRWithInterval(url2, 180000) || [];
  const notificationsNewLead = useSWRWithInterval(url3, 180000);
  const notificationsEmail = useSWRWithInterval(url4, 300000);


  const [unread, setUnread] = useState(0);
  const [leadCount, setLeadCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const combined = {
    ...userMessages, ...notificationsEmail
  }
  useEffect(() => {
    if (Array.isArray(userMessages)) {
      const unreadCount = userMessages.filter((message) => !message.read).length;
      setUnread(unreadCount);
    }
    if (Array.isArray(notificationsNewLead)) {
      const unreadCount = notificationsNewLead.filter((notification) => !notification.read).length;
      setLeadCount(unreadCount);
    }
    if (Array.isArray(newUpdates)) {
      const unreadCount = newUpdates.filter((update) => !update.read).length;
      setUpdateCount(unreadCount);
    }
    if (Array.isArray(combined)) {
      const unreadCount = combined.filter((email) => !email.read).length;
      setMessageCount(unreadCount);
    }
  }, [userMessages, notificationsNewLead, newUpdates, notificationsEmail, combined]);

  const totalNotifications = unread + leadCount + updateCount + messageCount;

  const handleRowClick = async (notification) => {
    const formData = new FormData();
    formData.append("read", true);
    formData.append("intent", "reading");
    formData.append("id", notification.id);
    submit(formData, { method: "post" });
    await fetch(url2, {
      method: 'put',
    });
    mutate()
  };

  const handleRowClickNewLeads = async (notification) => {
    const formData = new FormData();
    formData.append("read", true);
    formData.append("intent", "reading");
    formData.append("id", notification.id);
    submit(formData, { method: "post" });
    await fetch(url3, {
      method: 'put',
    });
    mutate()
  };

  //const newLeads = newUpdates
  //console.log(emails, 'notifications', newUpdates, 'notifications', notificationsNewLead, 'notificationsNewLead')
  // <Bell color="#fff" strokeWidth={1.5} className="text-2xl hover:text-[#02a9ff]" />
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size='icon' variant="outline" className="right-[75px] top-[25px] border-none fixed hover:bg-transparent bg-transparent hover:text-[#02a9ff]" aria-expanded={open}>
            <div className=" h-t relative w-7">
              <div className="pointer-events-none absolute -right-4 -top-0.5 flex size-full">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex  size-full animate-ping rounded-full bg-[#02a9ff] opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-[#0078b4]"></span>
                </span>
              </div>
              <IoIosMailUnread color="#ededed" className="text-2xl hover:text-[#02a9ff] text-[##ededed]" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command className="rounded-lg border shadow-md bg-[#09090b] border-[#27272a] text-[#f1f1f1]">
            <CommandInput className='bg-[#09090b] border-[#27272a] text-[#f1f1f1]' placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Messages">
                {Array.isArray(emails) &&
                  emails.map((email) => (
                    <CommandItem
                      key={email.id}
                      value={email.sender.emailAddress.address}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                      className='cursor-pointer'
                    >
                      <ul className="grid gap-3 text-sm mt-2">
                        <li className="flex items-center justify-between">
                          <span className=" ">
                            {email.sender.emailAddress.name}
                          </span>
                          <span className="text-[#909098] text-xs">
                            {email.createdDateTime}
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className=" text-[#909098]">
                            {email.subject}
                          </span>
                          <span className="">
                          </span>
                        </li>
                      </ul>
                      <Mail
                        color="#ffffff"
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === email.sender.emailAddress.address ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Updates">
                {newUpdates && newUpdates.length > 0 ? (
                  newUpdates.map((notification) => (
                    <CommandItem
                      key={notification.id}
                      value={notification.emailAddress.address}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        handleRowClickNewLeads(notification);
                      }}
                      className="cursor-pointer"
                    >
                      <ul className="grid gap-3 text-sm mt-2">
                        <li className="flex items-center justify-between">
                          <span>{notification.title}</span>
                          <span className="text-[#909098] text-xs">
                            {new Date(notification.createdAt).toLocaleString()}
                          </span>
                        </li>
                      </ul>
                    </CommandItem>
                  ))
                ) : <CommandItem>No new updates, currently.   </CommandItem>}

              </CommandGroup>
              <CommandGroup heading="New Leads">
                {notificationsNewLead && notificationsNewLead.length > 0 ? (
                  notificationsNewLead.map((notification) => (
                    <CommandItem
                      key={notification.id}
                      value={notification.emailAddress.address}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        handleRowClickNewLeads(notification);
                      }}
                      className="cursor-pointer"
                    >
                      <ul className="grid gap-3 text-sm mt-2">
                        <li className="flex items-center justify-between">
                          <span>{notification.title}</span>
                          <span className="text-[#909098] text-xs">
                            {new Date(notification.createdAt).toLocaleString()}
                          </span>
                        </li>
                      </ul>
                    </CommandItem>
                  ))
                ) : (
                  <CommandItem>No new leads, currently.</CommandItem>
                )
                }
              </CommandGroup>
              <CommandGroup heading="Reminders">

                <InterruptionsForm interruptionsData={interruptionsData} />
              </CommandGroup>

            </CommandList>
          </Command>
        </PopoverContent>
      </Popover >
    </>
  )

}

export async function loader({ request, params }: LoaderFunction) {
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email")
  const interruptions = await prisma.interruptions.findMany({ where: { userEmail: email, read: 'false' } })
  const user = await GetUser(email)
  if (!user) { redirect('/login') }
  const notifications = await prisma.notificationsUser.findMany({ where: { userEmail: email } })
  return json({ user, notifications, interruptions });
}

export async function action({ request }: LoaderArgs) {
  const formPayload = Object.fromEntries(await request.formData())
  const formData = financeFormSchema.parse(formPayload);
  const lastMessage = formData.get("lastMessage")
  const title = formData.get('title')
  const userId = formData.get('userId')
  const financeId = formData.get('financeId')
  const clientfileId = formData.get('clientfileId')
  const isRead = formData.get('isRead')
  const message = `${lastMessage}`
  emitter.emit("notification", message);
  const session = await getSession(request.headers.get('Cookie'));
  const email = session.get('email')
  const user = await GetUser(email)
  const intent = formData.get('intent')
  if (intent === 'reading') {
    const isRead = await prisma.notificationsUser.update({
      where: {
        id: notification.id
      },
      data: {
        read: true
      }
    })
    return isRead
  }


  return json({ message, });
}


/**  const { data: userMessages } = useSWR(
    url1,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 180000 }
  );

  const { data: newUpdates } = useSWR(
    url2,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 180000 }
  );

  const { data: notificationsNewLead } = useSWR(
    url3,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 180000 }
  );

  const { data: notificationsEmail } = useSWR(
    url4,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 300000 }
  ); */

/**{totalNotifications > 1 && (
<>
<span className="relative t-3 r-3 h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#02a9ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0085c7]"></span>
          </span>
</>
          )} */

/**
 *
 *
 *     <li key={notification.id} className={`rounded-md shadow mt-2 mx-auto ${notification.isRead ? 'bg-[#454954]' : 'bg-[#45495486]'}`}>
                      <Link to='/leads/sales'>

                        <div className="grid grid-cols-10 ">
                          <div className="col-span-9 p-3" onClick={() => { handleRowClick(notification); }} >
                            <div className="flex justify-between" >
                              <h2 className='text-[#fff]'>
                                {notification.title}
                              </h2>
                              <p className='text-[#ffffffad] text-sm mt-auto'>
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <p className='text-[#fff]'>
                              {notification.content}
                            </p>
                          </div>
                          <div className="col-span-1">
                          </div>
                        </div>
                      </Link>
                    </li>




                    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="right-[75px] top-[25px] border-none fixed hover:bg-transparent bg-transparent hover:text-[#02a9ff]">
          <div className=' relative h-t w-7'>
            <div className='pointer-events-none absolute  right-1 -top-3 flex h-full w-full'>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute  inline-flex h-full w-full rounded-full bg-[#02a9ff] opacity-75">
                </span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0078b4]">
                </span>
              </span>
            </div>
            <Bell color="#fff" strokeWidth={1.5} className="text-2xl hover:text-[#02a9ff]" />

          </div>

        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] bg-[#1c2024] justify-center items-center  mx-auto mr-10 max-h-[75%] overflow-y-scroll">
        <Tabs defaultValue="Msgs" className="w-[580PX] mx-auto justify-center items-center">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="Msgs" className="text-sm">Msgs</TabsTrigger>
            <TabsTrigger value="Updates" className="text-sm">Updates</TabsTrigger>
            <TabsTrigger value="NewLeads" className="text-sm">New Leads</TabsTrigger>
          </TabsList>
          <TabsContent value="Msgs" >
            <Suspense fallback={<NotificationSkeleton />}>
              <Await resolve={userMessages}>
                {(combined) => <NotificationTemplate data={combined} mutate={mutate} url1={url1} url4={url4} />}
              </Await>
            </Suspense>
          </TabsContent>
          <TabsContent value="Updates"  >
            <Suspense fallback={<NotificationSkeleton />}>
              <Await resolve={newUpdates}>
                {(newUpdates) => <UpdateMesages data={newUpdates} mutate={mutate} url2={url2} />}
              </Await>
            </Suspense>
          </TabsContent>
          <TabsContent value="NewLeads" >
            <Suspense fallback={<NotificationSkeleton />}>
              <Await resolve={notificationsNewLead}>
                {(notificationsNewLead) => <NotificationsNewLead data={notificationsNewLead} mutate={mutate} url3={url3} />}
              </Await>
            </Suspense>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>`` */



export async function GetEmailsCount(accessToken) {
  const response = await fetch(`https://graph.microsoft.com/v1.0/me/mailFolders/inbox`, {// or https://graph.microsoft.com/v1.0/me/messages
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}


function NotificationTemplate({ data, mutate, url1, url4 }) {
  const [notifications, setNotifications] = useState(data.userMessages)
  const [emails, setEmails] = useState([])
  const [emailsCount, setEmailsCount] = useState(0)
  const [idToken, setIdToken] = useState(EmailMessages)
  const location = useLocation()
  const pathname = location.pathname
  let fetcher = useFetcher()
  const submit = useSubmit();

  const handleRowClick = async (notification) => {
    const formData = new FormData();
    formData.append("read", true);
    formData.append("intent", "reading");
    formData.append("id", notification.id);
    submit(formData, { method: "post" });
    await fetch(url1, {
      method: 'put',
    });
    mutate()
  };
  useEffect(() => {
    const GetEmailsData = async () => {
      const getEmails = await GetEmails(idToken)
      //const getEmailsCount = await GetEmailsCount(idToken)
      setEmails(getEmails.value)
      // setEmailsCount(getEmailsCount.value)
    }
    GetEmailsData()
  }, []);

  return (
    <>
      <ul>
        {emails && emails.length > 0 ? (
          emails.map((notification) => (
            <li key={notification.id} className={`rounded-md shadow mt-2 mx-auto ${notification.isRead ? 'bg-[#454954]' : 'bg-[#45495486]'}`}>
              <p>{emailsCount} , emailsCount</p>
              <div className="grid grid-cols-10 ">
                <div className="col-span-9 p-3" onClick={() => { handleRowClick(notification); }} >
                  <div className="flex justify-between" >
                    <h2 className='text-[#fff]'>
                      {notification.title}
                    </h2>
                    <p className='text-[#ffffffad] text-sm mt-auto'>
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className='text-[#fff]'>
                    {notification.content}
                  </p>
                </div>


                <div className="col-span-1">
                  <fetcher.Form method='post' className=" justify-end items-end">
                    <input type='hidden' name='financeId' value={notification.financeId} />
                    <input type='hidden' name='clientfileId' value={notification.clientfileId} />
                    <input type='hidden' name='id' value={notification.id} />
                    <input type='hidden' name='path' value={pathname} />
                    <input type='hidden' name='intent' value='dimiss' />

                    <input type='hidden' name='userId' value={notification.userId} />
                    <Button className='text-[#fff] '>
                      <X color="#02a9ff" size={20} strokeWidth={1.5} />
                    </Button>
                  </fetcher.Form>
                  <fetcher.Form method='post'>
                    <input type='hidden' name='financeId' value={notification.financeId} />
                    <input type='hidden' name='clientfileId' value={notification.clientfileId} />
                    <input type='hidden' name='id' value={notification.id} />
                    <input type='hidden' name='userId' value={notification.userId} />
                    <input type='hidden' name='path' value={pathname} />
                    <input type='hidden' name='intent' value='read' />
                    <Button className='text-[#fff] justify-center  items-center'>
                      <BookOpenCheck size={20} color="#02a9ff" strokeWidth={1.5} />
                    </Button>
                  </fetcher.Form>
                  <Link to={`/dealer/customer/${notification.clientfileId}/${notification.financeId}`} >
                    <Button className='text-[#fff] justify-center  items-center'>
                      <Milestone size={20} color="#02a9ff" strokeWidth={1.5} />
                    </Button>
                  </Link>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className='text-[#fff]'>No notifications</p>
        )
        }
      </ul >
      <ul>
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification.id} className={`rounded-md shadow mt-2 mx-auto ${notification.isRead ? 'bg-[#454954]' : 'bg-[#45495486]'}`}>
              <div className="grid grid-cols-10 ">
                <div className="col-span-9 p-3" onClick={() => { handleRowClick(notification); }} >
                  <div className="flex justify-between" >
                    <h2 className='text-[#fff]'>
                      {notification.title}
                    </h2>
                    <p className='text-[#ffffffad] text-sm mt-auto'>
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className='text-[#fff]'>
                    {notification.content}
                  </p>
                </div>


                <div className="col-span-1">
                  <fetcher.Form method='post' className=" justify-end items-end">
                    <input type='hidden' name='financeId' value={notification.financeId} />
                    <input type='hidden' name='clientfileId' value={notification.clientfileId} />
                    <input type='hidden' name='id' value={notification.id} />
                    <input type='hidden' name='path' value={pathname} />
                    <input type='hidden' name='intent' value='dimiss' />

                    <input type='hidden' name='userId' value={notification.userId} />
                    <Button className='text-[#fff] '>
                      <X color="#02a9ff" size={20} strokeWidth={1.5} />
                    </Button>
                  </fetcher.Form>
                  <fetcher.Form method='post'>
                    <input type='hidden' name='financeId' value={notification.financeId} />
                    <input type='hidden' name='clientfileId' value={notification.clientfileId} />
                    <input type='hidden' name='id' value={notification.id} />
                    <input type='hidden' name='userId' value={notification.userId} />
                    <input type='hidden' name='path' value={pathname} />
                    <input type='hidden' name='intent' value='read' />
                    <Button className='text-[#fff] justify-center  items-center'>
                      <BookOpenCheck size={20} color="#02a9ff" strokeWidth={1.5} />
                    </Button>
                  </fetcher.Form>
                  <Link to={`/dealer/customer/${notification.clientfileId}/${notification.financeId}`} >
                    <Button className='text-[#fff] justify-center  items-center'>
                      <Milestone size={20} color="#02a9ff" strokeWidth={1.5} />
                    </Button>
                  </Link>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className='text-[#fff]'>No notifications</p>
        )
        }
      </ul >
    </>

  )
}


const UpdateMesages = ({ data, mutate, url2 }) => {
  const notifications = data.newUpdates
  const location = useLocation()
  const pathname = location.pathname
  let fetcher = useFetcher()
  const submit = useSubmit();
  const handleRowClick = async (notification) => {

    const formData = new FormData();
    formData.append("read", true);
    formData.append("intent", "reading");
    formData.append("id", notification.id);
    submit(formData, { method: "post" });
    await fetch(url2, {
      method: 'put',
    });
    mutate()
  };
  return (
    <ul>
      {notifications && notifications.length > 0 ? (
        notifications.map((notification) => (
          <li key={notification.id} className={`rounded-md shadow mt-2 mx-auto ${notification.isRead ? 'bg-[#454954]' : 'bg-[#45495486]'}`}>
            <div className="grid grid-cols-10 ">
              <div className="col-span-9 p-3" onClick={() => { }} >
                <div className="flex justify-between" >
                  <h2 className='text-[#fff]'>
                    {notification.title}
                  </h2>
                  <p className='text-[#ffffffad] text-sm mt-auto'>
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className='text-[#fff]'>
                  {notification.content}
                </p>
              </div>


              <div className="col-span-1">
                <fetcher.Form method='post' className=" justify-end items-end">
                  <input type='hidden' name='financeId' value={notification.financeId} />
                  <input type='hidden' name='clientfileId' value={notification.clientfileId} />
                  <input type='hidden' name='id' value={notification.id} />
                  <input type='hidden' name='path' value={pathname} />
                  <input type='hidden' name='intent' value='dimiss' />

                  <input type='hidden' name='userId' value={notification.userId} />
                  <Button className='text-[#fff] '>
                    <X color="#02a9ff" size={20} strokeWidth={1.5} />
                  </Button>
                </fetcher.Form>
                <fetcher.Form method='post'>
                  <input type='hidden' name='financeId' value={notification.financeId} />
                  <input type='hidden' name='clientfileId' value={notification.clientfileId} />
                  <input type='hidden' name='id' value={notification.id} />
                  <input type='hidden' name='userId' value={notification.userId} />
                  <input type='hidden' name='path' value={pathname} />
                  <input type='hidden' name='intent' value='read' />
                  <Button className='text-[#fff] justify-center  items-center'>
                    <BookOpenCheck size={20} color="#02a9ff" strokeWidth={1.5} />
                  </Button>
                </fetcher.Form>
                <Link to={`/customer/${notification.clientfileId}/${notification.financeId}`} >
                  <Button className='text-[#fff] justify-center  items-center'>
                    <Milestone size={20} color="#02a9ff" strokeWidth={1.5} />
                  </Button>
                </Link>
              </div>
            </div>
          </li>
        ))
      ) : (
        <p className='text-[#fff]'>No notifications</p>
      )
      }
    </ul >
  )
}




const NotificationsNewLead = ({ data, mutate, url3 }) => {
  const notifications = data

  const submit = useSubmit();

  const handleRowClick = async (notification) => {

    const formData = new FormData();
    formData.append("read", true);
    formData.append("intent", "reading");
    formData.append("id", notification.id);
    submit(formData, { method: "post" });
    await fetch(url3, {
      method: 'put',
    });
    mutate()
  };

  console.log(notifications, ' in NewLeadsMesages')
  return (
    <div className='max-h-96 overflow-y-scroll'>
      <ul>
        {newLeads && newLeads.length > 0 ? (
          newLeads.map((notification) => (
            <li key={notification.id} className={`rounded-md shadow mt-2 mx-auto ${notification.isRead ? 'bg-[#454954]' : 'bg-[#45495486]'}`}>
              <Link to='/leads/sales'>

                <div className="grid grid-cols-10 ">
                  <div className="col-span-9 p-3" onClick={() => { handleRowClick(notification); }} >
                    <div className="flex justify-between" >
                      <h2 className='text-[#fff]'>
                        {notification.title}
                      </h2>
                      <p className='text-[#ffffffad] text-sm mt-auto'>
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className='text-[#fff]'>
                      {notification.content}
                    </p>
                  </div>


                  <div className="col-span-1">

                  </div>
                </div>

              </Link>
            </li>
          ))
        ) : (
          <p className='text-[#fff]'>No notifications</p>
        )
        }
      </ul >
    </div>
  )
}

export async function getStaticProps1() {
  const res = await fetch(url1);
  const post = await res.json();
  return {
    props: {
      fallback: {
        [url1]: post,
      },
    },
    revalidate: 180,
  };
}

export async function getStaticProps2() {
  const res = await fetch(url2);
  const post = await res.json();
  return {
    props: {
      fallback: {
        [url2]: post,
      },
    },
    revalidate: 170,
  };
}


export async function getStaticProps3() {
  const res = await fetch(url3);
  const post = await res.json();
  return {
    props: {
      fallback: {
        [url3]: post,
      },
    },
    revalidate: 120,
  };
}


export async function getStaticProps4() {
  const res = await fetch(url4);
  const post = await res.json();
  return {
    props: {
      fallback: {
        [url4]: post,
      },
    },
    revalidate: 120,
  };
}
