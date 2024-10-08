import { Input, Button, TextArea, } from "~/components/ui/index";
import { useLoaderData, Form, useFetcher, useLocation, useNavigation } from "@remix-run/react";
import { PhoneOutcome, MenuScale, Mail, MessageText, User, ArrowDown, Calendar as CalendarIcon, WebWindowClose, } from "iconoir-react";
import { dashboardLoader } from "~/components/actions/dashboardCalls";
import financeFormSchema from "~/overviewUtils/financeFormSchema";
import React, { useEffect, useRef, useState } from 'react';
import { model } from "~/models";
import { authenticator } from "~/services/auth-service.server";
import { type ActionFunction, json } from "@remix-run/node";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose, } from "~/components/ui/dialog"
import { Cross2Icon } from '@radix-ui/react-icons';
import { prisma } from "~/libs";
import { CreateCommunications } from '~/utils/communications/communications.server';
import { getLastAppointmentForFinance } from "~/utils/client/getLastApt.server";
import { toast } from 'sonner'
import { ButtonLoading } from "~/components/ui/button-loading";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "~/components/ui/tabs"

export const action: ActionFunction = async ({ req, request, params, }) => {
  const formPayload = Object.fromEntries(await request.formData());
  let formData = financeFormSchema.parse(formPayload);
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email")


  const user = await GetUser(email)
  /// console.log(user, account, 'wquiote loadert')
  if (!user) {
    redirect('/login')
  }
  const userId = user?.id;
  const intent = formPayload.intent;
  const financeId = formData?.financeId;

  const promise2 = fetch('/emails/send/form', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      console.log(`${response.url}: ${response.status}`);
    })
    .catch((error) => {
      console.error(`Failed to fetch: ${error}`);
    });
  // console.log(promise2, 'promise2')
  const comdata = {
    financeId: formData.financeId,
    userId: formData.userId,
    content: formData.customContent,
    title: formData.subject,
    direction: formData.direction,
    result: formData.customerState,
    subject: formData.subject,
    type: 'Email',
    userName: user?.name,
    date: new Date().toISOString(),
  }
  const completeApt = await getLastAppointmentForFinance(financeId);
  const setComs = await CreateCommunications(comdata)



  return json({ promise2, setComs, completeApt });
}
export let loader = dashboardLoader;

export default function EmailClient({ data, isButtonPressed, setIsButtonPressed }) {
  const { getTemplates, user, conversations } = useLoaderData();
  const [templates, setTemplates] = useState(getTemplates);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const today = new Date();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [text, setText] = React.useState('');
  const [cc, setCc] = useState(false)
  const [bcc, setBcc] = useState(false)
  const [convos, setConvos] = useState([])

  //console.log(conversations)
  const handleChange = (event) => {
    const selectedTemplate = templates.find(template => template.title === event.target.value);
    setSelectedTemplate(selectedTemplate);
  };
  React.useEffect(() => {
    if (selectedTemplate) {
      setText(selectedTemplate.body);
      setSubject(selectedTemplate.subject);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    async function GetPreviousConversations() {

      setConvos(conversations)
      return conversations
    }
    GetPreviousConversations()

  }, [data.id]);

  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === "/user/dashboard/scripts";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      customerFirstName: formData.get('customerFirstName'),
      customerLastName: formData.get('customerLastName'),
      customerEmail: formData.get('customerEmail'),
      financeId: formData.get('financeId'),
      userEmail: formData.get('userEmail'),
      brand: formData.get('brand'),
      id: formData.get('id'),
      intent: formData.get('intent'),
      template: formData.get('template'),
      subject: formData.get('subject'),
      customContent: formData.get('customContent'),
      title: formData.get('title'),
    }
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    // console.log(data, 'data')
    const createComms = await CreateCommunications(data)
    const template = formData.get('template')
    if (template === "createEmailTemplate") {
      console.log('hit template')
      const promise2 = fetch('/emails/send/form', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          console.log(`${response.url}: ${response.status}`);
        })
        .catch((error) => {
          console.error(`Failed to fetch: ${error}`);
        });
      console.log(promise2, 'promise2')

    } else {
      console.log('hit else')

      const promise2 = fetch('/emails/send/form', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          console.log(`${response.url}: ${response.status}`);
        })
        .catch((error) => {
          console.error(`Failed to fetch: ${error}`);
        });
      console.log(promise2, 'promise2')

      // Make second request
      const promise1 = fetch('/emails/send/payments', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          console.log(`${response.url}: ${response.status}`);
        })
        .catch((error) => {
          console.error(`Failed to fetch: ${error}`);
        });

      Promise.all([promise2, promise1])
        .then((responses) => {
          for (const response of responses) {
            console.log(`${response}: ${response}`);
          }
        })
        .catch((error) => {
          console.error(`Failed to fetch: ${error}`);
        });
    }
  }
  const [buttonText, setButtonText] = useState('Send Email');
  const [subject, setSubject] = useState('');
  /* onSubmit={handleSubmit} ref={formRef} >*/
  let fetcher = useFetcher();
  const [createTemplate, setCreateTemplate] = useState('')
  const [templateName, setTemplateName] = useState()
  const [templateContent, setTemplateContent] = useState()
  const [templateCategory, setTemplateCategory] = useState()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p
          className="cursor-pointer text-black target:text-primary hover:text-primary" >
          <Mail className="" />
        </p>
      </DialogTrigger>
      <DialogContent className="w-full md:w-3/4 bg-white border border-black overflow-y-scroll z-999">
        <DialogHeader>

          <DialogDescription>
          </DialogDescription>

        </DialogHeader>
        <Tabs defaultValue="account" className="w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Email</TabsTrigger>
            <TabsTrigger value="password">Prev Interactions</TabsTrigger>
          </TabsList>
          <TabsContent value="account">

            <fetcher.Form method="post">
              <div className='flex flex-col'>
                <label className=" mt-3 w-full text-left text-[15px] text-black" htmlFor="name">
                  Templates
                </label>
                <select
                  className={`border-black text-black  bg-white autofill:placeholder:text-text-black justifty-start h-8 cursor-pointer rounded border px-2 text-xs uppercase shadow transition-all duration-150 ease-linear focus:outline-none focus:ring focus-visible:ring-primary`}
                  onChange={handleChange}>
                  <option value="">Select a template</option>
                  {templates && templates.filter(template => template.type === 'email').map((template, index) => (
                    <option key={index} value={template.title}>
                      {template.title}
                    </option>
                  ))}
                </select>
                <label className=" mt-3 w-full text-left text-[15px] text-black" htmlFor="name">
                  Subject
                </label>
                <Input
                  className=" text-black  bg-white shadow-violet7 focus:shadow-violet8 inline-flexw-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="name"
                  name='subject'
                  value={subject}
                  placeholder="Subject"
                  onChange={(e) => setSubject(e.target.value)}

                />

                <div className="ml-auto flex px-2  ">
                  <p
                    onClick={() => setCc(!cc)}
                    className="cursor-pointer text-black px-2 text-right text-[12px] hover:text-primary">
                    cc
                  </p>
                  <p
                    onClick={() => setBcc(!bcc)}
                    className="cursor-pointer text-black px-2 text-right text-[12px] hover:text-primary ">
                    bcc
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {cc && (
                    <Input placeholder="cc:" name='ccAddress' className="rounded text-black bg-white" />
                  )}
                  {bcc && (
                    <Input placeholder="bcc:" name="bccAddress" className="rounded text-black bg-white" />
                  )}
                </div>
                <label className="mt-3 w-[90px] text-left text-[15px] text-black" htmlFor="username">
                  Body
                </label>
                <TextArea
                  value={text}
                  name="customContent"
                  className="border-black text-black h-[300px] bg-white"
                  placeholder="Type your message here."
                  ref={textareaRef}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <input type='hidden' value={data.firstName} name='firstName' />
              <input type='hidden' value={data.lastName} name='lastName' />
              <input type='hidden' value={data.email} name='email' />
              <input type='hidden' value={data.email} name='customerEmail' />
              <input type="hidden" defaultValue={data.userEmail} name="userEmail" />
              <input type="hidden" defaultValue={data.id} name="financeId" />
              <input type="hidden" defaultValue={data.id} name="id" />
              <input type="hidden" defaultValue={data.brand} name="brand" />
              <input type='hidden' value='fullCustom' name='emailType' />
              <input type='hidden' value='Attempted' name='customerState' />
              <input type='hidden' value='Outgoing' name='direction' />
              <input type='hidden' value={data.model} name='unit' />
              <input type='hidden' value={data.brand} name='brand' />
              <input type='hidden' value={user.id} name='userId' />
              <input type='hidden' value='EmailClient' name='intent' />
              <input type='hidden' value={today} name='lastContact' />
              <div className="mt-[25px] flex justify-between items-center">


                <Button
                  onClick={() => {
                    // setIsButtonPressed(true);
                    // Change the button text
                    setButtonText('Email Sent');
                    toast.success(`Sent email to ${data.firstName}.`)
                  }}
                  name='emailType' value='fullCustom' type='submit'
                  className={` cursor-pointer mr-2 p-3 hover:text-primary hover:border-primary text-black border border-black font-bold uppercase text-xs rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all text-center duration-150 ${isButtonPressed ? ' bg-green-500 ' : 'bg-primary'} `}
                >
                  {buttonText}
                </Button>

                {createTemplate === 'createEmailTemplate' && (<input type='hidden' name='intent' value={createTemplate} />)}
              </div>
            </fetcher.Form >
            <fetcher.Form method='post'>
              <input type='hidden' value={data.firstName} name='firstName' />
              <input type='hidden' value={data.lastName} name='lastName' />
              <input type='hidden' value={data.email} name='email' />
              <input type='hidden' value={data.email} name='customerEmail' />
              <input type="hidden" defaultValue={data.userEmail} name="userEmail" />
              <input type="hidden" defaultValue={data.id} name="financeId" />
              <input type="hidden" defaultValue={data.id} name="id" />
              <input type="hidden" defaultValue={data.brand} name="brand" />
              <input type='hidden' name='name' value={subject} />
              <input type='hidden' name='body' value={text} />
              <input type='hidden' name='userEmail' value={user.email} />
              <input type='hidden' name='subject' value='Copied from email client' />
              <input type='hidden' name='title' value='Copied from email client' />
              <ButtonLoading
                size="lg"
                name='intent'
                value='createEmailTemplate'
                type='submit'
                isSubmitting={isSubmitting}
                onClick={() => {
                  setIsButtonPressed(true);
                  setCreateTemplate("createEmailTemplate")
                  toast.message('Helping you become the hulk of sales...')
                }}
                loadingText="Loading..."
                className="w-auto cursor-pointer mt-2  hover:text-primary hover:border-primary text-black border-black"
              >
                Save As Template
              </ButtonLoading>
            </fetcher.Form >

          </TabsContent>
          <TabsContent value="password">
            <div className='max-h-[900px] overflow-y-scroll' >

              {convos && convos.filter(convo => convo.financeId === data.financeId).map((convo, index) => (
                <div key={index} className="m-2 mx-auto w-[95%] cursor-pointer rounded-md border-1 border-[#ffffff4d] hover:border-primary  hover:text-primary active:border-primary">
                  <p className="my-2 ml-2 text-sm text-black">
                    Sent by: {convo.userName}
                  </p>
                  <div className="m-2 flex items-center justify-between">
                    <p className="text-lg font-bold text-black">
                      {convo.direction} / {convo.type} /  {convo.result}
                    </p>
                    <p className="text-sm text-black text-right ">
                      {new Date(convo.date).toLocaleString()}
                    </p>
                  </div>
                  <p className="my-2 ml-2 text-sm text-black">
                    {convo.subject}
                  </p>

                  <p className="my-2 ml-2 text-sm text-black">
                    {convo.content}...
                  </p>

                </div>
              ))}
            </div>

          </TabsContent>
        </Tabs>



        <DialogClose asChild>
          <button
            className="text-black  hover:text-primary focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </DialogClose>

      </DialogContent >
    </Dialog >
  );
}

/*
export function EmailClient2() {
  const { finance } = useLoaderData();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const promise2 = fetch('/dashboard/calls', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log(`${response.url}: ${response.status}`);
      })
      .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
      });

    const promise1 = fetch('/emails/send/payments', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log(`${response.url}: ${response.status}`);
      })
      .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
      });

    Promise.all([promise1, promise2])
      .then((responses) => {
        for (const response of responses) {
          console.log(`${response.url}: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
      });
  }

  const id = finance.id ? finance.id.toString() : '';


  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>Email</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-blackA6" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] h-[550px] w-[700px]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            Email
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-mauve11"></Dialog.Description>
          <Form method="post" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className=" w-full text-left text-[15px]" htmlFor="name">
                Subject
              </label>
              <input
                className=" inline-flex h-8 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                id="name"
                name="subject"
                placeholder="Subject"
              />
              <label className=" w-full text-left text-[15px]" htmlFor="name">
                Preview - ie on the email console, it shows a breif preview of
                the email
              </label>
              <input
                className=" inline-flex h-8 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                id="name"
                name="preview"
                placeholder="Preview"
              />
              <label
                className="w-[90px] text-left text-[15px]"
                htmlFor="username"
              >
                Body
              </label>
              <TextArea
                placeholder="Type your email here."
                name="customContent"
                className="mt-2 h-[250px]"
              />
            </div>
            <input
              type="hidden"
              value={finance.firstName}
              name="customerFirstName"
            />
            <input
              type="hidden"
              value={finance.lastName}
              name="customerLastName"
            />


            <input type='hidden' value={finance.firstName} name='customerFirstName' />
            <input type='hidden' value={finance.lastName} name='customerLastName' />
            <input type='hidden' value={finance.email} name='customerEmail' />
            <input type="hidden" defaultValue={finance.userEmail} name="userEmail" />
            <input type="hidden" defaultValue={finance.id} name="financeId" />
            <input type="hidden" defaultValue={id} name="id" />
            <input type="hidden" defaultValue={finance.brand} name="brand" />
            <input type='hidden' value='fullCustom' name='emailType' />
            <input type='hidden' value='Reached' name='customerState' />
            <input type='hidden' value='2DaysFromNow' name='intent' />

            <div className="mt-[25px] flex justify-end">
              <button
                name="emailType"
                value="fullCustom"
                type="submit"
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Send
              </button>
            </div>
          </Form>
          <Dialog.Close asChild>
            <button
              className=" absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
              aria-label="Close"
            >
              <WebWindowClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 *
export default function EmailClient({ data }) {
  const { dashBoardCustURL } = useLoaderData();
  console.log(dashBoardCustURL)
  if (dashBoardCustURL === "/dashboard/calls") {
  return (
    <EmailClient1 data={data} />
  )
  }
  else {
    EmailClient2()
  }
}

export function EmailClient2() {
  const { finance } = useLoaderData();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>Email</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-blackA6" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] h-[550px] w-[700px]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            Email
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-mauve11"></Dialog.Description>
          <Form method="post" action="/emails/send/payments">
            <div className="flex flex-col">
              <label className=" w-full text-left text-[15px]" htmlFor="name">
                Subject
              </label>
              <input
                className=" inline-flex h-8 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                id="name"
                name="subject"
                placeholder="Subject"
              />
              <label className=" w-full text-left text-[15px]" htmlFor="name">
                Preview - ie on the email console, it shows a breif preview of
                the email
              </label>
              <input
                className=" inline-flex h-8 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                id="name"
                name="preview"
                placeholder="Preview"
              />
              <label
                className="w-[90px] text-left text-[15px]"
                htmlFor="username"
              >
                Body
              </label>
              <TextArea
                placeholder="Type your email here."
                name="customContent"
                className="mt-2 h-[250px]"
              />
            </div>
            <input
              type="hidden"
              value={finance.firstName}
              name="customerFirstName"
            />
            <input
              type="hidden"
              value={finance.lastName}
              name="customerLastName"
            />
            <input type="hidden" value={finance.email} name="customerEmail" />
            <input type="hidden" value="fullCustom" name="emailType" />
            <input type="hidden" value="Reached" name="customerState" />
            <input type="hidden" value="2DaysFromNow" name="intent" />
            <div className="mt-[25px] flex justify-end">
              <button
                name="emailType"
                value="fullCustom"
                type="submit"
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Send
              </button>
            </div>
          </Form>
          <Dialog.Close asChild>
            <button
              className=" absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
              aria-label="Close"
            >
              <WebWindowClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}


const EmailClient1 = ({ data }) => (
    <Dialog.Root>
        <Dialog.Trigger asChild>
            <Mail />
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[550px] w-[700px]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    Email
                </Dialog.Title>
                <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                </Dialog.Description>
                <Form method="post" action="/emails/send/payments">
                    <div className='flex flex-col'>
                        <label className=" w-full text-left text-[15px]" htmlFor="name">
                            Subject
                        </label>
                        <input
                            className=" shadow-violet7 focus:shadow-violet8 inline-flex h-8 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            id="name"
                            name='subject'
                            placeholder="Subject"
                        />
                        <label className=" w-full text-left text-[15px]" htmlFor="name">
                            Preview - ie on the email console, it shows a breif preview of the email
                        </label>
                        <input
                            className=" shadow-violet7 focus:shadow-violet8 inline-flex h-8 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            id="name"
                            name='preview'
                            placeholder="Preview"
                        />
                        <label className="w-[90px] text-left text-[15px]" htmlFor="username">
                            Body
                        </label>
                        <TextArea
                            placeholder="Type your email here."
                            name="customContent"
                            className="h-[250px] mt-2"
                        />
                    </div>
                    <input type='hidden' value={data.firstName} name='customerFirstName' />
                    <input type='hidden' value={data.lastName} name='customerLastName' />
                    <input type='hidden' value={data.email} name='customerEmail' />
                    <input type='hidden' value= name='intent' />

                    <input type='hidden' value='fullCustom' name='emailType' />
                    <input type='hidden' value='Reached' name='customerState' />
                    <input type='hidden' value='2DaysFromNow' name='intent' />
                    <div className="mt-[25px] flex justify-end">
                        <button name='emailType' value='fullCustom' type='submit' className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                            Send
                        </button>
                    </div>
                </Form>
                <Dialog.Close asChild>
                    <button
                        className=" hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                        aria-label="Close"
                    >
                        <WebWindowClose />
                    </button>
                </Dialog.Close>

            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);

*/
