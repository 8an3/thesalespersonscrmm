import { json, type ActionFunction, createCookie, type LoaderFunction, redirect, } from "@remix-run/node";
import financeFormSchema from "~/routes/overviewUtils/financeFormSchema";
////import { authenticator } from "~/services";
import { findDashboardDataById, findQuoteById, getDataBmwMoto, getDataByModel, getDataByModelManitou, getDataHarley, getDataKawasaki, getDataTriumph, getLatestBMWOptions, getLatestBMWOptions2, getLatestOptionsManitou, getRecords, } from "~/utils/finance/get.server";
import { getDealerFeesbyEmail } from "~/utils/user.server";
import { getAllFinanceNotes } from "~/utils/financeNote/get.server";
import { deleteFinanceNote } from "~/utils/financeNote/delete.server";
import UpdateStatus from "../dashboard/calls/actions/UpdateStatus";
import DeleteCustomer from "../dashboard/calls/actions/DeleteCustomer";
import { updateFinanceNote } from "~/utils/client/updateFinanceNote.server";
import { prisma } from "~/libs";
import { deleteFinanceAppts } from "~/utils/financeAppts/delete.server";
import UpdateAppt from "../dashboard/calls/actions/updateAppt";
import { createFinanceCheckClientDFirst } from "~/utils/finance/create.server";
import createFinanceNotes from "../dashboard/calls/actions/createFinanceNote";
import updateFinanceNotes from "../dashboard/calls/actions/updateFinanceNote";
import CreateAppt from "../dashboard/calls/actions/createAppt";
import updateFinance23 from "../dashboard/calls/actions/updateFinance";
import { createfinanceApt } from "~/utils/financeAppts/create.server";
import { getMergedFinance } from "~/utils/dashloader/dashloader.server";
import { EmailFunction } from "~/routes/dummyroute";
import { model } from "~/models";
import { getSession, commitSession, getSession as getToken66, commitSession as commitToken66 } from '~/sessions/auth-session.server';
import axios from 'axios';
import { updateFinance, updateFinanceWithDashboard } from "~/utils/finance/update.server"
import { google } from 'googleapis';
import oauth2Client, { SendEmail, } from "~/routes/email.server";
import { getSession as sixSession, commitSession as sixCommit, } from '~/utils/misc.user.server'
import { DataForm } from '../dashboard/calls/actions/dbData';
import { CreateCommunications, CompleteTask, CreateLead, CreateTask, UpdateLead, SyncLeadData } from "../../routes/api.activix";
import { QuoteServer } from '~/utils/quote/quote.server';
import { createFinance, createFinanceManitou, createBMWOptions, createBMWOptions2, createClientFileRecord, financeWithDashboard, } from "~/utils/finance/create.server";


const getAccessToken = async (refreshToken) => {
  try {
    const accessTokenObj = await axios.post(
      'https://www.googleapis.com/oauth2/v4/token',
      {
        refresh_token: refreshToken,
        client_id: "286626015732-f4db11irl7g5iaqb968umrv2f1o2r2rj.apps.googleusercontent.com",
        client_secret: "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",
        grant_type: 'refresh_token'
      }
    );

    return accessTokenObj.data.access_token;
  } catch (err) {
    console.log(err);
  }
};
export function Unauthorized(refreshToken) {
  console.log('Unauthorized');
  const newAccessToken = getAccessToken(refreshToken)

  console.log(newAccessToken, 'newAccessToken', refreshToken, 'refreshToken')

  oauth2Client.setCredentials({
    //  refresh_token: refreshToken,
    access_token: newAccessToken,
  });
  google.options({ auth: oauth2Client });
  //  const userRes = await gmail.users.getProfile({ userId: 'me' });
  //console.log(userRes, 'userRes')

  const tokens = newAccessToken
  return tokens
}
export async function dashboardLoader({ request, params }: LoaderFunction) {
  const session2 = await getSession(request.headers.get("Cookie"));
  const email = session2.get("email")
  const user = await model.user.query.getForSession({ email: email });
  if (!user) { redirect('/login') }
  const deFees = await getDealerFeesbyEmail(user.email);
  const session = await sixSession(request.headers.get("Cookie"));

  const sliderWidth = session.get("sliderWidth");
  const userEmail = user?.email
  const getTemplates = await prisma.emailTemplates.findMany({ where: { userEmail: userEmail, }, });
  let finance;
  finance = await getMergedFinance(userEmail);
  const brand = finance?.brand;
  const urlSegmentsDashboard = new URL(request.url).pathname.split("/");
  const dashBoardCustURL = urlSegmentsDashboard.slice(0, 3).join("/");
  const customerId = finance?.id;
  const financeNotes = await getAllFinanceNotes(customerId);
  const searchData = await prisma.clientfile.findMany({ orderBy: { createdAt: 'desc', }, });
  const webLeadData = await prisma.finance.findMany({ orderBy: { createdAt: 'desc', }, where: { userEmail: null } });
  const dashData2 = await prisma.dashboard.findMany({ where: { customerState: 'turnOver' }, });
  const financeData2 = await prisma.finance.findMany({ where: { id: dashData2.financeId }, });
  const financeNewLead = await Promise.all(financeData2.map(async (financeRecord) => {
    const correspondingDashRecord = dashData2.find(dashRecord => dashRecord.financeId === financeRecord.id);
    const comsCounter = await prisma.communications.findUnique({
      where: {
        financeId: financeRecord.id
      },
    });
    return {
      ...comsCounter,
      ...correspondingDashRecord,
      ...financeRecord,
    };
  }));
  const conversations = await prisma.communicationsOverview.findMany({})
  const getWishList = await prisma.wishList.findMany({ orderBy: { createdAt: 'desc', }, where: { userId: user?.id } });
  const notifications = await prisma.notificationsUser.findMany({ where: { userId: user.id, } })

  const fetchLatestNotes = async (webLeadData) => {
    const promises = webLeadData.map(async (webLeadData) => {
      try {
        const latestNote = await prisma.financeNote.findFirst({
          where: { customerId: webLeadData.financeId },
          orderBy: { createdAt: 'desc' },
        });
        return latestNote;
      } catch (error) {
        console.error('Error fetching note:', error);
        return null;
      }
    });

    return Promise.all(promises);
  };
  const latestNotes = await fetchLatestNotes(finance);
  let tokens = session2.get("accessToken")
  const refreshToken = session2.get("refreshToken")
  const userRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/${user.email}/profile`, {
    headers: { Authorization: 'Bearer ' + tokens, Accept: 'application/json' }
  });
  console.log(userRes, 'userRes')
  // new
  if (userRes.status === 401) {
    const unauthorizedAccess = await Unauthorized(refreshToken)
    tokens = unauthorizedAccess

    session.set("accessToken", tokens);
    await commitSession(session);
    let cookie = createCookie("session_66", {
      secrets: ['secret'],
      // 30 days
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    const cookies = cookie.serialize({
      email: email,
      refreshToken: refreshToken,
      accessToken: tokens,
    })
    await cookies
    console.log(tokens, 'authorized tokens')

  } else { console.log('Authorized'); }

  const financeData = await prisma.finance.findMany({ where: { userEmail: userEmail } });
  if (brand === "Manitou") {
    const modelData = await getDataByModelManitou(finance);
    const manOptions = await getLatestOptionsManitou(user.email);
    return json({
      ok: true,
      modelData,
      finance,
      deFees,
      manOptions,
      sliderWidth,
      user,
      financeNotes,
      dashBoardCustURL,
      getWishList,
      conversations,
      financeNewLead,
      latestNotes,
      notifications,
      refreshToken, tokens, request
    });
  }
  if (brand === "Switch") {
    const modelData = await getDataByModel(finance);
    const manOptions = await getLatestOptionsManitou(email);
    return json({
      ok: true,
      modelData,
      finance,
      deFees,
      manOptions,
      sliderWidth,
      user,
      financeNotes,
      getWishList,
      latestNotes,
      conversations,
      financeNewLead,
      notifications,
      dashBoardCustURL,
      refreshToken, tokens, request
    });
  }

  if (brand === "Kawasaki") {
    const modelData = await getDataKawasaki(finance);
    return json({
      ok: true,
      modelData,
      finance,
      deFees,
      sliderWidth,
      user,
      financeNotes,
      financeNewLead,
      latestNotes,
      conversations,
      getWishList,
      notifications,
      dashBoardCustURL,
      refreshToken, tokens, request
    });
  }

  if (brand === "BMW-Motorrad") {
    const financeId = finance?.id;
    const bmwMoto = await getLatestBMWOptions(financeId);
    const bmwMoto2 = await getLatestBMWOptions2(financeId);
    const modelData = await getDataBmwMoto(finance);
    return json({
      ok: true,
      modelData,
      finance,
      deFees,
      bmwMoto,
      latestNotes,
      bmwMoto2,
      sliderWidth,
      user,
      financeNotes,
      financeNewLead,
      conversations,
      getWishList,
      notifications,
      refreshToken, tokens,
      dashBoardCustURL,
      request
    });
  }

  if (brand === "Triumph") {
    const modelData = await getDataTriumph(finance);
    return json({
      ok: true,
      modelData,
      finance,
      deFees,
      sliderWidth,
      user,
      latestNotes,
      financeNotes,
      financeNewLead,
      getWishList,
      conversations,
      notifications,
      dashBoardCustURL,
      refreshToken, tokens, request
    });
  }

  if (brand === "Harley-Davidson") {
    const modelData = await getDataHarley(finance);
    // console.log(dashData)
    // console.log(getTemplates, 'getTemplates')

    return json({
      ok: true,
      modelData,
      financeData,
      finance,
      deFees,
      sliderWidth,
      user,
      financeNotes,
      latestNotes,
      dashBoardCustURL,
      getWishList,
      conversations,
      financeNewLead,
      notifications,
      getTemplates,
      refreshToken, tokens, request
    });
  } else {
    let modelData;
    if (finance !== null) {
      let modelData;
      modelData = await getDataByModel(finance);
      return json({
        ok: true,
        modelData,
        finance,
        deFees,
        sliderWidth,
        user,
        financeNotes,
        dashBoardCustURL,
        getTemplates,
        latestNotes,
        searchData,
        conversations,
        financeNewLead,
        getWishList,
        notifications,
        financeData,
        webLeadData,
        refreshToken, tokens, request

      });
    }
    return json({
      ok: true,
      modelData,
      finance,
      deFees,
      sliderWidth,
      user,
      financeNotes,
      dashBoardCustURL,
      latestNotes,
      getTemplates,
      conversations,
      searchData,
      financeNewLead,
      getWishList,
      notifications,
      webLeadData,
      financeData,
      refreshToken, tokens, request
    });
  }
}
export async function CompleteLastAppt(userId, financeId) {
  console.log('CompleteLastAppt')
  const lastApt = await prisma.clientApts.findFirst({
    where: { financeId: financeId },
    orderBy: {
      createdAt: 'desc',
    },
  })


  if (lastApt) {
    let apptId = lastApt?.id;
    const data = {
      completed: 'yes',
      userId: userId,
    }
    const finance = await prisma.clientApts.update({
      data: {
        ...data,
      },
      where: {
        id: apptId,
      },
    });
    return finance
  }
}
export async function TwoDays(followUpDay3, formData, financeId, user) {
  const lastContact = new Date().toISOString();
  let customerState = formData.customerState;
  if (customerState === "Pending") {
    customerState = "Attempted";
  }


  const followUpDay2 = parseInt(followUpDay3);
  console.log('followUpDay:', followUpDay2);  // Add this line

  function addDays(days) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
  }

  let newDate = addDays(followUpDay2);
  newDate = new Date(newDate).toISOString();
  console.log('financeId:', financeId);  // Add this line

  let clientAptsData = {
    title: formData.title,
    start: newDate,

    //end: formData.end,
    contactMethod: formData.contactMethod,
    completed: formData.completed,
    apptStatus: formData.apptStatus,
    apptType: formData.apptType,
    note: formData.note,
    unit: formData.unit,
    brand: formData.brand,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    financeId: formData.financeId,
    //description,
    userName: user?.name,
    messageTitle: 'Contacted by Instant Function',

    direction: 'Outgoing',
    resultOfcall: 'Attempted',
    userId,
  };
  const formPayload = formData
  const dashboardId = formData.dashboardId
  const nextAppointment = newDate
  const followUpDay = newDate
  const formData3 = { ...formData, nextAppointment, followUpDay, lastContact, customerState, dashboardId }
  const updating = await updateFinance23(financeId, formData, formPayload);
  const createFollowup = await createfinanceApt(user, clientAptsData, formData)
  const completeApt = await CompleteLastAppt(userId, financeId)
  //  console.log('hittind 2 days from noiw', formData, followUpDay, completeApt, createClientFinanceAptData)
  return json({ updating, completeApt, createFollowup });
}
export async function FollowUpApt(formData, user, userId) {
  const lastContact = new Date().toISOString();
  let customerState = formData.customerState;
  if (customerState === "Pending") {
    customerState = "Attempted";
  }

  let newDate = new Date(formData.followUpDay1).toISOString();

  let clientAptsData = {
    title: formData.title,
    start: newDate,

    //end: formData.end,
    contactMethod: formData.contactMethod,
    completed: formData.completed,
    apptStatus: formData.apptStatus,
    apptType: formData.apptType,
    note: formData.note,
    unit: formData.unit,
    brand: formData.brand,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    financeId: formData.financeId,
    //description,
    userName: user?.name,
    messageTitle: 'Contacted by Instant Function',

    direction: 'Outgoing',
    resultOfcall: 'Attempted',
    userId,
  };
  setTimeout(() => {
    if (selectedChannel) {

    }
  }, []);

  const nextAppointment = newDate
  const followUpDay = newDate
  const formData3 = { ...formData, nextAppointment, followUpDay, lastContact, customerState, dashboardId }
  const updating = await updateFinance23(financeId, formData3, formPayload);


  const createFollowup = await createfinanceApt(financeId, clientAptsData)


  const completeApt = await CompleteLastAppt(userId, financeId)
  //  console.log('hittind 2 days from noiw', formData, followUpDay, completeApt, createClientFinanceAptData)
  return json({ updating, completeApt, createFollowup });
}
export async function ComsCount(financeId, commType) {
  const record = await prisma.communications.findUnique({
    where: { financeId: financeId },
  });
  if (record) {
    await prisma.communications.update({
      where: { financeId: financeId },
      data: { [commType]: record[commType] + 1 },
    });
  } else {
    await prisma.communications.create({
      data: { financeId: financeId, [commType]: 1 },
    });
  }
  return json({ ok: true });
}
export async function ConvertDynamic(finance) {
  function replaceTemplateValues(template, values) {
    let result = template;
    for (const key in values) {
      result = result.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), values[key]);
    }
    return result;
  }

  const values = {
    clientFname: finance.firstName,
    clientLname: finance.lastName,
    clientEmail: finance.email,
    clientFullName: finance.firstName + ' ' + finance.lastName,
    clientPhone: finance.phone,
    clientAddress: finance.address,
    clientCity: finance.city,
    clientState: finance.state,
    clientPostalCode: finance.postalCode,
    year: finance.year,
    make: finance.make,
    model: finance.model,
    vin: finance.vin,
    stockNumber: finance.stockNumber,
    price: finance.price,
    tradeYear: finance.tradeYear,
    tradeMake: finance.tradeMake,
    tradeModel: finance.tradeModel,
    tradeVin: finance.tradeVin,
    tradeColor: finance.tradeColor,
    tradeValue: finance.tradeValue,
    tradeMileage: finance.tradeMileage,
  }
  const template = `Hello ${clientFname}, your ${model} has been shipped.`;

  const emailBody = replaceTemplateValues(template, values);
  return emailBody
}
export async function TokenRegen(request) {
  const session = await getSession(request.headers.get("Cookie"));
  const email = session.get("email")
  const user = await model.user.query.getForSession({ email: email });
  if (!user) { redirect('/login') }
  const API_KEY = 'AIzaSyCsE7VwbVNO4Yw6PxvAfx8YPuKSpY9mFGo'
  let tokens = session.get("accessToken")
  // new
  const refreshToken = session.get("refreshToken")
  let cookie = createCookie("session_66", {
    secrets: ['secret'],
    // 30 days
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  const userRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/${user.email}/profile`, {
    headers: { Authorization: 'Bearer ' + tokens, Accept: 'application/json' }
  });
  // new
  if (userRes.status === 401) {
    const unauthorizedAccess = await Unauthorized(refreshToken)
    tokens = unauthorizedAccess

    session.set("accessToken", tokens);
    await commitSession(session);

    const cookies = cookie.serialize({
      email: email,
      refreshToken: refreshToken,
      accessToken: tokens,
    })
    await cookies

  } else {
    console.log('Authorized')
  }
  const googleTokens = {
    tokens,
    refreshToken
  }
  return googleTokens
}


export const dashboardAction: ActionFunction = async ({ request, }) => {
  const formPayload = Object.fromEntries(await request.formData())
  const formData = financeFormSchema.parse(formPayload);
  const session2 = await getSession(request.headers.get("Cookie"));
  const email = session2.get("email")
  // console.log(formData)
  const user = await model.user.query.getForSession({ email: email });
  /// console.log(user, account, 'wquiote loadert')
  if (!user) {
    redirect('/login')
  }
  const userId = user?.id;
  const intent = formPayload.intent;

  if (intent === 'addWishList') {
    const addtoWishList = await prisma.wishList.create({
      data: {
        userId: formData.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        model: formData.model,
        model2: formData.model2,
        notes: formData.notes,
      }
    })
    return addtoWishList
  }
  if (intent === "createEmailTemplate") {
    const template = await prisma.emailTemplates.create({
      data: {
        name: 'Copied from dashboard',
        body: formData.body,
        title: formData.title,
        subject: formData.subject,
        category: 'To update',
        userEmail: user.email,
        dept: 'sales',
        type: 'Text / Email',
      },
    });
    return template;
  }
  if (intent === 'editWishList') {
    const addtoWishList = await prisma.wishList.update({
      where: {
        id: formData.rowId,
      },
      data: {
        userId: formData.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        model: formData.model,
        model2: formData.model2,
        notes: formData.notes,
      }
    })
    return addtoWishList
  }
  if (intent === 'deleteWishList') {
    const deleteWishList = await prisma.wishList.delete({
      where: {
        id: formData.rowId,
      },
    })
    return deleteWishList
  }
  if (intent === 'claimTurnover') {

    const update = await prisma.lockFinanceTerminals.update({
      where: {
        id: 1,
      },
      data: {
        locked: false, // or the value you need
        //financeId: formData.financeId,
      },
    });
    return update
  }
  if (intent === 'financeTurnover') {
    const locked = Boolean(true)//Boolean(formPayload.locked);

    const claim = await prisma.lockFinanceTerminals.update({
      where: { id: 1 },
      data: { locked: locked, financeId: formData.financeId }
    })
    const finance = await prisma.finance.update({
      where: { id: formData.financeId },
      data: { financeManager: formData.financeManager }
    })
    return json({ claim, finance })
  }
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
  if (intent === "AddCustomer") {
    console.log('less than 20')
    const brand = formData.brand
    delete formData.financeId
    delete formData.userId
    delete formData.followUpDay

    let { financeId, clientData, dashData, financeData } = DataForm(formData);
    clientData = {
      ...clientData,
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: formData.firstName + ' ' + formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      dl: formData.dl,
      userEmail: user.email,
    }
    const userId = formData.userId
    if (formData.brand === 'Used') {
      const email = formData.email
      const createQuoteServer = await QuoteServer(clientData, financeId, email, financeData, dashData)
      //   console.log('Created createQuoteServer:', createQuoteServer)
      const createActivixLead = await CreateLead(formData, user)
      return json({ createQuoteServer, createActivixLead })
    }
    if (formData.brand === 'Switch') {
      const email = formData.email
      const createQuoteServer = await QuoteServer(clientData, financeId, email, financeData, dashData)
      const manitouOptionsCreated = await createFinanceManitou(formData)
      const createActivixLead = await CreateLead(formData, user)
      return json({ manitouOptionsCreated, createQuoteServer, createActivixLead })
    }
    if (formData.brand === 'Manitou') {
      const email = formData.email
      const createQuoteServer = await QuoteServer(clientData, financeId, email, financeData, dashData)
      const manitouOptionsCreated = await createFinanceManitou(formData)
      const createActivixLead = await CreateLead(formData, user)
      return json({ manitouOptionsCreated, createQuoteServer, createActivixLead })
    }
    if (formData.brand === 'BMW-Motorrad') {
      const financeId = finance.id
      const email = formData.email
      const createQuoteServer = await QuoteServer(clientData, financeId, email, financeData, dashData)
      const updatingFinance = await createBMWOptions(financeId)
      const updatingFinance2 = await createBMWOptions2(financeId)
      const createActivixLead = await CreateLead(formData, user)
      return json({ updatingFinance, updatingFinance2, createQuoteServer, createActivixLead })
    }
    else {
      const email = formData.email
      const createQuoteServer = await QuoteServer(clientData, financeId, email, financeData, dashData)
      const createActivixLead = await CreateLead(formData, user, createQuoteServer)
      // console.log('Created createQuoteServer:', createQuoteServer)
      return json({ createQuoteServer, createActivixLead })
    }
  }
  const template = formPayload.template;
  const today = new Date();
  let followUpDay = today;
  const clientfileId = formData.clientfileId;
  const date = new Date().toISOString()
  const financeId = formData?.financeId;
  const dashboard = await prisma.dashboard.findUnique({ where: { financeId: financeId, }, });
  const dashboardId = dashboard?.id;
  console.log(financeId, 'finance id from dashboard calls')
  const session66 = await sixSession(request.headers.get("Cookie"));
  session66.set("financeId", financeId);
  session66.set("clientfileId", clientfileId);
  const serializedSession = await sixCommit(session66);
  const accessToken = env.API_ACTIVIX;
  if (intent === 'syncActiData') {
    const syncLeads = await SyncLeadData(formData, user)
    console.log('hit syn leads')
    console.log(syncLeads)
    return syncLeads
  }
  let pickUpDate;
  if (pickUpDate === null || pickUpDate === undefined) {
    pickUpDate = "To Be Det.";
  }
  const id = formData?.id;
  // activix done need toa add create vehichle
  if (intent === 'newLead') {
    console.log('less than 20')
    const brand = formData.brand
    delete formData.financeId
    delete formData.userId
    delete formData.followUpDay
    let { financeId, clientData, dashData, financeData } = DataForm(formData);
    clientData = {
      ...clientData,
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: formData.firstName + ' ' + formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      dl: formData.dl,
      userEmail: formData.userEmail,
    }
    const userId = formData.userId
    const createActivixLead = await CreateLead(formData)
    if (formData.brand === 'Used') {
      const email = formData.email
      const createQuoteServer = await QuoteServer(clientData, financeId, email, financeData, dashData)
      //   console.log('Created createQuoteServer:', createQuoteServer)
      return json({ createQuoteServer })
    }
    if (formData.brand === 'Switch') {
      const email = formData.email
      const createQuoteServer = await QuoteServer(clientData, financeId, email, financeData, dashData)

      const manitouOptionsCreated = await createFinanceManitou(formData)
      return json({ manitouOptionsCreated, createQuoteServer })
    }
    if (formData.brand === 'Manitou') {
      const email = formData.email
      const createQuoteServer = await QuoteServer(clientData, financeId, email, financeData, dashData)
      const manitouOptionsCreated = await createFinanceManitou(formData)
      return json({ manitouOptionsCreated, createQuoteServer })
    }
    if (formData.brand === 'BMW-Motorrad') {
      const financeId = finance.id
      const email = formData.email
      const createQuoteServer = await QuoteServer(clientData, financeId, email, financeData, dashData)
      const updatingFinance = await createBMWOptions(financeId)
      const updatingFinance2 = await createBMWOptions2(financeId)
      return json({ updatingFinance, updatingFinance2, createQuoteServer })
    }
    else {
      const email = formData.email
      const createQuoteServer = await QuoteServer(clientData, financeId, email, financeData, dashData)
      // console.log('Created createQuoteServer:', createQuoteServer)
      return json({ createQuoteServer, createActivixLead })
    }
  }
  // calls
  // activix done
  if (intent === "EmailClient") {
    const comdata = {
      financeId: formData.financeId,
      userEmail: user?.email,
      content: formData.customContent,
      title: formData.subject,
      direction: formData.direction,
      result: formData.customerState,
      subject: formData.subject,
      type: 'Email',
      userName: user?.name,
      date: new Date().toISOString(),
    }
    const to = formData.customerEmail
    const text = formData.customContent
    const subject = formData.subject
    const tokens = formData.tokens
    // const completeApt = await CompleteLastAppt(userId, financeId)
    const sendEmail = await SendEmail(user, to, subject, text, tokens)
    const setComs = await prisma.communicationsOverview.create({ data: comdata, });
    const saveComms = await ComsCount(financeId, 'Email')
    console.log('refreshToken',)
    const updated = {
      ...formData,
      contactMethod: 'email',
    }
    const createEmailActivix = await CreateCommunications(updated)
    return json({ sendEmail, saveComms, formData, setComs, createEmailActivix })//, redirect(`/dummyroute`)
  }
  // activix done
  if (intent === 'callClient') {
    const accountSid = 'AC9b5b398f427c9c925f18f3f1e204a8e2'
    const authToken = 'd38e2fd884be4196d0f6feb0b970f63f'
    const client = require('twilio')(accountSid, authToken);
    const comdata = {
      financeId: formData.financeId,
      userEmail: user?.email,
      content: formData.customContent,
      title: formData.subject,
      direction: formData.direction,
      result: formData.customerState,
      subject: formData.subject,
      type: 'Phone',
      userName: user?.name,
      date: new Date().toISOString(),
    }
    const to = formData.customerEmail
    const text = formData.customContent
    const subject = formData.subject
    const tokens = formData.tokens
    // const completeApt = await CompleteLastAppt(userId, financeId)
    const callCLient = await client.calls
      .create({
        twiml: '<Response><Say>Ahoy, World!</Say></Response>',
        to: `+1${user.phone}`,
        from: '+12176347250'
      })
      .then(call => console.log(call.sid));
    const setComs = await prisma.communicationsOverview.create({ data: comdata, });
    const saveComms = await ComsCount(financeId, 'Email')
    console.log('refreshToken',)
    const updated = {
      ...formData,
      contactMethod: 'phone',
    }
    const createEmailActivix = await CreateCommunications(updated)
    return json({ callCLient, saveComms, formData, setComs, createEmailActivix })//, redirect(`/dummyroute`)
  }
  // activix done
  if (intent === 'textQuickFU') {
    console.log('hit textquick fu')
    const followUpDay3 = formData.followUpDay
    const completeApt = await CompleteLastAppt(userId, financeId)
    const doTGwoDays = await TwoDays(followUpDay3, formData, financeId, user)
    // const setComs = await CreateCommunications(comdata)
    const comdata = {
      financeId: formData.financeId,
      userId: formData.userId,
      content: formData.note,
      title: formData.title,
      direction: formData.direction,
      result: formData.resultOfcall,
      subject: formData.messageContent,
      type: 'Text',
      userName: user?.name,
      date: new Date().toISOString(),
    }
    const setComs = await prisma.communicationsOverview.create({
      data: comdata,
    });
    const saveComms = await ComsCount(financeId, 'SMS')
    const updated = {
      ...formData,
      contactMethod: 'SMS',
    }
    const createEmailActivix = await CreateCommunications(updated)
    return json({ doTGwoDays, completeApt, setComs, saveComms, createEmailActivix });
  }
  // activix done
  if (intent === "2DaysFromNow") {
    const lastContact = new Date().toISOString();
    let customerState = formData.customerState;
    if (customerState === "Pending") {
      customerState = "Attempted";
    }
    const followUpDay2 = parseInt(formData.followUpDay1);
    console.log('followUpDay:', followUpDay2);  // Add this line

    function addDays(days) {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + days);
      return currentDate;
    }

    const complete = await CompleteLastAppt(userId, financeId)

    const completeApt = await CompleteLastAppt(userId, financeId)

    let newDate = addDays(followUpDay2);
    newDate = new Date(newDate).toISOString();
    //  console.log('financeId:', financeId);  // Add this line

    let clientAptsData = {
      title: formData.title,
      start: newDate,

      //end: formData.end,
      userId: user?.id,
      contactMethod: formData.contactMethod,
      completed: 'no',
      apptStatus: formData.apptStatus,
      apptType: formData.apptType,
      note: formData.note,
      unit: formData.unit,
      brand: formData.brand,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      //  financeId: formData.financeId,
      //description,
      userName: user?.name,
      messageTitle: 'Contacted by Instant Function',

      // direction: 'Outgoing',
      resultOfcall: 'Attempted',

    };

    const nextAppointment = newDate
    const followUpDay = newDate
    const formData3 = { ...formData, nextAppointment, followUpDay, lastContact, customerState, dashboardId }
    const updating = await updateFinance23(financeId, formData3, formPayload);
    const comdata = {
      financeId: formData.financeId,
      userId: formData.userId,
      content: formData.note,
      title: formData.title,
      direction: formData.direction,
      result: formData.resultOfcall,
      subject: formData.messageContent,
      type: 'Text',
      userName: user?.name,
      date: new Date().toISOString(),
    }
    const setComs = await prisma.communicationsOverview.create({
      data: comdata,
    });


    const createFollowup = await prisma.clientApts.create({
      data: {
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        lastName: formData.lastName,
        firstName: formData.firstName,
        brand: formData.brand,
        unit: formData.unit,
        note: formData.note,
        apptType: formData.apptType,
        apptStatus: formData.apptStatus,
        completed: 'no',
        contactMethod: formData.contactMethod,
        end: formData.end,
        title: formData.title,
        start: newDate,
        userId: user?.id,
        description: formData.description,
        resourceId: Number(formData.resourceId),
        userName: user?.name,
        financeId: formData.financeId,
      }
    })

    const createTaskActivix = await CreateTask(formData)

    //  console.log('hittind 2 days from noiw', formData, followUpDay, completeApt, createClientFinanceAptData)
    return json({ complete, updating, completeApt, createFollowup, setComs, createTaskActivix });
  }
  // activix done
  if (intent === "completeApt") {
    console.log('completeApt')
    const complete = CompleteLastAppt(userId, financeId)
    const addFU = formData.addFU
    const addDetailedFU = formData.addDetailedFU
    const completeActivix = await CompleteTask(formData)
    if (addFU === 'on') {
      const followUpDay3 = formData.followUpDay
      const twoDays = await TwoDays(followUpDay3, formData, financeId, user)
      return json({ complete, twoDays, completeActivix })
    }
    if (addDetailedFU === 'yes') {
      const followup = await FollowUpApt(formData, user, userId)
      return json({ complete, followup, completeActivix })
    }

  }
  // activix done
  if (intent === "scheduleFUp") {
    const lastContact = new Date().toISOString();
    let customerState = formData.customerState;
    if (customerState === "Pending") {
      customerState = "Attempted";
    }
    let dateModal = new Date(formData.dateModal);
    const timeOfDayModal = formData.timeOfDayModal;
    const [hours, minutes] = timeOfDayModal.split(':').map(Number);
    dateModal.setHours(hours, minutes);
    const year = dateModal.getFullYear();
    const month = String(dateModal.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed in JavaScript
    const day = String(dateModal.getDate()).padStart(2, '0');
    const hour = String(dateModal.getHours()).padStart(2, '0');
    const minute = String(dateModal.getMinutes()).padStart(2, '0');
    const dateTimeString = `${year}-${month}-${day}T${hour}:${minute}:00.000`;
    console.log(dateTimeString, 'datemodal');

    let clientAptsData = {
      title: formData.title,
      start: dateTimeString,
      //end: formData.end,
      contactMethod: formData.contactMethod,
      completed: formData.completed,
      apptStatus: formData.apptStatus,
      apptType: formData.apptType,
      note: formData.note,
      unit: formData.unit,
      brand: formData.brand,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      resourceId: formData.resourceId,
      //  financeId: formData.financeId,
      //description,
      userName: user?.name,
      //  direction: 'Outgoing',
      resultOfcall: 'Attempted',
      userId,
    };
    const completeApt = await CompleteLastAppt(userId, financeId)

    const nextAppointment = dateTimeString
    const followUpDay = dateTimeString
    const formData3 = { ...formData, nextAppointment, followUpDay, lastContact, customerState, dashboardId }
    const updating = await updateFinance23(financeId, formData3, formPayload);

    const createFollowup = await prisma.clientApts.create({
      data: {
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        lastName: formData.lastName,
        firstName: formData.firstName,
        brand: formData.brand,
        unit: formData.unit,
        note: formData.note,
        apptType: formData.apptType,
        apptStatus: formData.apptStatus,
        completed: 'no',
        contactMethod: formData.contactMethod,
        end: formData.end,
        title: formData.title,
        start: dateTimeString,
        userId: user?.id,
        description: formData.description,
        resourceId: Number(formData.resourceId),
        userName: user?.name,
        financeId: formData.financeId,
      }
    })
    const comdata = {
      financeId: formData.financeId,
      userId: formData.userId,
      content: formData.note,
      title: formData.title,
      direction: formData.direction,
      result: formData.resultOfcall,
      subject: formData.messageContent,
      type: 'Text',
      userName: user?.name,
      date: new Date().toISOString(),
    }
    const setComs = await prisma.communicationsOverview.create({
      data: comdata,
    });
    const activixTask = await CreateTask(formData)
    //  console.log('hittind 2 days from noiw', formData, followUpDay, completeApt, createClientFinanceAptData)
    return json({ updating, completeApt, createFollowup, setComs, activixTask });
  }
  // activix done
  // need to add updae vehcile
  if (intent === "updateFinance") {
    let brand = formPayload.brand
    let lastContact = new Date().toISOString()
    console.log(financeId, 'finaceCheckId')
    const financeData = {

      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      name: formData.name,
      address: formData.address,
      city: formData.city,
      postal: formData.postal,
      province: formData.province,
      dl: formData.dl,
      typeOfContact: formData.typeOfContact,
      timeToContact: formData.timeToContact,
      iRate: formData.iRate,
      months: formData.months,
      discount: formData.discount,
      total: formData.total,
      onTax: formData.onTax,
      on60: formData.on60,
      biweekly: formData.biweekly,
      weekly: formData.weekly,
      weeklyOth: formData.weeklyOth,
      biweekOth: formData.biweekOth,
      oth60: formData.oth60,
      weeklyqc: formData.weeklyqc,
      biweeklyqc: formData.biweeklyqc,
      qc60: formData.qc60,
      deposit: formData.deposit,
      biweeklNatWOptions: formData.biweeklNatWOptions,
      weeklylNatWOptions: formData.weeklylNatWOptions,
      nat60WOptions: formData.nat60WOptions,
      weeklyOthWOptions: formData.weeklyOthWOptions,
      biweekOthWOptions: formData.biweekOthWOptions,
      oth60WOptions: formData.oth60WOptions,
      biweeklNat: formData.biweeklNat,
      weeklylNat: formData.weeklylNat,
      nat60: formData.nat60,
      qcTax: formData.qcTax,
      otherTax: formData.otherTax,
      totalWithOptions: formData.totalWithOptions,
      otherTaxWithOptions: formData.otherTaxWithOptions,
      desiredPayments: formData.desiredPayments,
      freight: formData.freight,
      admin: formData.admin,
      commodity: formData.commodity,
      pdi: formData.pdi,
      discountPer: formData.discountPer,
      userLoanProt: formData.userLoanProt,
      userTireandRim: formData.userTireandRim,
      userGap: formData.userGap,
      userExtWarr: formData.userExtWarr,
      userServicespkg: formData.userServicespkg,
      deliveryCharge: formData.deliveryCharge,
      vinE: formData.vinE,
      lifeDisability: formData.lifeDisability,
      rustProofing: formData.rustProofing,
      userOther: formData.userOther,
      paintPrem: formData.paintPrem,
      licensing: formData.licensing,
      stockNum: formData.stockNum,
      options: formData.options,
      accessories: formData.accessories,
      labour: formData.labour,
      year: formData.year,
      brand: formData.brand,
      model: formData.model,
      model1: formData.model1,
      color: formData.color,
      modelCode: formData.modelCode,
      msrp: formData.msrp,
      userEmail: formData.userEmail,
      tradeValue: formData.tradeValue,
      tradeDesc: formData.tradeDesc,
      tradeColor: formData.tradeColor,
      tradeYear: formData.tradeYear,
      tradeMake: formData.tradeMake,
      tradeVin: formData.tradeVin,
      tradeTrim: formData.tradeTrim,
      tradeMileage: formData.tradeMileage,
      bikeStatus: formData.bikeStatus,
      trim: formData.trim,
      vin: formData.vin,
      lien: formData.lien,
    }
    const dashData = {
      userEmail: formData.userEmail,
      referral: formData.referral,
      visited: formData.visited,
      bookedApt: formData.bookedApt,
      aptShowed: formData.aptShowed,
      aptNoShowed: formData.aptNoShowed,
      testDrive: formData.testDrive,
      metService: formData.metService,
      metManager: formData.metManager,
      metParts: formData.metParts,
      sold: formData.sold,
      depositMade: formData.depositMade,
      refund: formData.refund,
      turnOver: formData.turnOver,
      financeApp: formData.financeApp,
      approved: formData.approved,
      signed: formData.signed,
      pickUpSet: formData.pickUpSet,
      demoed: formData.demoed,
      delivered: formData.delivered,
      lastContact: lastContact,
      status: formData.status,
      customerState: customerState,
      result: formData.result,
      timesContacted: formData.timesContacted,
      nextAppointment: formData.nextAppointment,
      completeCall: formData.completeCall,
      followUpDay: formData.followUpDay,
      state: formData.state,
      deliveredDate: formData.deliveredDate,
      notes: formData.notes,
      visits: formData.visits,
      progress: formData.progress,
      metSalesperson: formData.metSalesperson,
      metFinance: formData.metFinance,
      financeApplication: formData.financeApplication,
      pickUpDate: pickUpDate,
      pickUpTime: formData.pickUpTime,
      depositTakenDate: formData.depositTakenDate,
      docsSigned: formData.docsSigned,
      tradeRepairs: formData.tradeRepairs,
      seenTrade: formData.seenTrade,
      lastNote: formData.lastNote,
      dLCopy: formData.dLCopy,
      insCopy: formData.insCopy,
      testDrForm: formData.testDrForm,
      voidChq: formData.voidChq,
      loanOther: formData.loanOther,
      signBill: formData.signBill,
      ucda: formData.ucda,
      tradeInsp: formData.tradeInsp,
      customerWS: formData.customerWS,
      otherDocs: formData.otherDocs,
      urgentFinanceNote: formData.urgentFinanceNote,
      funded: formData.funded,
      countsInPerson: formData.countsInPerson,
      countsPhone: formData.countsPhone,
      countsSMS: formData.countsSMS,
      countsOther: formData.countsOther,
      countsEmail: formData.countsEmail,
    }
    const fullName = user.username;
    const words = fullName.split(' ');
    const firstName = words[0];
    const lastName = words[1];
    const UpdateLead = await axios.put(`https://api.crm.activix.ca/v2/leads/${formData.activixId}`,
      {
        "first_name": formData.firstName,
        "last_name": formData.lastName,
        "type": "email",
        "advisor": {
          "first_name": firstName,
          "last_name": lastName
        },
        "emails": [
          {
            "type": "home",
            "address": formData.email,
          }
        ],
        "phones": [
          {
            "number": `+1${formData.phone}`,
            "type": "mobile"
          }
        ],
        "vehicles": [
          {
            "make": formData.brand,
            "model": formData.model,
            "year": formData.year,
            "color_exterior": formData.color,
            "vin": formData.vin,
            "price": formData.msrp,

            "type": "wanted"
          },
          {
            "make": formData.tradeMake,
            "model": formData.tradeDesc,
            "year": formData.tradeYear,
            "vin": formData.tradeVin,
            "color_exterior": formData.tradeColor,
            "mileage": formData.tradeMileage,
            "type": "exchange"
          }
        ]
      }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    }
    ).then(response => {
      console.log(response.data);
      const data = response.data
      async function CreateActvix() {
        const financeData = await prisma.finance.update({
          where: { id: data.financeId, },
          data: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            name: data.name,
            address: data.address,
            city: data.city,
            postal: data.postal,
            province: data.province,
            dl: data.dl,
            typeOfContact: data.typeOfContact,
            timeToContact: data.timeToContact,
            iRate: data.iRate,
            months: data.months,
            discount: data.discount,
            total: data.total,
            onTax: data.onTax,
            on60: data.on60,
            biweekly: data.biweekly,
            weekly: data.weekly,
            weeklyOth: data.weeklyOth,
            biweekOth: data.biweekOth,
            oth60: data.oth60,
            weeklyqc: data.weeklyqc,
            biweeklyqc: data.biweeklyqc,
            qc60: data.qc60,
            deposit: data.deposit,
            biweeklNatWOptions: data.biweeklNatWOptions,
            weeklylNatWOptions: data.weeklylNatWOptions,
            nat60WOptions: data.nat60WOptions,
            weeklyOthWOptions: data.weeklyOthWOptions,
            biweekOthWOptions: data.biweekOthWOptions,
            oth60WOptions: data.oth60WOptions,
            biweeklNat: data.biweeklNat,
            weeklylNat: data.weeklylNat,
            nat60: data.nat60,
            qcTax: data.qcTax,
            otherTax: data.otherTax,
            totalWithOptions: data.totalWithOptions,
            otherTaxWithOptions: data.otherTaxWithOptions,
            desiredPayments: data.desiredPayments,
            freight: data.freight,
            admin: data.admin,
            commodity: data.commodity,
            pdi: data.pdi,
            discountPer: data.discountPer,
            userLoanProt: data.userLoanProt,
            userTireandRim: data.userTireandRim,
            userGap: data.userGap,
            userExtWarr: data.userExtWarr,
            userServicespkg: data.userServicespkg,
            deliveryCharge: data.deliveryCharge,
            vinE: data.vinE,
            lifeDisability: data.lifeDisability,
            rustProofing: data.rustProofing,
            userOther: data.userOther,
            paintPrem: data.paintPrem,
            licensing: data.licensing,
            stockNum: data.stockNum,
            options: data.options,
            accessories: data.accessories,
            labour: data.labour,
            year: data.year,
            brand: data.brand,
            model: data.model,
            model1: data.model1,
            color: data.color,
            modelCode: data.modelCode,
            msrp: data.msrp,
            userEmail: data.userEmail,
            tradeValue: data.tradeValue,
            tradeDesc: data.tradeDesc,
            tradeColor: data.tradeColor,
            tradeYear: data.tradeYear,
            tradeMake: data.tradeMake,
            tradeVin: data.tradeVin,
            tradeTrim: data.tradeTrim,
            tradeMileage: data.tradeMileage,
            trim: data.trim,
            vin: data.vin,
          }
        })
        const dashboardData = await prisma.dashboard.update({
          where: { id: data.financeId, },
          data: {
            userEmail: data.userEmail,
            referral: data.referral,
            visited: data.visited,
            bookedApt: data.bookedApt,
            aptShowed: data.aptShowed,
            aptNoShowed: data.aptNoShowed,
            testDrive: data.testDrive,
            metService: data.metService,
            metManager: data.metManager,
            metParts: data.metParts,
            sold: data.sold,
            depositMade: data.depositMade,
            refund: data.refund,
            turnOver: data.turnOver,
            financeApp: data.financeApp,
            approved: data.approved,
            signed: data.signed,
            pickUpSet: data.pickUpSet,
            demoed: data.demoed,
            delivered: data.delivered,
            status: 'Active',
            customerState: 'Attempted',
            result: data.result,
            timesContacted: data.timesContacted,
            nextAppointment: data.nextAppointment,
            completeCall: data.completeCall,
            followUpDay: data.followUpDay,
            state: data.state,
            deliveredDate: data.deliveredDate,
            notes: data.notes,
            visits: data.visits,
            progress: data.progress,
            metSalesperson: data.metSalesperson,
            metFinance: data.metFinance,
            financeApplication: data.financeApplication,
            pickUpDate: pickUpDate,
            pickUpTime: data.pickUpTime,
            depositTakenDate: data.depositTakenDate,
            docsSigned: data.docsSigned,
            tradeRepairs: data.tradeRepairs,
            seenTrade: data.seenTrade,
            lastNote: data.lastNote,
            dLCopy: data.dLCopy,
            insCopy: data.insCopy,
            testDrForm: data.testDrForm,
            voidChq: data.voidChq,
            loanOther: data.loanOther,
            signBill: data.signBill,
            ucda: data.ucda,
            tradeInsp: data.tradeInsp,
            customerWS: data.customerWS,
            otherDocs: data.otherDocs,
            urgentFinanceNote: data.urgentFinanceNote,
            funded: data.funded,
            countsInPerson: data.countsInPerson,
            countsPhone: data.countsPhone,
            countsSMS: data.countsSMS,
            countsOther: data.countsOther,
            countsEmail: data.countsEmail,
          }
        })
        const activixData = await prisma.activixLead.update({
          where: { id: data.financeId, },
          data: {
            id: data.id,
            account_id: data.account_id,
            customer_id: data.customer_id,
            appointment_date: data.appointment_date,
            phone_appointment_date: data.phone_appointment_date,
            available_date: data.available_date,
            be_back_date: data.be_back_date,
            call_date: data.call_date,
            created_at: data.created_at,
            csi_date: data.csi_date,
            delivered_date: data.delivered_date,
            deliverable_date: data.deliverable_date,
            delivery_date: data.delivery_date,
            paperwork_date: data.paperwork_date,
            presented_date: data.presented_date,
            promised_date: data.promised_datere,
            financed_date: data.financed_date,
            road_test_date: data.road_test_date,
            home_road_test_date: data.home_road_test_date,
            sale_date: data.sale_date,
            updated_at: data.updated_at,
            address_line1: data.address,
            city: data.city,
            civility: data.civility,
            country: data.country,
            credit_approved: data.credit_approved,
            dealer_tour: data.dealer_tour,
            financial_institution: data.financial_institution,
            first_name: data.firstName,
            funded: data.funded,
            inspected: data.inspected,
            last_name: data.lastName,
            postal_code: data.postal,
            province: data.province,
            result: data.result,
            status: data.status,
            type: data.type,
            walk_around: data.walk_around,
            comment: data.comment,
            delivered_by: data.delivered_by,
            emails: data.email,
            phones: data.phone,
            financeId: data.financeId,
            userEmail: data.userEmail,

            /**home_presented_date: data.home_presented_date,
             birth_date: data.birth_date,
             source_id: data.source_id,
             Integer: data.Integer,
             provider_id: data.provider_id,
             unsubscribe_all_date: data.unsubscribe_all_date,
             unsubscribe_call_date: data.unsubscribe_call_date,
             unsubscribe_email_date: data.unsubscribe_email_date,
             unsubscribe_sms_date: data.unsubscribe_sms_date,
             advisor: data.advisor,
             take_over_date: data.take_over_date,
             search_term: data.search_term,
             gender: data.gender,
             form: data.form,
             division: data.division,
             created_method: data.created_method,
             campaign: data.campaign,
             address_line2: data.address_line2,
             business: data.business,
             business_name: data.business_name,
             second_contact: data.second_contact,
             second_contact_civility: data.second_contact_civility,
             segment: data.segment,
             source: data.source,
             qualification: data.qualification,
             rating: data.rating,
             referrer: data.referrer,
             provider: data.provider,
             progress_state: data.progress_state,
             locale: data.locale,
             navigation_history: data.navigation_history,
             keyword: data.keyword,*/
          }
        })
        return json({ financeData, dashboardData, activixData })
      }
      CreateActvix()

    })
      .catch(error => {
        console.error('Full error object:', error);
        console.error(`Activix Error: ${error.response.status} - ${error.response.data}`);
        console.error(`Error status: ${error.response.status}`);
        console.error('Error response:', error.response.data);
      });

    return UpdateLead

  }
  // create
  if (intent === "createQuote") {
    console.log("creating quote");
    const brand = formData.brand;
    const financeId = formData.id;
    return redirect(`/quote/${brand}/${financeId}`);
  }
  // update
  if (intent === "updateStatus") {
    delete formData.brand;
    //console.log(formData)
    await UpdateStatus(formData);
    return UpdateStatus;
  }
  // navigation
  if (intent === "clientProfile") {

    console.log(clientfileId, financeId, 'dashboard calls')
    return redirect(`/customer/${clientfileId}/${financeId}`, {
      headers: {
        "Set-Cookie": serializedSession,
      },
    });
  }

  if (intent === "returnToQuote") {
    const brand = formData.brand;
    const id = formData.id;
    //   console.log(id, 'id', `/overview/${brand}/${id}`)
    return redirect(`/overview/customer/${financeId}`);
  }
  // appts
  // done
  if (intent === "addAppt") {
    const createApp = await CreateAppt(formData);
    const createTask = await CreateTask(formData);
    const completeCall = CompleteLastAppt(userId, financeId);
    return json({ createApp, createTask });
  }
  if (intent === "deleteApt") {
    const newFormData = { ...formData };
    delete newFormData.intent;
    const deleteNote = await deleteFinanceAppts(newFormData);
    return json({ deleteNote });
  }
  if (intent === "updateFinanceAppt") {
    const apptId = formData.id;
    const updateApt = await UpdateAppt(formData, apptId);
    return json({ updateApt });
  }
  // customer
  // done

  if (intent === "deleteCustomer") {
    await DeleteCustomer({ formData, formPayload });
    return DeleteCustomer;
  }
  // notes
  if (intent === "saveFinanceNote") {
    await updateFinanceNotes({ formData });
    return updateFinanceNotes;
  }
  if (intent === "createFinanceNote") {
    await createFinanceNotes({ formData });
    return createFinanceNotes;
  }
  if (intent === "updateFinanceNote") {
    const updateNote = await updateFinanceNote(financeId, formData);
    return json({ updateNote });
  }
  if (intent === "deleteFinanceNote") {
    const deleteNote = await deleteFinanceNote(id);
    return json({ deleteNote });
  }
  return null;
};
