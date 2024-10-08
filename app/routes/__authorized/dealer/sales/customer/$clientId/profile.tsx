import { Form, Link, useActionData, useFetcher, useLoaderData, useSubmit, useNavigation, useParams, useNavigate } from "@remix-run/react";
import React, { createContext, useEffect, useRef, useState } from "react";
import { type DataFunctionArgs, type ActionFunction, json, type LinksFunction, redirect } from '@remix-run/node'
import { prisma } from "~/libs";
import { getSession, commitSession } from "~/sessions/auth-session.server";
import { GetUser } from "~/utils/loader.server";
import { Calendar } from '~/components/ui/calendar';
import { format } from "date-fns"
import { cn } from "~/components/ui/utils"
import {
  Tabs, Badge,
  TabsContent,
  TabsList,
  TabsTrigger, Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger, Card,
  CardContent,
  CardDescription,
  CardFooter,
  Alert,
  Debug,
  InputPassword,
  Layout,
  PageHeader,
  RemixForm,
  RemixLinkText,
  CardHeader,
  CardTitle, Avatar,
  AvatarFallback,
  AvatarImage,
  Select, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectGroup,
  RemixNavLink, Input, Separator, Button, TextArea, Label, buttonVariants
} from "~/components"
import { ButtonLoading } from "~/components/ui/button-loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Cross2Icon, CaretSortIcon, CalendarIcon, ClockIcon, ChevronDownIcon, DotsHorizontalIcon, PaperPlaneIcon, } from "@radix-ui/react-icons";
import { FaMotorcycle, FaSave } from "react-icons/fa";
import { toast } from "sonner"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import UserIcon from '~/images/favicons/user.svg'
import { calculateTotalAccessoriesCost, calculateTotalAmountPaid, CallsList, DeliveriesList, DepositsTakenList, PACTable } from "../../../accessories/order";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"
import financeFormSchema from "~/overviewUtils/financeFormSchema";
import useSWR from 'swr'
import { ArrowDownUp, ChevronLeft, ChevronRight, Copy, CreditCard, DollarSign, Eye, FileCheck, ListFilter, MoreVertical, Navigation, Percent, PlusIcon, Search, ShoppingCart, X } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ColumnDef, ColumnFiltersState, FilterFn, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, sortingFns, } from "@tanstack/react-table"
import { fuzzyFilter, fuzzySort, TableMeta, getTableMeta, DebouncedInput, options2, EditableText } from "~/components/shared/shared";
import { DataTablePagination } from "~/components/dashboard/calls/pagination";
import { Check } from "lucide-react";
import PrintReceipt from "../../../document/printReceiptAcc";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "~/components/ui/context-menu"

export default function SettingsLayout() {
  const { clientfile, user, comms } = useLoaderData();
  console.log(user, 'user')
  const AccOrders = clientfile.AccOrder
  const WorkOrder = clientfile.WorkOrder
  //orders, tax, filteredOrders30,
  const tax = user.Dealer.userTax
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [date, setDate] = useState<Date>()
  let ref = useRef();
  let payment = useFetcher();
  let search = useFetcher();
  const submit = useSubmit();
  const navigate = useNavigate()


  // pac
  const mergeAcc = [
    ...(clientfile.AccOrder || []),
    ...(clientfile.Finance?.AccOrders || [])
  ];

  const mergedOrder = [
    ...(clientfile.WorkOrder || []),
    ...(clientfile.Finance?.WorkOrder || [])
  ];
  const [list, setList] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [accOrders, setAccOrders] = useState(clientfile.AccOrder);
  const [discDollar, setDiscDollar] = useState(0.00)
  const [discPer, setDiscPer] = useState(0.00)

  useEffect(() => {
    if (mergedOrder) {
      setWorkOrders(mergedOrder)
    }
    if (mergeAcc) {
      setAccOrders(mergeAcc)
    }
    if (clientfile.dob) {
      setDate(clientfile.dob);
    }

  }, []);
  console.log(workOrders, accOrders, 'orders')

  const lastWorkOrder = workOrders[0];
  const lastAccOrder = AccOrders[0];
  const taxMultiplier = Number(tax);
  const taxRate = 1 + taxMultiplier / 100;

  let customerCard = [
    { name: 'firstName', value: clientfile.firstName, label: 'First Name', },
    { name: 'lastName', value: clientfile.lastName, label: 'Last Name', },
    { name: 'phone', value: clientfile.phone, label: 'Phone', },
    { name: 'email', value: clientfile.email, label: 'Email', },
    { name: 'address', value: clientfile.address, label: 'Address', },
    { name: 'city', value: clientfile.city, label: 'City', },
    { name: 'postal', value: clientfile.postal, label: 'Postal', },
    { name: 'dl', value: clientfile.dl, label: 'Drivers Lic.', },
  ];
  let customerCardNonInput = [
    { name: 'dob', value: clientfile.dob, label: 'DOB', },
    { name: 'billingAddress', value: clientfile.billingAddress, label: 'Billing Address', },
    { name: 'timeToContact', value: clientfile.timeToContact, label: 'Preferred Time', },
    { name: 'typeOfContact', value: clientfile.typeOfContact, label: 'Preferred Contact', },
  ];

  const sidebarNavItems = [
    {
      title: "Profile",
      href: "/examples/forms",
    },
    {
      title: "PAC",
      href: "/examples/forms/account",
    },
    {
      title: "Work Orders",
      href: "/examples/forms/appearance",
    },

  ]
  const [tabState, setTabState] = useState('Profile')
  function SidebarNav({ className, items, ...props }: SidebarNavProps) {

    return (
      <nav
        className={cn(
          "flex space-x-2 flex-row max-w-[95%] lg:flex-col lg:space-x-0 lg:space-y-1 mt-3",
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <Button variant='ghost'
            key={item.title}
            onClick={() => setTabState(item.title)}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              tabState === item.title
                ? "bg-[#232324] hover:bg-muted/50 w-[90%]     "
                : "hover:bg-muted/50 text-[#a1a1aa]  w-[90%]  ",
              "justify-start w-[90%] "
            )} >
            {item.title}
          </Button>
        ))
        }
      </nav >
    )
  }
  const options2 = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short"
  };

  const [showOrder, setShowOrder] = useState(false);

  const toggleOrderDetails = (orderId) => {
    if (showOrder === orderId) {
      setShowOrder(null);
    } else {
      setShowOrder(orderId);
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [showPrevOrder, setShowPrevOrder] = useState(null)
  const [showPrev, setShowPrev] = useState(false)
  const [totalAccessoriesCost, setTotalAccessoriesCost] = useState();
  const [totalAmountPaid, setTotalAmountPaid] = useState();

  useEffect(() => {
    if (lastWorkOrder) {
      setTotalAmountPaid(calculateTotalAmountPaid(lastWorkOrder))
      setTotalAccessoriesCost(calculateTotalAccessoriesCost(lastWorkOrder))
    }
  }, [lastWorkOrder]);

  useEffect(() => {
    if (lastAccOrder) {
      setTotalAmountPaid(calculateTotalAmountPaid(lastAccOrder))
      setTotalAccessoriesCost(calculateTotalAccessoriesCost(lastAccOrder))
    }
  }, [lastAccOrder]);

  useEffect(() => {
    if (showPrevOrder) {
      setTotalAmountPaid(calculateTotalAmountPaid(showPrevOrder))
      setTotalAccessoriesCost(calculateTotalAccessoriesCost(showPrevOrder))
    }
  }, [showPrevOrder]);

  const [value, setValue] = useState('');

  const total2 = ((parseFloat(totalAccessoriesCost) - parseFloat(discDollar)) * taxRate).toFixed(2)
  const total1 = (((parseFloat(totalAccessoriesCost) * (100 - parseFloat(discPer))) / 100) * taxRate).toFixed(2)
  const [total, setTotal] = useState(discDollar && discDollar > 0.00 ? total1 : total2);

  // ---- pagination all orders
  const [pageIndexAll, setPageIndexAll] = useState(1);
  const [perPageAll, setPerPageAll] = useState(10);
  const [accTableAll, setAccTableAll] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const swrFetcher = url => axios.get(url).then(res => res.data)

  const { data: dataAll } = useSWR(`/dealer/api/orders/all/${pageIndexAll}/${perPageAll}`, swrFetcher, { refreshInterval: 20000 });

  useEffect(() => { if (dataAll) { setAccTableAll(dataAll) } }, [dataAll]);

  const totalOrders = accTableAll.total;
  const totalPages = Math.ceil(totalOrders / perPageAll);
  const maxPages = 5;
  const halfMaxPages = Math.floor(maxPages / 2);
  const pageNumbers = [];

  let startPage = Math.max(pageIndexAll - halfMaxPages, 1);
  let endPage = startPage + maxPages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPages + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page) => {
    setPageIndexAll(page);
  };

  // ---- pagination all orders

  let toReceipt


  const showPrevOrderById = (id) => {
    const filteredOrder = AccOrders.find(order => order.id === id);
    setShowPrev(true)
    setShowPrevOrder(filteredOrder);
  }
  const [order, setOrder] = useState();

  const showPrevWorkOrderById = (id) => {
    const filteredOrder = workOrders.find(order => order.workOrderId === id);
    setShowPrev(true)
    setOrder(filteredOrder)
    setShowPrevOrder(filteredOrder);
  }
  // -------------- workorder

  let searchWorkOrder = useFetcher();
  let submitWorkOrder = useFetcher();

  useEffect(() => {
    if (searchWorkOrder && searchWorkOrder.length > 0) {
      setWorkOrders(searchWorkOrder.value)
      console.log('66', searchWorkOrder.value)
    }
  }, [searchWorkOrder]);

  const iFrameRef: React.LegacyRef<HTMLIFrameElement> = useRef(null);

  const MyIFrameComponent = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const handleHeightMessage = (event: MessageEvent) => {
        if (
          event.data &&
          event.data.type === "iframeHeight" &&
          event.data.height
        ) {
          setIsLoading(false);
          if (iFrameRef.current) {
            iFrameRef.current.style.height = `${event.data.height}px`;
          }
        }
      };
      const currentHost =
        typeof window !== "undefined" ? window.location.host : null;
      if (iFrameRef.current) {
        if (currentHost === "localhost:3000") {
          iFrameRef.current.src =
            "http://localhost:3000/auth/emailClientOnlySingleClient";
        }
        if (currentHost === "dealersalesassistant.ca") {
          iFrameRef.current.src =
            "https://www.dealersalesassistant.ca/auth/emailClientOnlySingleClient";
        }
        window.addEventListener("message", handleHeightMessage);
        /**     const cust = clientfile
             const sendData = { cust, user };
             console.log(sendData, 'senddata')
             const onLoad = () => {
               iFrameRef.current.contentWindow?.postMessage(sendData, "*");
             }; */
        //  iFrameRef.current.addEventListener("load", onLoad);

        return () => {
          window.removeEventListener("message", handleHeightMessage);
          // iFrameRef.current?.removeEventListener("load", onLoad);
        };
      }
    }, []);

    return (
      <>
        <div className="size-full ">
          <iframe
            ref={iFrameRef}
            title="my-iframe"
            width="100%"
            className=" border-none"
            style={{
              minHeight: "70vh",
            }}
          />
        </div>
      </>
    );
  };

  const [showPrevOrderWO, setShowPrevOrderWO] = useState(null)

  const [openComms, setOpenComms] = useState(false)
  const [partsSubTotal, setPartsSubTotal] = useState(0.00);
  const [totalPreTax, setTotalPreTax] = useState(0.00);
  const [serviceSubTotal, setServiceSubTotal] = useState(0.00);
  const [serviceHours, setServiceHours] = useState(0.00);
  const [serviceHoursVar, setServiceHoursVar] = useState(0.00);
  const [adjustedService, setAdjustedService] = useState(false);

  let totalTime = 0.00
  let totalHours = 0.00
  useEffect(() => {
    if (order) {
      const partsSub = order?.AccOrders?.reduce((total, accOrder) => {
        return total + accOrder?.AccessoriesOnOrders?.reduce((subTotal, accessoryOnOrder) => {
          return subTotal + (accessoryOnOrder.accessory.price * accessoryOnOrder.quantity);
        }, 0);
      }, 0);
      setPartsSubTotal(partsSub.toFixed(2))

      let serviceHoursTotal = 0.00;

      const serviceSub = order?.ServicesOnWorkOrders?.reduce((total, serviceOnOrder) => {
        const hours = serviceOnOrder.hr || serviceOnOrder.service.estHr;
        const quantity = serviceOnOrder.quantity || 1; // Make sure quantity is correct
        const subtotal = hours * tax.userLabour * quantity;
        //   console.log('hours:', hours, 'quantity:', quantity, 'subtotal:', subtotal); // Log values here
        return total + subtotal;
      }, 0);

      serviceHoursTotal = order?.ServicesOnWorkOrders?.reduce((total, serviceOnOrder) => {
        const hours = serviceOnOrder.hr ?? serviceOnOrder.service.estHr ?? 0;
        const quantity = serviceOnOrder.quantity ?? 1;
        return total + (hours * quantity);
      }, 0);

      setServiceHours(serviceHoursTotal);

      const adjustedServiceSub = serviceHoursVar * tax.userLabour;

      setServiceSubTotal(adjustedService ? adjustedServiceSub.toFixed(2) : serviceSub.toFixed(2));

      const totalPreTax = parseFloat(partsSub) + parseFloat(serviceSub);
      setTotalPreTax(totalPreTax.toFixed(2));

      //  console.log('partsSub:', partsSub, 'serviceSub:', serviceSub, 'totalPreTax:', totalPreTax);

      const total2 = ((parseFloat(partsSub + serviceSub) - parseFloat(discDollar)) * taxRate).toFixed(2);
      const total1 = (((parseFloat(partsSub + serviceSub) * (100 - parseFloat(discPer))) / 100) * taxRate).toFixed(2);
      const calculatedTotal = discPer > 0.00 ? total1 : total2;

      setTotal(parseFloat(calculatedTotal));

      const totalAmountPaid2 = order.Payments.reduce((total, payment) => {
        return total + payment.amountPaid;
      }, 0);

      if (totalAmountPaid2) { setTotalAmountPaid(totalAmountPaid2) }

      if (order.WorkOrderClockEntries) {
        totalTime = order.WorkOrderClockEntries.reduce((acc, entry) => {
          if (entry.start && entry.end) {
            const startTime = new Date(entry.start);
            const endTime = new Date(entry.end);
            const duration = (endTime - startTime) / (1000 * 60 * 60); // duration in hours
            return acc + duration;
          }
          return acc;
        }, 0);
      }

      totalHours = serviceHoursTotal
      //  console.log('Service Hours Total:', serviceHoursTotal);
      // console.log('Total Clocked Time:', totalTime);

      //  console.log('Order Services:', order.ServicesOnWorkOrders);
    }
  }, [order, serviceHours, serviceHoursVar, adjustedService, discDollar, discPer]);
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 ">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{clientfile.firstName} {clientfile.lastName}</h2>
          <p className="text-sm text-muted-foreground">
            Manage your clients profile, does not effect unit files, or any other data on the crm.
          </p>
        </div>
        <Separator className="my-6 border-border bg-border text-border" />
        <div className="grid w-[100%]">
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 lg:mx-3">
            <aside className="-mx-4 lg:w-[200px]">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            {tabState === 'Profile' && (
              <div className="grid lg:grid-cols-3 w-[100%]">

                <div className='flex-1 lg:lax-w-sm'>
                  <Form method='post' className='grid w-full max-w-[300px] space-y-8 items-center  gap-1.5 mx-auto'>
                    {customerCard.map((item, index) => (
                      <div key={index} className="relative mt-5">
                        <Input
                          name={item.name}
                          defaultValue={item.value}
                          className={` bg-background text-foreground border border-border`}
                        />
                        <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground text-muted-foreground">{item.label}</label>
                      </div>
                    ))}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal mt-4 ",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>DOB</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 border-border" align="start">
                        <Calendar
                          hideNavigation
                          captionLayout="dropdown"
                          className='w-auto'
                          mode="single"
                          fromYear={1900}
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <div className="relative mt-5 ">
                      <Select name='timeToContact' defaultValue={clientfile.timeToContact}  >
                        <SelectTrigger className="w-full  bg-background text-foreground border border-border" >
                          <SelectValue defaultValue={clientfile.timeToContact} />
                        </SelectTrigger>
                        <SelectContent className=' bg-background text-foreground border border-border' >
                          <SelectGroup>
                            <SelectLabel>Best Time To Contact</SelectLabel>
                            <SelectItem value="Morning">Morning</SelectItem>
                            <SelectItem value="Afternoon">Afternoon</SelectItem>
                            <SelectItem value="Evening">Evening</SelectItem>
                            <SelectItem value="Do Not Contact">Do Not Contact</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground text-muted-foreground">Best Time To Contact</label>
                    </div>
                    <div className="relative mt-5 ">
                      <Select name='typeOfContact' defaultValue={clientfile.typeOfContact} >
                        <SelectTrigger className="w-full  bg-background text-foreground border border-border" >
                          <SelectValue defaultValue={clientfile.typeOfContact} />
                        </SelectTrigger>
                        <SelectContent className=' bg-background text-foreground border border-border' >
                          <SelectGroup>
                            <SelectLabel>Contact Method</SelectLabel>
                            <SelectItem value="Phone">Phone</SelectItem>
                            <SelectItem value="InPerson">In-Person</SelectItem>
                            <SelectItem value="SMS">SMS</SelectItem>
                            <SelectItem value="Email">Email</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground text-muted-foreground">Best Type To Contact</label>
                    </div>
                    <ButtonLoading
                      size="sm"
                      value="updateClient"
                      className="w-auto cursor-pointer ml-auto mt-5 mb-5 "
                      name="intent"
                      type="submit"
                      isSubmitting={isSubmitting}
                      onClick={() => toast.success(`${clientfile.firstName}'s customer file is updated...`)}
                      loadingText={`${clientfile.firstName}'s customer file is updated...`}
                    >
                      Save
                      <FaSave className="h-4 w-4 ml-2" />
                    </ButtonLoading>
                  </Form>
                </div>
                <div className='col-span-2 lg:mx-3'>
                  <Tabs defaultValue="Communications">
                    <TabsList >
                      <TabsTrigger value="Communications">Communications</TabsTrigger>
                      <TabsTrigger value="Phone">Phone</TabsTrigger>
                      <TabsTrigger value="SMS">SMS</TabsTrigger>
                      <TabsTrigger value="Email">Email</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Email">
                      <MyIFrameComponent />
                    </TabsContent>
                    <TabsContent value="Communications">
                      <Card className=" text-foreground  rounded-lg" x-chunk="dashboard-05-chunk-4"                >
                        <CardHeader className="flex flex-row items-start  bg-muted/50 ">
                          <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                              Communications
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </CardTitle>
                          </div>
                          <div className="ml-auto flex items-center gap-1">
                            <TooltipProvider delayDuration={0}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="ml-auto rounded-full"
                                    onClick={() => setOpenComms(true)}
                                  >
                                    <PlusIcon className="h-4 w-4" />
                                    <span className="sr-only">Add Communication</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent sideOffset={10} className='bg-primary'>Add Communication</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow !grow overflow-y-auto overflow-x-clip p-6 text-sm bg-background">
                          <div className="grid gap-3 max-h-[40vh] h-auto">
                            <div className="space-y-4 mt-5">
                              {comms ? (<>
                                {comms && comms.map((message, index) => (
                                  <div
                                    key={index}
                                    className={cn(
                                      "flex  max-w-[75%]   w-[65%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                      message.direction === 'Outgoing'
                                        ? "ml-auto bg-primary text-foreground"
                                        : "bg-[#262626]"
                                    )}
                                  >
                                    <div className='grid grid-cols-1'>
                                      <div className='flex justify-between'>
                                        <p>{message.direction}</p>
                                        <p className='text-right'>{message.type}</p>
                                      </div>
                                      <div className='flex justify-between'>
                                        <p>{message.result}</p>
                                        {message.userEmail === 'Outgoing' && (
                                          <p className='text-[#8c8c8c] text-right'>
                                            {message.userName}
                                          </p>
                                        )}
                                      </div>
                                      <p className='text-muted-foreground'>
                                        {new Date(message.createdAt).toLocaleDateString("en-US", options2)}
                                      </p>
                                      <p>{message.subject}</p>
                                      <p>{message.body}</p>
                                    </div>
                                  </div>
                                ))}
                              </>) : (<>
                                <p className='text-center mt-5'>No communications yet conducted.</p>
                              </>)}
                            </div>

                          </div>
                          <Dialog open={openComms} onOpenChange={setOpenComms}>
                            <DialogContent className="gap-0 p-0 outline-none border-border text-foreground">
                              <Form method='post'>
                                <DialogHeader className="px-4 pb-4 pt-5">
                                  <DialogTitle>Add Communication</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-3 mx-3 mb-3">
                                  <div className="relative mt-3">
                                    <Input
                                      id="subject"
                                      type="text"
                                      className="w-full bg-background border-border "
                                    />
                                    <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">Subject</label>
                                  </div>
                                  <div className="relative mt-3">
                                    <Select name='body' defaultValue="Gave pricing, need to follow up">
                                      <SelectTrigger className="w-full  border-border  ">
                                        <SelectValue placeholder="Message examples" />
                                      </SelectTrigger>
                                      <SelectContent className='bg-background text-foreground bg-background border-border'>
                                        <SelectGroup>
                                          <SelectLabel>Message examples</SelectLabel>
                                          <SelectItem value="">-- Moving Forward --</SelectItem>
                                          <SelectItem value="Wants to move forward, got deposit">Wants to move forward, got deposit</SelectItem>
                                          <SelectItem value="Wants to move forward, did not have credit card on him">Wants to move forward, did not have credit card on him</SelectItem>
                                          <SelectItem value="Wants to get finance approval before moving forward">Wants to get approval before moving forward</SelectItem>
                                          <SelectItem value="Sent BOS to sign off on">Sent BOS to sign off on deal</SelectItem>
                                          <SelectItem value="Wants to come back in to view and negotiate">Wants to come back in to view and negotiate</SelectItem>

                                          <SelectItem value="">-- Stand Still --</SelectItem>
                                          <SelectItem value="Talked to spouse, client was not home">Talked to wife, husband was not home</SelectItem>
                                          <SelectItem value="Got ahold of the client, was busy, need to call back">Got ahold of the client, was busy need to call back</SelectItem>
                                          <SelectItem value="Gave pricing, need to follow up">Gave pricing, need to follow up</SelectItem>
                                          <SelectItem value="Needs to discuss with spouse">Needs to discuss with spouse</SelectItem>
                                          <SelectItem value="No Answer / Left Message">No Answer / Left Message</SelectItem>

                                          <SelectItem value="">-- Not Moving Forward --</SelectItem>
                                          <SelectItem value="Does not want to move forward right now wants me to call in the future">Does not want to move forward right now wants me to call in the future</SelectItem>
                                          <SelectItem value="Bought else where, set to lost">Bought else where</SelectItem>
                                          <SelectItem value="Does not want to move forward, set to lost">Does not want to move forward, set to lost</SelectItem>
                                          <SelectItem value=""></SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Note Examples</label>
                                  </div>
                                  <div className="relative mt-3">
                                    <Input
                                      id="name"
                                      type="text"
                                      name='body2'
                                      className="w-full bg-background border-border  "
                                    />
                                    <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Or write a custom body...</label>
                                  </div>
                                  <div className="relative mt-3">
                                    <Select name='type' defaultValue="Phone">
                                      <SelectTrigger className="w-full    bg-background border-border">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className='bg-background text-foreground bg-background  border-border'>
                                        <SelectGroup>
                                          <SelectLabel>Contact Method</SelectLabel>
                                          <SelectItem value="Phone">Phone</SelectItem>
                                          <SelectItem value="In Person">In-Person</SelectItem>
                                          <SelectItem value="SMS">SMS</SelectItem>
                                          <SelectItem value="Email">Email</SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Contact Method</label>
                                  </div>
                                  <div className="relative mt-3">
                                    <Select name='result' defaultValue="Reached">
                                      <SelectTrigger className="w-full  focus:border-primary  bg-background border-border">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className='bg-background text-foreground  border-border'>
                                        <SelectGroup>
                                          <SelectLabel>Result of call</SelectLabel>
                                          <SelectItem value="Reached">Reached</SelectItem>
                                          <SelectItem value="N/A">N/A</SelectItem>
                                          <SelectItem value="Attempted">Left Message</SelectItem>
                                          <SelectItem value="Completed">Completed</SelectItem>
                                          <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Result of call</label>
                                  </div>
                                  <div className="relative mt-3">
                                    <Select name='direction' defaultValue="Incoming">
                                      <SelectTrigger className="w-full  focus:border-primary  bg-background border-border">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className='bg-background text-foreground  border-border'>
                                        <SelectGroup>
                                          <SelectLabel>Direction of call</SelectLabel>
                                          <SelectItem value="Incoming">Incoming</SelectItem>
                                          <SelectItem value="Outgoing">Outgoing</SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    <label className=" text-sm absolute left-3 -top-3 px-2 rounded-full bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Direction of call</label>
                                  </div>

                                </div>
                                <DialogFooter className="flex items-center  p-4 sm:justify-between">
                                  <input type='hidden' name='clientfileId' defaultValue={clientfile.id} />
                                  <input type='hidden' name='userEmail' defaultValue={user.email} />
                                  <input type='hidden' name='userName' defaultValue={user.name} />

                                  <Button
                                    value="addComms"
                                    type="submit"
                                    name="intent"
                                    onClick={() => {
                                      toast.success(`Communication Added!`)
                                    }}
                                    className='bg-primary ml-auto '>
                                    Add Communication
                                    <PaperPlaneIcon className=" ml-2 h-4 w-4" />
                                  </Button>
                                </DialogFooter>
                              </Form>
                            </DialogContent>
                          </Dialog>
                        </CardContent>
                        <CardFooter className="flex flex-row items-center border-t border-border bg-muted/50  px-6 py-3">
                          <div className="text-xs text-muted">

                          </div>

                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}
            {tabState === 'PAC' && (
              <div className='grid lg:grid-cols-3'>
                <div className='lg:col-span-2 m-3'>
                  <AccTable
                    AccOrders={AccOrders}
                    setValue={setValue}
                    showPrevOrderById={showPrevOrderById}
                  />
                </div>
                <div className='lg:col-span-1 m-3'>
                  <MySidebar
                    showPrev={showPrev}
                    lastOrder={lastAccOrder}
                    searchResults={searchResults}
                    totalAccessoriesCost={totalAccessoriesCost}
                    tax={tax}
                    totalAmountPaid={totalAmountPaid}
                    toggleOrderDetails={toggleOrderDetails}
                    showPrevOrderById={showPrevOrderById}
                    showPrevOrder={showPrevOrder}
                    showOrder={showOrder}
                    total={total}
                    taxRate={taxRate}
                    toReceipt={toReceipt}
                    options2={options2}
                    setShowPrev={setShowPrev}
                    setShowPrevOrder={setShowPrevOrder}
                    user={user}
                  />
                </div>
              </div>
            )}
            {tabState === 'Work Orders' && (
              <div className='grid lg:grid-cols-3'>
                <div className='lg:col-span-2'>
                  <WorkorderTabled
                    orders={WorkOrder}
                    user={user}
                    clientfile={clientfile}
                    showPrevOrder={showPrevOrderWO}
                    setShowPrev={setShowPrev}
                    setShowPrevOrder={setShowPrevOrderWO}
                    showPrevWorkOrderById={showPrevWorkOrderById}
                    setPartsSubTotal={setPartsSubTotal}
                    setTotalAmountPaid={setTotalAmountPaid}
                    setTotal={setTotal}
                    taxRate={taxRate}
                    discDollar={discDollar}
                    discPer={discPer}
                    setTotalPreTax={setTotalPreTax}
                    setServiceSubTotal={setServiceSubTotal}
                  />
                </div>
                <WorkOrderBar
                  order={order}
                  showPrev={showPrev}
                  user={user}
                  clientfile={clientfile}
                  showPrevOrder={showPrevOrderWO}
                  setShowPrevOrder={setShowPrevOrderWO}
                  totalAccessoriesCost={totalAccessoriesCost}
                  totalAmountPaid={totalAmountPaid}
                  total={total}
                  partsSubTotal={partsSubTotal}
                  totalPreTax={totalPreTax}
                  serviceSubTotal={serviceSubTotal}
                  serviceHours={serviceHours}
                  serviceHoursVar={serviceHoursVar}
                  adjustedService={adjustedService}
                  taxRate={taxRate}

                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}


export function WorkorderTabled({ orders, user, clientfile, showPrevOrder, setShowPrevOrder, setShowPrev, showPrevWorkOrderById, setPartsSubTotal, setTotalAmountPaid, setTotal, discDollar, discPer, setTotalPreTax, setServiceSubTotal, taxRate }) {

  //  table
  const [data, setData] = useState(orders);

  const defaultColumn = {
    cell: ({ row, column: { id } }) => {
      const data = row.original
      return (
        <p
          className="text-center py-1 px-2 text-foreground mx-auto flex justify-center"
        >
          {row.getValue(id)}
        </p>
      )
    },
  }
  let addProduct = useFetcher();
  const tax = clientfile.Dealer
  let formRef = useRef();

  // const remaining = parseFloat(total) - parseFloat(totalAmountPaid)
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const savedVisibility = user.ColumnStateInventory.state
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedModel, setSelectedModel] = useState({})
  const [filterBy, setFilterBy] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [selectedGlobal, setSelectedGlobal] = useState(false);
  const [todayfilterBy, setTodayfilterBy] = useState(null);
  const [models, setModels] = useState([]);
  const [modelName, setModelName] = useState([]);
  const [subModel, setSubModel] = useState([]);
  const order = showPrevOrder

  const handleDropdownChange = (value) => {
    setGlobalFilter(value);
  };
  useEffect(() => {
    if (showPrevOrder) {
      const partsSub = showPrevOrder?.AccOrders?.reduce((total, accOrder) => {
        return total + accOrder?.AccessoriesOnOrders?.reduce((subTotal, accessoryOnOrder) => {
          return subTotal + (accessoryOnOrder.accessory.price * accessoryOnOrder.quantity);
        }, 0);
      }, 0);
      setPartsSubTotal(partsSub.toFixed(2))

      const serviceSub = showPrevOrder?.ServicesOnWorkOrders?.reduce((total, serviceOnOrder) => {
        return total + (serviceOnOrder.service.price * serviceOnOrder.hr * serviceOnOrder.quantity);
      }, 0);
      setServiceSubTotal(serviceSub.toFixed(2))

      const totalPreTax = partsSub + serviceSub;
      setTotalPreTax(totalPreTax.toFixed(2));

      const total2 = ((parseFloat(partsSub + serviceSub) - parseFloat(discDollar)) * taxRate).toFixed(2);
      const total1 = (((parseFloat(partsSub + serviceSub) * (100 - parseFloat(discPer))) / 100) * taxRate).toFixed(2);
      const calculatedTotal = discDollar && discDollar > 0.00 ? total1 : total2;

      setTotal(calculatedTotal);
      const totalAmountPaid2 = showPrevOrder.Payments.reduce((total, payment) => {
        return total + payment.amountPaid;
      }, 0);
      if (totalAmountPaid2) {
        setTotalAmountPaid(totalAmountPaid2)
      }

    }
  }, [showPrevOrder]);
  const [date, setDate] = useState<Date>()

  const newDate = new Date()
  const [datefloorPlanDueDate, setDatefloorPlanDueDate] = useState<Date>()

  const columns = [
    {
      id: 'CustomerName',
      accessorKey: "Customer Name",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,

      cell: ({ row, column: { id } }) => {
        const data = row.original
        return (
          <div className='grid grid-cols-1'>
            <p>{data.Clientfile.firstName} {data.Clientfile.lastName}</p>
            <p className='text-muted-foreground'>{data.Clientfile.email} </p>
          </div>
        )
      },
    },

    {
      id: 'status',
      accessorKey: "status",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      header: ({ column }) => {
        return (
          <Select
            onValueChange={(value) => {
              const status = table.getColumn("status");
              status.setFilterValue(value);
            }}

            name='filter'>
            <SelectTrigger className="w-auto focus:border-primary mx-auto">
              <SelectValue placeholder='Filter' />
            </SelectTrigger>
            <SelectContent className='bg-background text-foreground border-border'>
              <SelectItem value="Quote">Quote</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Waiting On Parts">Waiting On Parts</SelectItem>
              <SelectItem value="Waiter">Waiter</SelectItem>
              <SelectItem value="In Works">In Works</SelectItem>
              <SelectItem value="Work Completed">Work Completed</SelectItem>
              <SelectItem value="Scheduled for Delivery">Scheduled for Delivery</SelectItem>
              <SelectItem value="Long Term Storage">Long Term Storage</SelectItem>
              <SelectItem value="Winter Storage">Winter Storage</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        )
      },
    },
    {
      id: 'location',
      accessorKey: "location",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      header: ({ column }) => {
        return (
          <Select
            onValueChange={(value) => {
              let status = table.getColumn("location");
              status.setFilterValue(value);
            }}
            name='filter'>
            <SelectTrigger className="w-auto focus:border-primary mx-auto">
              <SelectValue placeholder='Location' />
            </SelectTrigger>
            <SelectContent className='bg-background text-foreground border-border'>
              <SelectItem value="Garage">Garage</SelectItem>
              <SelectItem value="Storage">Storage</SelectItem>
              <SelectItem value="In Lot">In Lot</SelectItem>
              <SelectItem value="In Secondary Lot">In Secondary Lot</SelectItem>
              <SelectItem value="Outback">Outback</SelectItem>
              <SelectItem value="Sales Floor">Sales Floor</SelectItem>
              <SelectItem value="In Store">In Store</SelectItem>
            </SelectContent>
          </Select>
        )
      },
    },
    {
      id: 'Unit',
      accessorKey: "unit",
      header: ({ column }) => {
        return (
          <p className='text-center'>Unit</p>
        )
      },
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
    },
    {
      id: 'vin',
      header: ({ column }) => {
        return (
          <p className='text-center'>VIN</p>
        )
      },
      accessorKey: "VIN",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
    },
    {
      id: 'tag',
      header: ({ column }) => {
        return (
          <p className='text-center'>Tag</p>
        )
      },
      accessorKey: "tag",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
    },
    {
      id: 'Work Order #',
      accessorKey: "Work Order #",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,

      cell: ({ row, column: { id } }) => {
        const data = row.original
        return (
          <div className='grid grid-cols-1'>
            <p className='text-center'>{data.workOrderId}</p>
          </div>
        )
      },
    },
    {
      id: 'createdAt',
      header: ({ column }) => {
        return (
          <p className='text-center'>Created At</p>
        )
      },
      accessorKey: "createdAt",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      cell: ({ row, column: { id } }) => {
        const data = row.original
        return (
          <p className='text-center'>{new Date(data.createdAt).toLocaleDateString("en-US", options2)}</p>
        )
      },
    },
    {
      id: 'Actions',
      header: ({ column }) => {
        return (
          <p className='text-center'>Actions</p>
        )
      },
      accessorKey: "Actions",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      cell: ({ row, column: { id } }) => {
        const data = row.original
        return (
          <div className='flex items-center'>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="mr-3 hover:bg-primary"
                  onClick={() => {
                    setShowPrevOrder(data)

                    setShowPrev(true)
                    showPrevWorkOrderById(data.workOrderId)
                  }}
                >
                  <Eye className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Show Order
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={`/dealer/service/workOrder/${data.workOrderId}`} >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="mr-3 hover:bg-primary"

                  >
                    <Navigation className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                Go To Order
              </TooltipContent>
            </Tooltip>
          </div>
        )
      },
    },
  ]
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    filterFns: { fuzzy: fuzzyFilter, },
    globalFilterFn: 'fuzzy',
    initialState: { columnVisibility },

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onColumnVisibilityChange: setColumnVisibility,


    onRowSelectionChange: setRowSelection,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
  });

  // clears filters
  const setAllFilters = () => {
    setColumnFilters([]);
    setSorting([]);
    setFilterBy("");
    setGlobalFilter([]);
  };
  const toggleFilter = () => {
    setAllFilters()
    setShowFilter(!showFilter);
  };
  const setColumnFilterDropdown = (event) => {
    const columnId = event.target.getAttribute("data-value");
    setSelectedColumn(columnId);
    console.log("Selected column:", columnId);
    // Add your logic here to handle the column selection
  };
  const handleGlobalChange = (value) => {
    console.log("value", value);
    table.getColumn(selectedColumn)?.setFilterValue(value);
  };
  const CallsList = [
    {
      key: "inStock",
      name: "In Stock",
    },
    {
      key: "available",
      name: "Available",
    },
    {
      key: "inStockArrived",
      name: "In Stock and Available",
    },
    {
      key: "newStock",
      name: "New Stock",
    },
    {
      key: "usedStock",
      name: "Used Stock",
    },
    {
      key: "sold",
      name: "Sold",
    },
    {
      key: "otd",
      name: "Out The Door",
    },
    {
      key: "deposits",
      name: "Sold Units - Waiting To Be Picked Up",
    },
  ];
  const DeliveriesList = [
    {
      key: "todaysDeliveries",
      name: "Deliveries - Today",
    },
    {
      key: "tomorowsDeliveries",
      name: "Deliveries - Tomorrow",
    },
    {
      key: "yestDeliveries",
      name: "Deliveries - Yesterday",
    },
    {
      key: "deliveredThisMonth",
      name: "Delivered - Current Month",
    },
    {
      key: "deliveredLastMonth",
      name: "Delivered - Last Month",
    },
    {
      key: "deliveredThisYear",
      name: "Delivered - Year",
    },
  ];
  const DepositsTakenList = [
    {
      key: "depositsToday",
      name: "Deposit Taken - Need to Finalize Deal",
    },
  ];
  const handleFilterChange = (selectedFilter) => {
    setAllFilters()
    const customerStateColumn = table.getColumn('customerState');
    const nextAppointmentColumn = table.getColumn('nextAppointment');
    const deliveredDate = table.getColumn('deliveredDate');
    const pickUpDate = table.getColumn('pickUpDate');
    const status = table.getColumn('status');
    const depositMade = table.getColumn('depositMade');
    const sold = table.getColumn('sold')
    const delivered = table.getColumn('delivered')
    const signed = table.getColumn('signed')
    const financeApp = table.getColumn('financeApp')

    switch (selectedFilter) {
      case 'inStock':
        table.getColumn('status')?.setFilterValue('available');
        table.getColumn('onOrder')?.setFilterValue('false');
        break;
      case 'available':
        table.getColumn('status')?.setFilterValue('available');
        break;
      case 'inStockArrived':
        table.getColumn('status')?.setFilterValue('available');
        table.getColumn('orderStatus')?.setFilterValue('STOCK');
        break;
      case 'newStock':
        table.getColumn('new')?.setFilterValue(true);
        break;
      case 'usedStock':
        table.getColumn('new')?.setFilterValue(false);
        break;
      case 'sold':
        table.getColumn('status')?.setFilterValue('reserved');
        break;
      case 'otd':
        table.getColumn('status')?.setFilterValue('sold');
        break;
      case 'deposits':
        table.getColumn('status')?.setFilterValue('reserved');
        break;
      case 'customerOrders':
        table.getColumn('orderStatus')?.setFilterValue('WISH');
        break;
      case 'deliveredThisMonth':
        customerStateColumn?.setFilterValue('delivered');
        deliveredDate?.setFilterValue(getFirstDayOfCurrentMonth);
        status?.setFilterValue('active');
        break;
      case 'todaysDeliveries':
        pickUpDate?.setFilterValue(getToday);
        status?.setFilterValue('active');
        sold?.setFilterValue(sold && sold.length > 3);
        delivered?.setFilterValue(null)
        break;
      case 'tomorowsDeliveries':
        pickUpDate?.setFilterValue(getTomorrow);
        status?.setFilterValue('active');
        depositMade?.setFilterValue(depositMade && depositMade.length > 3);
        sold?.setFilterValue(sold && sold.length > 3);
        delivered?.setFilterValue(null)
        break;
      case 'yestDeliveries':
        pickUpDate?.setFilterValue(getYesterday);
        status?.setFilterValue('active');
        depositMade?.setFilterValue(depositMade && depositMade.length > 3);
        sold?.setFilterValue(sold && sold.length > 3);
        delivered?.setFilterValue(null)
        break;

      case 'deliveredThisYear':
        customerStateColumn?.setFilterValue('delivered');
        deliveredDate?.setFilterValue(getThisYear);
        status?.setFilterValue('active');
        break;
      case 'depositsToday':
        status?.setFilterValue('active');
        depositMade?.setFilterValue('on');
        sold?.setFilterValue('on');
        delivered?.setFilterValue('off')
        signed?.setFilterValue('off')
        financeApp?.setFilterValue('off')
        break;
      default:
        null;
    }
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}`;
  };
  const showPrevOrderById = (id) => {
    const filteredOrder = orders.find(order => order.workOrderId === id);
    setShowPrev(true)
    setShowPrevOrder(filteredOrder);
  }
  const now = new Date();
  const formattedDate = formatDate(now);
  function getToday() {
    const today = new Date();
    today.setDate(today.getDate());
    console.log(formatDate(today), 'today')
    return formatDate(today);
  }
  function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDate(tomorrow);
  }
  function getYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return formatDate(yesterday);
  }
  function getLastDayOfPreviousMonth() {
    const date = new Date();
    date.setDate(1); // sets the day to the last day of the previous month
    return formatMonth(date);
  }
  function getFirstDayOfCurrentMonth() {
    const date = new Date();
    date.setDate(1); // sets the day to the first day of the current month
    return formatDate(date);
  }
  function getFirstDayOfTwoMonthsAgo() {
    const date = new Date();
    date.setMonth(date.getMonth() - 2);
    date.setDate(1); // sets the day to the first day of the month two months ago
    return formatMonth(date);
  }
  function getYear() {
    const today = new Date();
    return today.getFullYear().toString();
  }
  const getThisYear = getYear();

  return (
    <div className="w-[95%] ">
      <div className="container mx-auto py-3">
        <div className="flex items-center py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='sm' variant="outline" className='mr-3' >Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border border-border bg-background text-foreground">
              <DropdownMenuLabel>Dashboard Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => setSelectedGlobal(true)}
                >
                  Global Filter
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    Default Filters
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="h-auto max-h-[175px] overflow-y-auto border border-border bg-background text-foreground">
                      <DropdownMenuLabel>
                        {todayfilterBy || "Default Filters"}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {CallsList.map((item) => (
                        <DropdownMenuItem
                          onSelect={(event) => {
                            const value =
                              event.currentTarget.getAttribute("data-value");
                            const item =
                              CallsList.find((i) => i.key === value) ||
                              DeliveriesList.find((i) => i.key === value) ||
                              DepositsTakenList.find((i) => i.key === value);
                            if (item) {
                              handleFilterChange(item.key);
                              setTodayfilterBy(item.name);
                            }
                          }}
                          data-value={item.key}
                          textValue={item.key}
                        >
                          {item.name}
                        </DropdownMenuItem>
                      ))}

                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    Global Filters
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="h-[350px] max-h-[350px] overflow-y-auto border border-border bg-background text-foreground">
                      {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => (
                          <DropdownMenuItem
                            onSelect={(event) => {
                              setColumnFilterDropdown(event);
                            }}
                            data-value={column.id}
                            key={column.id}
                            className="cursor-pointer bg-background capitalize text-foreground  hover:text-primary hover:underline"
                          >
                            {column.id}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setAllFilters([]);
                    setSelectedGlobal(false);
                  }}
                >
                  Clear
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={toggleFilter}
                >
                  Toggle All Columns
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    Column Toggle
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="h-[350px] max-h-[350px] overflow-y-auto border border-border bg-background text-foreground">
                      {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                          return (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="cursor-pointer bg-background  capitalize text-foreground"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                              }
                            >
                              {column.id}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedColumn && (
            <div className="relative flex-1 md:grow-0 ">
              <Input
                placeholder={`Filter ${selectedColumn}...`}
                onChange={(e) => handleGlobalChange(e.target.value)}
                className="ml-2 max-w-sm w-auto "
                autoFocus
              />
              <Button
                onClick={() => {
                  setAllFilters([]);
                  setSelectedGlobal(false);
                }}
                size="icon"
                variant="ghost"
                className='bg-transparent mr-2 absolute right-2.5 top-2.5 h-4 w-4 text-foreground '>
                <X />
              </Button>
            </div>
          )}
          <div className="relative flex-1 md:grow-0 ">
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="mx-1 ml-3 rounded-md border border-border bg-background p-2 text-foreground shadow w-[300px] "
              placeholder="Search..." autoFocus
            />
            <Button
              onClick={() => {
                setGlobalFilter([]);
                setSelectedGlobal(false);
              }}
              size="icon"
              variant="ghost"
              className='bg-transparent mr-2 absolute right-2.5 top-2.5 h-4 w-4 text-foreground '>
              <X size={16} />
            </Button>
          </div>
        </div>
        <div className="rounded-md border border-border    h-auto max-h-[600px] overflow-y-auto  ">
          <Table className='border border-border text-foreground bg-background'>
            <TableHeader className='border border-border text-muted-foreground bg-background text-center'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className='border-border'>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {header.column.getCanFilter() && showFilter && (
                          <div className="sticky  z-5 mx-auto items-center justify-center cursor-pointer text-center ">
                            <Filter column={header.column} table={table} />
                          </div>
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className='border border-border text-foreground bg-background '>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className='border border-border text-foreground bg-background'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center border border-border text-foreground bg-background">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
export const WorkOrderBar = ({ order, showPrev, user, clientfile, showPrevOrder, setShowPrevOrder, partsSubTotal, totalPreTax, serviceSubTotal, serviceHours, serviceHoursVar, adjustedService, totalAmountPaid, totalAccessoriesCost, total, taxRate }) => {
  const status = useFetcher()
  const navigate = useNavigate()
  const submit = useSubmit()
  let addProduct = useFetcher();
  const tax = clientfile.Dealer
  let formRef = useRef();

  let toReceipt

  if (showPrevOrder) {
    const client = showPrevOrder.Clientfile
    const maxAccessories = 19;

    toReceipt = {
      qrCode: showPrevOrder.workOrderId,
      subTotal: `$${totalAccessoriesCost.toFixed(2)}`,
      tax: `${user.Dealer.userTax}%`,
      total: `$${total}`,
      remaining: `$${parseFloat(total) - parseFloat(totalAmountPaid)}`,
      firstName: client.firstName,
      lastName: client.lastName,
      phone: client.phone,
      email: client.email,
      address: client.address,
      date: new Date().toLocaleDateString("en-US", options2),
      cardNum: '',
      paymentType: '',
      image: user.Dealer.DealerLogo.dealerLogo
    };

    let accessoryIndex = 0;
  }
  return (
    <div className='lg:col-span-1'>
      {showPrev && (
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4"          >
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                W / O #{order.workOrderId}
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              {order.status && (
                <div>
                  <div className="relative mt-4">
                    <Select
                      name='status'
                      defaultValue={order.status}
                      onValueChange={(value) => {
                        const formData = new FormData();
                        formData.append("id", order.workOrderId);

                        formData.append("intent", 'updateStatus');
                        formData.append("status", value);
                        console.log(formData, 'formData');
                        status.submit(formData, { method: "post" });
                        toast.success(`Changed status to ${value}`)
                      }}>
                      <SelectTrigger className="w-[200px] " >
                        <SelectValue defaultValue={order.status} />
                      </SelectTrigger>
                      <SelectContent className='border-border'>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="Quote">Quote</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Open">Open / Scheduled</SelectItem>
                          <SelectItem value="Waiting On Parts">Waiting On Parts</SelectItem>
                          <SelectItem value="Waiter">Waiter</SelectItem>
                          <SelectItem value="In Works">In Works</SelectItem>
                          <SelectItem value="Work Completed">Work Completed</SelectItem>
                          <SelectItem value="Scheduled For Delivery">Scheduled For Delivery</SelectItem>
                          <SelectItem value="Long Term Storage">Long Term Storage</SelectItem>
                          <SelectItem value="Winter Storage">Winter Storage</SelectItem>
                          <SelectItem value="Closer" disabled>Closed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-muted/50 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Status</label>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-auto flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border border-border"
                >
                  <DropdownMenuItem
                    onSelect={() => {
                      navigate(`/dealer/service/workOrder/${order.workOrderId}`)
                    }}>
                    Go To Order
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      console.log(toReceipt)
                      PrintReceipt(toReceipt)
                    }}>
                    Reprint Receipt
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled>
                    Show Discount
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => {
                      const formData = new FormData();
                      formData.append("workOrderId", order.workOrderId);
                      formData.append("intent", 'deleteOrder');
                      submit(formData, { method: "post", });
                    }}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm h-auto max-h-[850px] overflow-y-auto">
            <Accordion type="single" collapsible className="w-full border-border mt-3">
              <AccordionItem value="item-1" className='border-border'>
                <AccordionTrigger>Customer Information</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3">
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Customer</dt>
                        <dd>{order.Clientfile.name}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>
                          <a href="mailto:">{order.Clientfile.email}</a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Phone</dt>
                        <dd>
                          <a href="tel:">{order.Clientfile.phone}</a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="w-full border-border mt-3">
              <AccordionItem value="item-1" className='border-border'>
                <AccordionTrigger>Customer Unit</AccordionTrigger>
                <AccordionContent>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Unit</dt>
                      <dd>
                        <EditableText
                          value={order.unit}
                          fieldName="name"
                          inputClassName=" border border-border rounded-lg  text-foreground bg-background py-1 px-2 w-[150px] "
                          buttonClassName="text-center py-1 px-2 text-foreground"
                          buttonLabel={`Edit quantity`}
                          inputLabel={`Edit quantity`}
                        >
                          <input type="hidden" name="intent" value='updateWorkOrderUnit' />
                          <input type='hidden' name='workOrderId' value={order.workOrderId} />
                          <input type="hidden" name="col" value='unit' />
                        </EditableText>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Color</dt>
                      <dd>
                        <EditableText
                          value={order.color}
                          fieldName="name"
                          inputClassName=" border border-border rounded-lg  text-foreground bg-background py-1 px-2 w-[150px] "
                          buttonClassName="text-center py-1 px-2 text-foreground"
                          buttonLabel={`Edit quantity`}
                          inputLabel={`Edit quantity`}
                        >
                          <input type="hidden" name="intent" value='updateWorkOrderUnit' />
                          <input type='hidden' name='workOrderId' value={order.workOrderId} />
                          <input type="hidden" name="col" value='color' />
                        </EditableText>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Mileage</dt>
                      <dd>
                        <EditableText
                          value={order.mileage}
                          fieldName="name"
                          inputClassName=" border border-border rounded-lg  text-foreground bg-background py-1 px-2 w-[150px] "
                          buttonClassName="text-center py-1 px-2 text-foreground"
                          buttonLabel={`Edit quantity`}
                          inputLabel={`Edit quantity`}
                        >
                          <input type="hidden" name="intent" value='updateWorkOrderUnit' />
                          <input type='hidden' name='workOrderId' value={order.workOrderId} />
                          <input type="hidden" name="col" value='mileage' />
                        </EditableText>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">vin</dt>
                      <dd>
                        <EditableText
                          value={order.vin}
                          fieldName="name"
                          inputClassName=" border border-border rounded-lg  text-foreground bg-background py-1 px-2 w-[150px] "
                          buttonClassName="text-center py-1 px-2 text-foreground"
                          buttonLabel={`Edit quantity`}
                          inputLabel={`Edit quantity`}
                        >
                          <input type="hidden" name="intent" value='updateWorkOrderUnit' />
                          <input type='hidden' name='workOrderId' value={order.workOrderId} />
                          <input type="hidden" name="col" value='vin' />
                        </EditableText>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Motor</dt>
                      <dd>
                        <EditableText
                          value={order.motor}
                          fieldName="name"
                          inputClassName=" border border-border rounded-lg  text-foreground bg-background py-1 px-2 w-[150px] "
                          buttonClassName="text-center py-1 px-2 text-foreground"
                          buttonLabel={`Edit quantity`}
                          inputLabel={`Edit quantity`}
                        >
                          <input type="hidden" name="intent" value='updateWorkOrderUnit' />
                          <input type='hidden' name='workOrderId' value={order.workOrderId} />
                          <input type="hidden" name="col" value='motor' />
                        </EditableText>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Tag</dt>
                      <dd>
                        <EditableText
                          value={order.tag}
                          fieldName="name"
                          inputClassName=" border border-border rounded-lg  text-foreground bg-background py-1 px-2 w-[150px] "
                          buttonClassName="text-center py-1 px-2 text-foreground"
                          buttonLabel={`Edit quantity`}
                          inputLabel={`Edit quantity`}
                        >
                          <input type="hidden" name="intent" value='updateWorkOrderUnit' />
                          <input type='hidden' name='workOrderId' value={order.workOrderId} />
                          <input type="hidden" name="col" value='tag' />
                        </EditableText>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">location</dt>
                      <dd>
                        <EditableText
                          value={order.location}
                          fieldName="name"
                          inputClassName=" border border-border rounded-lg  text-foreground bg-background py-1 px-2 w-[150px] "
                          buttonClassName="text-center py-1 px-2 text-foreground"
                          buttonLabel={`Edit quantity`}
                          inputLabel={`Edit quantity`}
                        >
                          <input type="hidden" name="intent" value='updateWorkOrderUnit' />
                          <input type='hidden' name='workOrderId' value={order.workOrderId} />
                          <input type="hidden" name="col" value='location' />
                        </EditableText>
                      </dd>
                    </div>
                  </dl>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="grid gap-3 mt-3">
              <div className="font-semibold">Work Order Services</div>
              <ul className="grid gap-3">
                {order.ServicesOnWorkOrders && order.ServicesOnWorkOrders.map((result, index) => {
                  const hours = result.hr || result.service.estHr || 0.00;
                  return (
                    <li key={index} className="flex items-center justify-between">
                      <div>
                        <ContextMenu>
                          <ContextMenuTrigger>
                            <div className='grid grid-cols-1'>
                              <div className='flex items-center group '>
                                <div className="font-medium">
                                  {result.service.service}
                                </div>
                                <addProduct.Form method="post" ref={formRef} className='mr-auto'>
                                  <input type="hidden" name="id" value={result.id} />
                                  <input type='hidden' name='total' value={total} />
                                  <input type='hidden' name='workOrderId' value={order.workOrderId} />
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    name="intent" value='deleteServiceItem'
                                    className=" ml-2 bg-primary  opacity-0 transition-opacity group-hover:opacity-100"
                                    type='submit'
                                  >
                                    <X className="h-4 w-4 text-foreground" />
                                  </Button>
                                </addProduct.Form>
                              </div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                <div className='flex items-center'>
                                  <div className="font-medium">
                                    <EditableText
                                      value={hours}
                                      fieldName="name"
                                      inputClassName=" border border-border rounded-lg  text-foreground bg-background py-1 px-2  w-[75px]"
                                      buttonClassName="text-center py-1 px-2 text-muted-foreground"
                                      buttonLabel={`Edit name`}
                                      inputLabel={`Edit name`}
                                    >
                                      <input type="hidden" name="intent" value='updateHr' />
                                      <input type="hidden" name="id" value={result.id} />
                                      <input type="hidden" name="colName" value='hr' />
                                    </EditableText>

                                  </div>
                                  <p>{" "}hrs{" "}{" "}@{" "}${user.Dealer.userLabour}</p>
                                </div>
                              </div>
                              {result.status && (
                                <div>
                                  <Badge className='text-sm  px-2 py-1 '>{result.status}</Badge>
                                </div>
                              )}
                            </div>
                          </ContextMenuTrigger>
                          <ContextMenuContent className='border-border'>
                            <ContextMenuSub>
                              <ContextMenuSubTrigger inset>Service Details</ContextMenuSubTrigger>
                              <ContextMenuSubContent className="w-48 border-border">
                                <ContextMenuItem>{result.service.service}</ContextMenuItem>
                                <ContextMenuItem>{result.service.description}</ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem>
                                  Est. Hours
                                  <ContextMenuShortcut>{result.service.estHr}</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuItem>
                                  Price
                                  <ContextMenuShortcut>${result.service.price}</ContextMenuShortcut>
                                </ContextMenuItem>
                              </ContextMenuSubContent>
                            </ContextMenuSub>
                            <ContextMenuSeparator />
                            <ContextMenuCheckboxItem
                              checked={result.status === 'In Stock'}
                              onSelect={() => {
                                const formData = new FormData();
                                formData.append("id", result.id);
                                formData.append("status", 'In Stock');
                                formData.append("intent", 'updateServiceOnOrders');
                                submit(formData, { method: "post", });
                              }}
                            >In Stock</ContextMenuCheckboxItem>
                            <ContextMenuCheckboxItem
                              checked={result.status === 'On Order'}
                              onSelect={() => {
                                const formData = new FormData();
                                formData.append("id", result.id);
                                formData.append("status", 'On Order');
                                formData.append("intent", 'updateServiceOnOrders');
                                submit(formData, { method: "post", });
                              }}
                            >On Order</ContextMenuCheckboxItem>
                            <ContextMenuCheckboxItem
                              checked={result.status === 'Completed'}
                              onSelect={() => {
                                const formData = new FormData();
                                formData.append("id", result.id);
                                formData.append("status", 'Completed');
                                formData.append("intent", 'updateServiceOnOrders');
                                submit(formData, { method: "post", });
                              }}
                            >Completed</ContextMenuCheckboxItem>
                            <ContextMenuCheckboxItem
                              checked={result.status === 'Back Order'}
                              onSelect={() => {
                                const formData = new FormData();
                                formData.append("id", result.id);
                                formData.append("status", 'Back Order');
                                formData.append("intent", 'updateServiceOnOrders');
                                submit(formData, { method: "post", });
                              }}
                            >Back Order</ContextMenuCheckboxItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      </div>
                      <span>
                        x{" "}{" "}{result.quantity}

                      </span>
                    </li>
                  )
                })}
              </ul>
              <Separator className="my-4" />
              <div className="font-semibold">Work Order Parts</div>
              <ul className="grid gap-3">
                {order?.AccOrders?.length > 0 ? (
                  order.AccOrders.map((accOrder, accOrderIndex) => (
                    <div key={accOrderIndex}>
                      {accOrder?.AccessoriesOnOrders?.length > 0 ? (
                        accOrder.AccessoriesOnOrders.map((accessoryOnOrder, accessoryIndex) => (
                          <li key={accessoryIndex} className="flex items-center justify-between">
                            <div>
                              <ContextMenu>
                                <ContextMenuTrigger>
                                  <div className='grid grid-cols-1'>
                                    <div className='flex items-center group '>
                                      <div className="font-medium">

                                        {accessoryOnOrder.accessory.name}
                                      </div>
                                      <addProduct.Form method="post" ref={formRef} className='mr-auto'>
                                        <input type="hidden" name="id" value={accessoryOnOrder.id} />
                                        <input type='hidden' name='total' value={accessoryOnOrder.accessory.price * accessoryOnOrder.quantity} />
                                        <input type='hidden' name='accOrderId' value={accOrder.id} />
                                        <Button
                                          size="icon"
                                          variant="outline"
                                          name="intent" value='deleteOrderItem'
                                          className=" ml-2 bg-primary  opacity-0 transition-opacity group-hover:opacity-100"
                                          type='submit'
                                        >
                                          <X className="h-4 w-4 text-foreground" />
                                        </Button>
                                      </addProduct.Form>
                                    </div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                      {accessoryOnOrder.accessory.brand}
                                    </div>
                                    <div>
                                      <Badge className='text-sm  px-2 py-1 '>{accessoryOnOrder.status}</Badge>
                                    </div>
                                  </div>
                                </ContextMenuTrigger>
                                <ContextMenuContent className='border-border'>
                                  <ContextMenuSub>
                                    <ContextMenuSubTrigger inset>Part Details</ContextMenuSubTrigger>
                                    <ContextMenuSubContent className="w-48 border-border">
                                      <ContextMenuItem>{accessoryOnOrder.accessory.partNumber}</ContextMenuItem>
                                      <ContextMenuItem>{accessoryOnOrder.accessory.brand} </ContextMenuItem>
                                      <ContextMenuItem>{accessoryOnOrder.accessory.name} </ContextMenuItem>
                                      <ContextMenuItem>{accessoryOnOrder.accessory.description} </ContextMenuItem>
                                      <ContextMenuItem>{accessoryOnOrder.accessory.category} </ContextMenuItem>
                                      <ContextMenuItem>{accessoryOnOrder.accessory.category} </ContextMenuItem>
                                      <ContextMenuSeparator />
                                      <ContextMenuItem>
                                        Cost
                                        <ContextMenuShortcut>${accessoryOnOrder.accessory.cost}</ContextMenuShortcut>
                                      </ContextMenuItem>
                                      <ContextMenuItem>
                                        Price
                                        <ContextMenuShortcut>${accessoryOnOrder.accessory.price}</ContextMenuShortcut>
                                      </ContextMenuItem>
                                      <ContextMenuItem>
                                        In Stock
                                        <ContextMenuShortcut>{accessoryOnOrder.accessory.quantity}</ContextMenuShortcut>
                                      </ContextMenuItem>
                                      <ContextMenuItem>
                                        On Order
                                        <ContextMenuShortcut>{accessoryOnOrder.accessory.onOrder}</ContextMenuShortcut>
                                      </ContextMenuItem>
                                      <ContextMenuItem>
                                        Location
                                        <ContextMenuShortcut>{accessoryOnOrder.accessory.location}</ContextMenuShortcut>
                                      </ContextMenuItem>
                                    </ContextMenuSubContent>
                                  </ContextMenuSub>
                                  <ContextMenuCheckboxItem
                                    checked={accessoryOnOrder.status === 'In Stock'}
                                    onSelect={() => {
                                      const formData = new FormData();
                                      formData.append("id", accessoryOnOrder.id);
                                      formData.append("status", 'In Stock');
                                      formData.append("intent", 'updateAccOnOrders');
                                      submit(formData, { method: "post", });
                                    }}
                                  >In Stock</ContextMenuCheckboxItem>
                                  <ContextMenuCheckboxItem
                                    checked={accessoryOnOrder.status === 'On Order'}
                                    onSelect={() => {
                                      const formData = new FormData();
                                      formData.append("id", accessoryOnOrder.id);
                                      formData.append("status", 'On Order');
                                      formData.append("intent", 'updateAccOnOrders');
                                      submit(formData, { method: "post", });
                                    }}
                                  >On Order</ContextMenuCheckboxItem>
                                  <ContextMenuCheckboxItem
                                    checked={accessoryOnOrder.status === 'Back Order'}
                                    onSelect={() => {
                                      const formData = new FormData();
                                      formData.append("id", accessoryOnOrder.id);
                                      formData.append("status", 'Back Order');
                                      formData.append("intent", 'updateAccOnOrders');
                                      submit(formData, { method: "post", });
                                    }}
                                  >Back Order</ContextMenuCheckboxItem>
                                </ContextMenuContent>
                              </ContextMenu>
                            </div>
                            <span>${accessoryOnOrder.accessory.price} x {accessoryOnOrder.quantity}</span>
                          </li>
                        ))
                      ) : (
                        <p>No Accessories On Orders available.</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No Orders available.</p>
                )}
              </ul>
              <Separator className="my-2" />

            </div>

            <Separator className="my-4" />
            <div className='gap-3'>
              <div className="font-semibold">Staff</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Technician
                  </span>
                  <span>{order.tech}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Service Writer
                  </span>
                  <span>{order.writer}</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3 border-border">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">November 23, 2023</time>
            </div>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Order</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next Order</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
export const MySidebar = ({
  showPrev, lastOrder, searchResults, showPrevOrder, options2, setShowPrev, setShowPrevOrder, tax, toggleOrderDetails, showPrevOrderById, showOrder, taxRate, toReceipt, user
}) => {
  const navigate = useNavigate()
  const [paymentType, setPaymentType] = useState('');
  const [discount, setDiscount] = useState(false)
  const [custInfo, setCustInfo] = useState(false)
  let fetcher = useFetcher();
  let buttonRef = useRef<HTMLButtonElement>(null);
  let inputRef = useRef<HTMLInputElement>(null);
  let addProduct = useFetcher();
  let formRef = useRef();
  let products = useFetcher();
  const [discDollar, setDiscDollar] = useState(0.00)
  const [discPer, setDiscPer] = useState(0.00)
  const submit = useSubmit()



  useEffect(() => {
    if (showPrev && showPrevOrder) {
      const calculatedTotalAmountPaid = calculateTotalAmountPaid(showPrevOrder);
      const calculatedTotalAccessoriesCost = calculateTotalAccessoriesCost(showPrevOrder);
      setTotalAmountPaid(calculatedTotalAmountPaid);
      setTotalAccessoriesCost(calculatedTotalAccessoriesCost);

      const total2 = ((parseFloat(calculatedTotalAccessoriesCost) - parseFloat(discDollar)) * taxRate).toFixed(2);
      const total1 = (((parseFloat(calculatedTotalAccessoriesCost) * (100 - parseFloat(discPer))) / 100) * taxRate).toFixed(2);
      const calculatedTotal = discDollar && discDollar > 0.00 ? total1 : total2;

      setTotal(calculatedTotal);
    }
  }, [showPrev, showPrevOrder, discDollar, discPer, taxRate]);
  if (showPrev) {
    return (
      <>
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Show Order
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>
                Date:{" "}
                {new Date().toLocaleDateString(
                  "en-US",
                  options2
                )}
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border border-border"
                >
                  <DropdownMenuItem
                    onSelect={() => {
                      navigate(`/dealer/accessories/newOrder/${showPrevOrder.id}`)
                    }}>
                    Go To Order
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      console.log(toReceipt)
                      PrintReceipt(toReceipt)
                    }}>
                    Reprint Receipt
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled
                    onSelect={() => setDiscount((prevDiscount) => !prevDiscount)}>
                    Show Discount
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    disabled
                    onSelect={() => {
                      setShowPrev(false)
                      setShowPrevOrder(null)
                    }}>
                    Back
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled
                    onSelect={() => {
                      const formData = new FormData();
                      formData.append("orderId", showPrevOrder.id);
                      formData.append("intent", 'deleteOrder');
                      submit(formData, { method: "post", });
                    }}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm max-h-[665px] h-auto overflow-y-auto">
            <div className="grid gap-3">
              <div className="font-semibold">Order Details</div>
              <ul className="grid gap-3 max-h-[300px] h-auto overflow-y-auto">
                {showPrevOrder.AccessoriesOnOrders && showPrevOrder.AccessoriesOnOrders.map((result, index) => (
                  <li className="flex items-center justify-between" key={index}  >
                    <div>
                      <div className="font-medium">
                        {result.accessory.brand}{" "}
                        {/*result.accessory.name*/}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {result.accessory.category}{" "}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {result.accessory.description}
                      </div>
                    </div>
                    <span>${result.accessory.price}{" "}{" "}x{" "}{" "}{result.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

          </CardContent>
          <CardFooter className="flex flex-row items-center border-t border-border bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated{" "}
              <time dateTime="2023-11-23">
                {new Date(showPrevOrder.createdAt).toLocaleDateString(
                  "en-US",
                  options2
                )}
              </time>
            </div>
          </CardFooter>
        </Card>
      </>
    );
  }

  if (lastOrder) {
    return (
      <>
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Last Order
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>
                Date:{" "}
                {new Date(lastOrder.createdAt).toLocaleDateString(
                  "en-US",
                  options2
                )}
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border border-border"
                >
                  <DropdownMenuItem>Go To Order</DropdownMenuItem>
                  <DropdownMenuItem>Reprint Receipt</DropdownMenuItem>
                  <DropdownMenuItem>Go To Cash</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm max-h-[665px] h-auto overflow-y-auto">
            <div className="grid gap-3">
              <div className="font-semibold">Order Details</div>
              <ul className="grid gap-3 max-h-[300px] h-auto overflow-y-auto">
                {lastOrder.AccessoriesOnOrders && lastOrder.AccessoriesOnOrders.map((result, index) => (
                  <li
                    className="flex items-center justify-between"
                    key={index}
                  >
                    <div>
                      <div className="font-medium">
                        {result.accessory.brand}{" "}
                        {/*result.accessory.name*/}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {result.accessory.category}{" "}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {result.accessory.description}
                      </div>
                    </div>
                    <span>${result.accessory.price}{" "}{" "}x{" "}{" "}{result.quantity}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalAccessoriesCost.toFixed(2)}</span>
                </li>
                {discount && (
                  <>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Discount $</span>
                      <fetcher.Form
                        method="post"
                        onSubmit={() => {
                          buttonRef.current?.focus();
                        }}
                        preventScrollReset
                      >
                        <input
                          name='accOrderId'
                          defaultValue={lastOrder.id}
                          type='hidden'
                        />
                        <input
                          name='intent'
                          defaultValue='updateDiscount'
                          type='hidden'
                        />
                        <input
                          name='total'
                          defaultValue={totalAccessoriesCost}
                          type='hidden'
                        />
                        <div className="relative ml-auto flex-1 md:grow-0 ">
                          <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground" />
                          <Input
                            ref={inputRef}
                            name='discDollar'
                            className='text-right pr-10 w-[100px]'
                            defaultValue={discDollar}
                            onChange={(event) => setDiscDollar(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === "Escape") {
                                buttonRef.current?.focus();
                              }
                            }}
                            onBlur={(event) => {
                              if (
                                inputRef.current?.value !== discDollar &&
                                inputRef.current?.value.trim() !== ""
                              ) {
                                fetcher.submit(event.currentTarget);
                              }
                            }}
                          />
                          <Button
                            type="submit"
                            size="icon"

                            disabled={!discDollar}
                            className='bg-primary mr-2 absolute right-1.5 top-2.5 h-4 w-4 text-foreground '>
                            <PaperPlaneIcon className="h-4 w-4" />
                            <span className="sr-only">Cash</span>
                          </Button>
                        </div>
                      </fetcher.Form>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Discount %</span>
                      <fetcher.Form
                        method="post"
                        onSubmit={() => {
                          buttonRef.current?.focus();
                        }}
                        preventScrollReset
                      >
                        <input
                          name='accOrderId'
                          defaultValue={lastOrder.id}
                          type='hidden'
                        />
                        <input
                          name='intent'
                          defaultValue='updateDiscPerc'
                          type='hidden'
                        />
                        <input
                          name='total'
                          defaultValue={totalAccessoriesCost}
                          type='hidden'
                        />
                        <div className="relative ml-auto flex-1 md:grow-0 ">
                          <Input
                            ref={inputRef}
                            name='discPer'
                            className='text-right pr-[43px] w-[100px]'
                            value={discPer}
                            onChange={(event) => setDiscPer(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === "Escape") {
                                buttonRef.current?.focus();
                              }
                            }}
                            onBlur={(event) => {
                              if (
                                inputRef.current?.value !== discPer &&
                                inputRef.current?.value.trim() !== ""
                              ) {
                                fetcher.submit(event.currentTarget);
                              }
                            }}
                          />
                          <Percent className="absolute right-10 top-[9px] h-4 w-4 text-foreground" />
                          <Button
                            type="submit"
                            size="icon"

                            disabled={!discPer}
                            className='bg-primary mr-2 absolute right-1.5 top-[9px] h-4 w-4 text-foreground '>
                            <PaperPlaneIcon className="h-4 w-4" />
                            <span className="sr-only">Cash</span>
                          </Button>
                        </div>
                      </fetcher.Form>

                    </li>
                  </>
                )}
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{user.Dealer.userTax}%</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>${total}</span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold flex justify-between">
                <p>
                  Customer Information
                </p>
                <Button
                  size="icon"
                  variant="outline"
                  className=" mr-2 bg-primary"
                  onClick={() => setCustInfo((prevCustInfo) => !prevCustInfo)}
                >
                  <ArrowDownUp className="h-4 w-4 text-foreground" />
                </Button>
              </div>
              {custInfo && (<>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Customer</dt>
                    <dd>
                      {lastOrder.Clientfile.firstName}{" "}
                      {lastOrder.Clientfile.lastName}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href="mailto:">{lastOrder.Clientfile.email}</a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href="tel:">{lastOrder.Clientfile.phone}</a>
                    </dd>
                  </div>
                </dl>
              </>)}
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Payment Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    {lastOrder.paymentType}
                  </dt>
                  {lastOrder.cardNum}
                </div>
              </dl>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t border-border bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated{" "}
              <time dateTime="2023-11-23">
                {new Date(lastOrder.createdAt).toLocaleDateString(
                  "en-US",
                  options2
                )}
              </time>
            </div>
          </CardFooter>
        </Card>
      </>
    );
  }

  if (searchResults?.AccOrder && searchResults?.AccOrder?.length > 0) {
    return (
      <>

        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Customer Search Result
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                All orders under their customer file
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border border-border"
                >
                  <DropdownMenuItem
                    onSelect={() => {
                      navigate(`/dealer/accessories/newOrder/${showPrevOrder.id}`)
                    }}>
                    Go To Order
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      return null
                    }}>
                    Reprint Receipt
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setDiscount((prevDiscount) => !prevDiscount)}>
                    Show Discount
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => {
                      setShowPrev(false)
                      setShowPrevOrder(null)
                    }}>
                    Back
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm max-h-[665px] h-auto overflow-y-auto">
            {searchResults.AccOrder.map((result, index) => (
              <>
                <Table className='w-[p'>
                  <TableBody>
                    <TableRow
                      key={index}
                      className="rounded-[6px] hover:bg-accent cursor-pointer"
                      onClick={() => {
                        toggleOrderDetails(result.id)
                      }}
                    >
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          className="text-xs"
                          variant="secondary"
                        >
                          {!result.fullfilled ? (
                            <p>Fullfilled</p>
                          ) : (
                            <p>Not Completed</p>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(
                          result.createdAt
                        ).toLocaleDateString("en-US", options2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {result.dept}
                      </TableCell>
                      <TableCell className="text-right">
                        ${result.total}
                      </TableCell>
                      <TableCell className="text-right">
                        <Tooltip>
                          <TooltipTrigger asChild>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="mr-2 hover:bg-primary"
                              onClick={() => showPrevOrderById(result.id)}
                            >
                              <ShoppingCart className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            See Details
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={`/dealer/accessories/newOrder/${result.id}`}
                            >
                              <Button
                                size="icon"
                                variant="ghost"
                                className="hover:bg-primary mr-2"
                              >
                                <Printer className="h-5 w-5" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            Go To Order
                          </TooltipContent>
                        </Tooltip>

                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {showOrder === result.id && (
                  <>
                    <div className="grid w-[300px] gap-3 rounded-lg border border-border p-6 m-3">
                      <div className="font-semibold">
                        Order Details
                      </div>
                      <ul className="grid gap-3">
                        {result.AccessoriesOnOrders && result.AccessoriesOnOrders.map((result, index) => (
                          <li
                            className="flex items-center justify-between"
                            key={index}
                          >
                            <div>
                              <div className="font-medium">
                                {result.accessory.brand}{" "}
                                {/*result.accessory.name*/}
                              </div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {result.accessory.category}{" "}
                              </div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {result.accessory.description}
                              </div>
                            </div>
                            <span>${result.accessory.price}{" "}{" "}x{" "}{" "}{result.quantity}</span>
                          </li>
                        )
                        )}
                      </ul>
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>${result.total}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Tax
                          </span>
                          <span>{user.Dealer.userTax}%</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">
                            Total
                          </span>
                          <span>
                            $
                            {(result.total * taxRate).toFixed(2)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </>
            ))}

          </CardContent>
          <CardFooter className="flex flex-row items-center border-t border-border bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">

            </div>
          </CardFooter>
        </Card>
      </>
    );
  }

  return (
    <>
      {/* Fallback content if no conditions are met */}
      <div>No content available</div>
    </>
  );
};
export const action: ActionFunction = async ({ req, request, params }) => {
  const formPayload = Object.fromEntries(await request.formData());
  let formData = financeFormSchema.parse(formPayload)

  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email")
  const user = await GetUser(email)
  if (!user) { redirect('/login') }
  const intent = formPayload.intent
  if (intent === 'updateClient') {
    const update = await prisma.clientfile.update({
      where: { id: formData.id },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postal: formData.postal,
        province: formData.province,
        dl: formData.dl,
        typeOfContact: formData.typeOfContact,
        timeToContact: formData.timeToContact,
        billingAddress: formData.billingAddress,
        dob: formData.dob,
      }
    })
    return json({ update })
  }
  if (intent === 'addComms') {
    const coms = await prisma.comm.create({
      data: {
        userEmail: formData.userEmail,
        type: formData.type,
        body: formData.body,
        subject: formData.subject,
        userName: formData.userName,
        direction: formData.direction,
        result: formData.result,
        ClientfileId: formData.clientfileId,
      }
    })
  }

}
export const links: LinksFunction = () => [
  { rel: "icon", type: "image/svg", href: UserIcon },
];
export async function loader({ params, request }: DataFunctionArgs) {
  const session2 = await getSession(request.headers.get("Cookie"));
  const email = session2.get("email")

  const user = await GetUser(email)
  if (!user) { redirect('/login') }
  let { clientId, financeId } = params;
  const clientfile = await prisma.clientfile.findUnique({
    where: { id: clientId },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      financeId: true,
      userId: true,
      firstName: true,
      lastName: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      postal: true,
      province: true,
      dl: true,
      typeOfContact: true,
      timeToContact: true,
      conversationId: true,
      billingAddress: true,
      dob: true,
      AccOrder: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          userEmail: true,
          userName: true,
          dept: true,
          sellingDept: true,
          total: true,
          discount: true,
          discPer: true,
          paid: true,
          paidDate: true,
          status: true,
          workOrderId: true,
          note: true,
          financeId: true,
          clientfileId: true,

          AccessoriesOnOrders: {
            select: {
              id: true,
              quantity: true,
              accOrderId: true,
              status: true,
              orderNumber: true,
              OrderInvId: true,
              accessoryId: true,
              service: true,
              hour: true,

              //orderInventor
              accessory: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  partNumber: true,
                  brand: true,
                  name: true,
                  price: true,
                  cost: true,
                  quantity: true,
                  minQuantity: true,
                  description: true,
                  category: true,
                  subCategory: true,
                  onOrder: true,
                  distributer: true,
                  location: true,
                  note: true,
                  workOrderSuggestion: true,
                }
              },
              //accOrder
            }
          },
          Payments: {
            select: {
              id: true,
              createdAt: true,
              paymentType: true,
              cardType: true,
              amountPaid: true,
              cardNum: true,
              receiptId: true,
              financeId: true,
              userEmail: true,
              accOrderId: true,
              workOrderId: true,

              // AccOrder
              //Finance
              //WorkOrder
            }
          },
          // WorkOrder
          //Finance
          AccHandoff: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              sendTo: true,
              handOffTime: true,
              status: true,
              sendToCompleted: true,
              completedTime: true,
              notes: true,
              handOffDept: true,
              AccOrderId: true,
              //AccOrder
            }
          },
          Clientfile: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              financeId: true,
              userId: true,
              firstName: true,
              lastName: true,
              name: true,
              email: true,
              phone: true,
              address: true,
              city: true,
              postal: true,
              province: true,
              dl: true,
              typeOfContact: true,
              timeToContact: true,
              conversationId: true,
              billingAddress: true,
              dob: true,
            }
          }
        }
      },
      Finance: {
        select: {
          financeManager: true,
          userEmail: true,
          userName: true,
          financeManagerName: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          name: true,
          address: true,
          city: true,
          postal: true,
          province: true,
          dl: true,
          typeOfContact: true,
          timeToContact: true,
          dob: true,
          othTax: true,
          optionsTotal: true,
          lienPayout: true,
          leadNote: true,
          sendToFinanceNow: true,
          dealNumber: true,
          iRate: true,
          months: true,
          discount: true,
          total: true,
          onTax: true,
          on60: true,
          biweekly: true,
          weekly: true,
          weeklyOth: true,
          biweekOth: true,
          oth60: true,
          weeklyqc: true,
          biweeklyqc: true,
          qc60: true,
          deposit: true,
          biweeklNatWOptions: true,
          weeklylNatWOptions: true,
          nat60WOptions: true,
          weeklyOthWOptions: true,
          biweekOthWOptions: true,
          oth60WOptions: true,
          biweeklNat: true,
          weeklylNat: true,
          nat60: true,
          qcTax: true,
          otherTax: true,
          totalWithOptions: true,
          otherTaxWithOptions: true,
          desiredPayments: true,
          admin: true,
          commodity: true,
          pdi: true,
          discountPer: true,
          userLoanProt: true,
          userTireandRim: true,
          userGap: true,
          userExtWarr: true,
          userServicespkg: true,
          deliveryCharge: true,
          vinE: true,
          lifeDisability: true,
          rustProofing: true,
          userOther: true,
          referral: true,
          visited: true,
          bookedApt: true,
          aptShowed: true,
          aptNoShowed: true,
          testDrive: true,
          metService: true,
          metManager: true,
          metParts: true,
          sold: true,
          depositMade: true,
          refund: true,
          turnOver: true,
          financeApp: true,
          approved: true,
          signed: true,
          pickUpSet: true,
          demoed: true,
          lastContact: true,
          status: true,
          customerState: true,
          result: true,
          timesContacted: true,
          nextAppointment: true,
          followUpDay: true,
          deliveryDate: true,
          delivered: true,
          deliveredDate: true,
          notes: true,
          visits: true,
          progress: true,
          metSalesperson: true,
          metFinance: true,
          financeApplication: true,
          pickUpDate: true,
          pickUpTime: true,
          depositTakenDate: true,
          docsSigned: true,
          tradeRepairs: true,
          seenTrade: true,
          lastNote: true,
          applicationDone: true,
          licensingSent: true,
          liceningDone: true,
          refunded: true,
          cancelled: true,
          lost: true,
          dLCopy: true,
          insCopy: true,
          testDrForm: true,
          voidChq: true,
          loanOther: true,
          signBill: true,
          ucda: true,
          tradeInsp: true,
          customerWS: true,
          otherDocs: true,
          urgentFinanceNote: true,
          funded: true,
          leadSource: true,
          financeDeptProductsTotal: true,
          bank: true,
          loanNumber: true,
          idVerified: true,
          dealerCommission: true,
          financeCommission: true,
          salesCommission: true,
          firstPayment: true,
          loanMaturity: true,
          quoted: true,
          InPerson: true,
          Phone: true,
          SMS: true,
          Email: true,
          Other: true,
          paintPrem: true,
          licensing: true,
          stockNum: true,
          options: true,
          accessories: true,
          freight: true,
          labour: true,
          year: true,
          brand: true,
          mileage: true,
          model: true,
          model1: true,
          color: true,
          modelCode: true,
          msrp: true,
          trim: true,
          vin: true,
          bikeStatus: true,
          invId: true,
          motor: true,
          tag: true,
          tradeValue: true,
          tradeDesc: true,
          tradeColor: true,
          tradeYear: true,
          tradeMake: true,
          tradeVin: true,
          tradeTrim: true,
          tradeMileage: true,
          tradeLocation: true,
          lien: true,
          id: true,
          activixId: true,
          theRealActId: true,
          createdAt: true,
          updatedAt: true,
          clientfileId: true,
          inventoryMotorcycleId: true,
          InventoryMotorcycle: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              packageNumber: true,
              packagePrice: true,
              stockNumber: true,
              type: true,
              class: true,
              year: true,
              make: true,
              model: true,
              modelName: true,
              submodel: true,
              subSubmodel: true,
              price: true,
              exteriorColor: true,
              mileage: true,
              consignment: true,
              onOrder: true,
              expectedOn: true,
              status: true,
              orderStatus: true,
              hdcFONumber: true,
              hdmcFONumber: true,
              vin: true,
              age: true,
              floorPlanDueDate: true,
              location: true,
              stocked: true,
              stockedDate: true,
              isNew: true,
              actualCost: true,
              mfgSerialNumber: true,
              engineNumber: true,
              plates: true,
              keyNumber: true,
              length: true,
              width: true,
              engine: true,
              fuelType: true,
              power: true,
              chassisNumber: true,
              chassisYear: true,
              chassisMake: true,
              chassisModel: true,
              chassisType: true,
              registrationState: true,
              registrationExpiry: true,
              grossWeight: true,
              netWeight: true,
              insuranceCompany: true,
              policyNumber: true,
              insuranceAgent: true,
              insuranceStartDate: true,
              insuranceEndDate: true,
              sold: true,
              freight: true,
              financeId: true,
            }
          },
          //  financeStorage
          clientApts: {
            select: {
              id: true,
              financeId: true,
              title: true,
              start: true,
              end: true,
              contactMethod: true,
              completed: true,
              apptStatus: true,
              apptType: true,
              note: true,
              unit: true,
              brand: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              address: true,
              userEmail: true,
              userId: true,
              description: true,
              userName: true,
              attachments: true,
              direction: true,
              resultOfcall: true,
              resourceId: true,
              activixId: true,
              activixNoteId: true,
              createdAt: true,
              updatedAt: true,
              isPublished: true,
            }
          },
          Comm: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              userEmail: true,
              type: true,
              body: true,
              subject: true,
              userName: true,
              direction: true,
              result: true,
              financeId: true,
            }
          },
          /*FinanceDeptProducts*/
          FinanceUnit: {
            select: {
              paintPrem: true,
              licensing: true,
              stockNum: true,
              options: true,
              accessories: true,
              freight: true,
              labour: true,
              year: true,
              brand: true,
              mileage: true,
              model: true,
              model1: true,
              color: true,
              modelCode: true,
              msrp: true,
              trim: true,
              vin: true,
              bikeStatus: true,
              invId: true,
              location: true,
              id: true,
              createdAt: true,
              updatedAt: true,
              financeId: true,

              // Finance
              //WorkOrders
            }
          },
          FinanceTradeUnit: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              financeId: true,
              price: true,
              brand: true,
              model: true,
              color: true,
              accessories: true,
              options: true,
              year: true,
              vin: true,
              trim: true,
              mileage: true,
              location: true,
              condition: true,
              repairs: true,
              stockNum: true,
              licensing: true,
              tradeEval: true,
            }
          },
          AccOrders: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              userEmail: true,
              userName: true,
              dept: true,
              sellingDept: true,
              total: true,
              discount: true,
              discPer: true,
              paid: true,
              paidDate: true,
              status: true,
              workOrderId: true,
              note: true,
              financeId: true,
              clientfileId: true,

              AccessoriesOnOrders: {
                select: {
                  id: true,
                  quantity: true,
                  accOrderId: true,
                  status: true,
                  orderNumber: true,
                  OrderInvId: true,
                  accessoryId: true,
                  service: true,
                  hour: true,

                  //orderInventor
                  accessory: {
                    select: {
                      id: true,
                      createdAt: true,
                      updatedAt: true,
                      partNumber: true,
                      brand: true,
                      name: true,
                      price: true,
                      cost: true,
                      quantity: true,
                      minQuantity: true,
                      description: true,
                      category: true,
                      subCategory: true,
                      onOrder: true,
                      distributer: true,
                      location: true,
                      note: true,
                      workOrderSuggestion: true,
                    }
                  },
                  //accOrder
                }
              },
              Payments: {
                select: {
                  id: true,
                  createdAt: true,
                  paymentType: true,
                  cardType: true,
                  amountPaid: true,
                  cardNum: true,
                  receiptId: true,
                  financeId: true,
                  userEmail: true,
                  accOrderId: true,
                  workOrderId: true,

                  // AccOrder
                  //Finance
                  //WorkOrder
                }
              },

              // WorkOrder
              //Finance
              AccHandoff: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  sendTo: true,
                  handOffTime: true,
                  status: true,
                  sendToCompleted: true,
                  completedTime: true,
                  notes: true,
                  handOffDept: true,
                  AccOrderId: true,
                  //AccOrder
                }
              }
              //Clientfile
            }
          },
          WorkOrders: {
            select: {
              workOrderId: true,
              unit: true,
              mileage: true,
              vin: true,
              tag: true,
              motor: true,
              color: true,
              budget: true,
              waiter: true,
              totalLabour: true,
              totalParts: true,
              subTotal: true,
              total: true,
              writer: true,
              userEmail: true,
              tech: true,
              discDollar: true,
              discPer: true,
              techEmail: true,
              notes: true,
              customerSig: true,
              status: true,
              location: true,
              quoted: true,
              paid: true,
              remaining: true,
              FinanceUnitId: true,
              ServiceUnitId: true,
              financeId: true,
              clientfileId: true,
              note: true,
              closedAt: true,
              createdAt: true,
              updatedAt: true,

              // FinanceUnit
              //onDelete
              //ServiceUnit
              AccOrders: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  userEmail: true,
                  userName: true,
                  dept: true,
                  sellingDept: true,
                  total: true,
                  discount: true,
                  discPer: true,
                  paid: true,
                  paidDate: true,
                  status: true,
                  workOrderId: true,
                  note: true,
                  financeId: true,
                  clientfileId: true,

                  AccessoriesOnOrders: {
                    select: {
                      id: true,
                      quantity: true,
                      accOrderId: true,
                      status: true,
                      orderNumber: true,
                      OrderInvId: true,
                      accessoryId: true,
                      service: true,
                      hour: true,

                      //orderInventor
                      accessory: {
                        select: {
                          id: true,
                          createdAt: true,
                          updatedAt: true,
                          partNumber: true,
                          brand: true,
                          name: true,
                          price: true,
                          cost: true,
                          quantity: true,
                          minQuantity: true,
                          description: true,
                          category: true,
                          subCategory: true,
                          onOrder: true,
                          distributer: true,
                          location: true,
                          note: true,
                          workOrderSuggestion: true,
                        }
                      },
                      //accOrder
                    }
                  },
                  Payments: {
                    select: {
                      id: true,
                      createdAt: true,
                      paymentType: true,
                      cardType: true,
                      amountPaid: true,
                      cardNum: true,
                      receiptId: true,
                      financeId: true,
                      userEmail: true,
                      accOrderId: true,
                      workOrderId: true,

                      // AccOrder
                      //Finance
                      //WorkOrder
                    }
                  },

                  // WorkOrder
                  //Finance
                  //AccHandoff
                  //Clientfile
                }
              },
              Clientfile: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  financeId: true,
                  userId: true,
                  firstName: true,
                  lastName: true,
                  name: true,
                  email: true,
                  phone: true,
                  address: true,
                  city: true,
                  postal: true,
                  province: true,
                  dl: true,
                  typeOfContact: true,
                  timeToContact: true,
                  conversationId: true,
                  billingAddress: true,
                  dob: true,
                  Finance: {
                    select: {
                      financeManager: true,
                      userEmail: true,
                      userName: true,
                      financeManagerName: true,
                      //: true,
                      email: true,
                      firstName: true,
                      lastName: true,
                      phone: true,
                      name: true,
                      address: true,
                      city: true,
                      postal: true,
                      province: true,
                      dl: true,
                      typeOfContact: true,
                      timeToContact: true,
                      dob: true,
                      //: true,
                      othTax: true,
                      optionsTotal: true,
                      lienPayout: true,
                      leadNote: true,
                      sendToFinanceNow: true,
                      dealNumber: true,
                      iRate: true,
                      months: true,
                      discount: true,
                      total: true,
                      onTax: true,
                      on60: true,
                      biweekly: true,
                      weekly: true,
                      weeklyOth: true,
                      biweekOth: true,
                      oth60: true,
                      weeklyqc: true,
                      biweeklyqc: true,
                      qc60: true,
                      deposit: true,
                      biweeklNatWOptions: true,
                      weeklylNatWOptions: true,
                      nat60WOptions: true,
                      weeklyOthWOptions: true,
                      biweekOthWOptions: true,
                      oth60WOptions: true,
                      biweeklNat: true,
                      weeklylNat: true,
                      nat60: true,
                      qcTax: true,
                      otherTax: true,
                      totalWithOptions: true,
                      otherTaxWithOptions: true,
                      desiredPayments: true,
                      admin: true,
                      commodity: true,
                      pdi: true,
                      discountPer: true,
                      userLoanProt: true,
                      userTireandRim: true,
                      userGap: true,
                      userExtWarr: true,
                      userServicespkg: true,
                      deliveryCharge: true,
                      vinE: true,
                      lifeDisability: true,
                      rustProofing: true,
                      userOther: true,
                      //: true,
                      referral: true,
                      visited: true,
                      bookedApt: true,
                      aptShowed: true,
                      aptNoShowed: true,
                      testDrive: true,
                      metService: true,
                      metManager: true,
                      metParts: true,
                      sold: true,
                      depositMade: true,
                      refund: true,
                      turnOver: true,
                      financeApp: true,
                      approved: true,
                      signed: true,
                      pickUpSet: true,
                      demoed: true,
                      delivered: true,
                      lastContact: true,
                      status: true,
                      customerState: true,
                      result: true,
                      timesContacted: true,
                      nextAppointment: true,
                      followUpDay: true,
                      deliveryDate: true,
                      deliveredDate: true,
                      notes: true,
                      visits: true,
                      progress: true,
                      metSalesperson: true,
                      metFinance: true,
                      financeApplication: true,
                      pickUpDate: true,
                      pickUpTime: true,
                      depositTakenDate: true,
                      docsSigned: true,
                      tradeRepairs: true,
                      seenTrade: true,
                      lastNote: true,
                      applicationDone: true,
                      licensingSent: true,
                      liceningDone: true,
                      refunded: true,
                      cancelled: true,
                      lost: true,
                      dLCopy: true,
                      insCopy: true,
                      testDrForm: true,
                      voidChq: true,
                      loanOther: true,
                      signBill: true,
                      ucda: true,
                      tradeInsp: true,
                      customerWS: true,
                      otherDocs: true,
                      urgentFinanceNote: true,
                      funded: true,
                      leadSource: true,
                      financeDeptProductsTotal: true,
                      bank: true,
                      loanNumber: true,
                      idVerified: true,
                      dealerCommission: true,
                      financeCommission: true,
                      salesCommission: true,
                      firstPayment: true,
                      loanMaturity: true,
                      quoted: true,
                      //: true,
                      InPerson: true,
                      Phone: true,
                      SMS: true,
                      Email: true,
                      Other: true,
                      //------: true,
                      //: true,
                      paintPrem: true,
                      licensing: true,
                      stockNum: true,
                      options: true,
                      accessories: true,
                      freight: true,
                      labour: true,
                      year: true,
                      brand: true,
                      mileage: true,
                      model: true,
                      model1: true,
                      color: true,
                      modelCode: true,
                      msrp: true,
                      trim: true,
                      vin: true,
                      bikeStatus: true,
                      invId: true,
                      //: true,
                      tradeValue: true,
                      tradeDesc: true,
                      tradeColor: true,
                      tradeYear: true,
                      tradeMake: true,
                      tradeVin: true,
                      tradeTrim: true,
                      tradeMileage: true,
                      tradeLocation: true,
                      lien: true,
                      //: true,
                      id: true,
                      activixId: true,
                      theRealActId: true,
                      createdAt: true,
                      updatedAt: true,
                      FinanceUnit: {
                        select: {
                          paintPrem: true,
                          licensing: true,
                          stockNum: true,
                          options: true,
                          accessories: true,
                          freight: true,
                          labour: true,
                          year: true,
                          brand: true,
                          mileage: true,
                          model: true,
                          model1: true,
                          color: true,
                          modelCode: true,
                          msrp: true,
                          trim: true,
                          vin: true,
                          bikeStatus: true,
                          invId: true,
                          location: true,
                          id: true,
                          createdAt: true,
                          updatedAt: true,
                          financeId: true,
                        }
                      },
                    }
                  },
                  ServiceUnit: {
                    select: {
                      id: true,
                      createdAt: true,
                      updatedAt: true,
                      price: true,
                      brand: true,
                      model: true,
                      color: true,
                      accessories: true,
                      options: true,
                      year: true,
                      vin: true,
                      trim: true,
                      mileage: true,
                      location: true,
                      condition: true,
                      repairs: true,
                      stockNum: true,
                      licensing: true,
                      tradeEval: true,
                    }
                  },
                  // AccOrder
                  //   Finance
                  //   WorkOrder
                  //   ServiceUnit
                }
              },
              WorkOrderNotes: {
                select: {
                  id: true,
                  body: true,
                  userName: true,
                  userEmail: true,
                  workOrderId: true,
                  createdAt: true,
                }
              },
              //Finance
              //onDelete
              ServicesOnWorkOrders: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  quantity: true,
                  hr: true,
                  status: true,
                  workOrderId: true,
                  serviceId: true,
                  WorkOrder: true,
                  service: true,
                }
              },
              Payments: {
                select: {
                  id: true,
                  createdAt: true,
                  paymentType: true,
                  cardType: true,
                  amountPaid: true,
                  cardNum: true,
                  receiptId: true,
                  financeId: true,
                  userEmail: true,
                  accOrderId: true,
                  workOrderId: true,

                  // AccOrder
                  //Finance
                  //WorkOrder
                }
              },
              WorkOrderApts: {
                select: {
                  id: true,
                  tech: true,
                  techEmail: true,
                  writer: true,
                  start: true,
                  end: true,
                  title: true,
                  workOrderId: true,
                  completed: true,
                  resourceId: true,
                  unit: true,
                  mileage: true,
                  vin: true,
                  tag: true,
                  motor: true,
                  color: true,
                  location: true,
                  WorkOrder: true,
                  createdAt: true,
                  updatedAt: true,
                }
              },
              WorkOrderClockEntries: {
                select: {
                  id: true,
                  start: true,
                  end: true,
                  userEmail: true,
                  username: true,
                  workOrderId: true,
                  WorkOrder: true,
                  createdAt: true,
                  updatedAt: true,
                }
              }
            }
          },
          Payments: {
            select: {
              id: true,
              createdAt: true,
              paymentType: true,
              cardType: true,
              amountPaid: true,
              cardNum: true,
              receiptId: true,
              financeId: true,
              userEmail: true,
              accOrderId: true,
              workOrderId: true,

              // AccOrder
              //Finance
              //WorkOrder
            }
          },
          FinanceNote: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              body: true,
              userEmail: true,
              userName: true,
              clientfileId: true,
              financeId: true,
              selectedUsers: {
                select: {
                  id: true,
                  createdAt: true,
                  selectedName: true,
                  selectedEmail: true,
                  FinanceNoteId: true,
                }
              }
            }
          },
          Clientfile: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              financeId: true,
              userId: true,
              firstName: true,
              lastName: true,
              name: true,
              email: true,
              phone: true,
              address: true,
              city: true,
              postal: true,
              province: true,
              dl: true,
              typeOfContact: true,
              timeToContact: true,
              conversationId: true,
              billingAddress: true,
              dob: true,

              AccOrder: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  userEmail: true,
                  userName: true,
                  dept: true,
                  sellingDept: true,
                  total: true,
                  discount: true,
                  discPer: true,
                  paid: true,
                  paidDate: true,
                  status: true,
                  workOrderId: true,
                  note: true,
                  financeId: true,
                  clientfileId: true,

                  AccessoriesOnOrders: {
                    select: {
                      id: true,
                      quantity: true,
                      accOrderId: true,
                      status: true,
                      orderNumber: true,
                      OrderInvId: true,
                      accessoryId: true,
                      service: true,
                      hour: true,

                      //orderInventor
                      accessory: {
                        select: {
                          id: true,
                          createdAt: true,
                          updatedAt: true,
                          partNumber: true,
                          brand: true,
                          name: true,
                          price: true,
                          cost: true,
                          quantity: true,
                          minQuantity: true,
                          description: true,
                          category: true,
                          subCategory: true,
                          onOrder: true,
                          distributer: true,
                          location: true,
                          note: true,
                          workOrderSuggestion: true,
                        }
                      },
                      //accOrder
                    }
                  },
                  Payments: {
                    select: {
                      id: true,
                      createdAt: true,
                      paymentType: true,
                      cardType: true,
                      amountPaid: true,
                      cardNum: true,
                      receiptId: true,
                      financeId: true,
                      userEmail: true,
                      accOrderId: true,
                      workOrderId: true,

                      // AccOrder
                      //Finance
                      //WorkOrder
                    }
                  },

                  // WorkOrder
                  //Finance
                  AccHandoff: {
                    select: {
                      id: true,
                      createdAt: true,
                      updatedAt: true,
                      sendTo: true,
                      handOffTime: true,
                      status: true,
                      sendToCompleted: true,
                      completedTime: true,
                      notes: true,
                      handOffDept: true,
                      AccOrderId: true,
                    }
                  }
                  //Clientfile
                }
              },
              //Finance
              //WorkOrder
              //ServiceUnit
            }
          },
          //  finManOptions
          //bmwMotoOptions
          //FinCanOptions
        }
      },
      WorkOrder: {
        select: {
          workOrderId: true,
          unit: true,
          mileage: true,
          vin: true,
          tag: true,
          motor: true,
          color: true,
          budget: true,
          waiter: true,
          totalLabour: true,
          totalParts: true,
          subTotal: true,
          total: true,
          writer: true,
          userEmail: true,
          tech: true,
          discDollar: true,
          discPer: true,
          techEmail: true,
          notes: true,
          customerSig: true,
          status: true,
          location: true,
          quoted: true,
          paid: true,
          remaining: true,
          FinanceUnitId: true,
          ServiceUnitId: true,
          financeId: true,
          clientfileId: true,
          note: true,
          closedAt: true,
          createdAt: true,
          updatedAt: true,

          // FinanceUnit
          //onDelete
          //ServiceUnit
          AccOrders: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              userEmail: true,
              userName: true,
              dept: true,
              sellingDept: true,
              total: true,
              discount: true,
              discPer: true,
              paid: true,
              paidDate: true,
              status: true,
              workOrderId: true,
              note: true,
              financeId: true,
              clientfileId: true,

              AccessoriesOnOrders: {
                select: {
                  id: true,
                  quantity: true,
                  accOrderId: true,
                  status: true,
                  orderNumber: true,
                  OrderInvId: true,
                  accessoryId: true,
                  service: true,
                  hour: true,

                  //orderInventor
                  accessory: {
                    select: {
                      id: true,
                      createdAt: true,
                      updatedAt: true,
                      partNumber: true,
                      brand: true,
                      name: true,
                      price: true,
                      cost: true,
                      quantity: true,
                      minQuantity: true,
                      description: true,
                      category: true,
                      subCategory: true,
                      onOrder: true,
                      distributer: true,
                      location: true,
                      note: true,
                      workOrderSuggestion: true,
                    }
                  },
                  //accOrder
                }
              },
              Payments: {
                select: {
                  id: true,
                  createdAt: true,
                  paymentType: true,
                  cardType: true,
                  amountPaid: true,
                  cardNum: true,
                  receiptId: true,
                  financeId: true,
                  userEmail: true,
                  accOrderId: true,
                  workOrderId: true,

                  // AccOrder
                  //Finance
                  //WorkOrder
                }
              },

              // WorkOrder
              //Finance
              //AccHandoff
              //Clientfile
            }
          },
          Clientfile: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              financeId: true,
              userId: true,
              firstName: true,
              lastName: true,
              name: true,
              email: true,
              phone: true,
              address: true,
              city: true,
              postal: true,
              province: true,
              dl: true,
              typeOfContact: true,
              timeToContact: true,
              conversationId: true,
              billingAddress: true,
              dob: true,
              Finance: {
                select: {
                  financeManager: true,
                  userEmail: true,
                  userName: true,
                  financeManagerName: true,
                  //: true,
                  email: true,
                  firstName: true,
                  lastName: true,
                  phone: true,
                  name: true,
                  address: true,
                  city: true,
                  postal: true,
                  province: true,
                  dl: true,
                  typeOfContact: true,
                  timeToContact: true,
                  dob: true,
                  //: true,
                  othTax: true,
                  optionsTotal: true,
                  lienPayout: true,
                  leadNote: true,
                  sendToFinanceNow: true,
                  dealNumber: true,
                  iRate: true,
                  months: true,
                  discount: true,
                  total: true,
                  onTax: true,
                  on60: true,
                  biweekly: true,
                  weekly: true,
                  weeklyOth: true,
                  biweekOth: true,
                  oth60: true,
                  weeklyqc: true,
                  biweeklyqc: true,
                  qc60: true,
                  deposit: true,
                  biweeklNatWOptions: true,
                  weeklylNatWOptions: true,
                  nat60WOptions: true,
                  weeklyOthWOptions: true,
                  biweekOthWOptions: true,
                  oth60WOptions: true,
                  biweeklNat: true,
                  weeklylNat: true,
                  nat60: true,
                  qcTax: true,
                  otherTax: true,
                  totalWithOptions: true,
                  otherTaxWithOptions: true,
                  desiredPayments: true,
                  admin: true,
                  commodity: true,
                  pdi: true,
                  discountPer: true,
                  userLoanProt: true,
                  userTireandRim: true,
                  userGap: true,
                  userExtWarr: true,
                  userServicespkg: true,
                  deliveryCharge: true,
                  vinE: true,
                  lifeDisability: true,
                  rustProofing: true,
                  userOther: true,
                  //: true,
                  referral: true,
                  visited: true,
                  bookedApt: true,
                  aptShowed: true,
                  aptNoShowed: true,
                  testDrive: true,
                  metService: true,
                  metManager: true,
                  metParts: true,
                  sold: true,
                  depositMade: true,
                  refund: true,
                  turnOver: true,
                  financeApp: true,
                  approved: true,
                  signed: true,
                  pickUpSet: true,
                  demoed: true,
                  delivered: true,
                  lastContact: true,
                  status: true,
                  customerState: true,
                  result: true,
                  timesContacted: true,
                  nextAppointment: true,
                  followUpDay: true,
                  deliveryDate: true,
                  deliveredDate: true,
                  notes: true,
                  visits: true,
                  progress: true,
                  metSalesperson: true,
                  metFinance: true,
                  financeApplication: true,
                  pickUpDate: true,
                  pickUpTime: true,
                  depositTakenDate: true,
                  docsSigned: true,
                  tradeRepairs: true,
                  seenTrade: true,
                  lastNote: true,
                  applicationDone: true,
                  licensingSent: true,
                  liceningDone: true,
                  refunded: true,
                  cancelled: true,
                  lost: true,
                  dLCopy: true,
                  insCopy: true,
                  testDrForm: true,
                  voidChq: true,
                  loanOther: true,
                  signBill: true,
                  ucda: true,
                  tradeInsp: true,
                  customerWS: true,
                  otherDocs: true,
                  urgentFinanceNote: true,
                  funded: true,
                  leadSource: true,
                  financeDeptProductsTotal: true,
                  bank: true,
                  loanNumber: true,
                  idVerified: true,
                  dealerCommission: true,
                  financeCommission: true,
                  salesCommission: true,
                  firstPayment: true,
                  loanMaturity: true,
                  quoted: true,
                  //: true,
                  InPerson: true,
                  Phone: true,
                  SMS: true,
                  Email: true,
                  Other: true,
                  //------: true,
                  //: true,
                  paintPrem: true,
                  licensing: true,
                  stockNum: true,
                  options: true,
                  accessories: true,
                  freight: true,
                  labour: true,
                  year: true,
                  brand: true,
                  mileage: true,
                  model: true,
                  model1: true,
                  color: true,
                  modelCode: true,
                  msrp: true,
                  trim: true,
                  vin: true,
                  bikeStatus: true,
                  invId: true,
                  //: true,
                  tradeValue: true,
                  tradeDesc: true,
                  tradeColor: true,
                  tradeYear: true,
                  tradeMake: true,
                  tradeVin: true,
                  tradeTrim: true,
                  tradeMileage: true,
                  tradeLocation: true,
                  lien: true,
                  //: true,
                  id: true,
                  activixId: true,
                  theRealActId: true,
                  createdAt: true,
                  updatedAt: true,
                  FinanceUnit: {
                    select: {
                      paintPrem: true,
                      licensing: true,
                      stockNum: true,
                      options: true,
                      accessories: true,
                      freight: true,
                      labour: true,
                      year: true,
                      brand: true,
                      mileage: true,
                      model: true,
                      model1: true,
                      color: true,
                      modelCode: true,
                      msrp: true,
                      trim: true,
                      vin: true,
                      bikeStatus: true,
                      invId: true,
                      location: true,
                      id: true,
                      createdAt: true,
                      updatedAt: true,
                      financeId: true,
                    }
                  },
                }
              },
              ServiceUnit: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  price: true,
                  brand: true,
                  model: true,
                  color: true,
                  accessories: true,
                  options: true,
                  year: true,
                  vin: true,
                  trim: true,
                  mileage: true,
                  location: true,
                  condition: true,
                  repairs: true,
                  stockNum: true,
                  licensing: true,
                  tradeEval: true,
                }
              },
              // AccOrder
              //   Finance
              //   WorkOrder
              //   ServiceUnit
            }
          },
          WorkOrderNotes: {
            select: {
              id: true,
              body: true,
              userName: true,
              userEmail: true,
              workOrderId: true,
              createdAt: true,
            }
          },
          //Finance
          //onDelete
          ServicesOnWorkOrders: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              quantity: true,
              hr: true,
              status: true,
              workOrderId: true,
              serviceId: true,
              WorkOrder: true,
              service: true,
            }
          },
          Payments: {
            select: {
              id: true,
              createdAt: true,
              paymentType: true,
              cardType: true,
              amountPaid: true,
              cardNum: true,
              receiptId: true,
              financeId: true,
              userEmail: true,
              accOrderId: true,
              workOrderId: true,

              // AccOrder
              //Finance
              //WorkOrder
            }
          },
          WorkOrderApts: {
            select: {
              id: true,
              tech: true,
              techEmail: true,
              writer: true,
              start: true,
              end: true,
              title: true,
              workOrderId: true,
              completed: true,
              resourceId: true,
              unit: true,
              mileage: true,
              vin: true,
              tag: true,
              motor: true,
              color: true,
              location: true,
              WorkOrder: true,
              createdAt: true,
              updatedAt: true,
            }
          },
          WorkOrderClockEntries: {
            select: {
              id: true,
              start: true,
              end: true,
              userEmail: true,
              username: true,
              workOrderId: true,
              WorkOrder: true,
              createdAt: true,
              updatedAt: true,
            }
          }
        }
      },
      // ServiceUnit
      //Comm
    }
  })
  const comms = await prisma.comm.findMany({
    where: { ClientfileId: clientfile.id }
  })
  session2.set("clientEmail", clientfile.email)

  return json({ clientfile, user, comms }, { headers: { "Set-Cookie": await commitSession(session2), }, })
}
export const meta = () => {

  return [
    { title: `Customer Profile || SALES || Dealer Sales Assistant` },
    {
      property: "og:title",
      content: "Your very own assistant!",
    },
    {
      name: "description",
      content: "To help sales people achieve more. Every automotive dealer needs help, especialy the sales staff. Dealer Sales Assistant will help you close more deals more efficiently.",
      keywords: 'Automotive Sales, dealership sales, automotive CRM',
    },
  ];
};
export function AccTable({ AccOrders, showPrevOrderById, setValue }) {
  const [data, setData] = useState(AccOrders);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [todayfilterBy, setTodayfilterBy] = useState(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('')

  const defaultColumn = {
    cell: ({ row, column: { id } }) => {
      const data = row.original
      return (
        <p
          className="text-center py-1 px-2 text-foreground mx-auto flex justify-center"
        >
          {row.getValue(id)}
        </p>
      )
    },
  }
  const columns = [

    {
      id: 'Customer',
      accessorKey: "Customer",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,

      cell: ({ row, column: { id } }) => {
        const data = row.original
        return (
          <div className='grid grid-cols-1'>
            <p>{data.Clientfile.firstName} {data.Clientfile.lastName}</p>
            <p className='text-muted-foreground'>{data.Clientfile.email} </p>
          </div>
        )
      },
    },
    {
      id: 'Salesperson',
      accessorKey: "Salesperson",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,

      cell: ({ row, column: { id } }) => {
        const data = row.original
        return (
          <p>{data.userName} </p>
        )
      },
    },
    {
      id: 'status',
      accessorKey: "status",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      header: ({ column }) => {
        return (
          <Select
            onValueChange={(value) => {
              let status = table.getColumn("status");
              status.setFilterValue(value);
            }}
            name='Status'>
            <SelectTrigger className="w-auto focus:border-primary mx-auto">
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent className='bg-background text-foreground border-border'>
              <SelectItem value="Quote">Quote</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="On Order">On Order</SelectItem>
              <SelectItem value="Backorder">Backorder</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        )
      },
    },
    {
      id: 'Dept',
      accessorKey: "Dept",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      header: ({ column }) => {
        return (
          <p className='text-center'>Dept</p>
        )
      },
      cell: ({ row, column: { id } }) => {
        const data = row.original
        return (
          <p className='text-center'>{data.dept} </p>
        )
      },
    },
    {
      id: 'Date',
      accessorKey: "Date",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      header: ({ column }) => {
        return (
          <p className='text-center'>Sale Date</p>
        )
      },
      cell: ({ row, column: { id } }) => {
        const data = row.original
        return (
          <p className='text-center'>{new Date(data.createdAt).toLocaleDateString("en-US", options2)}</p>
        )
      },
    },
    {
      id: 'total',
      header: ({ column }) => {
        return (
          <p className='text-center'>Amount</p>
        )
      },
      accessorKey: "total",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      cell: ({ row, column: { id } }) => {
        const data = row.original
        return (
          <p className='text-center'>{data.total}</p>
        )
      },
    },
    {
      id: 'paid',
      header: ({ column }) => {
        return (
          <p className='text-center'>Paid</p>
        )
      },
      cell: ({ row, column: { id } }) => {
        const data = row.original
        return (
          <p className='text-center'>  {data.paid ? (<Check className='mx-auto' />) : (<X className='mx-auto' />)}</p>
        )
      },
      accessorKey: "paid",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
    },

    {
      id: 'Actions',
      header: ({ column }) => {
        return (
          <p className='text-center'>Actions</p>
        )
      },
      accessorKey: "Actions",
      filterFn: 'fuzzy',
      sortingFn: fuzzySort,
      cell: ({ row, column: { id } }) => {
        const data = row.original
        return (
          <div className='flex items-center'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="mr-3 hover:bg-primary"
                  onClick={() => {
                    setValue(data.id);
                    showPrevOrderById(data.id)
                  }}
                >
                  <Eye className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Show Order
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={`/dealer/accessories/newOrder/${data.id}`} >

                  <Button
                    size="icon"
                    variant="ghost"
                    className="mr-3 hover:bg-primary"

                  >
                    <Navigation className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                Go To Order
              </TooltipContent>
            </Tooltip>
          </div>
        )
      },
    },

  ]
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    filterFns: { fuzzy: fuzzyFilter, },
    globalFilterFn: 'fuzzy',
    initialState: { columnVisibility },

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onColumnVisibilityChange: setColumnVisibility,


    onRowSelectionChange: setRowSelection,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
  });

  // clears filters
  const setAllFilters = () => {
    setColumnFilters([]);
    setSorting([]);
    // setFilterBy("");
    setGlobalFilter([]);
  };
  const toggleFilter = () => {
    setAllFilters()
    setShowFilter(!showFilter);
  };
  const setColumnFilterDropdown = (event) => {
    const columnId = event.target.getAttribute("data-value");
    setSelectedColumn(columnId);
    console.log("Selected column:", columnId);
    // Add your logic here to handle the column selection
  };
  const handleGlobalChange = (value) => {
    console.log("value", value);
    table.getColumn(selectedColumn)?.setFilterValue(value);
  };

  const handleFilterChange = (selectedFilter) => {
    setAllFilters()
    const customerStateColumn = table.getColumn('customerState');
    const nextAppointmentColumn = table.getColumn('nextAppointment');
    const deliveredDate = table.getColumn('deliveredDate');
    const pickUpDate = table.getColumn('pickUpDate');
    const status = table.getColumn('status');
    const depositMade = table.getColumn('depositMade');
    const sold = table.getColumn('sold')
    const delivered = table.getColumn('delivered')
    const signed = table.getColumn('signed')
    const financeApp = table.getColumn('financeApp')

    switch (selectedFilter) {
      case 'inStock':
        table.getColumn('status')?.setFilterValue('available');
        table.getColumn('onOrder')?.setFilterValue('false');
        break;
      case 'available':
        table.getColumn('status')?.setFilterValue('available');
        break;
      case 'inStockArrived':
        table.getColumn('status')?.setFilterValue('available');
        table.getColumn('orderStatus')?.setFilterValue('STOCK');
        break;
      case 'newStock':
        table.getColumn('new')?.setFilterValue(true);
        break;
      case 'usedStock':
        table.getColumn('new')?.setFilterValue(false);
        break;
      case 'sold':
        table.getColumn('status')?.setFilterValue('reserved');
        break;
      case 'otd':
        table.getColumn('status')?.setFilterValue('sold');
        break;
      case 'deposits':
        table.getColumn('status')?.setFilterValue('reserved');
        break;
      case 'customerOrders':
        table.getColumn('orderStatus')?.setFilterValue('WISH');
        break;
      case 'deliveredThisMonth':
        customerStateColumn?.setFilterValue('delivered');
        deliveredDate?.setFilterValue(getFirstDayOfCurrentMonth);
        status?.setFilterValue('active');
        break;
      case 'todaysDeliveries':
        pickUpDate?.setFilterValue(getToday);
        status?.setFilterValue('active');
        sold?.setFilterValue(sold && sold.length > 3);
        delivered?.setFilterValue(null)
        break;
      case 'tomorowsDeliveries':
        pickUpDate?.setFilterValue(getTomorrow);
        status?.setFilterValue('active');
        depositMade?.setFilterValue(depositMade && depositMade.length > 3);
        sold?.setFilterValue(sold && sold.length > 3);
        delivered?.setFilterValue(null)
        break;
      case 'yestDeliveries':
        pickUpDate?.setFilterValue(getYesterday);
        status?.setFilterValue('active');
        depositMade?.setFilterValue(depositMade && depositMade.length > 3);
        sold?.setFilterValue(sold && sold.length > 3);
        delivered?.setFilterValue(null)
        break;

      case 'deliveredThisYear':
        customerStateColumn?.setFilterValue('delivered');
        deliveredDate?.setFilterValue(getThisYear);
        status?.setFilterValue('active');
        break;
      case 'depositsToday':
        status?.setFilterValue('active');
        depositMade?.setFilterValue('on');
        sold?.setFilterValue('on');
        delivered?.setFilterValue('off')
        signed?.setFilterValue('off')
        financeApp?.setFilterValue('off')
        break;
      default:
        null;
    }
  }
  return (
    <div className="container mx-auto py-3">
      <div className="flex items-center py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='sm' variant="outline" className='mr-3' >Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border border-border bg-background text-foreground">
            <DropdownMenuLabel>Dashboard Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  Default Filters
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="h-auto max-h-[175px] overflow-y-auto border border-border bg-background text-foreground">
                    <DropdownMenuLabel>
                      {todayfilterBy || "Default Filters"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {CallsList.map((item) => (
                      <DropdownMenuItem
                        onSelect={(event) => {
                          const value =
                            event.currentTarget.getAttribute("data-value");
                          const item =
                            CallsList.find((i) => i.key === value) ||
                            DeliveriesList.find((i) => i.key === value) ||
                            DepositsTakenList.find((i) => i.key === value);
                          if (item) {
                            handleFilterChange(item.key);
                            setTodayfilterBy(item.name);
                          }
                        }}
                        data-value={item.key}
                        textValue={item.key}
                      >
                        {item.name}
                      </DropdownMenuItem>
                    ))}

                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  Global Filters
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="h-[350px] max-h-[350px] overflow-y-auto border border-border bg-background text-foreground">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuItem
                          onSelect={(event) => {
                            setColumnFilterDropdown(event);
                          }}
                          data-value={column.id}
                          key={column.id}
                          className="cursor-pointer bg-background capitalize text-foreground  hover:text-primary hover:underline"
                        >
                          {column.id}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => {
                  setAllFilters([]);
                  // setSelectedGlobal(false);
                }}
              >
                Clear
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={toggleFilter}
              >
                Toggle All Columns
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  Column Toggle
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="h-[350px] max-h-[350px] overflow-y-auto border border-border bg-background text-foreground">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="cursor-pointer bg-background  capitalize text-foreground"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {selectedColumn && (
          <div className="relative flex-1 md:grow-0 ">

            <Input
              placeholder={`Filter ${selectedColumn}...`}
              onChange={(e) => handleGlobalChange(e.target.value)}
              className="ml-2 max-w-sm w-auto "
              autoFocus
            />
            <Button
              onClick={() => {
                setAllFilters([]);
                // setSelectedGlobal(false);
              }}
              size="icon"
              variant="ghost"
              className='bg-transparent mr-2 absolute right-2.5 top-2.5 h-4 w-4 text-foreground '>

              <X />
            </Button>
          </div>
        )}
        <div className="relative flex-1 md:grow-0 ">
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="mx-1 ml-3 rounded-md border border-border bg-background p-2 text-foreground shadow w-[300px] "
            placeholder="Search..." autoFocus
          />

          <Button
            onClick={() => {
              setGlobalFilter([]);
              //setSelectedGlobal(false);
            }}
            size="icon"
            variant="ghost"
            className='bg-transparent mr-2 absolute right-2.5 top-2.5 h-4 w-4 text-foreground '>
            <X size={16} />
          </Button>
        </div>
      </div>
      <div className="rounded-md border border-border    h-auto max-h-[600px] overflow-y-auto  ">
        <Table className='border border-border text-foreground bg-background'>
          <TableHeader className='border border-border text-muted-foreground bg-background text-center'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='border-border'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      {header.column.getCanFilter() && showFilter && (
                        <div className="sticky  z-5 mx-auto items-center justify-center cursor-pointer text-center ">
                          <Filter column={header.column} table={table} />
                        </div>
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='border border-border text-foreground bg-background '>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className='border border-border text-foreground bg-background'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center border border-border text-foreground bg-background">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
