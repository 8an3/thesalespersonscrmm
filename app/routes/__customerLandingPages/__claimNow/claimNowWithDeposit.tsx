import { LinksFunction, ActionFunction } from "@remix-run/node";
import { Input, TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Label, Separator, Badge, RemixNavLinkText, Button, } from "~/components/ui/index"
import { json } from "@remix-run/node";
import financeFormSchema from "~/overviewUtils/financeFormSchema";
import { prisma } from "~/libs";
import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import React, { useState } from "react";
import customer from '~/styles/customer.css'
import tdImage from '~/images/td-logo-en.png'
import RBC from '~/images/RBC.svg'
import ScotiaBank from '~/images/scotiaBank.svg'
import CIBC from '~/images/cibs.svg'
import BMOImage from '~/images/bmwImage.svg'
import { FaCheck } from "react-icons/fa";
import NBC from '~/images/bnc.svg'
import PC from '~/images/pc.svg'
import Laurentian from '~/images/laurentian.svg'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: customer },
];
export const logos = [
  {
    src: NBC,
    alt: 'NBC',
    href: "https://www.nbc.ca/personal/accounts/chequing.html?ef_id=Cj0KCQjwpZWzBhC0ARIsACvjWROZVLHlhWIzb8RQi5MMGabEGOCXYAPj-8gEapt8mhFY-FIRK36W2m4aApgXEALw_wcB:G:s&s_kwcid=AL!5258!3!564711256042!e!!g!!top%20canadian%20banks&cid=cpc_23554056_321788718_514034360_125535333&gad_source=1&gclid=Cj0KCQjwpZWzBhC0ARIsACvjWROZVLHlhWIzb8RQi5MMGabEGOCXYAPj-8gEapt8mhFY-FIRK36W2m4aApgXEALw_wcB&gclsrc=aw.ds"
  },
  {
    src: Laurentian,
    alt: 'Laurentian Bank',
    href: "https://www.laurentianbank.ca/en"
  },
  {
    src: RBC,
    alt: 'RBC',
    href: "https://secure.royalbank.com/signin.html?_gl=1*111hq2t*_gcl_au*MjA0NDIzOTc5LjE3MTc5NDE4MTY.*_ga*MTg5NjU0Njk1LjE3MTc5NDE4MTc.*_ga_89NPCTDXQR*MTcxNzk0MTgxNi4xLjEuMTcxNzk0MTkwMy4zOC4wLjA."
  },
  {
    src: tdImage,
    alt: 'TD',
    href: 'https://www.td.com/ca/en/personal-banking?cm_sp=:GOOGLE:EN+-+Core-+Brand+(24_S_BR_BAC_AO_ACQ_EN_NAT):DIF:Core+Brand+-+Broad&gclid=Cj0KCQjwpZWzBhC0ARIsACvjWRNVxwnDzQJyeL8fHE3Qp9DPaR4zFPRu9BQC2_6Y7Btm1Cb86FNb0h0aAjS4EALw_wcB&gclsrc=aw.ds'
  },
  {
    src: BMOImage,
    alt: 'BMO',
    href: 'https://www1.bmo.com/banking/digital/login?lang=en'
  },
  {
    src: ScotiaBank,
    alt: 'Scotia Bank',
    href: 'https://www.scotiaonline.scotiabank.com/'
  },
  {
    src: CIBC,
    alt: 'CIBC',
    href: 'https://www.cibc.com/en/special-offers/smart-cash-offer.html?utrc=S186:151&gclid=Cj0KCQjwpZWzBhC0ARIsACvjWRO5Wz-oDP66ytPAF2gl3Se1jF5bTokHvQUckDNsS_7eeKoPNAjmMcIaAj2BEALw_wcB&gclsrc=aw.ds#'
  },
  {
    src: PC,
    alt: 'PC',
    href: "https://secure.pcfinancial.ca/en/login?_gl=1*vy2im7*_ga*MTAyMDkyOTYzOC4xNzE3OTQ0NTc3*_ga_JDEZPSSYQC*MTcxNzk0NDU3Ni4xLjEuMTcxNzk0NDgxNC40My4wLjA."
  },
]
export default function DealerCompleted() {
  const { dealer, finance, salesRep } = useLoaderData()
  const [searchParams] = useSearchParams();
  const financeId = searchParams.get("financeId");
  const copyText = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedText(text);
        setTimeout(() => setCopiedText(''), 3000); // Reset after 3 seconds
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };
  const [copiedText, setCopiedText] = useState('');

  return (
    <div className="bg-white my-auto mx-auto font-sans px-2 text-black h-[100vh] max-h-screen  overflow-y-scroll ">
      <div className="border mt-[25px] border-solid border-[#eaeaea] rounded-md my-[40px] mx-auto p-[20px] max-w-[465px]">
        <h1 className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
          To send a deposit via e-transfer, please follow these steps:
        </h1>
        <div className=" mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">E-Transfer Instructions</h1>
          <p className="mb-4">
          </p>
          <ol className="list-decimal list-inside mb-4">
            <li>Log in to your online banking account.</li>
            <li>
              Navigate to the e-transfer section. You can use the links below to go directly to your bank's e-transfer page.
            </li>
            <li>
              Add a new recipient using the following email:
              <span >
                {copiedText === dealer.dealerEmailAdmin || copiedText === dealer.dealerEmail ? (
                  <FaCheck strokeWidth={1.5} className="ml-2 text-lg hover:text-primary" />
                ) : (
                  <strong onClick={() => copyText(dealer.dealerEmailAdmin)}>{dealer && dealer.dealerEmailAdmin && (
                    <p className='cursor-pointer' >Dealer Admin Email: {dealer.dealerEmailAdmin}</p>
                  )}
                    {dealer && !dealer.dealerEmailAdmin && (
                      <p className='cursor-pointer' onClick={() => copyText(dealer.dealerEmail)} >Dealer Email: {dealer.dealerEmail}</p>
                    )}
                  </strong>
                )}
              </span>
            </li>
            <li>Enter the deposit amount.</li>
            <li>
              In the notes enter your contract identifier:
              <span onClick={() => copyText(financeId)}>
                {copiedText === financeId ? (
                  <FaCheck strokeWidth={1.5} className="ml-2 text-lg hover:text-primary" />
                ) : (
                  <p>
                    <strong className='cursor-pointer' >{financeId}</strong>
                  </p>
                )}
              </span>
            </li>
            <li>Send the e-transfer.</li>
            <li>Once the etransfer has been sent, press continue.</li>
          </ol>
        </div>

        <div className="relative mt-5 mb-5">
          <Card className="w-[425px] mx-auto">
            <CardContent>
              <div className='flex flex-wrap justify-center gap-8  py-4'>
                <TooltipProvider>
                  {logos.map(img => (
                    <Tooltip key={img.href}>
                      <TooltipTrigger asChild>
                        <a
                          href={img.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0"
                        >
                          <img
                            alt={img.alt}
                            src={img.src}
                            className="object-contain"
                          />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>{img.alt}</TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
          <label className=" text-[16px] leading-[24px] absolute left-3  rounded-full -top-3 px-2 bg-[#ffffff] peer-placeholder-shown:top-2.5  ">Major Banks</label>
        </div>


        <h1 className="text-2xl font-bold mb-4">Or Reach Out To Your Rep</h1>
        <p className="mb-4">
          If we're open and you would rather connect with your rep personally do to a deposit over the phone, you can find their contact information below.
        </p>
        <div className="grid gap-3">
          <div className="font-semibold">Your sales reps contact info</div>
          <li className="flex items-center justify-between">
            <span className="text-[#8a8a93]">Name</span>
            <span>{salesRep.name}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-[#8a8a93]">Email</span>
            <span className='cursor-pointer' onClick={() => copyText(salesRep.email)}>
              {copiedText === salesRep.email ? (
                <FaCheck strokeWidth={1.5} className="ml-2 text-lg hover:text-primary" />
              ) : (
                <span >{salesRep.email}</span>
              )}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-[#8a8a93]">Phone</span>
            <span >{salesRep.phone}</span>
          </li>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size='sm' className='bg-[#ff0000] text-white mt-5' variant="outline">Continue</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-[#ffffff]'>
            <AlertDialogHeader>
              <AlertDialogTitle>Congratulations on taking the first step!</AlertDialogTitle>
              <AlertDialogDescription>
                Thank-you for your deposit, your sales rep with by in contact with you shortly.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Form method='post' >
                <input type='hidden' name='financeId' value={financeId} />
                <input type='hidden' name='userEmail' value={salesRep.email} />
                <input type='hidden' name='name' value={finance.name} />
                <input type='hidden' name='model' value={finance.model} />
                <input type='hidden' name='brand' value={finance.brand} />
                <input type='hidden' name='year' value={finance.year} />
                <input type='hidden' name='email' value={finance.email} />
                <Button
                  type='submit'
                  variant='ghost'>
                  <AlertDialogAction type='submit'
                    className='bg-[#ff0000] text-white mt-5' >
                    Continue
                  </AlertDialogAction>
                </Button>
              </Form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full mt-auto" />
      <p className="text-[#666666] text-[12px] leading-[24px]">
        © {dealer.dealerName} <br />
        {dealer.dealerPhone} <br />
        {dealer && dealer.dealerEmailAdmin && (
          <p>Dealer Email: {dealer.dealerEmailAdmin}</p>
        )}
        {dealer && !dealer.dealerEmailAdmin && (
          <p>Dealer Email: {dealer.dealerEmail}</p>
        )} <br />
        {dealer.dealerAddress}, {dealer.dealerCity}, {dealer.dealerProv}, {dealer.dealerPostal}, Canada
      </p>
    </div>
  );
}
export async function loader({ request, params }) {
  const url = new URL(request.url);
  const financeId = url.searchParams.get("financeId");
  const dealer = await prisma.dealer.findUnique({ where: { id: 1 } })
  const finance = await prisma.finance.findUnique({ where: { id: financeId } })
  const salesRep = await prisma.user.findUnique({ where: { email: finance?.userEmail } })
  return json({ dealer, finance, salesRep })
}

export async function action({ request, }: ActionFunction) {
  const formPayload = Object.fromEntries(await request.formData())
  let formData = financeFormSchema.parse(formPayload)
  const intent = formPayload.intent
  const clientfile = await prisma.clientfile.findUnique({ where: { email: formData.email } })
  const notifications = await prisma.notificationsUser.create({
    data: {
      userEmail: String(formData.userEmail),
      title: 'New deposit!',
      content: `${formData.name} put a deposit on a ${formData.year} ${formData.brand} ${formData.model}`,
      type: "updates",
      financeId: String(formData.financeId),
      clientfileId: String(clientfile.id),
    }
  })
  console.log(notifications, 'notifications')
  return json({ notifications, clientfile })
}

