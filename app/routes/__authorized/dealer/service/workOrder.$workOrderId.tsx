import React, { useEffect, useState, useRef, forwardRef, } from "react";
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Plus,
  Settings,
  ShoppingCart,
  Truck,
  User,
  Users2,
  Percent,
  PanelTop,
  Scan,
  X,
  Users2Icon,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Outlet, Link, useLoaderData, useFetcher, useNavigate, useSubmit, Form } from "@remix-run/react";
import { ActionFunction, json, LinksFunction, LoaderFunction, redirect } from "@remix-run/node";
import { GetUser } from "~/utils/loader.server";
import { getSession } from "~/sessions/auth-session.server";
import { prisma } from "~/libs";
import { Printer } from "lucide-react";
import { DollarSign } from "lucide-react";
import { toast } from "sonner";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { cn } from "~/utils";
import { BanknoteIcon } from "lucide-react";
import { ArrowDownUp } from "lucide-react";
import { ClientOnly } from "remix-utils";
import PrintLabels from "../document/printLabels";
import useSWR from 'swr'
import ScanSound from '~/images/scan.mp4'
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType, NotFoundException, ChecksumException, FormatException } from '@zxing/library';
import QRCode from 'react-qr-code';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Check } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"
import axios from "axios";
import { FileCheck } from "lucide-react";
import PrintReceipt from "../document/printReceiptAcc";
import { Users } from "lucide-react";
import { Activity } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "~/components";
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
import { EditableText } from "~/components/actions/shared";
import { flushSync } from "react-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"

export default function Dashboard() {
  const { orders, user, tax, dealerImage } = useLoaderData();

  const [scannedCode, setScannedCode] = useState('')
  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    console.log('ZXing code reader initialized');

    const hints = new Map();
    const formats = [
      BarcodeFormat.PDF_417,
      BarcodeFormat.QR_CODE,
      BarcodeFormat.ITF,
      BarcodeFormat.CODE_128,
      BarcodeFormat.EAN_13,
    ];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

    codeReader.getVideoInputDevices()
      .then((videoInputDevices) => {
        const sourceSelect = document.getElementById('sourceSelectOrder');
        let selectedDeviceId = videoInputDevices[0].deviceId;

        if (videoInputDevices.length > 1) {
          videoInputDevices.forEach((element) => {
            const sourceOption = document.createElement('option');
            sourceOption.text = element.label;
            sourceOption.value = element.deviceId;
            sourceSelect.appendChild(sourceOption);
          });

          sourceSelect.onchange = () => {
            selectedDeviceId = sourceSelect.value;
          };

          const sourceSelectPanel = document.getElementById('sourceSelectPanelOrder');
          sourceSelectPanel.style.display = 'block';
        }


        document.getElementById('startButtonOrder').addEventListener('click', async () => {
          let stopScanning = false;

          while (!stopScanning) {
            try {
              const result = await codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'videoOrder', hints);
              setScannedCode(result.text);

              playScanSound();
              console.log('result', result);
              await new Promise(resolve => setTimeout(resolve, 5000));
              codeReader.reset();
            } catch (err) {
              console.error('error', err);
            }
          }
          console.log('Stopped scanning');
        });

        document.getElementById('resetButtonOrder').addEventListener('click', () => {
          document.getElementById('resultOrder').textContent = '';
          codeReader.reset();
          setScannedCode('')
          console.log('Reset.');
        });

        let listener = (event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "s") {
            //    event.preventDefault();
            codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'videoOrder', hints).then((result) => {
              console.log(result);
              /// document.getElementById('result').textContent = result.text;
              setScannedCode(result.text)

            }).catch((err) => {
              console.error(err);
              //  document.getElementById('result').textContent = err;
            });
          }
          if ((event.metaKey || event.ctrlKey) && event.key === "r") {
            event.preventDefault();
            codeReader.reset();
            setScannedCode('')
            console.log('Reset.');
          }
        };

        window.addEventListener("keydown", listener);
        return () => window.removeEventListener("keydown", listener);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    if (scannedCode) {
      const formData = new FormData();
      formData.append("orderId", scannedCode);
      formData.append("intent", 'scanOrder');
      const submitOrder = submit(formData, { method: "post" });
      console.log(submitOrder, 'sibmiteedd')
      return submitOrder
    }
  }, [scannedCode]);

  let formRef = useRef();
  let fetcher = useFetcher();
  let workOrder = useFetcher();
  let ref = useRef();
  const navigate = useNavigate()
  const submit = useSubmit();
  let addProduct = useFetcher();
  const [value, setValue] = useState('');
  const [back, setBack] = useState('#FFFFFF');
  const [fore, setFore] = useState('#000000');
  const [size, setSize] = useState(100);
  const [discount, setDiscount] = useState(false)
  const [discDollar, setDiscDollar] = useState(0.00)
  const [discPer, setDiscPer] = useState(0.00)
  const [order, setorder] = useState(null)
  const [showPrev, setShowPrev] = useState(false)
  const [totalAccessoriesCost, setTotalAccessoriesCost] = useState(0.00);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0.00);
  const [total, setTotal] = useState(0.00);
  const taxMultiplier = Number(tax.userTax);
  const taxRate = 1 + taxMultiplier / 100;
  const [paymentType, setPaymentType] = useState('');
  const [serviceSubTotal, setServiceSubTotal] = useState(0.00);
  const [partsSubTotal, setPartsSubTotal] = useState(0.00);
  const [input, setInput] = useState("");
  const inputLength = input.trim().length
  let payment = useFetcher();

  const orderById = (id) => {
    const filteredOrder = orders.find(order => order.workOrderId === id);
    setShowPrev(true)
    setorder(filteredOrder);
  }

  const options2 = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  let toReceipt
  if (order) {
    const client = order.Clientfile
    const maxAccessories = 19;

    toReceipt = {
      qrCode: order.workOrderId,
      subTotal: `$${totalAccessoriesCost.toFixed(2)}`,
      tax: `${tax.userTax}%`,
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
      image: dealerImage.dealerLogo
    };

    let accessoryIndex = 0;
  }
  // console.log(order, 'order');

  useEffect(() => {
    if (order) {
      const partsSub = order?.AccOrders?.reduce((total, accOrder) => {
        return total + accOrder?.AccessoriesOnOrders?.reduce((subTotal, accessoryOnOrder) => {
          return subTotal + (accessoryOnOrder.accessory.price * accessoryOnOrder.quantity);
        }, 0);
      }, 0);
      setPartsSubTotal(partsSub.toFixed(2))

      const serviceSub = order?.ServicesOnWorkOrders?.reduce((total, serviceOnOrder) => {
        return total + (serviceOnOrder.service.price * serviceOnOrder.hr * serviceOnOrder.quantity);
      }, 0);
      setServiceSubTotal(serviceSub.toFixed(2))
      const total2 = ((parseFloat(partsSub + serviceSub) - parseFloat(discDollar)) * taxRate).toFixed(2);
      const total1 = (((parseFloat(partsSub + serviceSub) * (100 - parseFloat(discPer))) / 100) * taxRate).toFixed(2);
      const calculatedTotal = discDollar && discDollar > 0.00 ? total1 : total2;

      setTotal(calculatedTotal);
      const totalAmountPaid2 = order.Payments.reduce((total, payment) => {
        return total + payment.amountPaid;
      }, 0);
      if (totalAmountPaid2) {
        setTotalAmountPaid(totalAmountPaid2)
      }

    }
  }, [order]);

  const remaining = parseFloat(total) - parseFloat(totalAmountPaid)
  const [list, setList] = useState([])
  useEffect(() => {
    if (orders) {
      setList(orders)
    }
  }, [orders]);
  const [newUnit, setNewUnit] = useState(false)


  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"            >
              <CardHeader className="pb-3">
                <CardTitle>Service</CardTitle>
                <CardDescription className="text-balance max-w-lg leading-relaxed">
                  Introducing Our Dynamic Orders Dashboard for Seamless
                  Management and Insightful Analysis.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/dealer/service/search">
                  <Button size='sm' className='text-foreground'>Create New Work Order</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Scan Work Order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative flex-1 md:grow-0   ">
                  <main className="wrapper text-white mx-auto " >
                    <section className="container" id="demo-content">
                      <div className='flex items-center'>

                        <div className='flex flex-col items-center  mx-auto' >
                          <div className='rounded-[5px] border border-border relative group' style={{ padding: 0, width: '150px', maxHeight: '100px', overflow: 'hidden', border: ' ' }}>
                            <video id="videoOrder" style={{ width: '150px' }}></video>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 gap-1 text-sm  bg-primary absolute left-2.5 top-2.5  opacity-0 transition-opacity group-hover:opacity-100 "
                              id="startButtonOrder"
                            >
                              <Scan className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only text-foreground">Scan</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 gap-1 text-sm   absolute right-2.5 top-2.5  opacity-0 transition-opacity group-hover:opacity-100 "
                              id="resetButtonOrder"
                            >
                              <Scan className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only text-foreground">Reset</span>
                            </Button>
                            <div id="sourceSelectPanelOrder" style={{ display: 'none' }}>
                              <select id="sourceSelectOrder" className='b-rounded-[5px] px-3 py-1 bg-background text-foreground border-border border   opacity-0 transition-opacity group-hover:opacity-100 ' style={{ maxWidth: '150px' }}></select>
                            </div>
                          </div>
                          <div style={{ display: 'none' }}>

                            <input className='text-background bg-background border-background' type="file" id="imageUploadButton" accept="image/*" style={{ display: 'inline-block', }} />
                            <label className='text-background' htmlFor="sourceSelect">Change video source:</label>
                            <label className='text-background' >Result:</label>
                            <pre><code className='text-background' id="result"></code></pre>
                            <addProduct.Form method="post" ref={formRef} className='mr-auto'>
                              <div className="relative ml-auto flex-1 md:grow-0">
                                <input
                                  name='intent'
                                  defaultValue='updateOrder'
                                  type='hidden'
                                />
                                <Input
                                  name="accessoryId"
                                  defaultValue={scannedCode}
                                  type='hidden'
                                  onChange={() => {
                                    let products;
                                    products = addProduct.load('/dealer/accessories/products/search/all')
                                    console.log(products, 'products')
                                    let result;
                                    result = products.filter(
                                      (result) =>
                                        result.id?.toLowerCase().includes(scannedCode)
                                    );
                                  }}
                                  placeholder="Search..."
                                  className="w-full rounded-lg bg-background pl-8 max-w-[400px]"
                                />
                              </div>
                            </addProduct.Form>
                          </div>
                        </div>
                      </div>
                    </section>
                  </main>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Order QR Code</CardDescription>
              </CardHeader>
              <CardContent>
                {value && (
                  <div className=' mx-auto my-auto items-center justify-center'
                  >
                    <QRCode
                      className='mx-auto bg-white p-2'
                      value={value}
                      bgColor={back}
                      fgColor={fore}
                      size={size === '' ? 0 : size}
                    />
                  </div>

                )}
              </CardContent>

            </Card>
          </div>
          <Tabs defaultValue="week">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="week">W / O</TabsTrigger>
                <TabsTrigger value="month">Calendar</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className='border-border'>
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => {
                        const result = orders.filter((result) =>
                          result.status === 'Quote'
                        )
                        setList(result)
                      }}
                    >
                      Quote
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        const result = orders.filter((result) =>
                          result.status === 'Open'
                        )
                        setList(result)
                      }}>
                      Open
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        const result = orders.filter((result) =>
                          result.status === 'Waiting On Parts'
                        )
                        setList(result)
                      }}>
                      Waiting On Parts
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        const result = orders.filter((result) =>
                          result.status === 'In Works'
                        )
                        setList(result)
                      }}>
                      In Works
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        const result = orders.filter((result) =>
                          result.status === 'Work Completed'
                        )
                        setList(result)
                      }}>
                      Work Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        const result = orders.filter((result) =>
                          result.status === 'Closed'
                        )
                        setList(result)
                      }}>
                      Closed
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value="week">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Work Order</CardTitle>
                  <CardDescription>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className=' grid grid-cols-1'>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Unit</AccordionTrigger>
                        <AccordionContent>
                          <div className='grid grid-cols-1'>
                            <Table>
                              <TableHeader>
                                <TableRow className='border-border'>
                                  <TableHead>
                                    Unit
                                  </TableHead>
                                  <TableHead>
                                    Color
                                  </TableHead>
                                  <TableHead className="hidden md:table-cell">
                                    Mileage
                                  </TableHead>
                                  <TableHead className="hidden md:table-cell">
                                    VIN
                                  </TableHead>
                                  <TableHead className="hidden md:table-cell">
                                    Motor
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <p>Service Units</p>
                                {order.ServiceUnit && order.ServiceUnit.map((result, index) => (
                                  <Button variant='ghost' className='cursor-pointer' onClick={() => {
                                    const formData = new FormData();
                                    formData.append("unit", (`${result.year} ${result.brand} ${result.model}`));
                                    formData.append("mileage", result.mileage);
                                    formData.append("vin", result.vin);
                                    formData.append("tag", result.tag);
                                    formData.append("motor", result.motor);
                                    formData.append("color", result.color);
                                    formData.append("workOrderId", order.workOrderId);
                                    formData.append("intent", 'addUnit');
                                    submit(formData, { method: "post", });
                                  }}>
                                    <TableRow key={index} className="hover:bg-accent border-border">
                                      <TableCell>
                                        <p>{result.year} {result.brand} {result.model}</p>
                                      </TableCell>
                                      <TableCell className="hidden md:table-cell">
                                        {result.mileage}
                                      </TableCell>
                                      <TableCell className="hidden md:table-cell">
                                        {result.vin}
                                      </TableCell>
                                      <TableCell className="hidden md:table-cell">
                                        {result.tag}
                                      </TableCell>
                                      <TableCell className="hidden md:table-cell">
                                        {result.motor}
                                      </TableCell>
                                    </TableRow>
                                  </Button>
                                ))}
                                <p>Finance Units</p>
                                {order.Finance && order.Finance.map((result, index) => (
                                  <Button variant='ghost' className='cursor-pointer' onClick={() => {
                                    const formData = new FormData();
                                    formData.append("unit", (`${result.year} ${result.brand} ${result.model}`));
                                    formData.append("mileage", result.mileage);
                                    formData.append("vin", result.vin);
                                    formData.append("tag", result.tag);
                                    formData.append("motor", result.motor);
                                    formData.append("color", result.color);
                                    formData.append("workOrderId", order.workOrderId);
                                    formData.append("intent", 'addUnit');
                                    submit(formData, { method: "post", });
                                  }}>
                                    <TableRow key={index} className="hover:bg-accent border-border">
                                      <TableCell>
                                        <p>{result.year} {result.brand} {result.model}</p>
                                      </TableCell>
                                      <TableCell className="hidden md:table-cell">
                                        {result.mileage}
                                      </TableCell>
                                      <TableCell className="hidden md:table-cell">
                                        {result.vin}
                                      </TableCell>
                                      <TableCell className="hidden md:table-cell">
                                        {result.tag && (result.tag)}
                                      </TableCell>
                                      <TableCell className="hidden md:table-cell">
                                        {result.motor && (result.motor)}
                                      </TableCell>
                                    </TableRow>
                                  </Button>
                                ))}
                              </TableBody>
                            </Table>
                            <Button size='sm' className='text-foreground' onClick={() => setNewUnit(true)} >
                              New Unit
                            </Button>
                            {newUnit && (
                              <>
                                <Form method='post' >
                                  <div className='grid grid-cols-1'>
                                    <div className="relative mt-4">
                                      <Input
                                        name='year'
                                        className={` bg-background text-foreground border border-border`}
                                      />
                                      <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">Year</label>
                                    </div>
                                    <div className="relative mt-4">
                                      <Input
                                        name='brand'
                                        className={` bg-background text-foreground border border-border`}
                                      />
                                      <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">Brand</label>
                                    </div>
                                    <div className="relative mt-4">
                                      <Input
                                        name='model'
                                        className={` bg-background text-foreground border border-border`}
                                      />
                                      <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">Model</label>
                                    </div>
                                    <div className="relative mt-4">
                                      <Input
                                        name='motor'
                                        className={` bg-background text-foreground border border-border`}
                                      />
                                      <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">Motor</label>
                                    </div>
                                    <div className="relative mt-4">
                                      <Input
                                        name='color'
                                        className={` bg-background text-foreground border border-border`}
                                      />
                                      <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">Color</label>
                                    </div>
                                    <div className="relative mt-4">
                                      <Input
                                        name='vin'
                                        className={` bg-background text-foreground border border-border`}
                                      />
                                      <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">VIN</label>
                                    </div>
                                    <div className="relative mt-4">
                                      <Input
                                        name='mileage'
                                        className={` bg-background text-foreground border border-border`}
                                      />
                                      <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">mileage</label>
                                    </div>
                                    <div className="relative mt-4">
                                      <Input
                                        name='tag'
                                        className={` bg-background text-foreground border border-border`}
                                      />
                                      <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">Tag</label>
                                    </div>
                                    <div className="relative mt-4">
                                      <Input
                                        name='location'
                                        className={` bg-background text-foreground border border-border`}
                                      />
                                      <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-muted-foreground peer-focus:-top-3 peer-focus:text-muted-foreground">Location</label>
                                    </div>
                                    <Button size='sm' className='text-foreground'
                                      type='submit'
                                      name='intent'
                                      value='addNewServiceUnit' >
                                      Submit
                                    </Button>
                                  </div>
                                </Form>
                              </>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <fetcher.Form method='post'>
                      <div className='flex'>
                        <Input name='description' /> <Input name='hr' /> <Button size='sm' ><Plus /></Button>
                      </div>
                    </fetcher.Form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
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
                          formData.append("total", total);
                          formData.append("intent", 'updateStatus');
                          formData.append("status", value);
                          console.log(formData, 'formData');
                          workOrder.submit(formData, { method: "post" });
                        }}>
                        <SelectTrigger className="w-[200px] " >
                          <SelectValue defaultValue={order.status} />
                        </SelectTrigger>
                        <SelectContent className='border-border'>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="Quote">Quote</SelectItem>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="Waiting On Parts">Waiting On Parts</SelectItem>
                            <SelectItem value="In Works">In Works</SelectItem>
                            <SelectItem value="Work Completed">Work Completed</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-background transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Status</label>
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
                      onSelect={() => setDiscount((prevDiscount) => !prevDiscount)}>
                      Show Discount
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => {
                        setShowPrev(false)
                        setorder(null)
                      }}>
                      Back
                    </DropdownMenuItem>
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
            <CardContent className="p-6 text-sm h-auto max-h-[780px] overflow-y-auto">
              <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
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
              <div className="grid gap-3">
                <div className="font-semibold">Customer Unit</div>
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
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Work Order Services</div>
                <ul className="grid gap-3">
                  {order.ServicesOnWorkOrders && order.ServicesOnWorkOrders.map((result, index) => (
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
                                      value={result.hr}
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
                                  <p>{" "}hrs{" "}{" "}@{" "}${result.service.price}</p>
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
                  ))}
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
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Service Subtotal</span>
                    <span>${serviceSubTotal}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Parts Subtotal</span>
                    <span>${partsSubTotal}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${partsSubTotal + serviceSubTotal}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{tax.userTax}%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span>${total}</span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Payment Information</div>
                <dl className="grid gap-3">
                  <div className="flex flex-col" >
                    <div className='flex items-center justify-center text-foreground'>
                      <Button
                        size="sm"
                        variant="outline"
                        className={cn('mr-2 bg-primary', paymentType === 'Visa' ? "bg-secondary" : "", "")}
                        onClick={() => setPaymentType('Visa')}
                      >
                        <CreditCard className="h-4 w-4 text-foreground" />
                        <p className="">Visa</p>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={cn('mr-2 bg-primary', paymentType === 'Mastercard' ? "bg-secondary" : "", "")}
                        onClick={() => setPaymentType('Mastercard')}
                      >
                        <CreditCard className="h-4 w-4 text-foreground" />
                        <p className="">Mastercard</p>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPaymentType('Debit')}
                        className={cn(' bg-primary mr-2', paymentType === 'Debit' ? "bg-secondary" : "", "")}
                      >
                        <CreditCard className="h-4 w-4 text-foreground" />
                        <p className="">Debit</p>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPaymentType('Cheque')}
                        className={cn(' bg-primary', paymentType === 'Cheque' ? "bg-secondary" : "", "")}
                      >
                        <CreditCard className="h-4 w-4 text-foreground" />
                        <p className="">Cheque</p>
                      </Button>
                    </div>
                    <div className='flex items-center justify-center text-foreground mt-2'>
                      <Button
                        size="sm"
                        variant="outline"
                        className={cn('mr-2 bg-primary', paymentType === 'Cash' ? "bg-secondary" : "", "")}
                        onClick={() => setPaymentType('Cash')}
                      >
                        <BanknoteIcon className="h-4 w-4 text-foreground" />
                        <p className="">Cash</p>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={cn(' bg-primary mr-2', paymentType === 'Online Transaction' ? "bg-secondary" : "", "")}
                        onClick={() => setPaymentType('Online Transaction')}
                      >
                        <PanelTop className="h-4 w-4 text-foreground" />
                        <p className="">Online Transaction</p>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={cn(' bg-primary', paymentType === 'E-Transfer' ? "bg-secondary" : "", "")}
                        onClick={() => setPaymentType('E-Transfer')}
                      >
                        <PanelTop className="h-4 w-4 text-foreground" />
                        <p className="">E-Transfer</p>
                      </Button>
                    </div>
                  </div>
                </dl>
              </div>
              <div className="grid gap-3">
                <ul className="grid gap-3">
                  {order.Payments && order.Payments.map((result, index) => (
                    <li className="flex items-center justify-between" key={index}                    >
                      <span className="text-muted-foreground">{result.paymentType}</span>
                      <span>${result.amountPaid}</span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Balance</span>
                    <span>${remaining}</span>

                  </li>
                  {remaining === 0 && (
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground"></span>
                      <Badge className='bg-[#30A46C]'>PAID</Badge>
                    </li>
                  )}
                  {paymentType !== '' && (
                    <>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Amount to be charged on {paymentType}</span>
                        <payment.Form method="post" ref={formRef} >
                          <input type='hidden' name='workOrderId' value={order.workOrderId} />
                          <input type='hidden' name='paymentType' value={paymentType} />
                          <input type='hidden' name='remaining' value={remaining} />
                          <input type='hidden' name='intent' value='createPayment' />
                          <input type='hidden' name='total' value={total} />
                          <div className="relative ml-auto flex-1 md:grow-0 ">
                            <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              name='amountPaid'
                              className='text-right pr-9'
                              value={input}
                              onChange={(event) => setInput(event.target.value)}
                            />
                            <Button
                              type="submit"
                              size="icon"
                              onClick={() => {
                                toast.success(`Payment rendered!`)
                              }}
                              disabled={inputLength === 0}
                              className='bg-primary mr-2 absolute right-2.5 top-2.5 h-4 w-4 text-foreground '>
                              <PaperPlaneIcon className="h-4 w-4" />
                              <span className="sr-only">Cash</span>
                            </Button>
                          </div>
                        </payment.Form>
                      </li>
                    </>
                  )}

                </ul>
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
        </div>
      </main>
    </div>
  )
}


export function playScanSound() {
  const audio = new Audio(ScanSound);
  audio.play();
}

export async function loader({ request, params }: LoaderFunction) {
  const session2 = await getSession(request.headers.get("Cookie"));
  const email = session2.get("email");

  const user = await GetUser(email);
  if (!user) { redirect("/login"); }
  const id = params.workOrderId
  const order = await prisma.workOrder.findUnique({
    where: { workOrderId: id },
    select: {
      workOrderId: true,
      unit: true,
      mileage: true,
      vin: true,
      tag: true,
      motor: true,
      budget: true,
      totalLabour: true,
      totalParts: true,
      subTotal: true,
      total: true,
      writer: true,
      userEmail: true,
      tech: true,
      notes: true,
      customerSig: true,
      status: true,
      location: true,
      quoted: true,
      paid: true,
      remaining: true,
      FinanceUnitId: true,
      financeId: true,
      clientfileId: true,
      createdAt: true,
      updatedAt: true,
      Clientfile: {
        select: {
          id: true,
          financeId: true,
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
        },
      },
      AccOrders: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          userEmail: true,
          userName: true,
          dept: true,
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
                  description: true,
                  category: true,
                  subCategory: true,
                  onOrder: true,
                  distributer: true,
                  location: true,
                },
              },
            },
          },
        }
      },
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
      Payments: {
        select: {
          id: true,
          createdAt: true,
          paymentType: true,
          amountPaid: true,
          cardNum: true,
          receiptId: true,
          financeId: true,
          userEmail: true,
          accOrderId: true,
        },
      },
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
        }
      },
      ServicesOnWorkOrders: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          quantity: true,
          status: true,
          workOrderId: true,
          serviceId: true,
          hr: true,
          service: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              description: true,
              estHr: true,
              service: true,
              price: true,
            }
          }
        }
      }

    },
  });

  const tax = await prisma.dealer.findUnique({
    where: { id: 1 },
    select: { userTax: true },
  });
  const dealerImage = await prisma.dealerLogo.findUnique({ where: { id: 1 } })

  return json({ order, user, tax, dealerImage });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const calculateTotalAccessoriesCost = (order) => {
  if (!order || !order.AccOrders) {
    return 0;
  }

  return order.AccOrders.reduce((totalAccCost, accOrder) => {
    if (!accOrder.AccessoriesOnOrders) {
      return totalAccCost;
    }

    const accOrderCost = accOrder.AccessoriesOnOrders.reduce((total, accessoryOnOrder) => {
      return total + (accessoryOnOrder.quantity * accessoryOnOrder.accessory.price);
    }, 0);

    return totalAccCost + accOrderCost;
  }, 0);
};

const calculateTotalAmountPaid = (order) => {
  if (!order || !order.Payments) { return 0; }
  return order.Payments.reduce((total, payment) => {
    return total + payment.amountPaid;
  }, 0);
};


export async function action({ request, params }: ActionFunction) {
  const formPayload = Object.fromEntries(await request.formData());
  const intent = formPayload.intent;
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email");
  const user = await GetUser(email)

  if (intent === "scanOrder") {
    await prisma.customerSync.update({
      where: { userEmail: email },
      data: { orderId: formPayload.orderId }
    });
    return redirect('/dealer/service/customerSync')
  }
  if (intent === "updateHr") {
    const update = await prisma.servicesOnWorkOrders.update({
      where: { id: formPayload.id },
      data: { hr: parseFloat(formPayload.name) }
    });
    return json({ update })
  }
  if (intent === "updateServiceOnOrders") {
    const update = await prisma.servicesOnWorkOrders.update({
      where: { id: formPayload.id },
      data: { status: formPayload.status }
    });
    return json({ update })
  }
  if (intent === "deleteServiceItem") {
    const update = await prisma.servicesOnWorkOrders.delete({
      where: { id: formPayload.id },
    });
    return json({ update })
  }
  if (intent === 'deleteOrderItem') {
    const payment = await prisma.accessoriesOnOrders.delete({ where: { id: formPayload.id } });
    return payment;
  }
  if (intent === "updateAccOnOrders") {
    const update = await prisma.accessoriesOnOrders.update({
      where: { id: formPayload.id },
      data: { status: formPayload.status }
    });
    return json({ update })
  }
  if (intent === 'createPayment') {
    const payment = await prisma.payment.create({
      data: {
        workOrderId: formPayload.workOrderId,
        paymentType: formPayload.paymentType,
        amountPaid: parseFloat(formPayload.amountPaid),
        cardNum: formPayload.cardNum,
        receiptId: formPayload.receiptId,
      },
    });
    if (formPayload.remaining === '0') {
      await prisma.workOrder.update({
        where: { workOrderId: formPayload.workOrderId },
        data: {
          total: parseFloat(formPayload.total),
          paid: 'Yes',
        },
      });
    } else {
      await prisma.accOrder.update({
        where: { id: formPayload.accOrderId },
        data: {
          total: parseFloat(formPayload.total),
        },
      });
    }

    return payment;
  }
  if (intent === "addUnit") {
    const update = await prisma.workOrder.update({
      where: { workOrderId: formPayload.workOrderId },
      data: {
        unit: formPayload.unit,
        mileage: formPayload.mileage,
        vin: formPayload.vin,
        tag: formPayload.tag,
        motor: formPayload.motor,
        color: formPayload.color,
      }
    });
    return json({ update })
  }
  if (intent === "addNewServiceUnit") {
    const update = await prisma.workOrder.update({
      where: { workOrderId: formPayload.workOrderId },
      data: {
        unit: (`${formPayload.year} ${formPayload.brand} ${formPayload.model}`),
        mileage: formPayload.mileage,
        vin: formPayload.vin,
        tag: formPayload.tag,
        motor: formPayload.motor,
      }
    });
    const create = await prisma.serviceUnit.create({
      data: {
        brand: formPayload.brand,
        model: formPayload.model,
        color: formPayload.color,
        year: formPayload.year,
        vin: formPayload.vin,
        mileage: formPayload.mileage,
        location: formPayload.location,
        tag: formPayload.tag,
      }
    });

    return json({ update })
  }
}

export const meta = () => {
  return [
    { title: 'Service Center - Dealer Sales Assistant' },
    {
      property: "og:title",
      content: "Your very own assistant!",
    },
    {
      name: "description",
      content: "To help dealer staff achieve more. Every automotive dealer needs help, especialy the service staff. Dealer Sales Assistant will help you service more clients, efficiently.",
      keywords: 'Automotive Sales, dealership sales, automotive CRM',
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/svg", href: '/favicons/wrench.svg' },
]
