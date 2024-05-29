import { json, type LoaderFunction, type ActionFunctionArgs, redirect } from '@remix-run/node';
import { Form, useLoaderData, useSubmit, Link, useFetcher, useNavigation } from '@remix-run/react'
import { Button, Tabs, TabsList, TabsTrigger, TabsContent, Card, CardHeader, CardTitle, CardContent, CardDescription, Separator, CardFooter, Label, Input, } from '~/components';
import { ButtonLoading } from "~/components/ui/button-loading";
import { prisma } from "~/libs";
import { toast } from "sonner"
import financeFormSchema from '~/overviewUtils/financeFormSchema';
import { Target } from 'lucide-react';
import { todoRoadmap } from '../dealer/user/dashboard.roadmap';


// NEED PRO VERCEL ACCOPUNT FOR THIS TO WORK NOT TESTED YET BUT DOCS SUGGEST YOU CANNOT USE UR PERSONAL HOBBY ACCOUNT
//const vercelToken = process.env.BLOB_READ_WRITE_TOKEN;



export async function action({ request, }: ActionFunctionArgs) {
  const formPayload = Object.fromEntries(await request.formData())
  let formData = financeFormSchema.parse(formPayload)

  const intent = formPayload.intent
  const dealerName = formPayload.dealerName
  function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  const envVar = [
    {
      key: 'DEALER_NAME',
      target: 'production',
      type: 'system',
      value: dealerName
    },
    {
      key: 'REMIX_DEV_EMAIL',
      target: 'production',
      type: 'system',
      value: "skylerzanth@outlook.com"
    },
    {
      key: 'REMIX_ADMIN_EMAIL',
      target: 'production',
      type: 'system',
      value: formPayload.dealerEmailAdmin,
    },
    {

      key: 'MICRO_APP_ID',
      target: 'production',
      type: 'system',
      value: `0fa1346a-ab27-4b54-bffd-e76e9882fcfe`,
    },
    {
      key: 'MICRO_TENANT_ID',
      target: 'production',
      type: 'system',
      value: `fa812bd2-3d1f-455b-9ce5-4bfd0a4dfba6`,
    },
    {
      key: 'MICRO_CLIENT_SECRET',
      target: 'production',
      type: 'system',
      value: `rut8Q~s5LpXMnEjujrxkcJs9H3KpUzxO~LfAOc-D`,
    },
    {
      key: 'CLIENT_ID',
      target: 'production',
      type: 'system',
      value: `0fa1346a-ab27-4b54-bffd-e76e9882fcfe`,
    },
    {
      key: 'TENANT_ID',
      target: 'production',
      type: 'system',
      value: `fa812bd2-3d1f-455b-9ce5-4bfd0a4dfba6`,
    },
    {
      key: 'CLIENT_SECRET',
      target: 'production',
      type: 'system',
      value: `rut8Q~s5LpXMnEjujrxkcJs9H3KpUzxO~LfAOc-D`,
    },
    {
      key: 'REMIX_SESSION_SECRET',
      target: 'production',
      type: 'system',
      value: '3847ad8f0be06852c4b92b030fe1efe3',
    },
    {
      key: 'REMIX_ADMIN_EMAIL',
      target: 'production',
      type: 'system',
      value: 'skylerzanth@outlook.com',
    },
    {
      key: 'REMIX_ADMIN_PASSWORD',
      target: 'production',
      type: 'system',
      value: 'Ch3w8acca66',
    },
    {
      key: 'COOKIE_SECRET',
      target: 'production',
      type: 'system',
      value: 'cookiesecret_sauce66',
    },
    {
      key: 'REMIX_APP_NAME',
      target: 'production',
      type: 'system',
      value: 'dealersalesassistant',
    },
    {
      key: 'DATABASE_URL',
      target: 'production',
      type: 'system',
      value: 'postgres://default:Ub6EtAvk5jqV@ep-cool-wood-a44zvgt4-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
    },
    {
      key: 'STRIPE_SECRET_KEY',
      target: 'production',
      type: 'system',
      value: 'sk_live_pNtrt5zYNjHQtYrSrINfKyAJ',
    },
    {
      key: 'API_ACTIVIX',
      target: 'production',
      type: 'system',
      value: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzFkZTg5NzMwZmIyYTZlNmU1NWNhNzA4OTc2YTdjNzNiNWFmZDQwYzdmNDQ3YzE4ZjM5ZGE4MjMwYWFhZmE3ZmEyMTBmNGYyMzdkMDE0ZGQiLCJpYXQiOjE3MDI1NzI0NDIuNTcwMTAyLCJuYmYiOjE3MDI1NzI0NDIuNTcwMTA0LCJleHAiOjQ4NTgyNDYwNDIuNTI2NDI4LCJzdWIiOiIxNDMwNDEiLCJzY29wZXMiOlsidmlldy1sZWFkcyIsIm1hbmFnZS1sZWFkcyIsInRyaWdnZXItZmxvdyIsIm5vdGVzOmNyZWF0ZSIsIm5vdGVzOnVwZGF0ZSIsIm5vdGVzOnZpZXciXX0.ZrXbofK55iSlkvYH0AVGNtc5SH5KEXqu8KdopubrLsDx8A9PW2Z55B5pQCt8jzjE3J9qTcyfnLjDIR3pU4SozCFCmNOMZVWkpLgUJPLsCjQoUpN-i_7V5uqcojWIdOya7_WteJeoTOxeixLgP_Fg7xJoC96uHP11PCQKifACVL6VH2_7XJN_lHu3R3wIaYJrXN7CTOGMQplu5cNNf6Kmo6346pV3tKZKaCG_zXWgsqKuzfKG6Ek6VJBLpNuXMFLcD1wKMKKxMy_FiIC5t8SK_W7-LJTyo8fFiRxyulQuHRhnW2JpE8vOGw_QzmMzPxFWlAPxnT4Ma6_DJL4t7VVPMJ9ZoTPp1LF3XHhOExT2dMUt4xEQYwR1XOlnd0icRRlgn2el88pZwXna8hju_0R-NhG1caNE7kgRGSxiwdSEc3kQPNKDiJeoSbvYoxZUuAQRNgEkjIN-CeQp5LAvOgI8tTXU9lOsRFPk-1YaIYydo0R_K9ru9lKozSy8tSqNqpEfgKf8S4bqAV0BbKmCJBVJD7JNgplVAxfuF24tiymq7i9hjr08R8p2HzeXS6V93oW4TJJiFB5kMFQ2JQsxT-yeFMKYFJQLNtxsCtVyk0x43AnFD_7XrrywEoPXrd-3SBP2z65DP9Js16-KCsod3jJZerlwb-uKeeURhbaB9m1-hGk',
    },
  ]
  const createFirstVercel = async (newDealerRepoName) => {
    const data = {
      name: "freedomHD",
      environmentVariables: envVar,
      framework: "remix",
      gitRepository: {
        type: "github",
        repo: '8an3/thesalespersonscrmm',
      },
    }
    const res = await fetch(
      "https://api.vercel.com/v9/projects?teamId=team_wZNR5xSfpymdzh4R3rMBzz9V",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${vercelToken}`
        },
        body: JSON.stringify(data)
      }
    );
    const project = await res.json();
    console.log('Project created successfully:', project.data);

    return ({ project })

  };


  if (intent === 'createDealer') {
    //const createFirstFirst = await createFirstVercel(dealerName)
    // console.log(createFirstFirst)
    //await delay(50);
    // const createSecondSecond = await createSecondVercel(dealerName)
    /// console.log(createSecondSecond)
    // console.log(dealerName)
    const create = await prisma.dealerMyCustomer.create({
      data: {

        dealerName: formData.dealerName,
        dealerAddress: formData.dealerAddress,
        dealerCity: formData.dealerCity,
        dealerProv: formData.dealerProv,
        dealerPostal: formData.dealerPostal,
        dealerPhone: formData.dealerPhone,
        dealerEmail: formData.dealerEmail,
        dealerContact: formData.dealerContact,
        vercel: formData.vercel,
        github: formData.github,
      }
    })
    return json({ create })
  }
  if (intent === 'createLead') {
    const data = {
      email: 'skylerzanth@outlook.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '123-456-7890',
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      postal: 'A1B 2C3',
      province: 'Ontario',
      dl: 'D1234567',
      typeOfContact: 'email',
      timeToContact: 'Morning',
      iRate: '5.5',
      months: '60',
      discount: '1000',
      total: '25000',
      onTax: '3000',
      on60: '24000',
      biweekly: '300',
      weekly: '150',
      weeklyOth: '145',
      biweekOth: '295',
      oth60: '23500',
      weeklyqc: '148',
      biweeklyqc: '298',
      qc60: '23600',
      deposit: '2000',
      biweeklNatWOptions: '310',
      weeklylNatWOptions: '155',
      nat60WOptions: '24500',
      weeklyOthWOptions: '150',
      biweekOthWOptions: '300',
      oth60WOptions: '24000',
      biweeklNat: '305',
      weeklylNat: '152',
      nat60: '24200',
      qcTax: '2500',
      otherTax: '2600',
      totalWithOptions: '26000',
      otherTaxWithOptions: '2700',
      desiredPayments: '280',
      freight: '1200',
      admin: '300',
      commodity: '500',
      pdi: '200',
      discountPer: '4',
      // userLoanProt: null,
      userTireandRim: 'yes',
      // userGap: 'yes',
      userExtWarr: 'yes',
      // userServicespkg: 'yes',
      //deliveryCharge: '100',
      // vinE: '1HGCM82633A123456',
      //lifeDisability: 'no',
      // rustProofing: 'yes',
      //   userOther: 'no',
      paintPrem: 'yes',
      licensing: '150',
      stockNum: 'S12345',
      options: 'Sunroof, Leather Seats',
      //  accessories: 'Floor Mats',
      labour: '100',
      year: '2023',
      brand: 'Toyota',
      model: 'Camry',
      model1: 'SE',
      color: 'Blue',
      modelCode: 'CAMSE23',
      msrp: '27000',
      tradeValue: '5000',
      tradeDesc: '2015 Honda Civic',
      tradeColor: 'Red',
      tradeYear: '2015',
      tradeMake: 'Honda',
      tradeVin: '2HGFG12685H123456',
      tradeTrim: 'EX',
      tradeMileage: '60000',
      trim: 'SE',
      vin: '1HGCM82633A123456',
      lien: 'None',
      lastContact: '2024-05-28T15:59:02.192Z',
      nextAppointment: '2024-06-01T10:00:00.000Z',
      referral: 'off',
      visited: 'off',
      bookedApt: 'off',
      aptShowed: 'off',
      aptNoShowed: 'off',
      testDrive: 'off',
      metService: 'off',
      metManager: 'off',
      metParts: 'off',
      sold: 'off',
      depositMade: 'off',
      refund: 'off',
      turnOver: 'off',
      financeApp: 'off',
      approved: 'off',
      signed: 'off',
      pickUpSet: 'off',
      demoed: 'off',
      delivered: 'off',
      notes: 'off',
      metSalesperson: 'off',
      metFinance: 'off',
      financeApplication: 'off',
      pickUpTime: 'off',
      depositTakenDate: 'off',
      docsSigned: 'off',
      tradeRepairs: 'off',
      seenTrade: 'off',
      lastNote: 'off',
      dLCopy: 'off',
      insCopy: 'off',
      testDrForm: 'off',
      voidChq: 'off',
      loanOther: 'off',
      signBill: 'off',
      ucda: 'off',
      tradeInsp: 'off',
      customerWS: 'off',
      otherDocs: 'off',
      urgentFinanceNote: 'off',
      funded: 'off',
      status: 'Active',
      result: 'Approved',
      customerState: 'New',
      timesContacted: '3',
      followUpDay: '2024-06-10',
      deliveredDate: '2024-06-15',
      pickUpDate: '2024-06-15'
    };

    const createLead = await fetch('http://localhost:3000/dealer/leads/inbound/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return json({ createLead })
  }
  return null
}
/**  const createSecondVercel = async (newDealerRepoName) => {
    const data = {
      name: "freedomHD",
      environmentVariables: envVar,
      framework: "remix",
      gitRepository: {
        type: "github",
        repo: '8an3/crmsat',
      },
    }
    const res = await fetch(
      "https://api.vercel.com/v9/projects",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${vercelToken}`
        },
        body: JSON.stringify(data)
      }
    );
    const project = await res.json();
    delay(100)

    const deployRes = await fetch(
      "https://api.vercel.com/v13/deployments",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${vercelToken}`
        },
        body: JSON.stringify({
          "gitSource": {
            "ref": "main",
            "repoId": '8an3/thesalespersonscrmm',
            "type": "github"
          },
          "name": "freedomHD",
          "projectSettings": {
            "framework": data.framework
          }
        })
      }
    )

    return ({ project, deployRes })
  } */
export async function loader() {
  return null
}

export default function DashboardPage() {
  const navigation = useNavigation();
  const fetcher = useFetcher()
  const isSubmitting = navigation.state === "submitting";
  const organizedTasks = {};
  todoRoadmap.forEach((item) => {
    if (!organizedTasks[item.type]) {
      organizedTasks[item.type] = [];
    }
    organizedTasks[item.type].push(item);
  });
  return (
    <>
      <div className="hidden flex-col md:flex text-[#fafafa]">
        <div className="flex-1 space-y-4 p-8 pt-6mt-3 ">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="new">new</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Dealers
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className='border border-[#27272a] text-[#fafafa]'>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Dealers
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      Total Salespeople
                    </p>
                  </CardContent>
                </Card>
                <Card className='border border-[#27272a] text-[#fafafa]'>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className='border border-[#27272a] text-[#fafafa]'>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className='border border-[#27272a] text-[#fafafa]'>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-2 border border-[#27272a] ">
                  <CardHeader>
                    <CardTitle className='text-[#fafafa]'>Add New Dealer</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="space-y-6">
                      <Separator />
                      <div className="ml-5">
                        <Form method='post' className="space-y-4">
                          <div className="grid gap-3 mx-3 mb-3">
                            <div className="relative mt-3">
                              <Input
                                name='dealerName'
                                type="text"
                                className="w-full bg-[#09090b] border-[#27272a] "
                              />
                              <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Dealer Name</label>
                            </div>
                            <div className="relative mt-3">
                              <Input
                                name='dealerPhone'
                                type="text"
                                className="w-full bg-[#09090b] border-[#27272a] "
                              />
                              <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Dealer Phone</label>
                            </div>
                            <div className="relative mt-3">
                              <Input
                                name='dealerAddress'
                                type="text"
                                className="w-full bg-[#09090b] border-[#27272a] "
                              />
                              <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Dealer Address</label>
                            </div>
                            <div className="relative mt-3">
                              <Input
                                name='dealerCity'
                                type="text"
                                className="w-full bg-[#09090b] border-[#27272a] "
                              />
                              <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Dealer City</label>
                            </div>
                            <div className="relative mt-3">
                              <Input
                                name='dealerProvince'
                                type="text"
                                className="w-full bg-[#09090b] border-[#27272a] "
                              />
                              <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Dealer Province</label>
                            </div>
                            <div className="relative mt-3">
                              <Input
                                name='dealerPostal'
                                type="text"
                                className="w-full bg-[#09090b] border-[#27272a] "
                              />
                              <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Dealer Postal Code</label>
                            </div>
                            <div className="relative mt-3">
                              <Input
                                name='dealerEmail'
                                type="text"
                                className="w-full bg-[#09090b] border-[#27272a] "
                              />
                              <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Dealer Email</label>
                            </div>
                            <div className="relative mt-3">
                              <Input
                                name='dealerEmailAdmin'
                                type="text"
                                className="w-full bg-[#09090b] border-[#27272a] "
                              />
                              <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Dealer Admin Email</label>
                            </div>
                            <div className="relative mt-3">
                              <Input
                                name='dealerContact'
                                type="text"
                                className="w-full bg-[#09090b] border-[#27272a] "
                              />
                              <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Dealer Contact</label>
                            </div>
                            <div className="relative mt-3">
                              <Input
                                name='vercel'
                                type="text"
                                className="w-full bg-[#09090b] border-[#27272a] "
                              />
                              <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Vercel Domain</label>
                            </div>
                            <div className="relative mt-3">
                              <Input
                                name='github'
                                type="text"
                                className="w-full bg-[#09090b] border-[#27272a] "
                              />
                              <label className=" text-sm absolute left-3 rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Github Domain</label>
                            </div>
                          </div>
                          <div className='grid grid-cols-2 justify-between' >
                            <div></div>
                            <ButtonLoading
                              size="sm"
                              value='createDealer'
                              className="bg-[#dc2626] ml-auto w-auto cursor-pointer mt-5   text-[#fafafa] border border-[#27272a]"
                              name="intent"
                              type="submit"
                              isSubmitting={isSubmitting}
                              onClick={() => toast.success(`Dealer added!`)}
                              loadingText="Adding new dealer..."
                            >
                              Add
                            </ButtonLoading>
                          </div>

                        </Form>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-2 border border-[#27272a] text-[#fafafa]">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>RecentSales </p>
                  </CardContent>
                </Card>
                <Card className="col-span-3 border border-[#27272a] text-[#fafafa]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex">
                      To-do
                      <Target color="#ff0000" className='text-2xl ml-2  ' />
                    </CardTitle>

                  </CardHeader>
                  <CardContent>
                    <div className=' h-auto max-h-[55vh] overflow-y-scroll'>
                      {Object.entries(organizedTasks).map(([type, tasks]) => (
                        <div key={type}>
                          <h4 className='mt-3 ml-3 text-picton-blue-50'>{type}</h4>
                          <Separator />
                          {tasks.map((task) => (
                            <div key={task.desc} className="ml-3 p-3 flex items-center  mt-3 shadow-md  bg-myColor-900 target:text-[#02a9ff] hover:text-[#02a9ff] text-slate4 active:bg-[#02a9ff]  text-md uppercase  rounded  hover:shadow-md outline-none  ease-linear transition-all duration-150">
                              <p color="my-3  ">
                                {task.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="tests" className="space-y-4">
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Tests</CardTitle>
                  <CardDescription>Run tests to test app functions.</CardDescription>
                </CardHeader>
                <CardContent>

                  <ul className="grid gap-3 text-sm mt-2">
                    <fetcher.Form method='post' >
                      <li className="flex items-center justify-between">
                        <span className="text-[#909098]">
                          Create lead - API
                        </span>
                        <span>
                          <Button
                            type='submit'
                            name='intent'
                            value='createLead'
                            size='sm'
                            className=' bg-[#dc2626]'
                            onClick={() => {
                              toast.success('Sent http request to api to create lead')
                            }}
                          >
                            Create
                          </Button>
                        </span>
                      </li>
                    </fetcher.Form>
                  </ul>
                </CardContent>

              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
/**  const createFirstRepo = async (newDealerRepoName) => {
    const YOUR_GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;
    const templateOwner = '8an3';
    const templateRepo = 'thesalespersonscrmm';
    const newRepoName = newDealerRepoName;
    const newRepoOwner = '8an3';

    const apiUrl = `https://api.github.com/repos/${templateOwner}/${templateRepo}/generate`;

    const config = { headers: { 'Accept': 'application/vnd.github.baptiste-preview+json', 'Authorization': `token ${YOUR_GITHUB_TOKEN}`, }, };

    const data = { name: newRepoName, owner: newRepoOwner, };
    return axios.post(apiUrl, data, config).then(response => { console.log('Repository created successfully:', response.data); })
      .catch(error => { console.error('Error creating repository:', error.response.data); });
  };
  const createSecondRepo = async (newDealerRepoName) => {
    const YOUR_GITHUB_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;
    const templateOwner = '8an3';
    const templateRepo = 'crmsat';
    const newRepoName = newDealerRepoName;
    const newRepoOwner = '8an3';

    const apiUrl = `https://api.github.com/repos/${templateOwner}/${templateRepo}/generate`;

    const config = { headers: { 'Accept': 'application/vnd.github.baptiste-preview+json', 'Authorization': `token ${YOUR_GITHUB_TOKEN}`, }, };

    const data = { name: newRepoName, owner: newRepoOwner, };
    return axios.post(apiUrl, data, config).then(response => { console.log('Repository created successfully:', response.data); })
      .catch(error => { console.error('Error creating repository:', error.response.data); });
  }; */
