import type { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import ActivixTest from '~/utils/activix';
import { getMergedFinance } from "~/utils/dashloader/dashloader.server";
import { model } from "~/models";
import { getSession, } from '~/sessions/auth-session.server';
import { prisma } from '~/libs';
import { env } from 'process';
import axios from 'axios';

export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
  const session2 = await getSession(request.headers.get("Cookie"));
  const email = session2.get("email")

  const user = await model.user.query.getForSession({ email: email });
  /// console.log(user, account, 'wquiote loadert')
  if (!user) {
    redirect('/login')
  }


  const extraHeaders = {

  }
  const endpoint = 'leads'

  const accessToken = env.API_ACTIVIX;
  const response = await axios.get(`https://api.crm.activix.ca/v2/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  }
  )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Full error object:', error);
      console.error(`Activix Error: ${error.response.status} - ${error.response.data}`);
      console.error(`Error status: ${error.response.status}`);
      console.error('Error response:', error.response.data);
    });


  return response

}

export async function SyncEvents() {
  const activixDataList = await ActivixTest('leads', 'get', { 'custom-header': '' });

}
export async function SyncLeadData() {
  const accessToken = env.API_ACTIVIX;

  const activixDataList = await ActivixTest('leads', 'get', { 'custom-header': '' });


  if (activixDataList && activixDataList.data) {
    const processedDataList = activixDataList.data.map(async (activixData) => {
      const firstCheck = await prisma.activixLead.findUnique({ where: { id: activixData.id } })
      if (!firstCheck) {
        let clientfile = await prisma.clientfile.findUnique({ where: { email: activixData.emails[0] } })
        if (!clientfile) {
          clientfile = await prisma.clientfile.create({
            data: {
              firstName: activixData.first_name,
              lastName: activixData.last_name,
              phone: activixData.phones[0],
              name: activixData.first_name + ' ' + activixData.last_name,
              email: activixData.email[0],
              address: activixData.address_line1,
              city: activixData.city,
              province: activixData.province,
            }
          })
        }
        let finance = await prisma.finance.findUnique({
          where: {
            id: activixData.id
          }
        })
        if (!finance) {
          finance = await prisma.finance.create({
            data: {

              email: activixData.email[0],
              firstName: activixData.first_name,
              lastName: activixData.last_name,
              phone: activixData.phones[0],
              name: activixData.first_name + ' ' + activixData.last_name,
              address: activixData.address_line1,
              city: activixData.city,
              province: activixData.province,
              stockNum: activixData.vehicles[0].stock,
              options: activixData.vehicles[0].comment,
              accessories: activixData.vehicles[0].accessories,
              year: activixData.vehicles[0].year,
              brand: activixData.vehicles[0].make,
              model: activixData.vehicles[0].model,
              color: activixData.vehicles[0].color_exterior,
              msrp: activixData.vehicles[0].price,
              tradeValue: activixData.vehicles[0].value,
              trim: activixData.vehicles[0].trim,
              vin: activixData.vehicles[0].vin,
            }
          })
          const savedActivix = await prisma.activixLead.create({
            data: {
              financeId: finance.id,
              id: activixDataList.id,
              account_id: activixDataList.account_id,
              customer_id: activixDataList.customer_id,
              source_id: activixDataList.source_id,
              Integer: activixDataList.Integer,
              provider_id: activixDataList.provider_id,
              appointment_date: activixDataList.appointment_date,
              phone_appointment_date: activixDataList.phone_appointment_date,
              available_date: activixDataList.available_date,
              be_back_date: activixDataList.be_back_date,
              birth_date: activixDataList.birth_date,
              call_date: activixDataList.call_date,
              created_at: activixDataList.created_at,
              csi_date: activixDataList.csi_date,
              delivered_date: activixDataList.delivered_date,
              deliverable_date: activixDataList.deliverable_date,
              delivery_date: activixDataList.delivery_date,
              home_presented_date: activixDataList.home_presented_date,
              paperwork_date: activixDataList.paperwork_date,
              presented_date: activixDataList.presented_date,
              promised_datere: activixDataList.promised_datere,
              financed_date: activixDataList.financed_date,
              road_test_date: activixDataList.road_test_date,
              home_road_test_date: activixDataList.home_road_test_date,
              sale_date: activixDataList.sale_date,
              take_over_date: activixDataList.take_over_date,
              unsubscribe_all_date: activixDataList.unsubscribe_all_date,
              unsubscribe_call_date: activixDataList.unsubscribe_call_date,
              unsubscribe_email_date: activixDataList.unsubscribe_email_date,
              unsubscribe_sms_date: activixDataList.unsubscribe_sms_date,
              updated_at: activixDataList.updated_at,
              address_line1: activixDataList.address_line1,
              address_line2: activixDataList.address_line2,
              business: activixDataList.business,
              business_name: activixDataList.business_name,
              campaign: activixDataList.campaign,
              city: activixDataList.city,
              civility: activixDataList.civility,
              country: activixDataList.country,
              created_method: activixDataList.created_method,
              credit_approved: activixDataList.credit_approved,
              dealer_tour: activixDataList.dealer_tour,
              division: activixDataList.division,
              financial_institution: activixDataList.financial_institution,
              first_name: activixDataList.first_name,
              form: activixDataList.form,
              funded: activixDataList.funded,
              gender: activixDataList.gender,
              inspected: activixDataList.inspected,
              keyword: activixDataList.keyword,
              last_name: activixDataList.last_name,
              locale: activixDataList.locale,
              navigation_history: activixDataList.navigation_history,
              postal_code: activixDataList.postal_code,
              progress_state: activixDataList.progress_state,
              provider: activixDataList.provider,
              province: activixDataList.province,
              qualification: activixDataList.qualification,
              rating: activixDataList.rating,
              referrer: activixDataList.referrer,
              result: activixDataList.result,
              search_term: activixDataList.search_term,
              second_contact: activixDataList.second_contact,
              second_contact_civility: activixDataList.second_contact_civility,
              segment: activixDataList.segment,
              source: activixDataList.source,
              status: activixDataList.status,
              type: activixDataList.type,
              walk_around: activixDataList.walk_around,
              comment: activixDataList.comment,
              advisor: activixDataList.advisor,
              delivered_by: activixDataList.delivered_by,
              emails: activixDataList.emails[0],
              emails2: activixDataList.emails[1],
              phones: activixDataList.phones[0],
              phones2: activixDataList.phones[1],
              phones3: activixDataList.phones[2],
            }
          })
          const dashboard = await prisma.dashboard.create({
            financeId: finance.id,
            customerState: activixData.result,
            status: activixData.status

          })
          const updateFinance = await prisma.finance.update({
            where: {
              id: finance.id,
            },
            data: {
              activixId: savedActivix.id,
              clientfileId: clientfile.id,
              dashboardId: dashboard.id,
            }
          })
          return updateFinance
        }

      }
      // should update leads here

    })
  }
  return processedDataList
}
export async function GetAccount() {
  const accessToken = env.API_ACTIVIX;

  const account = await axios.get(`https://api.crm.activix.ca/v2/account`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  }).then(response => {
    console.log(response.data);
  })
    .catch(error => {
      console.error('Full error object:', error);
      console.error(`Activix Error: ${error.response.status} - ${error.response.data}`);
      console.error(`Error status: ${error.response.status}`);
      console.error('Error response:', error.response.data);
    });

  return account
}
export async function GetLeads() {

  const endpoint = 'leads'

  const accessToken = env.API_ACTIVIX;
  const response = await axios.get(`https://api.crm.activix.ca/v2/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  }
  )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Full error object:', error);
      console.error(`Activix Error: ${error.response.status} - ${error.response.data}`);
      console.error(`Error status: ${error.response.status}`);
      console.error('Error response:', error.response.data);
    });


  return response

}
export async function CreateVehicle(body) {
  const accessToken = env.API_ACTIVIX;
  const response = await axios.post(`https://api.crm.activix.ca/v2/lead-vehicles`, {
    body,
    // lead_id: 42132008,
    //"make": "BMW Motorrad",
    //"model": "S1000RR",
    // "year": 2018,
    // "type": "wanted"
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  }
  )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Full error object:', error);
      console.error(`Activix Error: ${error.response.status} - ${error.response.data}`);
      console.error(`Error status: ${error.response.status}`);
      console.error('Error response:', error.response.data);
    });


  return response
}
export async function CreateLead(body) {
  const endpoint = 'leads'

  const accessToken = env.API_ACTIVIX;
  const response = await axios.post(`https://api.crm.activix.ca/v2/${endpoint}`, {
    body,
    /** "first_name": "Justin",
     "last_name": "Zanth",
     "type": "email",
     "advisor": {
       "first_name": "Skyler",
       "last_name": "Zanth"
     },
     "emails": [
       {
         "type": "home",
         "address": "skylerzanth@gmail.com"
       }
     ],
     "phones": [
       {
         "number": "+16138980992",
         "type": "mobile"
       }
     ],
     "vehicles": [
       {
         "make": "BMW",
         "model": "M3",
         "year": 2024,
         "type": "wanted"
       },
       {
         "make": "BMW",
         "model": "S1000RR",
         "year": 2024,
         "type": "exchange"
       }
     ] */
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  }
  )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Full error object:', error);
      console.error(`Activix Error: ${error.response.status} - ${error.response.data}`);
      console.error(`Error status: ${error.response.status}`);
      console.error('Error response:', error.response.data);
    });


  return response

}
export async function CreateCommunications(body) {
  const endpoint = 'communications'

  const accessToken = env.API_ACTIVIX;
  const response = await axios.post(`https://api.crm.activix.ca/v2/${endpoint}`, {
    body,
    //lead_id: 42132008,
    //"method": "phone",
    //"type": "outgoing",
    // "call_status": "calling",
    // "description": "Call made to customer, reached voicemeail.",
    // "executed_at": "2024-02-15T01:00:00-05:00",
    // "executed_by": 17162,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  }
  )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Full error object:', error);
      console.error(`Activix Error: ${error.response.status} - ${error.response.data}`);
      console.error(`Error status: ${error.response.status}`);
      console.error('Error response:', error.response.data);
    });


  return response
}

// doesnt work
export async function CreateEvent(body) {
  const accessToken = env.API_ACTIVIX;
  const response = await axios.post(`https://api.crm.activix.ca/v2/events`, {
    body,
    // lead_id: 42132008,
    // owner: {
    //  first_name: 'Skyler',
    //   last_name: 'Zanth',
    // },
    // title: "Appointment for John",
    // type: "appointment",
    // start_at: "2024-02-15T15:15:00-04:00",
    // end_at: "2024-02-15T16:45:00-04:00",
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  }
  )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Full error object:', error);
      console.error(`Activix Error: ${error.response.status} - ${error.response.data}`);
      console.error(`Error status: ${error.response.status}`);
      console.error('Error response:', error.response.data);
    });


  return response
}
export default function TestActivix() {
  const { processedDataList } = useLoaderData()

  const [formData, setFormData] = useState({
    activixId: processedDataList.activixId,
    financeManager: processedDataList.financeManager,
    email: processedDataList.email,
    firstName: processedDataList.firstName,
    lastName: processedDataList.lastName,
    phone: processedDataList.phone,
    name: processedDataList.name,
    address: processedDataList.address,
    city: processedDataList.city,
    postal: processedDataList.postal,
    province: processedDataList.province,
    dl: processedDataList.dl,
    typeOfContact: processedDataList.typeOfContact,
    timeToContact: processedDataList.timeToContact,
    iRate: processedDataList.iRate,
    months: processedDataList.months,
    discount: processedDataList.discount,
    total: processedDataList.total,
    onTax: processedDataList.onTax,
    on60: processedDataList.on60,
    biweekly: processedDataList.biweekly,
    weekly: processedDataList.weekly,
    weeklyOth: processedDataList.weeklyOth,
    biweekOth: processedDataList.biweekOth,
    oth60: processedDataList.oth60,
    weeklyqc: processedDataList.weeklyqc,
    biweeklyqc: processedDataList.biweeklyqc,
    qc60: processedDataList.qc60,
    deposit: processedDataList.deposit,
    biweeklNatWOptions: processedDataList.biweeklNatWOptions,
    weeklylNatWOptions: processedDataList.weeklylNatWOptions,
    nat60WOptions: processedDataList.nat60WOptions,
    weeklyOthWOptions: processedDataList.weeklyOthWOptions,
    biweekOthWOptions: processedDataList.biweekOthWOptions,
    oth60WOptions: processedDataList.oth60WOptions,
    biweeklNat: processedDataList.biweeklNat,
    weeklylNat: processedDataList.weeklylNat,
    nat60: processedDataList.nat60,
    qcTax: processedDataList.qcTax,
    otherTax: processedDataList.otherTax,
    totalWithOptions: processedDataList.totalWithOptions,
    otherTaxWithOptions: processedDataList.otherTaxWithOptions,
    desiredPayments: processedDataList.desiredPayments,
    freight: processedDataList.freight,
    admin: processedDataList.admin,
    commodity: processedDataList.commodity,
    pdi: processedDataList.pdi,
    discountPer: processedDataList.discountPer,
    userLoanProt: processedDataList.userLoanProt,
    userTireandRim: processedDataList.userTireandRim,
    userGap: processedDataList.userGap,
    userExtWarr: processedDataList.userExtWarr,
    userServicespkg: processedDataList.userServicespkg,
    deliveryCharge: processedDataList.deliveryCharge,
    vinE: processedDataList.vinE,
    lifeDisability: processedDataList.lifeDisability,
    rustProofing: processedDataList.rustProofing,
    userOther: processedDataList.userOther,
    paintPrem: processedDataList.paintPrem,
    licensing: processedDataList.licensing,
    stockNum: processedDataList.stockNum,
    options: processedDataList.options,
    accessories: processedDataList.accessories,
    labour: processedDataList.labour,
    year: processedDataList.year,
    brand: processedDataList.brand,
    model: processedDataList.model,
    model1: processedDataList.model1,
    color: processedDataList.color,
    modelCode: processedDataList.modelCode,
    msrp: processedDataList.msrp,
    userEmail: processedDataList.userEmail,
    tradeValue: processedDataList.tradeValue,
    tradeDesc: processedDataList.tradeDesc,
    tradeColor: processedDataList.tradeColor,
    tradeYear: processedDataList.tradeYear,
    tradeMake: processedDataList.tradeMake,
    tradeVin: processedDataList.tradeVin,
    tradeTrim: processedDataList.tradeTrim,
    tradeMileage: processedDataList.tradeMileage,
    trim: processedDataList.trim,
    vin: processedDataList.vin,
    leadNote: processedDataList.leadNote,
    sendToFinanceNow: processedDataList.sendToFinanceNow,
    dealNumber: processedDataList.dealNumber,
    bikeStatus: processedDataList.bikeStatus,
    referral: processedDataList.referral,
    visited: processedDataList.visited,
    bookedApt: processedDataList.bookedApt,
    aptShowed: processedDataList.aptShowed,
    aptNoShowed: processedDataList.aptNoShowed,
    testDrive: processedDataList.testDrive,
    metService: processedDataList.metService,
    metManager: processedDataList.metManager,
    metParts: processedDataList.metParts,
    sold: processedDataList.sold,
    depositMade: processedDataList.depositMade,
    refund: processedDataList.refund,
    turnOver: processedDataList.turnOver,
    financeApp: processedDataList.financeApp,
    approved: processedDataList.approved,
    signed: processedDataList.signed,
    pickUpSet: processedDataList.pickUpSet,
    demoed: processedDataList.demoed,
    delivered: processedDataList.delivered,
    lastContact: processedDataList.lastContact,
    status: processedDataList.status,
    customerState: processedDataList.customerState,
    result: processedDataList.result,
    timesContacted: processedDataList.timesContacted,
    nextAppointment: processedDataList.nextAppointment,
    followUpDay: processedDataList.followUpDay,
    deliveredDate: processedDataList.deliveredDate,
    notes: processedDataList.notes,
    visits: processedDataList.visits,
    progress: processedDataList.progress,
    metSalesperson: processedDataList.metSalesperson,
    metFinance: processedDataList.metFinance,
    financeApplication: processedDataList.financeApplication,
    pickUpDate: processedDataList.pickUpDate,
    pickUpTime: processedDataList.pickUpTime,
    depositTakenDate: processedDataList.depositTakenDate,
    docsSigned: processedDataList.docsSigned,
    tradeRepairs: processedDataList.tradeRepairs,
    seenTrade: processedDataList.seenTrade,
    lastNote: processedDataList.lastNote,
    applicationDone: processedDataList.applicationDone,
    licensingSent: processedDataList.licensingSent,
    liceningDone: processedDataList.liceningDone,
    refunded: processedDataList.refunded,
    cancelled: processedDataList.cancelled,
    lost: processedDataList.lost,
    dLCopy: processedDataList.dLCopy,
    insCopy: processedDataList.insCopy,
    testDrForm: processedDataList.testDrForm,
    voidChq: processedDataList.voidChq,
    loanOther: processedDataList.loanOther,
    signBill: processedDataList.signBill,
    ucda: processedDataList.ucda,
    tradeInsp: processedDataList.tradeInsp,
    customerWS: processedDataList.customerWS,
    otherDocs: processedDataList.otherDocs,
  })
  return (
    <div>
      <h1>Your List</h1>
      <ul>
        {formDataList.map((formData, index) => (
          <li key={index}>
            <p>{formData.activixId}</p>
            <p>{formData.financeManager}</p>
            <p>{formData.email}</p>
            <p>{formData.firstName}</p>
            <p>{formData.lastName}</p>
            <p>{formData.phone}</p>
            <p>{formData.name}</p>
            <p>{formData.address}</p>
            <p>{formData.city}</p>
            <p>{formData.postal}</p>
            <p>{formData.province}</p>
            <p>{formData.dl}</p>
            <p>{formData.typeOfContact}</p>
            <p>{formData.timeToContact}</p>
            <p>{formData.iRate}</p>
            <p>{formData.months}</p>
            <p>{formData.discount}</p>
            <p>{formData.total}</p>
            <p>{formData.onTax}</p>
            <p>{formData.on60}</p>
            <p>{formData.biweekly}</p>
            <p>{formData.weekly}</p>
            <p>{formData.weeklyOth}</p>
            <p>{formData.biweekOth}</p>
            <p>{formData.oth60}</p>
            <p>{formData.weeklyqc}</p>
            <p>{formData.biweeklyqc}</p>
            <p>{formData.qc60}</p>
            <p>{formData.deposit}</p>
            <p>{formData.biweeklNatWOptions}</p>
            <p>{formData.weeklylNatWOptions}</p>
            <p>{formData.nat60WOptions}</p>
            <p>{formData.weeklyOthWOptions}</p>
            <p>{formData.biweekOthWOptions}</p>
            <p>{formData.oth60WOptions}</p>
            <p>{formData.biweeklNat}</p>
            <p>{formData.weeklylNat}</p>
            <p>{formData.nat60}</p>
            <p>{formData.qcTax}</p>
            <p>{formData.otherTax}</p>
            <p>{formData.totalWithOptions}</p>
            <p>{formData.otherTaxWithOptions}</p>
            <p>{formData.desiredPayments}</p>
            <p>{formData.freight}</p>
            <p>{formData.admin}</p>
            <p>{formData.commodity}</p>
            <p>{formData.pdi}</p>
            <p>{formData.discountPer}</p>
            <p>{formData.userLoanProt}</p>
            <p>{formData.userTireandRim}</p>
            <p>{formData.userGap}</p>
            <p>{formData.userExtWarr}</p>
            <p>{formData.userServicespkg}</p>
            <p>{formData.deliveryCharge}</p>
            <p>{formData.vinE}</p>
            <p>{formData.lifeDisability}</p>
            <p>{formData.rustProofing}</p>
            <p>{formData.userOther}</p>
            <p>{formData.paintPrem}</p>
            <p>{formData.licensing}</p>
            <p>{formData.stockNum}</p>
            <p>{formData.options}</p>
            <p>{formData.accessories}</p>
            <p>{formData.labour}</p>
            <p>{formData.year}</p>
            <p>{formData.brand}</p>
            <p>{formData.model}</p>
            <p>{formData.model1}</p>
            <p>{formData.color}</p>
            <p>{formData.modelCode}</p>
            <p>{formData.msrp}</p>
            <p>{formData.userEmail}</p>
            <p>{formData.tradeValue}</p>
            <p>{formData.tradeDesc}</p>
            <p>{formData.tradeColor}</p>
            <p>{formData.tradeYear}</p>
            <p>{formData.tradeMake}</p>
            <p>{formData.tradeVin}</p>
            <p>{formData.tradeTrim}</p>
            <p>{formData.tradeMileage}</p>
            <p>{formData.trim}</p>
            <p>{formData.vin}</p>
            <p>{formData.leadNote}</p>
            <p>{formData.sendToFinanceNow}</p>
            <p>{formData.dealNumber}</p>
            <p>{formData.bikeStatus}</p>
            <p>{formData.referral}</p>
            <p>{formData.visited}</p>
            <p>{formData.bookedApt}</p>
            <p>{formData.aptShowed}</p>
            <p>{formData.aptNoShowed}</p>
            <p>{formData.testDrive}</p>
            <p>{formData.metService}</p>
            <p>{formData.metManager}</p>
            <p>{formData.metParts}</p>
            <p>{formData.sold}</p>
            <p>{formData.depositMade}</p>
            <p>{formData.refund}</p>
            <p>{formData.turnOver}</p>
            <p>{formData.financeApp}</p>
            <p>{formData.approved}</p>
            <p>{formData.signed}</p>
            <p>{formData.pickUpSet}</p>
            <p>{formData.demoed}</p>
            <p>{formData.delivered}</p>
            <p>{formData.lastContact}</p>
            <p>{formData.status}</p>
            <p>{formData.customerState}</p>
            <p>{formData.result}</p>
            <p>{formData.timesContacted}</p>
            <p>{formData.nextAppointment}</p>
            <p>{formData.followUpDay}</p>
            <p>{formData.deliveredDate}</p>
            <p>{formData.notes}</p>
            <p>{formData.visits}</p>
            <p>{formData.progress}</p>
            <p>{formData.metSalesperson}</p>
            <p>{formData.metFinance}</p>
            <p>{formData.financeApplication}</p>
            <p>{formData.pickUpDate}</p>
            <p>{formData.pickUpTime}</p>
            <p>{formData.depositTakenDate}</p>
            <p>{formData.docsSigned}</p>
            <p>{formData.tradeRepairs}</p>
            <p>{formData.seenTrade}</p>
            <p>{formData.lastNote}</p>
            <p>{formData.applicationDone}</p>
            <p>{formData.licensingSent}</p>
            <p>{formData.liceningDone}</p>
            <p>{formData.refunded}</p>
            <p>{formData.cancelled}</p>
            <p>{formData.lost}</p>
            <p>{formData.dLCopy}</p>
            <p>{formData.insCopy}</p>
            <p>{formData.testDrForm}</p>
            <p>{formData.voidChq}</p>
            <p>{formData.loanOther}</p>
            <p>{formData.signBill}</p>
            <p>{formData.ucda}</p>
            <p>{formData.tradeInsp}</p>
            <p>{formData.customerWS}</p>
            <p>{formData.otherDocs}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
/**
 *
 * ACCOUNT
{
  id: 17162,
  created_at: '2023-12-14T16:45:54+00:00',
  updated_at: '2023-12-14T16:45:56+00:00',
  name: 'Sandbox - Skyler Zanth'
}
// COMMUNICATIONS
{
  data: {
    id: 58300174,
    lead_id: 42132008,
    user_id: 143041,
    created_by: 143041,
    created_at: '2024-02-15T09:00:32+00:00',    updated_at: '2024-02-15T09:00:32+00:00',    executed_at: '2024-02-15T06:00:00+00:00',
    method: 'phone',
    type: 'outgoing',
    call_duration: null,
    call_phone: null,
    call_status: 'calling',
    description: 'Call made to customer, reached voicemeail.'
  }
}
// VEHCILE
 data: {
    id: 47454845,
    lead_id: 42132008,
    created_at: '2024-02-15T08:36:22+00:00',    end_contract_date: null,
    end_warranty_date: null,
    purchase_date: null,
    recorded_date: null,
    sold_date: null,
    updated_at: '2024-02-15T08:36:22+00:00',    actual_value: null,
    accessories: null,
    allowed_odometer: null,
    balance: 0,
    body_type: null,
    documentation: null,
    budget_max: null,
    budget_min: null,
    cash_down: null,
    category: null,
    category_rv: null,
    certified: false,
    client_number: null,
    color_exterior: null,
    color_interior: null,
    comment: null,
    condition: null,
    driving_wheels: null,
    engine: null,
    extended_warranty: null,
    fuel: null,
    inventory_unit_id: null,
    length_max: null,
    length_min: null,
    license_plate: null,
    make: 'BMW Motorrad',
    modality: null,
    model: 'S1000RR',
    odometer: null,
    offer_number: null,
    option: null,
    order_number: null,
    payment: null,
    payment_with_tax: null,
    payment_frequency: null,
    preparation: null,
    price: null,
    profit: null,
    rate: null,
    recall: null,
    residual: null,
    security_deposit: null,
    sleeping: null,
    sold: null,
    sold_by: null,
    stock: null,
    stock_state: null,
    term: null,
    tire: null,
    transmission: null,
    trim: null,
    type: 'wanted',
    value: null,
    vin: null,
    warranty: null,
    weight: null,
    year: 2018,
    year_max: null,
    year_min: null
  }
}
// LEAD
 * data: {
    id: 42138417,
    account_id: 17162,
    customer_id: 40373004,
    source_id: null,
    provider_id: null,
    appointment_date: null,
    appointment_event_id: null,
    phone_appointment_date: null,
    available_date: null,
    be_back_date: null,
    birth_date: null,
    call_date: null,
    created_at: '2024-02-15T09:08:07+00:00',    csi_date: null,
    deliverable_date: null,
    delivered_date: null,
    delivery_date: null,
    funded: null,
    end_service_date: null,
    home_presented_date: null,
    last_visit_date: null,
    next_visit_date: null,
    open_work_order_date: null,
    paperwork_date: null,
    planned_pick_up_date: null,
    presented_date: null,
    promised_date: null,
    refinanced_date: null,
    repair_date: null,
    road_test_date: null,
    home_road_test_date: null,
    sale_date: null,
    take_over_date: null,
    unsubscribe_all_date: null,
    unsubscribe_call_date: null,
    unsubscribe_email_date: null,
    unsubscribe_sms_date: null,
    updated_at: '2024-02-15T09:08:08+00:00',    work_order_closure_date: null,
    work_order_partial_closure_date: null,
    address_line1: null,
    address_line2: null,
    credit_approved: false,
    average_spending: 0,
    business: null,
    business_name: null,
    city: null,
    civility: null,
    code: null,
    comment: null,
    country: 'CA',
    created_method: 'api',
    dealer_tour: null,
    division: null,
    financial_institution: null,
    first_name: 'Justin',
    gender: 0,
    inspected: false,
    invoiced: false,
    last_name: 'Zanth',
    locale: 'fr',
    loyalty: null,
    odometer_last_visit: null,
    postal_code: null,
    prepaid: null,
    prepared: false,
    province: 'QC',
    qualification: null,
    rating: null,
    reached_client: false,
    repair_order: null,
    result: 'pending',
    second_contact: null,
    second_contact_civility: null,
    segment: null,
    service_cleaned: false,
    service_interval_km: null,
    service_monthly_km: null,
    source: null,
    progress_state: null,
    status: null,
    storage: null,
    type: 'email',
    walk_around: false,
    work_order: null,
    referrer: null,
    search_term: null,
    keyword: null,
    navigation_history: null,
    campaign: null,
    response_time: null,
    first_update_time: null,
    account: {
      id: 17162,
      created_at: '2023-12-14T16:45:54+00:00',
      updated_at: '2023-12-14T16:45:56+00:00',
      name: 'Sandbox - Skyler Zanth'
    },
    advisor: null,
    bdc: null,
    commercial: null,
    service_advisor: null,
    service_agent: null,
    customer: { id: 40373004 },
    emails: [ [Object] ],
    phones: [ [Object] ],
    products: [],
    vehicles: [ [Object], [Object] ]
  }
}
Error: You defined a loader for
  ],
  links: {
    first: 'https://api.crm.activix.ca/v2/leads?page=1',
    last: 'https://api.crm.activix.ca/v2/leads?page=1',
    prev: null,
    next: null
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [ [Object], [Object], [Object] ],    path: 'https://api.crm.activix.ca/v2/leads',
    per_page: 25,
    to: 1,
    total: 1
  }
}
  const processedDataList = activixDataList.map((activixData) => {
    let data = {
      activixId: activixData.customer_id,
      email: activixData.email[0],
      firstName: activixData.first_name,
      lastName: activixData.last_name,
      phone: activixData.phones[0],
      name: activixData.first_name + ' ' + activixData.last_name,
      address: activixData.address_line1,
      city: activixData.city,
      province: activixData.province,
      stockNum: activixData.vehicles[0].stock,
      options: activixData.vehicles[0].comment,
      accessories: activixData.vehicles[0].accessories,
      year: activixData.vehicles[0].year,
      brand: activixData.vehicles[0].make,
      model: activixData.vehicles[0].model,
      color: activixData.vehicles[0].color_exterior,
      msrp: activixData.vehicles[0].price,
      tradeValue: activixData.vehicles[0].value,
      trim: activixData.vehicles[0].trim,
      vin: activixData.vehicles[0].vin,

    }
    const mergedData = await getMergedFinance(user.email);

    const salesData = {
      financeManager: mergedData.financeManager,
      email: mergedData.email,
      firstName: mergedData.firstName,
      lastName: mergedData.lastName,
      phone: mergedData.phone,
      name: mergedData.first_name + ' ' + mergedData.name,
      address: mergedData.address,
      city: mergedData.city,
      postal: mergedData.postal,
      province: mergedData.province,
      dl: mergedData.dl,
      typeOfContact: mergedData.typeOfContact,
      timeToContact: mergedData.timeToContact,
      iRate: mergedData.iRate,
      months: mergedData.months,
      discount: mergedData.discount,
      total: mergedData.total,
      onTax: mergedData.onTax,
      on60: mergedData.on60,
      biweekly: mergedData.biweekly,
      weekly: mergedData.weekly,
      weeklyOth: mergedData.weeklyOth,
      biweekOth: mergedData.biweekOth,
      oth60: mergedData.oth60,
      weeklyqc: mergedData.weeklyqc,
      biweeklyqc: mergedData.biweeklyqc,
      qc60: mergedData.qc60,
      deposit: mergedData.deposit,
      biweeklNatWOptions: mergedData.biweeklNatWOptions,
      weeklylNatWOptions: mergedData.weeklylNatWOptions,
      nat60WOptions: mergedData.nat60WOptions,
      weeklyOthWOptions: mergedData.weeklyOthWOptions,
      biweekOthWOptions: mergedData.biweekOthWOptions,
      oth60WOptions: mergedData.oth60WOptions,
      biweeklNat: mergedData.biweeklNat,
      weeklylNat: mergedData.weeklylNat,
      nat60: mergedData.nat60,
      qcTax: mergedData.qcTax,
      otherTax: mergedData.otherTax,
      totalWithOptions: mergedData.totalWithOptions,
      otherTaxWithOptions: mergedData.otherTaxWithOptions,
      desiredPayments: mergedData.desiredPayments,
      freight: mergedData.freight,
      admin: mergedData.admin,
      commodity: mergedData.commodity,
      pdi: mergedData.pdi,
      discountPer: mergedData.discountPer,
      userLoanProt: mergedData.userLoanProt,
      userTireandRim: mergedData.userTireandRim,
      userGap: mergedData.userGap,
      userExtWarr: mergedData.userExtWarr,
      userServicespkg: mergedData.userServicespkg,
      deliveryCharge: mergedData.deliveryCharge,
      vinE: mergedData.vinE,
      lifeDisability: mergedData.lifeDisability,
      rustProofing: mergedData.rustProofing,
      userOther: mergedData.userOther,
      paintPrem: mergedData.paintPrem,
      licensing: mergedData.licensing,
      stockNum: mergedData.stockNum,
      options: mergedData.options,
      accessories: mergedData.accessories,
      labour: mergedData.labour,
      year: mergedData.year,
      brand: mergedData.brand,
      model: mergedData.model,
      model1: mergedData.model1,
      color: mergedData.color,
      modelCode: mergedData.modelCode,
      msrp: mergedData.msrp,
      userEmail: mergedData.userEmail,
      tradeValue: mergedData.tradeValue,
      tradeDesc: mergedData.tradeDesc,
      tradeColor: mergedData.tradeColor,
      tradeYear: mergedData.tradeYear,
      tradeMake: mergedData.tradeMake,
      tradeVin: mergedData.tradeVin,
      tradeTrim: mergedData.tradeTrim,
      tradeMileage: mergedData.tradeMileage,
      trim: mergedData.trim,
      vin: mergedData.vin,
      leadNote: mergedData.leadNote,
      sendToFinanceNow: mergedData.sendToFinanceNow,
      dealNumber: mergedData.dealNumber,
      bikeStatus: mergedData.bikeStatus,
      referral: mergedData.referral,
      visited: mergedData.visited,
      bookedApt: mergedData.bookedApt,
      aptShowed: mergedData.aptShowed,
      aptNoShowed: mergedData.aptNoShowed,
      testDrive: mergedData.testDrive,
      metService: mergedData.metService,
      metManager: mergedData.metManager,
      metParts: mergedData.metParts,
      sold: mergedData.sold,
      depositMade: mergedData.depositMade,
      refund: mergedData.refund,
      turnOver: mergedData.turnOver,
      financeApp: mergedData.financeApp,
      approved: mergedData.approved,
      signed: mergedData.signed,
      pickUpSet: mergedData.pickUpSet,
      demoed: mergedData.demoed,
      delivered: mergedData.delivered,
      lastContact: mergedData.lastContact,
      status: mergedData.status,
      customerState: mergedData.customerState,
      result: mergedData.result,
      timesContacted: mergedData.timesContacted,
      nextAppointment: mergedData.nextAppointment,
      followUpDay: mergedData.followUpDay,
      deliveredDate: mergedData.deliveredDate,
      notes: mergedData.notes,
      visits: mergedData.visits,
      progress: mergedData.progress,
      metSalesperson: mergedData.metSalesperson,
      metFinance: mergedData.metFinance,
      financeApplication: mergedData.financeApplication,
      pickUpDate: mergedData.pickUpDate,
      pickUpTime: mergedData.pickUpTime,
      depositTakenDate: mergedData.depositTakenDate,
      docsSigned: mergedData.docsSigned,
      tradeRepairs: mergedData.tradeRepairs,
      seenTrade: mergedData.seenTrade,
      lastNote: mergedData.lastNote,
      applicationDone: mergedData.applicationDone,
      licensingSent: mergedData.licensingSent,
      liceningDone: mergedData.liceningDone,
      refunded: mergedData.refunded,
      cancelled: mergedData.cancelled,
      lost: mergedData.lost,
      dLCopy: mergedData.dLCopy,
      insCopy: mergedData.insCopy,
      testDrForm: mergedData.testDrForm,
      voidChq: mergedData.voidChq,
      loanOther: mergedData.loanOther,
      signBill: mergedData.signBill,
      ucda: mergedData.ucda,
      tradeInsp: mergedData.tradeInsp,
      customerWS: mergedData.customerWS,
      otherDocs: mergedData.otherDocs,
    }

    const dashData = {
      ...salesData,
      ...data,

    }
    return dashData; // Return the processed data for each activixData entry
  });

  return processedDataList; */
