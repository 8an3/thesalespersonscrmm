import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  Input,
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Dialog as Dialog1,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Label,
  Separator,
  TabsContent,
  Skeleton,
} from "~/components";
import ProvideAppContext, { useAppContext, } from "~/components/microsoft/AppContext";
import {
  deleteMessage,
  getDrafts,
  getDraftsList,
  getInbox,
  getInboxList,
  getJunk,
  getList,
  getSent,
  getTrash,
  messageRead,
  messageUnRead,
  getUser,
  testInbox,
  getFolders,
  getAllFolders,
  getEmailById,
  MoveEmail,
  createReplyDraft,
  ComposeEmail,
  SendNewEmail,
  setFolder,
  listAttachment,
} from "~/components/microsoft/GraphService";
import {
  EditorTiptapHook,
  Editor,
  EditorTiptapHookCompose,
} from "~/components/libs/basicEditor";
import { useMsal } from "@azure/msal-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { Form, useFetcher, useNavigate, useNavigation } from "@remix-run/react";
import { Forward, User, Reply } from "iconoir-react";
import {
  FaReply,
  FaReplyAll,
  FaForward,
  FaTrash,
  FaArchive,
  FaHistory,
  FaStar,
  FaCommentDollar,
} from "react-icons/fa";
import {
  IoIosMailUnread,
  IoIosMail,
  IoMdAlert,
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";
import { IoSend } from "react-icons/io5";
import {
  MdSms,
  MdDrafts,
  MdForum,
  MdSecurityUpdateGood,
  MdOutlineSocialDistance,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdMarkunreadMailbox,
} from "react-icons/md";
import { RiSpam3Fill, RiContractLeftRightLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { BsThreeDotsVertical, BsArrowsExpandVertical } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import {
  Client,
  type GraphRequestOptions,
  type PageCollection,
  PageIterator,
  type ClientOptions,
} from "@microsoft/microsoft-graph-client";
import { type AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GoArrowSwitch } from "react-icons/go";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import IndeterminateCheckbox, { fuzzyFilter, fuzzySort, getToken, invariant, Loading, checkForMobileDevice, TableMeta, Filter, DebouncedInput, defaultColumn } from '~/components/shared/shared'
import secondary from "~/styles/secondary.css";
import { type LinksFunction } from "@remix-run/node";
import useSWR, { SWRConfig, mutate, useSWRConfig } from 'swr';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable";
import { Nav } from "~/routes/__authorized/dealer/features/email/nav";
import { cn } from "~/utils";
import { AlertCircle, Archive, ArchiveX, File, Inbox, MessagesSquare, Search, Send, Trash2, Users2, X } from "lucide-react";
import { MailList } from "~/routes/__authorized/dealer/features/email/mail-list";
import { MailDisplay } from "~/routes/__authorized/dealer/features/email/mail-display";
import { AccountInfo, InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
import CallMsGraph, { callMsGraph } from "~/routes/__authorized/dealer/features/email/MsGraphApiCall";
import { loginRequest } from "~/components/microsoft/Config";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: secondary },
];
export default function NewCLientOnlyForClients() {
  const app = useAppContext();
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const authProvider = app.authProvider!

  /**  const { instance, accounts, inProgress } = useMsal();
    const account = instance.getActiveAccount();
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account: account
    });
    if (!account) {
      throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }
    const jsontoken = JSON.stringify(response.accessToken)
   */
  // const user = getUser(app.authProvider!);

  // let search = useFetcher();
  // let ref = useRef();

  const [emails, setEmails] = useState();
  const [getCountOf, setGetCountOf] = useState('');
  const [mail, setMail] = useState();
  const [unread, setUnread] = useState();
  const [label, setLabel] = useState('Inbox');
  const [unreadItemCount, setUnreadItemCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [unreadJunkCount, setUnreadJunkCount] = useState(0);
  const [folders, setFolders] = useState([]);
  const [attachment, setAttachment] = useState()
  const [user, setUser] = useState()
  const [cust, setCust] = useState()
  const [key, setKey] = useState()
  const [keyMicro, setKeyMicro] = useState()


  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:3000/dealer/sales/customer/cm1pt1v9200xfuoiwkuzxf1gp/profile") {
        console.warn("Blocked message from unknown origin:", event.origin);
        return;
      }
      const receivedData = event.data;
      console.log(receivedData.cust, 'cust');
      setCust(receivedData.cust)
      console.log(receivedData.user, 'user');
      setUser(receivedData.user)
      console.log(receivedData.key, 'key');
      setKey(receivedData.key)
    }, false);
  }, []);


  useEffect(() => {
    if (app) {
      console.log('we have app', app)
    }
    if (!app) {
      console.log('NOO app',)
    }
    if (key) {
      console.log('key', key)

      const accessToken = key
      const endpoints = [
        `https://graph.microsoft.com/v1.0/me/messages?$select=sender,subject,toRecipients,receivedDateTime&$filter=sender/emailAddress/address eq 'skylerzanth@gmail.com'`,
        `https://graph.microsoft.com/v1.0/me/messages?$select=sender,subject,toRecipients,receivedDateTime&$filter=toRecipients/any(r: r/emailAddress/address eq 'skylerzanth@gmail.com')`
      ];

      const fetchMessages = (url) =>
        fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
          });

      Promise.all(endpoints.map(fetchMessages))
        .then(([senderResponse, toRecipientsResponse]) => {
          const combinedArray = [...senderResponse.value, ...toRecipientsResponse.value];
          setEmails(combinedArray);
          console.log('Combined Messages:', combinedArray);
        })
        .catch(error => console.error('Error fetching messages:', error));

      /**
          const fetchFolders = async () => {
      const fetchedFolders = await getAllFolders(app.authProvider!);
      console.log(fetchedFolders, 'fetchedFolders')
      setFolders(fetchedFolders.value);
    }
    fetchFolders();*/


    }

  }, []);


  const account = instance.getActiveAccount();


  useEffect(() => {
    if (app) {
      console.log('app', app)
      async function GetEmail() {
        try {
          const response = await testInbox(app.authProvider!);
          setEmails(response.value);

        } catch (error) {
          console.error("Error fetching emails 222:", error);
        }
      }
      GetEmail()
    } else {
      console.log('going to get creds now.......')
      if (!account) {
        if (!account) {
          throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
        }
        async function GetEmail() {

          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: account
          });

          const jsontoken = JSON.stringify(response.accessToken)


          setKeyMicro(jsontoken.accessToken)

          console.log('jsontoken.accessToken', jsontoken.accessToken)
        }
        GetEmail()
      }
    }

  }, []);

  async function SetNewEmails() {
    if (label === "Deleted Items") {
      const response = await getList(app.authProvider!, "deleteditems");
      return response.value
    }
    if (label === "Junk Email") {
      const response = await getList(app.authProvider!, "junkemail");
      return response.value
    }
    if (label === "Sent Items") {
      const response = await getList(app.authProvider!, "sentitems");
      return response.value
    }
    if (label === "Conversation History") {
      const response = await getList(app.authProvider!, "conversationhistory");
      return response.value
    }
    if (label === "Drafts") {
      const response = await getList(app.authProvider!, 'drafts');
      return response.value
    }
    if (label === "Archive") {
      const response = await getList(app.authProvider!, "archive");
      return response.value
    }
  }
  async function GetEmailByFolder(labelName) {
    setLabel(labelName);
    const data = await SetNewEmails();
    setEmails(data);
  }

  /** useEffect(() => {
     async function GetAttachments() {
       const getAttach = await listAttachment(app.authProvider!, mail.id)
       return getAttach.value
     }
     if (mail && mail.hasAttachments && mail.hasAttachments === true) {
       const NewEmails = async () => {
         const data = await GetAttachments();
         return data
       }
       setAttachment(NewEmails)

     }

   }, [mail]); */

  const navCollapsedSize = 4
  const layout = 30//layoutCookie2
  const collapsed = false// collapsedCookie2

  const defaultLayout = [20, 32, 48]
  const defaultCollapsed = collapsed

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  const emailsSafe = Array.isArray(emails) ? emails : [];
  const [filter, setFilter] = useState('');
  const [globalFilter, setGlobalFilter] = useState('');

  function FilterSearch(z) {
    let s = z
    if (globalFilter) {
      s = globalFilter;
    }
    if (filter) {
      s = filter;
    }
    s = s.toLowerCase();
    let result
    if (s.length > 1) {
      result = emails.filter(
        (email) =>
          email.from?.emailAddress.name?.toLowerCase().includes(s) ||
          email.subject?.toLowerCase().includes(s) ||
          email.from?.emailAddress.address?.toLowerCase().includes(s)
      );
      setEmails(result);
    }
  }

  const ReadMessage = (email) => {
    messageRead(app.authProvider!, email.id);
  }
  async function handlesetToUnread(email) {
    messageUnRead(app.authProvider!, email.id);
  }
  async function handlesetFolder(email, folder) {
    setFolder(app.authProvider!, email.id, folder);
  }
  async function GetNextEmail() {
    const emailMessage = emails[1]
    setMail(emailMessage);
  }

  function getUnreadAndTotalCounts(folders) {
    let result = {
      inbox: {
        unreadItemCount: 0,
        totalItemCount: 0,
      },
      junkEmail: {
        unreadItemCount: 0,
        totalItemCount: 0,
      },
    };

    folders.forEach((folder) => {
      if (folder.displayName === "Inbox") {
        result.inbox.unreadItemCount = folder.unreadItemCount;
        result.inbox.totalItemCount = folder.totalItemCount;
      } else if (folder.displayName === "Junk Email") {
        result.junkEmail.unreadItemCount = folder.unreadItemCount;
        result.junkEmail.totalItemCount = folder.totalItemCount;
      }
    });

    return result;
  }

  const counts = getUnreadAndTotalCounts(folders);

  const handleDeleteClick = async (id) => {
    const emailMessage = emails[1]
    setMail(emailMessage);
    // await deleteMessage(app.authProvider!, id);
    toast.success(`Email moved to trash.`);
    setLabel(label)
  };
  const displayNameOrder = [
    "Inbox",
    "Sent Items",
    "Drafts",
    "Trash",
    "Archive",
    "Junk Email",
    "Starred",
    "Important",
    "Unread",
    "Chat",
    "Conversation History",
    "Forums",
    "Updates",
    "Personal",
    "Promotions",
    "Social",
    "Deleted Items",
    "Outbox",
  ];
  const primaryLinks = [
    {
      title: "Inbox",
      label: counts.inbox.unreadItemCount,
      icon: Inbox,
      variant: "default",
    },
    {
      title: "Drafts",
      label: draftCount,
      icon: File,
      variant: "ghost",
    },
    {
      title: "Sent Items",
      label: "",
      icon: Send,
      variant: "ghost",
    },
    {
      title: "Junk Email",
      label: counts.junkEmail.unreadItemCount,
      icon: ArchiveX,
      variant: "ghost",
    },
    {
      title: "Deleted Items",
      label: "",
      icon: Trash2,
      variant: "ghost",
    },
    {
      title: "Archive",
      label: "",
      icon: Archive,
      variant: "ghost",
    },
  ];
  const secondaryLinks2 = [
    {
      title: "Social",
      label: "972",
      icon: Users2,
      variant: "ghost",
    },
    {
      title: "Updates",
      label: "342",
      icon: AlertCircle,
      variant: "ghost",
    },
    {
      title: "Forums",
      label: "128",
      icon: MessagesSquare,
      variant: "ghost",
    },
    {
      title: "Promotions",
      label: "21",
      icon: Archive,
      variant: "ghost",
    },
  ];

  return (
    <>
      <div className='mt-10 m-5 border border-border rounded-md'>
        <TooltipProvider delayDuration={0}>
          <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => { }}
            className="h-full max-h-[800px] items-stretch"
          >
            <ResizablePanel
              defaultSize={defaultLayout[0]}
              collapsedSize={navCollapsedSize}
              collapsible={true}
              minSize={15}
              maxSize={20}
              onCollapse={() => setIsCollapsed(true)}
              onResize={() => setIsCollapsed(false)}
              className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
            >
              <Separator className='mt-[39px]' />
              <Nav
                isCollapsed={isCollapsed}
                links={primaryLinks}
                label={label}
                setGetCountOf={setGetCountOf}
                GetEmailByFolder={GetEmailByFolder} />
              <Separator />
              <Nav
                isCollapsed={isCollapsed}
                links={secondaryLinks2}
                label={label}
                GetEmailByFolder={GetEmailByFolder} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
              <Tabs defaultValue="all">
                <div className="flex items-center px-4 py-2">
                  <h1 className="text-xl font-bold">{label}</h1>
                  <TabsList className="ml-auto">
                    <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">All mail</TabsTrigger>
                    <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Unread</TabsTrigger>
                  </TabsList>
                </div>
                <Separator />
                <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">

                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search"
                      className="pl-8"
                      onChange={(e) => {
                        FilterSearch(e.target.value)
                      }}
                    />
                    <Button
                      onClick={() => {
                        // navigate(0)
                        GetEmailByFolder(label)
                      }}
                      size="icon"
                      className='bg-background mr-2 absolute right-2.5 top-2.5 h-4 w-4 text-foreground '>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <TabsContent value="all" className="m-0">
                  {emailsSafe.length === 0 ? (
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ) : (
                    <MailList
                      emails={emails}
                      // ReadMessage={ReadMessage}
                      setMail={setMail}
                      mail={mail} />
                  )}
                </TabsContent>
                <TabsContent value="unread" className="m-0">
                  {emails?.length === 0 ? (
                    <p className='text-center mt-5 text-muted-foreground w-[75%]'>No emails to currently display. If there are no e-mails listed you may need to re-log in to your microsoft account to update the login session.</p>
                  ) : (
                    <MailList
                      emails={emails?.filter(item => !item.isRead)}
                      setMail={setMail}
                      //   ReadMessage={ReadMessage}
                      mail={mail} />
                  )}
                </TabsContent>
              </Tabs>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
              <MailDisplay
                mail={mail}
                app={app}
                handleDeleteClick={handleDeleteClick}
                handlesetToUnread={handlesetToUnread}
                setFolder={setFolder}
                attachment={attachment}
                user={user}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </TooltipProvider>
      </div>
    </>
  )
}
