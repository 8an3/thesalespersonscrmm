import { createfinanceApt } from "~/utils/financeAppts/create.server"

export default async function CreateAppt(formData) {
  const start = formData.start
  const end = formData.end
  const contactMethod = formData.contactMethod
  const completed = formData.completed
  const apptStatus = formData.apptStatus
  const apptType = formData.apptType
  const note = formData.note
  const unit = formData.unit
  const brand = formData.brand
  const firstName = formData.firstName
  const lastName = formData.lastName
  const email = formData.email
  const phone = formData.phone
  const address = formData.address
  const financeId = formData.financeId
  const userId = formData.userId
  const description = formData.description
  const userName = formData.userName
  const title = formData.title
  const attachments = formData.attachments
  const direction = formData.direction
  const resultOfcall = formData.resultOfcall
  const data = {
    start,
    end,
    contactMethod,
    completed,
    apptStatus,
    apptType,
    note,
    unit,
    brand,
    firstName,
    lastName,
    email,
    phone,
    address,
    financeId,
    userId,
    description,
    userName,
    title,
    attachments,
    direction,
    resultOfcall,
  }
  const appointment = await createfinanceApt(financeId, clientAptsData)
  return appointment
}
