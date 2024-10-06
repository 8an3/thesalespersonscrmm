/* eslint-disable tailwindcss/classnames-order */
import { dashboardLoader, dashboardAction, } from "~/components/actions/dashboardCalls";
import { getSession } from "~/sessions/auth-session.server";
import { type DataFunctionArgs, LinksFunction, type V2_MetaFunction, json, redirect } from '@remix-run/node'
import secondary from "~/styles/secondary.css";
import { Form, Link, Outlet, useFetcher, useLoaderData, useSubmit, useNavigation, useParams, useNavigate, useLocation } from "@remix-run/react";
import React, { createContext, useEffect, useRef, useState } from "react";
import { prisma } from "~/libs";
import { GetUser } from "~/utils/loader.server";
import { cn } from "~/components/ui/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"
import { FaMotorcycle } from "react-icons/fa";
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
  RemixNavLink, Input, Separator, Button, TextArea, Label, PopoverTrigger, PopoverContent, Popover,
} from "~/components"

import {
  ChevronLeft,
  ChevronRight,
  Copy,
  X, CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Send,
  FileText,
  Package2,
  PanelLeft,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  User,
  Eye,
  PanelTop,
} from "lucide-react"
import kawasaki from '~/overviewUtils/images/kawa.png'
import canamIndex from '~/images/logos/canamIndex.png'
import manitouIndex from '~/images/logos/manitouIndex.png'

import harleyDavidson from '~/images/logos/hd.png'
import UserIcon from '~/images/favicons/user.svg'

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: secondary },
  { rel: "icon", type: "image/svg", href: UserIcon },
];

export default function CustomerProfile() {
  const { financeList, clientfile } = useLoaderData();
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <aside className="fixed inset-y-0 left-0 z-10  sm:w-[50px] sm:flex-col sm:border-r sm:bg-background sm:flex sm:border-border">
        <SidebarNav financeList={financeList} clientfile={clientfile} />
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Outlet />
      </div >
    </div >

  );
}
export async function loader({ params, request }: DataFunctionArgs) {
  const session2 = await getSession(request.headers.get("Cookie"));
  const email = session2.get("email")

  const user = await GetUser(email)
  if (!user) { redirect('/login') }

  let { clientId, financeId } = params;
  const clientfile = await prisma.clientfile.findUnique({
    where: { id: clientId }
  })

  const financeList = await prisma.finance.findMany({
    where: {
      email: clientfile.email
    },
  })
  return json({ financeList, clientfile })
}

function SidebarNav({ financeList, clientfile }) {
  const location = useLocation();

  const pathname = location.pathname
  const navigate = useNavigate()
  /**  <Link
                to={`/dealer/sales/customer/${clientfile.id}/profile`}
              >
              </Link> */
  return (
    <div>
      <nav
        className={cn("sm:flex hidden  flex-col items-center gap-4 px-2 sm:py-4 mt-10",)}    >

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              onClick={() => navigate(`/dealer/sales/customer/${clientfile.id}/profile`)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg  bg-transparent  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8
                   ${pathname === `/dealer/sales/customer/${clientfile.id}/profile` ? 'bg-primary text-foreground ' : ''}`}
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Client Profile</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Client Profile</TooltipContent>
        </Tooltip>
        {financeList && financeList.map((item, index) => {
          const brand = item.brand
          let modelImage;
          switch (brand) {
            case 'Harley-Davidson':
              modelImage = harleyDavidson
              break;
            case 'Ski-Doo-MY24':
              modelImage = canamIndex
              break;
            case 'Can-Am-SXS-MY24':
              modelImage = canamIndex
              break;
            case 'Kawasaki':
              modelImage = kawasaki
              break;
            case 'Manitou':
              modelImage = manitouIndex
              break;
            case 'Sea-Doo':
              modelImage = "https://searchlogovector.com/wp-content/uploads/2020/04/sea-doo-logo-vector.png"
              break;
            case 'Switch':
              modelImage = canamIndex
              break;
            case 'Can-Am':
              modelImage = canamIndex
              break;
            case 'Can-Am-SXS':
              modelImage = canamIndex
              break;
            case 'KTM':
              modelImage = null
              break;
            case 'Ski-Doo':
              modelImage = canamIndex
              break;
            case 'Suzuki':
              modelImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/500px-Suzuki_logo_2.svg.png"
              break;
            case 'Triumph':
              modelImage = "https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto/SitecoreMediaLibrary//_images/apple-touch-icon-180x180.png"
              break;
            case 'BMW-Motorrad':
              modelImage = "https://www.bmw-motorrad.ca/content/dam/bmwmotorradnsc/common/mnm/graphics/bmw_motorrad_logo.svg.asset.1585209612412.svg"
              break;
            case 'Indian':
              modelImage = null
              break;
            case 'Yamaha':
              modelImage = null
              break;
            case 'Spyder':
              modelImage = canamIndex
              break;
            default:
              modelImage = null
          }
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  to={`/dealer/sales/customer/${item.clientfileId}/${item.id}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Button variant="ghost" className="bg-transparent hover:bg-transparent">
                    <div className="h-5 w-5 flex justify-center">
                      {modelImage ? (
                        <img
                          alt={brand}
                          src={modelImage}
                          className="object-contain"
                        />
                      ) : (
                        <FaMotorcycle className="text-foreground text-3xl mx-auto" />
                      )}
                    </div>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className='text-foreground bg-background border-border border'>
                <div className="m-4">
                  <p>{item.year} {item.brand}</p>
                  <p>{item.model.toString().slice(0, 28)}</p>
                  <Badge>{item.customerState}</Badge>
                </div>
              </TooltipContent>
            </Tooltip>

          );
        })}
      </nav >
      <nav
        className={cn(" sm:hidden flex  items-center gap-4 px-2 sm:py-4 mt-[10px] ml-[50px] ",)}    >
        {financeList && financeList.map((item, index) => {
          const brand = item.brand
          let modelImage;
          switch (brand) {
            case 'Harley-Davidson':
              modelImage = harleyDavidson
              break;
            case 'Ski-Doo-MY24':
              modelImage = canamIndex
              break;
            case 'Can-Am-SXS-MY24':
              modelImage = canamIndex
              break;
            case 'Kawasaki':
              modelImage = kawasaki
              break;
            case 'Manitou':
              modelImage = manitouIndex
              break;
            case 'Sea-Doo':
              modelImage = "https://searchlogovector.com/wp-content/uploads/2020/04/sea-doo-logo-vector.png"
              break;
            case 'Switch':
              modelImage = canamIndex
              break;
            case 'Can-Am':
              modelImage = canamIndex
              break;
            case 'Can-Am-SXS':
              modelImage = canamIndex
              break;
            case 'KTM':
              modelImage = null
              break;
            case 'Ski-Doo':
              modelImage = canamIndex
              break;
            case 'Suzuki':
              modelImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/500px-Suzuki_logo_2.svg.png"
              break;
            case 'Triumph':
              modelImage = "https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto/SitecoreMediaLibrary//_images/apple-touch-icon-180x180.png"
              break;
            case 'BMW-Motorrad':
              modelImage = "https://www.bmw-motorrad.ca/content/dam/bmwmotorradnsc/common/mnm/graphics/bmw_motorrad_logo.svg.asset.1585209612412.svg"
              break;
            case 'Indian':
              modelImage = null
              break;
            case 'Yamaha':
              modelImage = null
              break;
            case 'Spyder':
              modelImage = canamIndex
              break;
            default:
              modelImage = null
          }
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  to={`/dealer/sales/customer/${item.clientfileId}/${item.id}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 "
                >
                  <Button variant="ghost" className="bg-transparent    hover:bg-transparent">
                    <div className="h-5 w-5 flex justify-center">

                      {modelImage ? (
                        <img
                          alt={brand}
                          src={modelImage}
                          className="object-contain"
                        />
                      ) : (
                        <FaMotorcycle className="text-foreground text-3xl mx-auto" />
                      )}
                    </div>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className='text-foreground bg-background  border-border border'>
                <div className='m-4'>
                  <p>{item.year} {item.brand}</p>
                  <p>{item.model.toString().slice(0, 28)}</p>
                  <Badge className="">{item.customerState}</Badge>
                </div></TooltipContent>
            </Tooltip>
          );
        })}
      </nav >
    </div>

  )
}


/**  function ImageSelectNav(brandId) {
    if (brandId === 'Can-Am') {
      return (
        <img
          width="300"
          height="166"
          className="mx-auto"
          src="https://logovectorseek.com/wp-content/uploads/2020/09/can-am-logo-vector.png"
          alt="srry"
        />
      )
    }
    if (brandId === 'Can-Am-SXS') {
      return (
        <img
          width="300"
          height="166"
          className="mx-auto"
          src="https://logovectorseek.com/wp-content/uploads/2020/09/can-am-logo-vector.png"
          alt="srry"
        />
      )
    }
    else if (brandId === 'Ski-Doo') {
      return (
        <img
          width="300"
          height="166"
          className="mx-auto"
          src="https://searchlogovector.com/wp-content/uploads/2020/04/ski-doo-logo-vector.png"
          alt="steve"
        />
      )
    }
    else if (brandId === 'Sea-Doo') {
      return (
        <img
          width="300"
          height="166"
          alt="steve"
          className="mx-auto"
          src="https://searchlogovector.com/wp-content/uploads/2020/04/sea-doo-logo-vector.png"
        />
      )
    }
    else if (brandId === 'Kawasaki') {
      return (
        <div className="flex justify-center mt-5">
          <svg
            className="mx-auto flex-1 mr-6"
            width="260.5398px"
            height="70.7005px"
            viewBox="0 0 130.5398 35.7005"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
              <polygon
                id="path-1"
                points="0 0 130.5398 0 130.5398 35.7005 0 35.7005"></polygon>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-45.000000, -20.000000)">
                <g transform="translate(45.000000, 20.000000)">
                  <mask fill="white">
                    <use xlinkHref="#path-1"></use>
                  </mask>
                  <g id="Clip-2"></g>
                  <path
                    d="M123.178,35.5435 L124.588,35.5435 L124.588,28.1385 L123.178,28.1385 L123.178,35.5435 Z M120.1,35.5435 L121.51,35.5435 L121.51,28.1385 L120.1,28.1385 L120.1,35.5435 Z M117.377,32.8915 C117.377,31.8545 116.89,31.1535 116.029,31.1535 C115.161,31.1535 114.684,31.8545 114.684,32.8915 C114.684,33.9295 115.161,34.6215 116.029,34.6215 C116.89,34.6215 117.377,33.9295 117.377,32.8915 L117.377,32.8915 Z M118.808,32.8915 C118.808,34.4775 117.678,35.6985 116.029,35.6985 C114.382,35.6985 113.253,34.4775 113.253,32.8915 C113.253,31.3075 114.382,30.0855 116.029,30.0855 C117.678,30.0855 118.808,31.3075 118.808,32.8915 L118.808,32.8915 Z M110.736,30.4465 C110.736,29.7725 110.302,29.4435 109.557,29.4435 L107.981,29.4435 L107.981,31.4625 L109.535,31.4625 C110.323,31.4625 110.736,31.0995 110.736,30.4465 L110.736,30.4465 Z M110.809,32.5085 L112.662,35.5435 L110.923,35.5435 L109.203,32.6845 L107.981,32.6845 L107.981,35.5435 L106.427,35.5435 L106.427,28.1385 L109.68,28.1385 C110.539,28.1385 111.182,28.3845 111.616,28.8315 C112.031,29.2555 112.281,29.7725 112.281,30.4375 C112.281,31.4715 111.742,32.1985 110.809,32.5085 L110.809,32.5085 Z M100.814,32.3135 C100.057,32.1565 99.352,32.1165 99.352,31.6605 C99.352,31.2765 99.715,31.0695 100.263,31.0695 C100.863,31.0695 101.226,31.2765 101.288,31.8455 L102.562,31.8455 C102.46,30.7775 101.682,30.0845 100.284,30.0845 C99.072,30.0845 98.118,30.6325 98.118,31.7835 C98.118,32.9445 99.05,33.2025 100.004,33.3905 C100.731,33.5345 101.401,33.5875 101.401,34.0955 C101.401,34.4675 101.051,34.7045 100.429,34.7045 C99.798,34.7045 99.361,34.4365 99.269,33.8245 L97.964,33.8245 C98.047,34.9535 98.906,35.6985 100.451,35.6985 C101.777,35.6985 102.688,35.0585 102.688,33.9905 C102.688,32.7475 101.703,32.4975 100.814,32.3135 L100.814,32.3135 Z M95.518,32.3115 C95.478,31.6375 95.031,31.1735 94.391,31.1735 C93.643,31.1735 93.28,31.6195 93.157,32.3115 L95.518,32.3115 Z M96.989,33.2845 L93.135,33.2845 C93.24,34.1035 93.696,34.6105 94.493,34.6105 C95.044,34.6105 95.364,34.3615 95.518,33.9585 L96.906,33.9585 C96.709,34.9005 95.872,35.7005 94.505,35.7005 C92.742,35.7005 91.747,34.4665 91.747,32.8815 C91.747,31.3085 92.815,30.0835 94.37,30.0835 C96.078,30.0835 96.989,31.3885 96.989,33.2845 L96.989,33.2845 Z M88.88,30.0855 C88.206,30.0855 87.646,30.4365 87.282,31.0175 L87.261,31.0175 C87.002,30.4575 86.464,30.0855 85.793,30.0855 C85.057,30.0855 84.537,30.4575 84.248,30.9445 L84.217,30.9445 L84.217,30.2295 L82.86,30.2295 L82.86,35.5455 L84.269,35.5455 L84.269,32.4585 C84.269,31.7535 84.651,31.2975 85.22,31.2975 C85.74,31.2975 86.039,31.6085 86.039,32.2085 L86.039,35.5455 L87.449,35.5455 L87.449,32.4585 C87.449,31.7535 87.812,31.2975 88.403,31.2975 C88.92,31.2975 89.221,31.6085 89.221,32.2085 L89.221,35.5455 L90.628,35.5455 L90.628,31.9685 C90.628,30.8085 89.997,30.0855 88.88,30.0855 L88.88,30.0855 Z M79.804,35.5435 L81.214,35.5435 L81.214,30.2285 L79.804,30.2285 L79.804,35.5435 Z M79.804,29.4035 L81.214,29.4035 L81.214,28.1385 L79.804,28.1385 L79.804,29.4035 Z M72.78,29.4025 L75.008,29.4025 L75.008,35.5425 L76.51,35.5425 L76.51,29.4025 L78.735,29.4025 L78.735,28.1375 L72.78,28.1375 L72.78,29.4025 Z M68.191,32.9235 C68.191,31.9075 67.859,31.2245 66.957,31.2245 C66.181,31.2245 65.787,31.9075 65.787,32.8925 C65.787,33.9175 66.19,34.5175 66.917,34.5175 C67.757,34.5175 68.191,33.8955 68.191,32.9235 L68.191,32.9235 Z M68.16,28.1375 L69.57,28.1375 L69.57,35.5455 L68.212,35.5455 L68.212,34.8495 L68.191,34.8495 C67.88,35.3575 67.351,35.6995 66.606,35.6995 C65.27,35.6995 64.359,34.6125 64.359,32.8925 C64.359,31.2335 65.301,30.0855 66.627,30.0855 C67.372,30.0855 67.84,30.4275 68.129,30.8735 L68.16,30.8735 L68.16,28.1375 Z M62.027,32.8915 C62.027,31.8545 61.541,31.1535 60.679,31.1535 C59.811,31.1535 59.334,31.8545 59.334,32.8915 C59.334,33.9295 59.811,34.6215 60.679,34.6215 C61.541,34.6215 62.027,33.9295 62.027,32.8915 L62.027,32.8915 Z M63.458,32.8915 C63.458,34.4775 62.328,35.6985 60.679,35.6985 C59.032,35.6985 57.903,34.4775 57.903,32.8915 C57.903,31.3075 59.032,30.0855 60.679,30.0855 C62.328,30.0855 63.458,31.3075 63.458,32.8915 L63.458,32.8915 Z M55.594,32.8915 C55.594,31.8545 55.107,31.1535 54.246,31.1535 C53.378,31.1535 52.901,31.8545 52.901,32.8915 C52.901,33.9295 53.378,34.6215 54.246,34.6215 C55.107,34.6215 55.594,33.9295 55.594,32.8915 L55.594,32.8915 Z M57.025,32.8915 C57.025,34.4775 55.895,35.6985 54.246,35.6985 C52.599,35.6985 51.47,34.4775 51.47,32.8915 C51.47,31.3075 52.599,30.0855 54.246,30.0855 C55.895,30.0855 57.025,31.3075 57.025,32.8915 L57.025,32.8915 Z M47.245,32.7675 L49.027,32.7675 L49.027,32.8105 C49.027,33.6265 48.27,34.4875 47.119,34.4875 C45.845,34.4875 45.048,33.3805 45.048,31.8655 C45.048,30.3945 45.743,29.2345 47.14,29.2345 C48.094,29.2345 48.642,29.7545 48.809,30.4685 L50.28,30.4685 C50.04,29.0185 48.975,27.9945 47.11,27.9945 C46.116,27.9945 45.328,28.2925 44.727,28.8435 C43.949,29.5575 43.515,30.6345 43.515,31.8655 C43.515,32.9855 43.866,33.9365 44.478,34.6235 C45.091,35.2945 45.959,35.7005 47.079,35.7005 C47.959,35.7005 48.652,35.3985 49.159,34.5495 L49.181,34.5495 L49.233,35.5435 L50.363,35.5435 L50.363,31.6075 L47.245,31.6075 L47.245,32.7675 Z M38.748,32.3115 C38.708,31.6375 38.262,31.1735 37.622,31.1735 C36.874,31.1735 36.511,31.6195 36.388,32.3115 L38.748,32.3115 Z M40.219,33.2845 L36.366,33.2845 C36.471,34.1035 36.926,34.6105 37.723,34.6105 C38.274,34.6105 38.594,34.3615 38.748,33.9585 L40.136,33.9585 C39.939,34.9005 39.102,35.7005 37.736,35.7005 C35.972,35.7005 34.978,34.4665 34.978,32.8815 C34.978,31.3085 36.046,30.0835 37.6,30.0835 C39.308,30.0835 40.219,31.3885 40.219,33.2845 L40.219,33.2845 Z M32.048,30.0835 C31.322,30.0835 30.888,30.3635 30.503,30.9235 L30.472,30.9235 L30.472,28.1385 L29.063,28.1385 L29.063,35.5435 L30.472,35.5435 L30.472,32.5305 C30.472,31.8045 30.928,31.3085 31.549,31.3085 C32.14,31.3085 32.473,31.7115 32.473,32.2815 L32.473,35.5435 L33.879,35.5435 L33.879,32.0755 C33.879,30.9145 33.144,30.0835 32.048,30.0835 L32.048,30.0835 Z M26.693,33.9785 L26.693,31.1625 L27.604,31.1625 L27.604,30.2295 L26.693,30.2295 L26.693,28.5715 L25.314,28.5715 L25.314,30.2295 L24.578,30.2295 L24.578,31.1625 L25.314,31.1625 L25.314,34.2805 C25.314,35.2835 26.071,35.5545 26.754,35.5545 C27.314,35.5545 27.634,35.5325 27.634,35.5325 L27.634,34.4985 C27.634,34.4985 27.394,34.5075 27.219,34.5075 C26.908,34.5075 26.693,34.3725 26.693,33.9785 L26.693,33.9785 Z M19.804,33.9785 L19.804,31.1625 L20.715,31.1625 L20.715,30.2295 L19.804,30.2295 L19.804,28.5715 L18.425,28.5715 L18.425,30.2295 L17.689,30.2295 L17.689,31.1625 L18.425,31.1625 L18.425,34.2805 C18.425,35.2835 19.182,35.5545 19.865,35.5545 C20.425,35.5545 20.746,35.5325 20.746,35.5325 L20.746,34.4985 C20.746,34.4985 20.505,34.5075 20.33,34.5075 C20.019,34.5075 19.804,34.3725 19.804,33.9785 L19.804,33.9785 Z M15.388,32.3115 C15.348,31.6375 14.902,31.1735 14.262,31.1735 C13.514,31.1735 13.151,31.6195 13.028,32.3115 L15.388,32.3115 Z M16.859,33.2845 L13.006,33.2845 C13.111,34.1035 13.566,34.6105 14.363,34.6105 C14.914,34.6105 15.234,34.3615 15.388,33.9585 L16.776,33.9585 C16.579,34.9005 15.742,35.7005 14.376,35.7005 C12.612,35.7005 11.618,34.4665 11.618,32.8815 C11.618,31.3085 12.686,30.0835 14.24,30.0835 C15.948,30.0835 16.859,31.3885 16.859,33.2845 L16.859,33.2845 Z M7.454,34.2565 L10.935,34.2565 L10.935,35.5095 L5.952,35.5095 L5.952,28.1045 L7.454,28.1045 L7.454,34.2565 Z"
                    id="Fill-1"
                    fill="#000000"
                    mask="url(#mask-2)"></path>
                  <path
                    d="M68.8788,13.291 C68.8788,13.291 66.6518,14.025 65.4028,14.567 C64.1568,15.111 64.7798,16.059 64.7798,16.059 C64.7798,16.059 65.4028,17.092 66.8958,16.712 C69.0418,16.143 68.8788,13.291 68.8788,13.291 L68.8788,13.291 Z M74.2588,9.412 C74.6108,14.54 73.8988,18.026 75.4238,20.023 L69.7458,20.023 C69.7458,20.023 69.2278,19.343 68.9578,18.692 C68.9578,18.692 67.4408,20.483 64.1838,20.483 C60.9278,20.483 59.0938,18.584 59.0938,16.143 C59.0938,13.7 60.5078,11.907 65.0508,11.094 C66.8688,10.769 68.4968,10.552 68.5778,9.547 C68.6598,8.542 67.2748,8.353 66.9228,8.353 C66.9228,8.353 64.8478,8.201 64.8258,10.506 L59.5278,10.506 C59.5278,10.506 58.4008,4.663 67.3018,4.663 C67.3018,4.663 73.9068,4.281 74.2588,9.412 L74.2588,9.412 Z M29.4108,13.291 C29.4108,13.291 27.1808,14.025 25.9348,14.567 C24.6858,15.111 25.3118,16.059 25.3118,16.059 C25.3118,16.059 25.9348,17.092 27.4278,16.712 C29.5728,16.143 29.4108,13.291 29.4108,13.291 L29.4108,13.291 Z M34.7928,9.412 C35.1428,14.54 34.4298,18.026 35.9558,20.023 L30.2778,20.023 C30.2778,20.023 29.7628,19.343 29.4888,18.692 C29.4888,18.692 27.9718,20.483 24.7158,20.483 C21.4598,20.483 19.6258,18.584 19.6258,16.143 C19.6258,13.7 21.0398,11.907 25.5798,11.094 C27.4008,10.769 29.0288,10.552 29.1128,9.547 C29.1908,8.542 27.8098,8.353 27.4548,8.353 C27.4548,8.353 25.3798,8.201 25.3578,10.506 L20.0568,10.506 C20.0568,10.506 18.9328,4.663 27.8338,4.663 C27.8338,4.663 34.4388,4.281 34.7928,9.412 L34.7928,9.412 Z M19.7558,0.003 L12.1578,0.003 L6.0758,6.101 L6.0758,0.003 L-0.0002,0.003 L-0.0002,20.019 L6.0738,20.019 L6.0738,14.095 L7.6468,12.469 L12.4258,20.016 L20.3328,20.016 L11.9978,7.981 L19.7558,0.003 Z M123.1618,5.542 L116.2948,5.542 L113.3338,8.982 L113.3338,0 L107.5048,0 L107.5048,20.019 L113.3338,20.019 L113.3338,15.942 L114.0848,15.137 L117.2868,20.013 L124.0158,20.013 L118.0858,10.941 L123.1618,5.542 Z M124.7098,20.016 L130.5398,20.016 L130.5398,5.548 L124.7098,5.548 L124.7098,20.016 Z M124.7098,4.079 L130.5398,4.079 L130.5398,0.005 L124.7098,0.005 L124.7098,4.079 Z M100.4808,13.291 C100.4808,13.291 98.2538,14.025 97.0048,14.567 C95.7558,15.111 96.3818,16.059 96.3818,16.059 C96.3818,16.059 97.0048,17.092 98.4978,16.712 C100.6428,16.143 100.4808,13.291 100.4808,13.291 L100.4808,13.291 Z M105.8628,9.412 C106.2148,14.54 105.5028,18.026 107.0278,20.023 L101.3468,20.023 C101.3468,20.023 100.8328,19.343 100.5618,18.692 C100.5618,18.692 99.0418,20.483 95.7828,20.483 C92.5298,20.483 90.6928,18.584 90.6928,16.143 C90.6928,13.7 92.1128,11.907 96.6548,11.094 C98.4698,10.769 100.0988,10.552 100.1818,9.547 C100.2608,8.542 98.8788,8.353 98.5248,8.353 C98.5248,8.353 96.4498,8.201 96.4308,10.506 L91.1288,10.506 C91.1288,10.506 90.0018,4.663 98.9068,4.663 C98.9068,4.663 105.5078,4.281 105.8628,9.412 L105.8628,9.412 Z M84.4268,10.568 C81.3338,10.162 80.9028,9.894 80.9028,9.217 C80.9028,8.699 81.5228,8.293 82.6368,8.293 C83.7498,8.293 84.4028,9.111 84.5108,9.897 L89.5818,9.897 C89.5818,7.182 87.7918,4.858 82.5008,4.858 C75.0378,4.858 75.4738,9.81 75.4738,9.81 C75.4738,13.854 80.3318,14.269 82.6118,14.61 C84.6468,14.938 84.5898,16.051 84.5898,16.051 C84.5898,16.051 84.6468,17.14 82.7988,17.14 C80.4938,17.14 80.5208,14.959 80.5208,14.959 L75.2008,14.959 C75.2008,19.573 79.2988,20.719 82.7478,20.719 C86.1908,20.719 90.0188,19.527 90.0188,15.864 C90.0188,12.199 87.9808,11.302 84.4268,10.568 L84.4268,10.568 Z M59.7548,5.55 L55.3048,20.013 L49.6348,20.013 L47.3538,12.932 L45.4008,20.013 L39.5138,20.013 L34.5188,5.55 L40.5708,5.55 L42.6318,12.336 L44.7638,5.55 L49.8238,5.55 L51.7778,12.336 L54.0308,5.55 L59.7548,5.55 Z"
                    id="Fill-3"
                    fill="#E60012"
                    mask="url(#mask-2)"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      )
    }
    else if (brandId === 'Manitou') {
      return (
        <img
          width="599"
          height="105"
          alt=""
          className="mx-auto"
          src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCACNAyADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5Hooor1SAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK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567QSPfJ6mnUUUtBBQuQu3ouMbVwB9MADiiigAb51YHpu3beCpORyQR6Dp7CiiigAooopgFC/IqgdN27bwFByeQAPQ9Pc0UUgBvnDA/XPBBPqQR+lFFFGgBRRRTAKKKKAF9cEj0GThfm9iCePek59f5/40UUnZu47g3zdTkY4XGADRRRTEFFFFACYPy852jjOcA+2CCPzpefX+f+NFFToO4p5ORnd03Mc4H0pKKKLIQUUUVQBR9TkHqpHFFFIA578k9WJOf50rMS27cxbOdzMSfrk55pKKNB3CiiimIKKKKACl4+XqNp4OeQPbGAPypKKnQBCob7+H9MqOOmMZzjHOPqaWiiq6WAKKKKACiiigAooooAF+XocDHK4yCaOfX+f+NFFToANll2kkjnPJxzuPGSSOW9e1FFFCSQBRRRVAFFFFABRRRQAgXbu2jaWBywxkk9c4AzS8+v8/8AGiiloO4c+v8AP/Gjn1/n/jRRU8qC4c+v8/8AGjn1/n/jRRRyoLhz6/z/AMaOfX+f+NFFHKguHPr/AD/xob5upyMcLjABoop6CCiiiqAKKKKADn1/n/jRz6/z/wAaKKjlQ7hz6/z/AMaOfX+f+NFFHKguHPr/AD/xo59f5/40UUcqC4c+v8/8aOfX+f8AjRRRyoLgfmBDfMvQKQPlH1IOaKKKaSQhNvy4ySMbccAY9OnT2paKKa0HcKKKKYgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKLgFFFFFwCiiii4BRRRRcAoooouAUUUUXAKKKKLgFFFFFwCiiii4BRRRRcAoooouAUUUUXAKKKKLgFFFFFwCiiii4BRRRRcAoooouAUUUUXAKKKKLgFFFFFwCiiii4BRRRRcAoooouAUUUUXAKKKKLgFFFFFwCiiii4BRRRRcAoooouAUUUUXAKKKKLgFFFFFwCiiii4BRRRRcAoooouAUUUUXAKKKKLgFFFFFwCiiii4BRRRRcAoooouAUUUUXAKKKKLgFFFFFwCiiii4BRRRRcAoooouAUUUUXAKKKKLgFFFFFwP//Z"
        >
        </img>
      )
    }
    if (brandId === 'Spyder') {
      return (
        <img
          width="300"
          height="166"
          className="mx-auto"
          src="https://logovectorseek.com/wp-content/uploads/2020/09/can-am-logo-vector.png"
          alt="srry"
        />
      )
    }
    if (brandId === 'Suzuki') {
      return (
        <img
          width="250"
          height="150"
          className="mx-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/500px-Suzuki_logo_2.svg.png"
          alt="steve"
        />
      )
    }
    if (brandId === 'BMW-Motorrad') {
      return (
        <>
          <img
            width="150"
            height="150"
            className="mx-auto"
            src={BMW}
            alt="steve"
          />
        </>
      )
    }
    if (brandId === 'Harley-Davidson') {
      return (
        <img
          className="mx-auto "
          src={Harley}
          alt="steve"
        />
      )
    }
    if (brandId === 'Triumph') {
      return (
        <img
          src="https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto/sitecoremedialibrary/media-library/misc/misc-images/logo.svg?la=en-US"
          alt="Triumph Logo">
        </img>
      )
    }
    if (brandId === 'Indian') {
      return (
        <p>Coming Soon</p>
      )
    }
    if (brandId === 'KTM') {
      return (
        <p>Coming Soon</p>
      )
    }
    if (brandId === 'Yamaha') {
      return (
        <p>Coming Soon</p>
      )
    }
    else if (brandId === 'Switch') {
      return (
        <img
          width="300"
          height="166"
          alt="steve"
          className="mx-auto"
          src="https://searchlogovector.com/wp-content/uploads/2020/04/sea-doo-logo-vector.png"
        />
      )
    }


  } */
