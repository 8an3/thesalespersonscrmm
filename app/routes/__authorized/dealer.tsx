import { json, redirect, type LoaderFunction, type ActionFunction } from '@remix-run/node';
import { Outlet, useFetcher, useLoaderData, useLocation, NavLink, useSubmit, Form } from '@remix-run/react';
import { getSession, commitSession, authSessionStorage, destroySession } from "~/sessions/auth-session.server";
import { GetUser } from "~/utils/loader.server";
import NotificationSystem from "~/routes/__authorized/dealer/notifications";
import { prisma } from '~/libs';
//import Sidebar, { managerSidebarNav, adminSidebarNav, devSidebarNav, } from '~/components/shared/sidebar'
import { Theme, useTheme } from "remix-themes";

import UserSideBar from '~/components/shared/userSideBar';
import Interruptions from '~/components/shared/interruptions';
import financeFormSchema from '~/overviewUtils/financeFormSchema';
import GetData from './dealer/email/notificationsClient';
import SearchFunction from './dealer/search';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Menu, Search } from 'lucide-react';
import { cn } from "~/components/ui/utils"
import {
  RemixNavNavLink, Separator, Button, buttonVariants, Tabs, TabsContent, TabsList, TabsTrigger,
} from "~/components"
import { useEffect, useRef, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import { getUserIsAllowed } from "~/helpers";

import { ButtonIcon } from "~/components";
import { Moon, Sun } from "~/icons";
import SearchFunction2 from './dealer/searchTable';
import useSWR from 'swr';
import SearchByOrderFunction from './dealer/searchByOrder';
import { toast } from 'sonner';
import Warning from '~/overviewUtils/images/warning.svg'

export async function loader({ request, params }: LoaderFunction) {
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email")
  let user = await GetUser(email)
  const interruptionsData = await prisma.interruptions.findMany({ where: { userEmail: email } });
  const notifications = await prisma.notificationsUser.findMany({
    where: { userEmail: email, },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
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
      customerName: true,
      read: true,
    },
    orderBy: { createdAt: 'desc', },
  });
  const host = request.headers.get('host');
  return json({ user, email, interruptionsData, notifications, host });
}

export async function action({ request, params }: ActionFunction) {
  const formPayload = Object.fromEntries(await request.formData())
  const formData = financeFormSchema.parse(formPayload);
  const session = await getSession(request.headers.get('Cookie'));
  const email = session.get('email')
  const user = await GetUser(email)
  const location = String(formData.pathname)
  const date = new Date()
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  if (formData.intent === 'createInterruption') {
    console.log('dealerdealer')
    const url = '/dealer/quote/new/Harley-Davidson';
    const segments = url.split('/');
    const firstTwoParams = `/${segments[1]}/${segments[2]}`;
    const threeParams = `/${segments[1]}/${segments[2]}/${segments[3]}`;
    let title;
    switch (firstTwoParams) {
      case '/dealer/customer':
        const customer = await prisma.finance.findUnique({
          where: { id: segments[2] }
        })
        title = `${customer.firstName} ${customer.lastName}`
        break;
      case '/dealer/email':
        title = `Was in the email client.`
        break;
      case '/dealer/admin':
        title = `Was in the admin section.`
        break;
      case '/dealer/calendar':
        title = `Was on the calendar.`
        break;
      case '/dealer/docs':
        title = `Was going over the docs.`
        break;
      case '/dealer/document':
        title = `Was building a document.`
        break;
      case '/dealer/editor':
        title = `Was creating a template.`
        break;
      case '/dealer/inventory':
        title = `Was going over inventory.`
        break;
      case '/dealer/leads':
        title = `Was working on the dashboard.`
        break;
      case '/dealer/manager':
        title = `Was in the manager section.`
        break;
      default:
        title = location
    }

    const saveInt = await prisma.interruptions.create({
      data: {
        userEmail: user?.email,
        location: location,
        date: date.toLocaleDateString('en-US', options),
        title: title,
        read: 'false'
      }
    })
    return saveInt
  }
  if (formData.intent === 'updateInterruption') {
    try {
      console.log('dealerdealer');
      await prisma.interruptions.update({
        where: { id: formData.id },
        data: {
          read: 'true'
        }
      });
      const location = formData.pathname
      return redirect(String(location));
    } catch (error) {
      console.error('Error updating interruption:', error);
      throw error;
    }
  }
  if (formData.intent === 'updateNewLead') {
    await prisma.notificationsUser.update({
      where: { id: formData.notificationId },
      data: {
        read: true
      }
    });
    const location = `/dealer/leads/sales/newLeads`
    return redirect(location);
  }
  if (formData.intent === 'newLead') {
    await prisma.notificationsUser.update({
      where: { id: formData.notificationId },
      data: {
        read: true
      }
    })
    return redirect(formData.navigate)
  }
  if (formData.intent === 'newInterruption') {
    await prisma.interruptions.update({
      where: { id: formData.notificationId },
      data: {
        read: 'true'
      }
    })
    return redirect(formData.navigate)
  }
  if (formData.intent === 'newMsg') {
    await prisma.notificationsUser.update({
      where: { id: formData.notificationId },
      data: {
        read: true
      }
    })
    return redirect(formData.navigate)
  }
  if (formData.intent === 'newUpdate') {
    await prisma.notificationsUser.update({
      where: { id: formData.notificationId },
      data: {
        read: true
      }
    })
    return redirect(formData.navigate)
  }
  return null
};

export default function SettingsLayout() {
  const { user, email, interruptionsData, loadNewLead, getEmails, notifications, host } = useLoaderData()
  const location = useLocation();
  const pathname = location.pathname
  /**
   *
          {/* activix *
   *
           {/* accessories *
  {userIsACCESSORIES && (
    <>
    </>
  )}
     {/* PARTS *
  {userIsPARTS && (
    <>
    </>
  )}
     {/*  TECHNICIAN *
  {userIsTECHNICIAN && (
    <>
    </>
  )}
   {/*  RECIEVING *
  {userIsRECIEVING && (
    <>
    </>
  )}
   {/*  NORMAL  *
  {userIsNORMAL && (
    <>
    </>
  )}
   {/*  EDITOR *
  {userIsEDITOR && (
    <>
    </>
  )} */
  return (
    <>
      {pathname !== '/dealer/email/dashboardClient' && (
        <>
          {!pathname.startsWith('/dealer/accessories/') && <SearchByOrderFunction />}
          <SearchFunction />
          <MainDropwdown user={user} email={email} interruptionsData={interruptionsData} loadNewLead={loadNewLead} getEmails={getEmails} notifications={notifications} host={host} />
        </>
      )}
      <Outlet />
    </>

  )
}
export function MainDropwdown({ user, email, interruptionsData, loadNewLead, getEmails, notifications, host }) {
  const location = useLocation();
  const pathname = location.pathname
  const orderId = user?.customerSync.orderId
  const financeId = user?.customerSync.financeId
  const clientfileId = user?.customerSync.clientfileId
  let fetcher = useFetcher()
  const submit = useSubmit()

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  /**  <Sidebar user={user} email={email} /> */
  let quoteUrl = '/dealer/quote/new/'
  const my24Watercraft = [
    {
      title: "Kawasaki",
      to: quoteUrl + "Kawasaki",
    },
  ]
  const my23Watercraft = [
    {
      title: "Kawasaki",
      to: quoteUrl + "Kawasaki",
    },
    {
      title: "Manitou",
      to: quoteUrl + "Manitou",
    },
    {
      title: "Sea-Doo",
      to: quoteUrl + "Sea-Doo",
    },
    {
      title: "Sea-Doo Switch",
      to: quoteUrl + "Switch",
    },

  ]
  const my24Moto = [
    {
      title: "Harley-Davidson",
      to: quoteUrl + "Harley-DavidsonMY24",
    },
  ]
  const my23Moto = [
    {
      title: "BMW Motorrad",
      to: quoteUrl + "BMW-Motorrad",
    },
    {
      title: "Harley-Davidson",
      to: quoteUrl + "Harley-Davidson",
    },
    {
      title: "Kawasaki",
      to: quoteUrl + "Kawasaki",
    },
    {
      title: "KTM",
      to: quoteUrl + "KTM",
    },
    {
      title: "Indian",
      to: quoteUrl + "Indian",
    },
    {
      title: "Suzuki",
      to: quoteUrl + "Suzuki",
    },
    {
      title: "Spyder",
      to: quoteUrl + "Spyder",
    },
    {
      title: "Triumph",
      to: quoteUrl + "Triumph",
    },
    {
      title: "Yamaha",
      to: quoteUrl + "Yamaha",
    },

  ]
  const my24OffRoad = [
    {
      title: "Can-AM SxS",
      to: quoteUrl + "Can-Am-SXS-MY24",
    },
    {
      title: "Can-AM Ski-Doo",
      to: quoteUrl + "Ski-Doo-MY24",
    },
  ]
  const my23OffRoad = [
    {
      title: "Can-AM",
      to: quoteUrl + "Can-Am",
    },
    {
      title: "Can-AM SXS",
      to: quoteUrl + "Can-Am-SXS",
    },
    {
      title: "KTM",
      to: quoteUrl + "KTM",
    },
    {
      title: "Kawasaki",
      to: quoteUrl + "Kawasaki",
    },
    {
      title: "Ski-Doo",
      to: quoteUrl + "Ski-Doo",
    },
    {
      title: "Suzuki",
      to: quoteUrl + "Suzuki",
    },
    {
      title: "Triumph",
      to: quoteUrl + "Triumph",
    },
  ]
  const userIsFinance = user.positions.some(
    (pos) => pos.position === 'Finance Manager' || pos.position === 'Administrator' || pos.position === 'Manager'
  );
  const userIsSales = user.positions.some(
    (pos) => pos.position === 'Sales' || pos.position === 'Administrator' || pos.position === 'Manager'
  );
  const userIsManager = user.positions.some(
    (pos) => pos.position === 'Manager' || pos.position === 'Administrator'
  );
  const userIsADMIN = user.positions.some(
    (pos) => pos.position === 'Administrator'
  );
  const userIsDEV = user.positions.some(
    (pos) => pos.position === 'DEV' || pos.position === 'Administrator'
  );
  const userIsSERVICE = user.positions.some(
    (pos) => pos.position === 'Service' ||
      pos.position === 'Administrator' ||
      pos.position === 'Delivery Driver' ||
      pos.position === 'Technician' ||
      pos.position === 'Manager'
  );
  const userIsACC = user.positions.some(
    (pos) => pos.position === 'Accessories' ||
      pos.position === 'Administrator' ||
      pos.position === 'Recieving' ||
      pos.position === 'Parts' ||
      pos.position === 'Manager'
  );

  const userIsACCESSORIES = getUserIsAllowed(user, ["ACCESSORIES"]);
  const userIsPARTS = getUserIsAllowed(user, ["PARTS"]);
  const userIsTECHNICIAN = getUserIsAllowed(user, ["TECHNICIAN"]);
  const userIsRECIEVING = getUserIsAllowed(user, ["RECIEVING"]);
  const userIsNORMAL = getUserIsAllowed(user, ["NORMAL"]);
  const userIsEDITOR = getUserIsAllowed(user, ["EDITOR"]);


  // ------------- theme -------------- //
  const [theme, setTheme] = useTheme();
  const nameTo = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
  const handleChangeTheme = () => {
    setTheme(nameTo);
  };
  // ----------- notifications ------ //
  // notifications
  const [updates, setUpdates] = useState([])
  const [lead, setLead] = useState([]);
  const [messages, setMessages] = useState([])
  const [interruptions, setInterruptions] = useState([])


  useEffect(() => {
    if (notifications && Array.isArray(notifications)) {
      const newLeads = notifications.filter(notification => notification.userEmail === user.email && notification.type === 'New Lead');
      setLead(newLeads);
    }
  }, [notifications, user.email]);

  const leadLength = lead.length;

  const [swrURL, setSwrURL] = useState(`http://localhost:3000/dealer/notifications/notifications/${user.email}`)


  useEffect(() => {
    if (host !== 'localhost:3000') {
      setSwrURL(`https://www.dealersalesassistant.ca/dealer/notifications/notifications/${user.email}`)
    }
  }, [host]);


  const dataFetcher = (url) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR(swrURL, dataFetcher, { refreshInterval: 180000 });
  //if (error) return <div>Loading...</div>;
  ///  if (isLoading) return <div>Error loading data</div>;
  const notificationsList = data//.notifications

  let newMessages;
  let newLeads;
  let newUpdates;

  useEffect(() => {
    if (interruptionsData) {
      setInterruptions(interruptionsData)
    }
  }, [])

  useEffect(() => {
    newUpdates = notifications && notifications.filter(notification => notification.userEmail === user.email && notification.type === 'updates');
    if (newUpdates) {
      setUpdates(newUpdates)
    }
  }, [notifications])

  useEffect(() => {
    if (notificationsList) {
      console.log(notificationsList, 'data')
      newUpdates = notificationsList.filter(notification => notification.userEmail === user.email && notification.type === 'updates');
      setUpdates(newUpdates)
      newLeads = notificationsList.filter(notification => notification.userEmail === user.email && notification.type === 'New Lead');
      setLead(newLeads)
      newMessages = notificationsList.filter(notification => notification.userEmail === user.email && notification.type === 'messages');
      setMessages(newMessages)
    }

  }, [notificationsList])

  const msgsLength = messages.filter(item => !item.read).length || 0;
  const intLength = interruptions.filter(item => !item.read).length || 0;
  const updatesLength = updates.filter(item => !item.read).length || 0;


  const shouldShowNotification = (
    messages.some(item => !item.reads || Object.keys(item.reads).length === 0) ||
    (lead.length > 0 && lead.every(l => l.reads && Object.keys(l.reads).length === 0)) ||
    updates.some(item => !item.reads || Object.keys(item.reads).length === 0) ||
    interruptions.some(item => item.read === 'false')
  );

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 25, left: 25 });


  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === 'F4') {
      event.preventDefault();

      setDropdownOpen(true);
    }
  };

  // Handle mousemove to track cursor position
  const handleMouseMove = (event) => {
    if (isDropdownOpen) return;
    setDropdownPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };

  // Add and remove event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDropdownOpen]);

  // Handle button click
  const handleButtonClick = () => {
    setDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    if (messages) {
      messages.forEach(item => {
        if (item.read === false) {
          if (item.subType === 'email') {
            toast(`Incoming email! `, {
              description: `${item.title}`,
              duration: 10000,
              action: {
                label: 'Client',
                onClick: () => {
                  const formData = new FormData();
                  formData.append("notificationId", item.id);
                  formData.append("userEmail", user.email);
                  formData.append("userName", user.name);
                  formData.append("navigate", `/dealer/customer/${item.clientfileId}/${item.financeId}`);
                  formData.append("intent", 'newMsg');
                  submit(formData, { method: "post" });
                }
              },

            });
          }
          if (item.subType === 'sms') {
            toast(`Incoming text message! `, {
              description: `${item.title} - ${item.content}`,
              duration: 10000,
              action: {
                label: 'Client',
                onClick: () => {
                  const formData = new FormData();
                  formData.append("notificationId", item.id);
                  formData.append("userEmail", user.email);
                  formData.append("userName", user.name);
                  formData.append("navigate", `/dealer/customer/${item.clientfileId}/${item.financeId}`);
                  formData.append("intent", 'newMsg');
                  submit(formData, { method: "post" });
                }
              }
            });
          }

        }
      });
    }
  }, [messages]);

  useEffect(() => {
    if (lead) {
      lead.forEach(item => {
        if (item.read === false) {
          toast(`Incoming new lead! `, {
            description: `${item.title} - ${item.content}`,
            duration: Infinity,
            action: {
              label: 'Leads',
              onClick: () => {
                const formData = new FormData();
                formData.append("notificationId", item.id);
                formData.append("userEmail", user.email);
                formData.append("userName", user.name);
                formData.append("navigate", `/dealer/leads/sales/newLeads`);
                formData.append("intent", 'newLead');
                submit(formData, { method: "post" });
              }
            },
          });
        }
      });
    }
  }, [lead]);

  useEffect(() => {
    if (lead) {
      lead.forEach(item => {
        if (item.read === false) {
          toast(`Incoming new lead! `, {
            description: `${item.title} - ${item.content}`,
            duration: Infinity,
            action: {
              label: 'Leads',
              onClick: () => {
                const formData = new FormData();
                formData.append("notificationId", item.id);
                formData.append("userEmail", user.email);
                formData.append("userName", user.name);
                formData.append("navigate", `/dealer/leads/sales/newLeads`);
                formData.append("intent", 'newLead');
                submit(formData, { method: "post" });
              }
            },
          });
        }
      });
    }
  }, [lead]);

  const [sales, setSales] = useState(true)
  const [service, setService] = useState(false)
  const [dev, setDev] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [acc, setAcc] = useState(false)
  const [doc, setDoc] = useState(false)
  const [finance, setFinance] = useState(false)
  const [manager, setManager] = useState(false)

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };


  if (user.email === 'skylerzanth@outlook.com') {
    return (
      <>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger >
            <Button
              onClick={handleButtonClick}
              variant='ghost' size='icon' className=' left-[12px] top-[15px] z-50 fixed  inline-flex cursor-pointer text-foreground items-center justify-center'>
              <Menu size={32} strokeWidth={1.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-background border border-border max-h-[500px] overflow-y-auto"
            style={{
              position: 'absolute',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
          >
            {/* Interruptions */}
            <Interruptions user={user} email={email} />
            <DropdownMenuSeparator />
            <DropdownMenuLabel className='text-primary'>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* messages */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer'>
                  <div className='mr-2'>
                    {messages && messages.some(item => !item.read) && (
                      <span className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-[20px] w-[20px] bg-[#3b99fc] flex items-center justify-center">
                          <p className='text-white hover:text-primary text-xs'>{msgsLength}</p>
                        </span>
                      </span>
                    )}
                  </div>
                  Messages
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-background w-[385px] border border-border max-h-[500px] h-auto overflow-y-auto">
                    {messages ? messages.map((item, index) => {
                      return (
                        <DropdownMenuItem
                          key={index}
                          className={`focus:bg-accent focus:text-accent-foreground  justify-start mx-auto cursor-pointer h-[85px] border-b border-border bg-background hover:bg-[#111111] `}

                          onSelect={() => {
                            const formData = new FormData();
                            formData.append("notificationId", item.id);
                            formData.append("userEmail", user.email);
                            formData.append("userName", user.name);
                            formData.append("navigate", `/dealer/customer/${item.clientfileId}/${item.financeId}`);
                            formData.append("intent", 'newMsg');
                            submit(formData, { method: "post" });
                          }}
                        >
                          <div className='flex items-center gap-3'>
                            {item.read === true ? null :
                              < img
                                alt='warning'
                                src={Warning}
                                className="object-contain"
                              />
                            }
                            <div className='grid grid-cols-1'>
                              <p> {item.title}</p>
                              <p className='text-muted-foreground'> {new Date(item.createdAt).toLocaleDateString("en-US", options)}</p>

                            </div>
                          </div>

                        </DropdownMenuItem>
                      );
                    }) : (
                      <DropdownMenuItem>No messages available</DropdownMenuItem>
                    )}


                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {/* leads */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer'>
                  <div className='mr-2'>
                    {lead && lead.some(item => !item.read) && (
                      <span className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-[20px] w-[20px] bg-[#3b99fc] flex items-center justify-center">
                          <p className='text-white hover:text-primary text-xs'>{leadLength}</p>
                        </span>
                      </span>
                    )}
                  </div>
                  Leads
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-background border border-border w-[300px]">
                    <Form method='post'>
                      {lead ? lead.map((item, index) => (
                        <DropdownMenuItem
                          key={index}
                          className={`focus:bg-accent focus:text-accent-foreground  justify-start mx-auto cursor-pointer h-[85px] border-b border-border bg-background hover:bg-[#111111] `}
                          onSelect={() => {
                            const formData = new FormData();
                            formData.append("notificationId", item.id);
                            formData.append("userEmail", user.email);
                            formData.append("userName", user.name);
                            formData.append("navigate", `/dealer/leads/sales/newLeads`);
                            formData.append("intent", 'newLead');
                            submit(formData, { method: "post" });
                          }}
                        >
                          <div className='flex items-center gap-3'>
                            {item.read === true ? null :
                              < img
                                alt='warning'
                                src={Warning}
                                className="object-contain"
                              />
                            }
                            <div className='grid grid-cols-1'>
                              <p> {item.title} - {item.content}</p>
                              <p>{item.cusxtomerName}</p>
                              <p className='text-muted-foreground'> {new Date(item.createdAt).toLocaleDateString("en-US", options)}</p>

                            </div>
                          </div>

                        </DropdownMenuItem>
                      )) : <DropdownMenuItem>No new leads available</DropdownMenuItem>}
                    </Form>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {/* updates */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer'>
                  <div className='mr-2'>
                    {updates && updates.some(item => !item.read) && (
                      <span className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-[20px] w-[20px] bg-[#3b99fc] flex items-center justify-center">
                          <p className='text-white hover:text-primary text-xs'>{updatesLength}</p>
                        </span>
                      </span>
                    )}
                  </div>
                  Updates
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-background w-[300px] border border-border">
                    {updates ? updates.map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        className={`focus:bg-accent focus:text-accent-foreground  justify-start mx-auto cursor-pointer h-[85px] border-b border-border bg-background hover:bg-[#111111] `}
                        onSelect={() => {
                          const formData = new FormData();
                          formData.append("notificationId", item.id);
                          formData.append("userEmail", user.email);
                          formData.append("userName", user.name);
                          formData.append("navigate", `/dealer/customer/${item.clientfileId}/${item.financeId}`);
                          formData.append("intent", 'newUpdate');
                          submit(formData, { method: "post" });
                        }}
                      >
                        <div className='flex items-center gap-3'>
                          {item.read === true ? null :
                            < img
                              alt='warning'
                              src={Warning}
                              className="object-contain"
                            />
                          }
                          <div className='grid grid-cols-1'>
                            <p> {item.title}</p>
                            <p className='text-muted-foreground'> {new Date(item.createdAt).toLocaleDateString("en-US", options)}</p>

                          </div>
                        </div>

                      </DropdownMenuItem>
                    )) : <DropdownMenuItem>No updates available</DropdownMenuItem>}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {/* Inter */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer'>
                  <div className='mr-2'>
                    {interruptions && interruptions.some(item => item.read === 'false') && (
                      <span className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-[20px] w-[20px] bg-[#3b99fc] flex items-center justify-center">
                          <p className='text-white hover:text-primary text-xs'>{intLength}</p>
                        </span>
                      </span>
                    )}
                  </div>
                  Interruptions
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-background w-[300px] border border-border">
                    {interruptions ? (interruptions.map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        className={`focus:bg-accent focus:text-accent-foreground  justify-start mx-auto cursor-pointer h-[85px] border-b border-border bg-background hover:bg-[#111111] `}
                        onSelect={() => {
                          const formData = new FormData();
                          formData.append("notificationId", item.id);
                          formData.append("userEmail", user.email);
                          formData.append("userName", user.name);
                          formData.append("navigate", item.location);
                          formData.append("intent", 'newInterruption');
                          submit(formData, { method: "post" });
                        }}
                      >
                        <div className='flex items-center gap-3'>
                          {item.read === true ? null :
                            < img
                              alt='warning'
                              src={Warning}
                              className="object-contain"
                            />
                          }
                          <div className='grid grid-cols-1'>
                            <p> {item.title}</p>
                            <p className='text-muted-foreground'>{item.date}</p>
                            <p className='text-muted-foreground'>{item.location}</p>
                            <p className='text-muted-foreground'> {new Date(item.createdAt).toLocaleDateString("en-US", options)}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))) : <DropdownMenuItem>No interruptions available</DropdownMenuItem>}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className='text-primary cursor-pointer'>Sales</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                  <DropdownMenuLabel className='text-primary'>Quotes</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {/* my24 */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className='cursor-pointer'>MY24</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="bg-background    border border-border">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='cursor-pointer'>Watercraft</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                                {my24Watercraft.map((item, index) => (
                                  <DropdownMenuItem
                                    key={index}
                                    className={cn(
                                      '',
                                      pathname === item.to
                                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                      "justify-start "
                                    )}
                                  >
                                    <NavLink
                                      to={item.to}
                                      className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                      {item.title}
                                    </NavLink>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='cursor-pointer'>Motorcycle</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                                {my24Moto.map((item, index) => (
                                  <DropdownMenuItem
                                    key={index}
                                    className={cn(
                                      '',
                                      pathname === item.to
                                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                      "justify-start "
                                    )}
                                  >
                                    <NavLink
                                      to={item.to}
                                      className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                      {item.title}
                                    </NavLink>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='cursor-pointer'>Off-Road</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                                {my24OffRoad.map((item, index) => (
                                  <DropdownMenuItem
                                    key={index}
                                    className={cn(
                                      '',
                                      pathname === item.to
                                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                      "justify-start "
                                    )}
                                  >
                                    <NavLink
                                      to={item.to}
                                      className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                      {item.title}
                                    </NavLink>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger disabled className='cursor-pointer'>On-Road</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                                <DropdownMenuItem>Email</DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    {/* my23 */}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className='cursor-pointer'>MY23</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className='bg-background'>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='cursor-pointer'>Watercraft</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="bg-background">
                                {my23Watercraft.map((item, index) => (
                                  <DropdownMenuItem
                                    key={index}
                                    className={cn(
                                      '',
                                      pathname === item.to
                                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                      "justify-start "
                                    )}
                                  >
                                    <NavLink
                                      to={item.to}
                                      className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                      {item.title}
                                    </NavLink>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='cursor-pointer'>Motorcycle</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="bg-background">
                                {my23Moto.map((item, index) => (
                                  <DropdownMenuItem
                                    key={index}
                                    className={cn(
                                      '',
                                      pathname === item.to
                                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                      "justify-start "
                                    )}
                                  >
                                    <NavLink
                                      to={item.to}
                                      className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                      {item.title}
                                    </NavLink>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className='cursor-pointer'>Off-Road</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="bg-background">
                                {my23OffRoad.map((item, index) => (
                                  <DropdownMenuItem
                                    key={index}
                                    className={cn(
                                      '',
                                      pathname === item.to
                                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                      "justify-start "
                                    )}
                                  >
                                    <NavLink
                                      to={item.to}
                                      className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                      {item.title}
                                    </NavLink>
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger disabled className='cursor-pointer'>On-Road</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent className="bg-background">
                                <DropdownMenuItem>Email</DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className='text-primary'>Sales</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {salesNavSidebarNav.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className={cn(
                        ' ',
                        pathname === item.to
                          ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                          : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                        "justify-start "
                      )}
                    >
                      <NavLink
                        to={item.to}
                        className='w-full rounded-[4px] flex justify-between items-center'>
                        {item.title}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem
                    disabled={!financeId && !clientfileId}
                    className={cn(
                      ' ',
                      pathname === `/dealer/customer/customer/sync`
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                  >
                    <NavLink
                      to={`/dealer/customer/${clientfileId}/${financeId}`}
                      className='w-full rounded-[4px] flex justify-between items-center'>
                      Finance File - Synced
                    </NavLink>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className='text-primary cursor-pointer'>Accessories</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                  <DropdownMenuLabel className='text-primary'> PAC</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {accNavSidebarNav.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className={cn(
                        ' ',
                        pathname === item.to
                          ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                          : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                        "justify-start "
                      )}
                    >
                      <NavLink
                        to={item.to}
                        className='w-full rounded-[4px] flex justify-between items-center'>
                        {item.title}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem
                    disabled={!orderId}
                    className={cn(
                      ' ',
                      pathname === `/dealer/accessories/currentOrder`
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                  >
                    <NavLink
                      to='/dealer/accessories/currentOrder'
                      className='w-full rounded-[4px] flex justify-between items-center'>
                      Customer Order - Synced
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className='text-primary cursor-pointer'>Finance</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                  <DropdownMenuLabel className='text-primary'>Finance</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {financeNavSidebarNav.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className={cn(
                        ' ',
                        pathname === item.to
                          ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                          : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                        "justify-start "
                      )}
                    >
                      <NavLink
                        to={item.to}
                        className='w-full rounded-[4px] flex justify-between items-center'>
                        {item.title}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className='text-primary cursor-pointer'>Manager</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                  <DropdownMenuLabel className='text-primary'>Manager</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {managerSidebarNav.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className={cn(
                        ' ',
                        pathname === item.to
                          ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                          : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                        "justify-start "
                      )}
                    >
                      <NavLink
                        to={item.to}
                        className='w-full rounded-[4px] flex justify-between items-center'>
                        {item.title}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className='text-primary cursor-pointer'>Service</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                  <DropdownMenuLabel className='text-primary'>Service</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {serviceNavSidebarNav.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className={cn(
                        ' ',
                        pathname === item.to
                          ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                          : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                        "justify-start "
                      )}
                    >
                      <NavLink
                        to={item.to}
                        className='w-full rounded-[4px] flex justify-between items-center'>
                        {item.title}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className='text-primary cursor-pointer'>DEV</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                  <DropdownMenuLabel className='text-primary'>DEV</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {devSidebarNav.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className={cn(
                        ' ',
                        pathname === item.to
                          ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                          : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                        "justify-start "
                      )}
                    >
                      <NavLink
                        to={item.to}
                        className='w-full rounded-[4px] flex justify-between items-center'>
                        {item.title}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className='text-primary cursor-pointer'>Admin</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                  <DropdownMenuLabel className='text-primary'>Administrator</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {adminSidebarNav.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className={cn(
                        ' ',
                        pathname === item.to
                          ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                          : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                        "justify-start "
                      )}
                    >
                      <NavLink
                        to={item.to}
                        className='w-full rounded-[4px] flex justify-between items-center'>
                        {item.title}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className=' text-primary cursor-pointer'>Documents</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                  <DropdownMenuLabel className='text-primary'>Documents</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {documentNavSidebarNav.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className={cn(
                        ' ',
                        pathname === item.to
                          ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                          : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                        "justify-start "
                      )}
                    >
                      <NavLink
                        to={item.to}
                        className='w-full rounded-[4px] flex justify-between items-center'>
                        {item.title}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />

            <DropdownMenuLabel className='text-primary'>User</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={handleChangeTheme} className='flex items-center'>
                Toggle Theme
                <DropdownMenuShortcut>
                  {theme === Theme.DARK ? <Sun size={16} /> : <Moon size={16} />}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer'>Shortcut Reference</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className='bg-background border-border border w-[200px]'>
                    <DropdownMenuItem className='w-[98%] mx-auto rounded-lg hover:bg-accent'>
                      Start scanner (if present)
                      <DropdownMenuShortcut>F1</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='w-[98%] mx-auto rounded-lg hover:bg-accent'>
                      Reset scanner (if present)
                      <DropdownMenuShortcut>F2</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='w-[98%] mx-auto rounded-lg hover:bg-accent'>
                      Global customer search
                      <DropdownMenuShortcut>F3</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='w-[98%] mx-auto rounded-lg hover:bg-accent'>
                      Open dropdown menu
                      <DropdownMenuShortcut>F4</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='w-[98%] mx-auto rounded-lg hover:bg-accent'>
                      Interruption reminder
                      <DropdownMenuShortcut>ctrl + i</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {userNavSidebarNav.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className={cn(
                    ' ',
                    pathname === item.to
                      ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                      : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                    "justify-start "
                  )}
                >
                  <NavLink
                    to={item.to}
                    className='w-full rounded-[4px] flex justify-between items-center'>
                    {item.title}
                  </NavLink>
                </DropdownMenuItem>
              ))}

            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  } else {
    return (
      <>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger >
            <Button
              onClick={handleButtonClick}
              variant='ghost' size='icon' className=' left-[12px] top-[15px] z-50 fixed  inline-flex cursor-pointer text-foreground items-center justify-center'>
              <Menu size={32} strokeWidth={1.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-background border border-border max-h-[500px] overflow-y-auto"
            style={{
              position: 'absolute',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
          >
            {/* Interruptions */}
            <Interruptions user={user} email={email} />
            <DropdownMenuSeparator />
            <DropdownMenuLabel className='text-primary'>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* messages */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer'>
                  <div className='mr-2'>
                    {messages && messages.some(item => !item.read) && (
                      <span className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-[20px] w-[20px] bg-[#3b99fc] flex items-center justify-center">
                          <p className='text-white hover:text-primary text-xs'>{msgsLength}</p>
                        </span>
                      </span>
                    )}
                  </div>
                  Messages
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-background w-[400px] border border-border h-[500px] max-h-[500x]">
                    {messages ? messages.map((item, index) => {
                      return (
                        <DropdownMenuItem
                          key={index}
                          className={`focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px] justify-start mt-1 mx-auto cursor-pointer h-[90px]
                 ${item.read === true ? 'bg-background' : 'bg-[#181818]'}`}
                          onSelect={() => {
                            const formData = new FormData();
                            formData.append("notificationId", item.id);
                            formData.append("userEmail", user.email);
                            formData.append("userName", user.name);
                            formData.append("navigate", `/dealer/customer/${item.clientfileId}/${item.financeId}`);
                            formData.append("intent", 'newMsg');
                            submit(formData, { method: "post" });
                          }}
                        >
                          <div className='flex items-center'>

                            <div className='grid grid-cols-1'>
                              <p>   {item.title}</p>
                              <p className='text-muted-foreground'>   {item.createdAt}</p>
                            </div>
                          </div>

                        </DropdownMenuItem>
                      );
                    }) : (
                      <DropdownMenuItem>No messages available</DropdownMenuItem>
                    )}


                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {/* leads */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer'>
                  <div className='mr-2'>
                    {lead && lead.some(item => !item.read) && (
                      <span className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-[20px] w-[20px] bg-[#3b99fc] flex items-center justify-center">
                          <p className='text-white hover:text-primary text-xs'>{leadLength}</p>
                        </span>
                      </span>
                    )}
                  </div>
                  Leads
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-background border border-border w-[300px]">
                    <Form method='post'>
                      {lead ? lead.map((item, index) => (
                        <DropdownMenuItem
                          key={index}
                          className={`focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px] justify-start mt-1 mx-auto cursor-pointer
                            ${item.read === true ? 'bg-background ' : 'bg-[#181818]'}`}
                          onSelect={() => {
                            const formData = new FormData();
                            formData.append("notificationId", item.id);
                            formData.append("userEmail", user.email);
                            formData.append("userName", user.name);
                            formData.append("navigate", `/dealer/leads/sales/newLeads`);
                            formData.append("intent", 'newLead');
                            submit(formData, { method: "post" });
                          }}
                        >
                          <div>
                            <p> {item.title} - {item.content}</p>
                            <p className='text-muted-foreground'>billy bobby</p>
                          </div>

                        </DropdownMenuItem>
                      )) : <DropdownMenuItem>No new leads available</DropdownMenuItem>}
                    </Form>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {/* updates */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer'>
                  <div className='mr-2'>
                    {updates && updates.some(item => !item.read) && (
                      <span className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-[20px] w-[20px] bg-[#3b99fc] flex items-center justify-center">
                          <p className='text-white hover:text-primary text-xs'>{updatesLength}</p>
                        </span>
                      </span>
                    )}
                  </div>
                  Updates
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-background w-[300px] border border-border">
                    {updates ? updates.map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        className={`focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px] justify-start mt-1 mx-auto cursor-pointer
                          ${item.read === true ? 'bg-background ' : 'bg-[#181818]'}`}
                        onSelect={() => {
                          const formData = new FormData();
                          formData.append("notificationId", item.id);
                          formData.append("userEmail", user.email);
                          formData.append("userName", user.name);
                          formData.append("navigate", `/dealer/customer/${item.clientfileId}/${item.financeId}`);
                          formData.append("intent", 'newUpdate');
                          submit(formData, { method: "post" });
                        }}
                      >
                        <p className='w-[95%] rounded-[6px] flex justify-between items-center'>
                          {item.title}
                        </p>
                      </DropdownMenuItem>
                    )) : <DropdownMenuItem>No updates available</DropdownMenuItem>}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {/* Inter */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer'>
                  <div className='mr-2'>
                    {interruptions && interruptions.some(item => item.read === 'false') && (
                      <span className="relative flex h-[20px] w-[20px] items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-[20px] w-[20px] bg-[#3b99fc] flex items-center justify-center">
                          <p className='text-white hover:text-primary text-xs'>{intLength}</p>
                        </span>
                      </span>
                    )}


                  </div>
                  Interruptions
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-background w-[300px] border border-border">
                    {interruptions ? (interruptions.map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        className={`focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px] justify-start mt-1 mx-auto cursor-pointer
                          ${item.read === true ? 'bg-background ' : 'bg-[#181818]'}`}
                        onSelect={() => {
                          const formData = new FormData();
                          formData.append("notificationId", item.id);
                          formData.append("userEmail", user.email);
                          formData.append("userName", user.name);
                          formData.append("navigate", item.location);
                          formData.append("intent", 'newInterruption');
                          submit(formData, { method: "post" });
                        }}
                      >
                        <div>
                          <p> {item.title} </p>
                          <p className='text-muted-foreground'>{item.date}</p>
                          <p className='text-muted-foreground'>{item.location}</p>
                        </div>

                      </DropdownMenuItem>
                    ))) : <DropdownMenuItem>No interruptions available</DropdownMenuItem>}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            {/* sales */}
            {userIsSales && (
              <>
                {/* Quotes */}
                <DropdownMenuLabel className='text-primary'>Quotes</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {/* my24 */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className='cursor-pointer'>MY24</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="bg-background    border border-border">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className='cursor-pointer'>Watercraft</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                              {my24Watercraft.map((item, index) => (
                                <DropdownMenuItem
                                  key={index}
                                  className={cn(
                                    '',
                                    pathname === item.to
                                      ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                      : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                    "justify-start "
                                  )}
                                >
                                  <NavLink
                                    to={item.to}
                                    className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                    {item.title}
                                  </NavLink>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className='cursor-pointer'>Motorcycle</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                              {my24Moto.map((item, index) => (
                                <DropdownMenuItem
                                  key={index}
                                  className={cn(
                                    '',
                                    pathname === item.to
                                      ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                      : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                    "justify-start "
                                  )}
                                >
                                  <NavLink
                                    to={item.to}
                                    className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                    {item.title}
                                  </NavLink>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className='cursor-pointer'>Off-Road</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                              {my24OffRoad.map((item, index) => (
                                <DropdownMenuItem
                                  key={index}
                                  className={cn(
                                    '',
                                    pathname === item.to
                                      ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                      : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                    "justify-start "
                                  )}
                                >
                                  <NavLink
                                    to={item.to}
                                    className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                    {item.title}
                                  </NavLink>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger disabled className='cursor-pointer'>On-Road</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-background  w-[300px] border border-border">
                              <DropdownMenuItem>Email</DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  {/* my23 */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className='cursor-pointer'>MY23</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className='bg-background'>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className='cursor-pointer'>Watercraft</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-background">
                              {my23Watercraft.map((item, index) => (
                                <DropdownMenuItem
                                  key={index}
                                  className={cn(
                                    '',
                                    pathname === item.to
                                      ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                      : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                    "justify-start "
                                  )}
                                >
                                  <NavLink
                                    to={item.to}
                                    className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                    {item.title}
                                  </NavLink>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className='cursor-pointer'>Motorcycle</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-background">
                              {my23Moto.map((item, index) => (
                                <DropdownMenuItem
                                  key={index}
                                  className={cn(
                                    '',
                                    pathname === item.to
                                      ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                      : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                    "justify-start "
                                  )}
                                >
                                  <NavLink
                                    to={item.to}
                                    className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                    {item.title}
                                  </NavLink>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className='cursor-pointer'>Off-Road</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-background">
                              {my23OffRoad.map((item, index) => (
                                <DropdownMenuItem
                                  key={index}
                                  className={cn(
                                    '',
                                    pathname === item.to
                                      ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]"
                                      : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                                    "justify-start "
                                  )}
                                >
                                  <NavLink
                                    to={item.to}
                                    className='w-[95%] rounded-[6px] flex justify-between items-center'>
                                    {item.title}
                                  </NavLink>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger disabled className='cursor-pointer'>On-Road</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-background">
                              <DropdownMenuItem>Email</DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className='text-primary'>Sales</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {salesNavSidebarNav.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={cn(
                      ' ',
                      pathname === item.to
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                  >
                    <NavLink
                      to={item.to}
                      className='w-full rounded-[4px] flex justify-between items-center'>
                      {item.title}
                    </NavLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  disabled={!financeId && !clientfileId}
                  className={cn(
                    ' ',
                    pathname === `/dealer/customer/customer/sync`
                      ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                      : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                    "justify-start "
                  )}
                >
                  <NavLink
                    to={`/dealer/customer/${clientfileId}/${financeId}`}
                    className='w-full rounded-[4px] flex justify-between items-center'>
                    Finance File - Synced
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            {/* accessories */}
            {userIsACC && (
              <>
                <DropdownMenuLabel className='text-primary'> PAC</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {accNavSidebarNav.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={cn(
                      ' ',
                      pathname === item.to
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                  >
                    <NavLink
                      to={item.to}
                      className='w-full rounded-[4px] flex justify-between items-center'>
                      {item.title}
                    </NavLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  disabled={!orderId}
                  className={cn(
                    ' ',
                    pathname === `/dealer/accessories/currentOrder`
                      ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                      : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                    "justify-start "
                  )}
                >
                  <NavLink
                    to='/dealer/accessories/currentOrder'
                    className='w-full rounded-[4px] flex justify-between items-center'>
                    Customer Order - Synced
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

              </>
            )}
            {/* finance */}
            {userIsFinance && (
              <>
                <DropdownMenuLabel className='text-primary'>Finance</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {financeNavSidebarNav.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={cn(
                      ' ',
                      pathname === item.to
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                  >
                    <NavLink
                      to={item.to}
                      className='w-full rounded-[4px] flex justify-between items-center'>
                      {item.title}
                    </NavLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            )}
            {/* manager */}
            {userIsManager && (
              <>
                <DropdownMenuLabel className='text-primary'>Manager</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {managerSidebarNav.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={cn(
                      ' ',
                      pathname === item.to
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                  >
                    <NavLink
                      to={item.to}
                      className='w-full rounded-[4px] flex justify-between items-center'>
                      {item.title}
                    </NavLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            )}
            {/* admin */}
            {userIsADMIN && (
              <>
                <DropdownMenuLabel className='text-primary'>Administrator</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {adminSidebarNav.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={cn(
                      ' ',
                      pathname === item.to
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                  >
                    <NavLink
                      to={item.to}
                      className='w-full rounded-[4px] flex justify-between items-center'>
                      {item.title}
                    </NavLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            )}
            {/* dev */}
            {userIsDEV && (
              <>
                <DropdownMenuLabel className='text-primary'>DEV</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {devSidebarNav.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={cn(
                      ' ',
                      pathname === item.to
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                  >
                    <NavLink
                      to={item.to}
                      className='w-full rounded-[4px] flex justify-between items-center'>
                      {item.title}
                    </NavLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            )}
            {/* service */}
            {userIsSERVICE && (
              <>
                <DropdownMenuLabel className='text-primary'>Service</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {serviceNavSidebarNav.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={cn(
                      ' ',
                      pathname === item.to
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                  >
                    <NavLink
                      to={item.to}
                      className='w-full rounded-[4px] flex justify-between items-center'>
                      {item.title}
                    </NavLink>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            )}
            {/* documents */}
            <DropdownMenuLabel className='text-primary'>Documents</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {documentNavSidebarNav.map((item, index) => (
              <DropdownMenuItem
                key={index}
                className={cn(
                  ' ',
                  pathname === item.to
                    ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                    : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                  "justify-start "
                )}
              >
                <NavLink
                  to={item.to}
                  className='w-full rounded-[4px] flex justify-between items-center'>
                  {item.title}
                </NavLink>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {/* User */}
            <DropdownMenuLabel className='text-primary'>User</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={handleChangeTheme} className='flex items-center'>
                Toggle Theme
                <DropdownMenuShortcut>
                  {theme === Theme.DARK ? <Sun size={16} /> : <Moon size={16} />}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='cursor-pointer'>Shortcut Reference</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className='bg-background border-border border w-[200px]'>
                    <DropdownMenuItem className='w-[98%] mx-auto rounded-lg hover:bg-accent'>
                      Start scanner (if present)
                      <DropdownMenuShortcut>F1</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='w-[98%] mx-auto rounded-lg hover:bg-accent'>
                      Reset scanner (if present)
                      <DropdownMenuShortcut>F2</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='w-[98%] mx-auto rounded-lg hover:bg-accent'>
                      Global customer search
                      <DropdownMenuShortcut>F3</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='w-[98%] mx-auto rounded-lg hover:bg-accent'>
                      Open dropdown menu
                      <DropdownMenuShortcut>F4</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='w-[98%] mx-auto rounded-lg hover:bg-accent'>
                      Interruption reminder
                      <DropdownMenuShortcut>ctrl + i</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {userNavSidebarNav.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className={cn(
                    ' ',
                    pathname === item.to
                      ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                      : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                    "justify-start "
                  )}
                >
                  <NavLink
                    to={item.to}
                    className='w-full rounded-[4px] flex justify-between items-center'>
                    {item.title}
                  </NavLink>
                </DropdownMenuItem>
              ))}

            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }
}
export const accNavSidebarNav = [
  {
    title: "Dashboard",
    to: "/dealer/accessories/order",
  },
  {
    title: "Search Customers",
    to: "/dealer/accessories/search",
  },
  {
    title: "Products",
    to: "/dealer/accessories/products",
  },
  {
    title: "Label Maker",
    to: "/dealer/accessories/labelPrinter",
  },
  {
    title: "Inventory Counter",
    to: "/dealer/accessories/inventoryCounter",
  },
  {
    title: "Receiving",
    to: "/dealer/accessories/receiving",
  },
]
export const serviceNavSidebarNav = [
  {
    title: "Calendar",
    to: "/dealer/service/calendar",
  },
  {
    title: "Service Dashboard",
    to: "/dealer/service/dashboard",
  },
  {
    title: "Waiters",
    to: "/dealer/service/waiters",
  },
  {
    title: "Technician",
    to: "/dealer/service/technician",
  },
  {
    title: "Work Order",
    to: "/dealer/service/workOrder",
  },
]
export const userNavSidebarNav = [
  {
    title: "Staff Area",
    to: "/dealer/staff/chat",
  },
  {
    title: "Settings",
    to: "/dealer/user/dashboard/settings",
  },
  {
    title: "Logout",
    to: "/auth/logout",
  },

]
export const documentNavSidebarNav = [
  {
    title: "Document Builder",
    to: "/dealer/document/builder/client",
  },
  {
    title: "Template Builder",
    to: "/dealer/user/dashboard/templates",
  },
  {
    title: "Scripts",
    to: "/dealer/user/dashboard/scripts",
  },


]
export const salesNavSidebarNav = [
  {
    title: "Email Client",
    to: "/dealer/email/client",
  },
  {
    title: "Dashboard",
    to: "/dealer/leads/sales/dashboard",
  },
  {
    title: "Calendar",
    to: "/dealer/calendar/sales",
  },
  {
    title: "Payment Calculator",
    to: "/dealer/payments/calculator",
  },
  {
    title: "Motorcycle Inventory",
    to: "/dealer/inventory/motorcycle",
  },
]
export const activixNavSidebarNav = [
  {
    title: "Email Client",
    to: "/dealer/email/client",
  },
  {
    title: "Dashboard",
    to: "/dealer/leads/activix/dashboard",
  },
  {
    title: "Calendar",
    to: "/dealer/calendar/sales",
  },
  {
    title: "Payment Calculator",
    to: "/dealer/payments/calculator",
  },
  {
    title: "Motorcycle Inventory",
    to: "/dealer/inventory/motorcycle",
  },
]
export const financeNavSidebarNav = [
  {
    title: "Email Client",
    to: "/dealer/email/client",
  },
  {
    title: "Finance Dashboard",
    to: "/dealer/leads/finance",
  },
  {
    title: "Calendar",
    to: "/dealer/calendar/sales",
  },
  {
    title: "Payment Calculator",
    to: "/dealer/payments/calculator",
  },
  {
    title: "Motorcycle Inventory",
    to: "/dealer/inventory/motorcycle",
  },
]
export const adminSidebarNav = [
  {
    title: "Overview",
    to: "/dealer/admin/settings/general",
  },
  {
    title: "Users",
    to: "/dealer/admin/users/overview",
  },
  {
    title: "Customers",
    to: "/dealer/admin/customers/client",
  },
  {
    title: "Depts",
    to: "/dealer/admin/depts/sales",
  },
  {
    title: "Reports",
    to: "/dealer/admin/reports/endOfDay",
  },
  {
    title: "Inventory",
    to: "/dealer/admin/inventory/units",
  },
  {
    title: "Import / Export",
    to: "/dealer/admin/importexport/units",
  },
]
export const devSidebarNav = [
  {
    title: "Control Panel",
    to: "/devmode/controlPanel",
  },
  {
    title: "Board",
    to: "/devmode/board",
  },
  {
    title: "Clients",
    to: "/devmode/clients",
  },
  {
    title: "Automation",
    to: "/devmode/clients",
  },
  {
    title: "Ad Manager",
    to: "/devmode/clients",
  },
  {
    title: "Microsoft notes",
    to: "/devmode/clients",
  },
  {
    title: "Chat gpt",
    to: "/devmode/clients",
  },
]
export const managerSidebarNav = [
  {
    title: "Depts",
    to: "/dealer/manager/depts/sales",
  },
  {
    title: "Reports",
    to: "/dealer/manager/reports/endOfDay",
  },
  {
    title: "Inventory",
    to: "/dealer/manager/inventory/units",
  },
  {
    title: "Scheduling",
    to: "/dealer/manager/scheduling/hours",
  },

  {
    title: "CSI",
    to: "/dealer/manager/csi",
  },
  {
    title: "Import / Export",
    to: "/dealer/manager/importexport/units",
  },

]

/**     <DropdownMenuSub>
              <DropdownMenuSubTrigger className='cursor-pointer'>Toggle Depts</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className='bg-background border-border border w-[200px]'>
                  <DropdownMenuItem
                    className={cn(
                      ' ',
                      sales === true
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                    onSelect={() => { setSales((prevSales) => !prevSales); }}
                  >
                    Sales
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      ' ',
                      acc === true
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                    onSelect={() => { setAcc((prevAcc) => !prevAcc); }}
                  >
                    Acc
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      ' ',
                      finance === true
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                    onSelect={() => { setFinance((prevFinance) => !prevFinance); }}
                  >
                    Finance
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      ' ',
                      manager === true
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                    onSelect={() => { setManager((prevManager) => !prevManager); }}
                  >
                    Manager
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      ' ',
                      dev === true
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                    onSelect={() => { setDev((prevDev) => !prevDev); }}
                  >
                    Dev
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      ' ',
                      admin === true
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                    onSelect={() => { setAdmin((prevAdmin) => !prevAdmin); }}
                  >
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      ' ',
                      doc === true
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                    onSelect={() => { setDoc((prevDoc) => !prevDoc); }}
                  >
                    Doc
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      ' ',
                      service === true
                        ? "bg-accent text-accent-foreground w-[95%] rounded-[4px]    "
                        : "focus:bg-accent focus:text-accent-foreground w-[95%] rounded-[4px]",
                      "justify-start "
                    )}
                    onSelect={() => { setService((prevService) => !prevService); }}
                  >
                    Service
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
 */
