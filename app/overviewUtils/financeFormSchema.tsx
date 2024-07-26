import { z } from 'zod'
import { zfd } from 'zod-form-data'

const financeFormSchema = z.object({
  typeOfContact: zfd.text(z.string().optional()),
  timeToContact: zfd.text(z.string().optional()),
  Phone: zfd.numeric(z.number().optional()),
  InPerson: zfd.numeric(z.number().optional()),
  SMS: zfd.numeric(z.number().optional()),
  Email: zfd.numeric(z.number().optional()),
  Other: zfd.numeric(z.number().optional()),
  tradeColor: zfd.text(z.string().optional()),
  lockId: zfd.text(z.string().optional()),
  tradeYear: zfd.text(z.string().optional()),
  tradeMake: zfd.text(z.string().optional()),
  minutes: zfd.text(z.string().optional()),
  notificationId: zfd.text(z.string().optional()),
  navigate: zfd.text(z.string().optional()),
  hours: zfd.text(z.string().optional()),
  tradeVin: zfd.text(z.string().optional()),
  packageNumber: zfd.text(z.string().optional()),
  claimId: zfd.text(z.string().optional()),
  goal: zfd.text(z.string().optional()),
  expired: zfd.text(z.string().optional()),
  achieved: zfd.text(z.string().optional()),
  days: zfd.text(z.string().optional()),
  financeManagerName: zfd.text(z.string().optional()),
  janGoal: zfd.numeric(z.number().optional()),
  febGoal: zfd.numeric(z.number().optional()),
  marGoal: zfd.numeric(z.number().optional()),
  aprGoal: zfd.numeric(z.number().optional()),
  mayGoal: zfd.numeric(z.number().optional()),
  junGoal: zfd.numeric(z.number().optional()),
  julGoal: zfd.numeric(z.number().optional()),
  augGoal: zfd.numeric(z.number().optional()),
  sepGoal: zfd.numeric(z.number().optional()),
  octGoal: zfd.numeric(z.number().optional()),
  novGoal: zfd.numeric(z.number().optional()),
  decGoal: zfd.numeric(z.number().optional()),
  janAch: zfd.numeric(z.number().optional()),
  febAch: zfd.numeric(z.number().optional()),
  marAch: zfd.numeric(z.number().optional()),
  aprAch: zfd.numeric(z.number().optional()),
  mayAch: zfd.numeric(z.number().optional()),
  junAch: zfd.numeric(z.number().optional()),
  julAch: zfd.numeric(z.number().optional()),
  augAch: zfd.numeric(z.number().optional()),
  sepAch: zfd.numeric(z.number().optional()),
  octAch: zfd.numeric(z.number().optional()),
  novAch: zfd.numeric(z.number().optional()),
  decAch: zfd.numeric(z.number().optional()),
  productId: zfd.text(z.string().optional()),
  dealerContact: zfd.text(z.string().optional()),
  personAdded: zfd.text(z.string().optional()),
  packageName: zfd.text(z.string().optional()),
  pickUp24before: zfd.text(z.string().optional()),
  packagePrice: zfd.text(z.string().optional()),
  bank: zfd.text(z.string().optional()),
  loanNumber: zfd.text(z.string().optional()),
  idVerified: zfd.text(z.string().optional()),
  firstPayment: zfd.text(z.string().optional()),
  loanMaturity: zfd.text(z.string().optional()),
  customerName: zfd.text(z.string().optional()),
  dealerCommission: zfd.text(z.string().optional()),
  financeCommission: zfd.text(z.string().optional()),
  salesCommission: zfd.text(z.string().optional()),
  financeDeptProductsTotal: zfd.text(z.string().optional()),
  salesEmail: zfd.text(z.string().optional()),
  financeEmail: zfd.text(z.string().optional()),
  appt24before: zfd.text(z.string().optional()),
  template: zfd.text(z.string().optional()),
  deliveryDate: zfd.text(z.string().optional()),
  wishListNotes: zfd.text(z.string().optional()),
  customterState: zfd.text(z.string().optional()),
  to: zfd.text(z.string().optional()),
  dealerEmail: zfd.text(z.string().optional()),
  dealerName: zfd.text(z.string().optional()),
  vercel: zfd.text(z.string().optional()),
  github: zfd.text(z.string().optional()),
  idToken: zfd.text(z.string().optional()),
  dealerAdminContact: zfd.text(z.string().optional()),
  dealerEtransferEmail: zfd.text(z.string().optional()),
  dealerEmailAdmin: zfd.text(z.string().optional()),
  newLook: zfd.text(z.string().optional()),
  timeOfDay: zfd.text(z.string().optional()),
  isPublished: zfd.text(z.string().optional()),
  slug: zfd.text(z.string().optional()),
  brand2: zfd.text(z.string().optional()),
  liceningDone: zfd.text(z.string().optional()),
  pickedDate: zfd.text(z.string().optional()),
  conversationSid: zfd.text(z.string().optional()),
  tradeLocation: zfd.text(z.string().optional()),
  name: zfd.text(z.string().optional()),
  statusBike: zfd.text(z.string().optional()),
  partNumbers: zfd.text(z.string().optional()),
  customerEmail: zfd.text(z.string().optional()),
  givenName: zfd.text(z.string().optional()),
  familyName: zfd.text(z.string().optional()),
  identityProvider: zfd.text(z.string().optional()),
  microId: zfd.text(z.string().optional()),
  pickHour: zfd.text(z.string().optional()),
  pickMin: zfd.text(z.string().optional()),
  AMPM: zfd.text(z.string().optional()),
  tokens: zfd.text(z.string().optional()),
  lead_id: zfd.text(z.string().optional()),
  orderNumber: zfd.text(z.string().optional()),
  sin: zfd.text(z.string().optional()),
  streetAddress: zfd.text(z.string().optional()),
  addressDuration: zfd.text(z.string().optional()),
  fullName: zfd.text(z.string().optional()),
  employer: zfd.text(z.string().optional()),
  job: zfd.text(z.string().optional()),
  finMgrEmail: zfd.text(z.string().optional()),
  employmentStatus: zfd.text(z.string().optional()),
  employerAddress: zfd.text(z.string().optional()),
  employerCity: zfd.text(z.string().optional()),
  employerProvince: zfd.text(z.string().optional()),
  employerPostal: zfd.text(z.string().optional()),
  employerPhone: zfd.text(z.string().optional()),
  employmentDuration: zfd.text(z.string().optional()),
  monthlyGrossIncome: zfd.text(z.string().optional()),
  bankName: zfd.text(z.string().optional()),
  branchAddress: zfd.text(z.string().optional()),
  mortgagePayment: zfd.text(z.string().optional()),
  utilities: zfd.text(z.string().optional()),
  propertyTaxes: zfd.text(z.string().optional()),
  loanType: zfd.text(z.string().optional()),
  loanMonthlyPayment: zfd.text(z.string().optional()),
  remainingBalance: zfd.text(z.string().optional()),
  quantity: zfd.text(z.string().optional()),
  description: zfd.text(z.string().optional()),
  applicationDone: zfd.text(z.string().optional()),
  financeManager: zfd.text(z.string().optional()),
  leadId: zfd.text(z.string().optional()),
  financeIdFromDash: zfd.text(z.string().optional()),
  rowId: zfd.text(z.string().optional()),
  licensingSent: zfd.text(z.string().optional()),
  activixActivated: zfd.text(z.string().optional()),
  refunded: zfd.text(z.string().optional()),
  location: zfd.text(z.string().optional()),
  locked: z.coerce.boolean(),
  modelName: zfd.text(z.string().optional()),
  aptId: zfd.text(z.string().optional()),
  clientAptId: zfd.text(z.string().optional()),
  cancelled: zfd.text(z.string().optional()),
  refreshToken: zfd.text(z.string().optional()),
  expires_in: zfd.text(z.string().optional()),
  lienPayout: zfd.text(z.string().optional()),
  optionsTotal: zfd.text(z.string().optional()),
  othTax: zfd.text(z.string().optional()),
  sendToFinanceNow: zfd.text(z.string().optional()),
  dealNumber: zfd.text(z.string().optional()),
  lost: zfd.text(z.string().optional()),
  theRealActId: zfd.text(z.string().optional()),
  dealerCity: zfd.text(z.string().optional()),
  body: zfd.text(z.string().optional()),
  dealerPostal: zfd.text(z.string().optional()),
  messageId: zfd.text(z.string().optional()),

  packageNumber: zfd.text(z.string().optional()),
packagePrice: zfd.text(z.string().optional()),
stockNumber: zfd.text(z.string().optional()),
type: zfd.text(z.string().optional()),
class: zfd.text(z.string().optional()),
submodel: zfd.text(z.string().optional()),
subSubmodel: zfd.text(z.string().optional()),
price: zfd.text(z.string().optional()),
exteriorColor: zfd.text(z.string().optional()),
mileage: zfd.text(z.string().optional()),
consignment: z.coerce.boolean(),
onOrder: z.coerce.boolean(),
expectedOn: zfd.text(z.string().optional()),
status: zfd.text(z.string().optional()),
orderStatus: zfd.text(z.string().optional()),
hdcFONumber: zfd.text(z.string().optional()),
hdmcFONumber: zfd.text(z.string().optional()),
vin: zfd.text(z.string().optional()),
age: zfd.text(z.string().optional()),
floorPlanDueDate: zfd.text(z.string().optional()),
location: zfd.text(z.string().optional()),
stocked: z.coerce.boolean(),
stockedDate: zfd.text(z.string().optional()),
isNew: z.coerce.boolean(),
actualCost: zfd.text(z.string().optional()),
mfgSerialNumber: zfd.text(z.string().optional()),
engineNumber: zfd.text(z.string().optional()),
plates: zfd.text(z.string().optional()),
keyNumber: zfd.text(z.string().optional()),
length: zfd.text(z.string().optional()),
width: zfd.text(z.string().optional()),
engine: zfd.text(z.string().optional()),
fuelType: zfd.text(z.string().optional()),
power: zfd.text(z.string().optional()),
chassisNumber: zfd.text(z.string().optional()),
chassisYear: zfd.text(z.string().optional()),
chassisMake: zfd.text(z.string().optional()),
chassisModel: zfd.text(z.string().optional()),
chassisType: zfd.text(z.string().optional()),
registrationState: zfd.text(z.string().optional()),
registrationExpiry: zfd.text(z.string().optional()),
grossWeight: zfd.text(z.string().optional()),
netWeight: zfd.text(z.string().optional()),
insuranceCompany: zfd.text(z.string().optional()),
policyNumber: zfd.text(z.string().optional()),
insuranceAgent: zfd.text(z.string().optional()),
insuranceStartDate: zfd.text(z.string().optional()),
insuranceEndDate: zfd.text(z.string().optional()),
sold: zfd.text(z.string().optional()),

  age: zfd.text(z.string().optional()),
  onOrder: z.coerce.boolean(),
  isNew: z.coerce.boolean(),
  invId: zfd.text(z.string().optional()),
  keyNumber: zfd.text(z.string().optional()),
  stocked: zfd.text(z.string().optional()),
  date: zfd.text(z.string().optional()),
  title: zfd.text(z.string().optional()),
  read: zfd.text(z.boolean().optional()),
  columnState: zfd.text(z.string().optional()),
  category: zfd.text(z.string().optional()),
  resourceId: zfd.text(z.string().optional()),
  userEmail: zfd.text(z.string().optional()),
  pathname: zfd.text(z.string().optional()),
  model2: zfd.text(z.string().optional()),
  calendar: zfd.text(z.string().optional()),
  followUpDay1: zfd.text(z.string().optional()),
  content: zfd.text(z.string().optional()),
  resourceId2: zfd.text(z.string().optional()),
  completedNote: zfd.text(z.string().optional()),
  leadNote: zfd.text(z.string().optional()),
  review: zfd.text(z.string().optional()),
  dimiss: zfd.text(z.boolean().optional()),
  attachments: zfd.text(z.string().optional()),
  label: zfd.text(z.string().optional()),
  dept: zfd.text(z.string().optional()),
  type: zfd.text(z.string().optional()),
  cc: zfd.text(z.string().optional()),
  bcc: zfd.text(z.string().optional()),
  clientId: zfd.text(z.string().optional()),
  dashboardId: zfd.text(z.string().optional()),
  attributes: zfd.text(z.string().optional()),
  selectBrand: zfd.text(z.string().optional()),
  clientEmail: zfd.text(z.string().optional()),
  dl: zfd.text(z.string().optional()),
  nextAppt: zfd.text(z.string().optional()),
  value: zfd.text(z.string().optional()),
  deliveredDate: zfd.text(z.string().optional()),
  depositTakenDate: zfd.text(z.string().optional()),
  docsSigned: zfd.text(z.string().optional()),
  clientfileId: zfd.text(z.string().optional()),
  outletSize: zfd.text(z.string().optional()),
  postal: zfd.text(z.string().optional()),
  userOMVIC: zfd.text(z.string().optional()),
  city: zfd.text(z.string().optional()),
  tradeDesc: zfd.text(z.string().optional()),
  financeId: zfd.text(z.string().optional()),
  iRate: zfd.text(z.string().optional()),
  ccUser: zfd.text(z.string().optional()),
  message: zfd.text(z.string().optional()),
  tradeValue: zfd.text(z.string().optional()),
  messageContent: zfd.text(z.string().optional()),
  messageTitle: zfd.text(z.string().optional()),
  lien: zfd.text(z.string().optional()),
  direction: zfd.text(z.string().optional()),
  leadSource: zfd.text(z.string().optional()),
  resultOfcall: zfd.text(z.string().optional()),
  discount: zfd.text(z.string().optional()),
  deposit: zfd.text(z.string().optional()),
  months: zfd.text(z.string().optional()),
  total: zfd.text(z.string().optional()),
  biweeklNat: zfd.text(z.string().optional()),
  weeklylNat: zfd.text(z.string().optional()),
  nat60: zfd.text(z.string().optional()),
  biweekly: zfd.text(z.string().optional()),
  desiredPayments: zfd.text(z.string().optional()),
  on60: zfd.text(z.string().optional()),
  weekly: zfd.text(z.string().optional()),
  followUpDay2: zfd.text(z.string().optional()),
  onTax: zfd.text(z.string().optional()),
  weeklyOth: zfd.text(z.string().optional()),
  oth60: zfd.text(z.string().optional()),
  biweekOth: zfd.text(z.string().optional()),
  firstName: zfd.text(z.string().optional()),
  lastName: zfd.text(z.string().optional()),
  qcTax: zfd.text(z.string().optional()),
  qc60: zfd.text(z.string().optional()),
  biweeklyqc: zfd.text(z.string().optional()),
  weeklyqc: zfd.text(z.string().optional()),
  totalWithOptions: zfd.text(z.string().optional()),
  otherTaxWithOptions: zfd.text(z.string().optional()),
  otherTax: zfd.text(z.string().optional()),
  biweeklNatWOptions: zfd.text(z.string().optional()),
  weeklylNatWOptions: zfd.text(z.string().optional()),
  nat60WOptions: zfd.text(z.string().optional()),
  id: zfd.text(z.string().optional()),
  userId: zfd.text(z.string().optional()),
  province: zfd.text(z.string().optional()),
  licensing: zfd.text(z.string().optional()),
  userLabour: zfd.text(z.string().default("265").optional()),
  userTax: zfd.text(z.string().default("13").optional()),
  email: zfd.text(z.string().optional()),
  model: zfd.text(z.string().optional()),
  phone: zfd.text(z.string().optional()),
  address: zfd.text(z.string().optional()),
  year: zfd.text(z.string().optional()),
  stockNum: zfd.text(z.string().optional()),
  labour: zfd.text(z.string().optional()),
  funded: zfd.text(z.string().optional()),
  sliderWidth: zfd.text(z.string().optional()),
  searchTerm: zfd.text(z.string().optional()),
  accessories: zfd.numeric(z.number().optional()),
  options: zfd.text(z.string().optional()),
  brand: zfd.text(z.string().optional()),
  notified: zfd.text(z.string().optional()),

  model1: zfd.text(z.string().optional()),
  commodity: zfd.text(z.string().optional()),
  activixId: zfd.text(z.string().optional()),
  paintPrem: zfd.text(z.string().optional()),
  deliveryCharge: zfd.numeric(z.number().optional()),
  omvicNumber: zfd.text(z.string().optional()),
  dealerPhone: zfd.text(z.string().optional()),
  dealerAccountId: zfd.text(z.string().optional()),
  dealerProv: zfd.text(z.string().optional()),
  dealerAddress: zfd.text(z.string().optional()),
  freight: zfd.text(z.string().optional()),
  admin: zfd.text(z.string().optional()),
  activisUserId: zfd.text(z.string().optional()),
  toStock: zfd.text(z.string().optional()),
  activixEmail: zfd.text(z.string().optional()),
  pdi: zfd.text(z.string().optional()),
  discountPer: zfd.text(z.string().optional()),
  promised_date: zfd.text(z.string().optional()),
  dob: zfd.text(z.string().optional()),
  color: zfd.text(z.string().optional()),
  msrp: zfd.text(z.string().optional()),
  modelCode: zfd.text(z.string().optional()),
  trade: zfd.text(z.string().optional()),
  biminiCr: zfd.text(z.string().optional()),
  colorCruise: zfd.text(z.string().optional()),
  wallCol: zfd.text(z.string().optional()),
  wallGraphic: zfd.text(z.string().optional()),
  furnitureColor: zfd.text(z.string().optional()),
  descfup: zfd.text(z.string().optional()),
  twodayfup: zfd.text(z.string().optional()),
  colorExplore: zfd.text(z.string().optional()),
  wallGraphicAccentLX: zfd.text(z.string().optional()),
  fibreGlassPodsLX: zfd.text(z.string().optional()),
  powderCoatLX: zfd.text(z.string().optional()),
  flooringLX: zfd.text(z.string().optional()),
  signature: zfd.text(z.string().optional()),
  select: zfd.text(z.string().optional()),
  tubeColor: zfd.text(z.string().optional()),
  selRFXPkgLX: zfd.text(z.string().optional()),
  selRFXWPkgLX: zfd.text(z.string().optional()),
  blkPkg: zfd.text(z.string().optional()),
  colMatchedFiberLX: zfd.text(z.string().optional()),
  powderCoatingLX: zfd.text(z.string().optional()),
  blackAnoLX: zfd.text(z.string().optional()),
  JLTowerLX: zfd.text(z.string().optional()),
  premiumJLLX: zfd.text(z.string().optional()),
  premAudioPkg: zfd.text(z.string().optional()),
  fibreglassFrontXT: zfd.text(z.string().optional()),
  JlPremiumAudio: zfd.text(z.string().optional()),
  JLPremiumxt: zfd.text(z.string().optional()),
  dts: zfd.text(z.string().optional()),
  verado: zfd.text(z.string().optional()),
  battery: zfd.text(z.string().optional()),
  gps: zfd.text(z.string().optional()),
  saltwaterPkg: zfd.text(z.string().optional()),
  propeller: zfd.text(z.string().optional()),
  baseInst: zfd.text(z.string().optional()),
  cupHolder: zfd.text(z.string().optional()),
  multiHolder: zfd.text(z.string().optional()),
  cooler13: zfd.text(z.string().optional()),
  coolerExtension: zfd.text(z.string().optional()),
  coolerBag14: zfd.text(z.string().optional()),
  singleHolder: zfd.text(z.string().optional()),
  stemwareHolder: zfd.text(z.string().optional()),
  cargoBox10: zfd.text(z.string().optional()),
  cargoBox20: zfd.text(z.string().optional()),
  cargoBox30: zfd.text(z.string().optional()),
  rodHolder: zfd.text(z.string().optional()),
  batteryCharger: zfd.text(z.string().optional()),
  bowFillerBench: zfd.text(z.string().optional()),
  portAquaLounger: zfd.text(z.string().optional()),
  skiTowMirror: zfd.text(z.string().optional()),
  XTPremiumcolor: zfd.text(z.string().optional()),
  intColor1: zfd.text(z.string().optional()),
  manitouOptionsId: zfd.text(z.string().optional()),
  BEandTR: zfd.text(z.string().optional()),
  licensingMan: zfd.text(z.string().optional()),
  licensingManTr: zfd.text(z.string().optional()),
  motor: zfd.text(z.string().optional()),
  sigPkgCruise: zfd.text(z.string().optional()),
  wallColCr: zfd.text(z.string().optional()),
  sigPkgExplore: zfd.text(z.string().optional()),
  selPkgExplore: zfd.text(z.string().optional()),
  tubesExplore: zfd.text(z.string().optional()),
  wallColorExplore: zfd.text(z.string().optional()),
  sigPkgLX: zfd.text(z.string().optional()),
  blkPkgLX: zfd.text(z.string().optional()),
  wallColorLX: zfd.text(z.string().optional()),
  wallGraphicLX: zfd.text(z.string().optional()),
  furnitureLX: zfd.text(z.string().optional()),
  blackoutPkgXT: zfd.text(z.string().optional()),
  signaturePkgXT: zfd.text(z.string().optional()),
  powderCoatXT: zfd.text(z.string().optional()),
  weeklyOthWOptions: zfd.text(z.string().optional()),
  biweekOthWOptions: zfd.text(z.string().optional()),
  oth60WOptions: zfd.text(z.string().optional()),
  username: zfd.text(z.string().optional()),
  fuser: zfd.text(z.string().optional()),
  lname: zfd.text(z.string().optional()),
  defaultUserRole: zfd.text(z.string().optional()),
  position: zfd.text(z.string().optional()),
  postalCode: zfd.text(z.string().optional()),
  subscriptionId: zfd.text(z.string().optional()),
  returning: zfd.text(z.string().optional()),
  _action: zfd.text(z.string().optional()),
  subCat: zfd.text(z.string().optional()),
  script: zfd.text(z.string().optional()),
  intent: zfd.text(z.string().optional()),
  userExtWarr: zfd.text(z.string().optional()),
  status: z.string().default("Active").optional(),
  bikeStatus: zfd.text(z.string().optional()),
  userLicensing: zfd.numeric(z.number().default(65).optional()),
  userMarketAdj: zfd.text(z.string().optional()),
  userGap: zfd.numeric(z.number().optional()),
  userServicespkg: zfd.numeric(z.number().optional()),
  vinE: zfd.numeric(z.number().optional()),
  lifeDisability: zfd.numeric(z.number().optional()),

  rustProofing: zfd.numeric(z.number().optional()),
  destinationCharge: zfd.numeric(z.number().optional()),
  userLoanProt: zfd.numeric(z.number().optional()),
  userTireandRim: zfd.text(z.string().optional()),
  userFreight: zfd.text(z.string().optional()),
  userAdmin: zfd.text(z.string().optional()),
  userGasOnDel: zfd.text(z.string().optional()),
  userOther: zfd.numeric(z.number().optional()),
  userAirTax: zfd.text(z.string().optional()),
  userTireTax: zfd.text(z.string().optional()),
  userFinance: zfd.text(z.string().optional()),

  userDemo: zfd.text(z.string().optional()),
  userGovern: zfd.text(z.string().optional()),
  userCommodity: zfd.text(z.string().optional()),
  userPDI: zfd.text(z.string().optional()),
  subscriptions: zfd.text(z.string().optional()),
  customer: zfd.text(z.string().optional()),
  fname: zfd.text(z.string().optional()),
  dealer: zfd.text(z.string().optional()),
  userPhone: zfd.text(z.string().optional()),
  user: zfd.text(z.string().optional()),

  // bmw
  designW: zfd.text(z.string().optional()),
  loweringKit: zfd.text(z.string().optional()),
  forgedWheels: zfd.text(z.string().optional()),
  carbonWheels: zfd.text(z.string().optional()),
  centerStand: zfd.text(z.string().optional()),
  billetPack1: zfd.text(z.string().optional()),
  billetPack2: zfd.text(z.string().optional()),
  heatedSeat: zfd.text(z.string().optional()),
  lugRack: zfd.text(z.string().optional()),
  lugRackBrackets: zfd.text(z.string().optional()),
  chargeSocket: zfd.text(z.string().optional()),
  auxLights: zfd.text(z.string().optional()),
  mLightBat: zfd.text(z.string().optional()),
  carbonPkg: zfd.text(z.string().optional()),
  enduroPkg: zfd.text(z.string().optional()),
  sportShield: zfd.text(z.string().optional()),
  sportWheels: zfd.text(z.string().optional()),
  sportSeat: zfd.text(z.string().optional()),
  brownBench: zfd.text(z.string().optional()),
  brownSeat: zfd.text(z.string().optional()),
  handleRisers: zfd.text(z.string().optional()),
  lgihtsPkg: zfd.text(z.string().optional()),
  fogLights: zfd.text(z.string().optional()),
  pilSeatCover: zfd.text(z.string().optional()),
  lapTimer: zfd.text(z.string().optional()),
  floorLight: zfd.text(z.string().optional()),
  blackBench: zfd.text(z.string().optional()),
  hillStart: zfd.text(z.string().optional()),
  floorboards: zfd.text(z.string().optional()),
  reverse: zfd.text(z.string().optional()),
  forkTubeTrim: zfd.text(z.string().optional()),
  spokedW: zfd.text(z.string().optional()),
  lockGasCap: zfd.text(z.string().optional()),
  aeroWheel: zfd.text(z.string().optional()),
  psgrBench719: zfd.text(z.string().optional()),
  blackS719: zfd.text(z.string().optional()),
  aero719: zfd.text(z.string().optional()),
  pinstripe: zfd.text(z.string().optional()),
  designPkgBL: zfd.text(z.string().optional()),
  benchseatlow: zfd.text(z.string().optional()),
  iconWheel: zfd.text(z.string().optional()),
  centreStand: zfd.text(z.string().optional()),
  tubeHandle: zfd.text(z.string().optional()),
  classicWheels: zfd.text(z.string().optional()),
  blackContrastwheel: zfd.text(z.string().optional()),
  silverContastWheel: zfd.text(z.string().optional()),
  silverWheel: zfd.text(z.string().optional()),
  activeCruise: zfd.text(z.string().optional()),
  blackPowertrain: zfd.text(z.string().optional()),
  blackWheel: zfd.text(z.string().optional()),
  m1000rMPkg: zfd.text(z.string().optional()),
  m1000rTitEx: zfd.text(z.string().optional()),
  desOption: zfd.text(z.string().optional()),
  m1000rrMPkg: zfd.text(z.string().optional()),
  s1000rrRacePkg: zfd.text(z.string().optional()),
  userRole: zfd.text(z.string().optional()),
  s1000rrRacePkg2: zfd.text(z.string().optional()),
  f7gsConn: zfd.text(z.string().optional()),
  f8gsDblSeat: zfd.text(z.string().optional()),
  r12rtAudioSystem: zfd.text(z.string().optional()),
  f9xrHandProtectors: zfd.text(z.string().optional()),
  r12gsCrossGld: zfd.text(z.string().optional()),
  r12gsSpSusp: zfd.text(z.string().optional()),
  r12gsProtBar: zfd.text(z.string().optional()),
  r12gsCrossBlk: zfd.text(z.string().optional()),
  audioSystem: zfd.text(z.string().optional()),
  highShield: zfd.text(z.string().optional()),
  comfortSeat: zfd.text(z.string().optional()),
  psgrKit: zfd.text(z.string().optional()),
  alarm: zfd.text(z.string().optional()),
  chain: zfd.text(z.string().optional()),
  comfortPkg: zfd.text(z.string().optional()),
  touringPkg: zfd.text(z.string().optional()),
  password: zfd.text(z.string().optional()),
  activePkg: zfd.text(z.string().optional()),
  dynamicPkg: zfd.text(z.string().optional()),
  offTire: zfd.text(z.string().optional()),
  keyless: zfd.text(z.string().optional()),
  passengerKitLowSeat: zfd.text(z.string().optional()),
  headlightPro: zfd.text(z.string().optional()),
  shiftAssPro: zfd.text(z.string().optional()),
  psgrKitLowSeat: zfd.text(z.string().optional()),
  tpc: zfd.text(z.string().optional()),
  cruise: zfd.text(z.string().optional()),
  windshield: zfd.text(z.string().optional()),
  handleBar: zfd.text(z.string().optional()),
  extraHighSeat: zfd.text(z.string().optional()),
  alumTank1: zfd.text(z.string().optional()),
  alumTank2: zfd.text(z.string().optional()),
  classicW: zfd.text(z.string().optional()),
  silencer: zfd.text(z.string().optional()),
  chromedExhaust: zfd.text(z.string().optional()),
  crossW: zfd.text(z.string().optional()),
  highSeat: zfd.text(z.string().optional()),
  lowKitLowSeat: zfd.text(z.string().optional()),
  lowSeat: zfd.text(z.string().optional()),
  comfortPsgrSeat: zfd.text(z.string().optional()),
  mPsgrSeat: zfd.text(z.string().optional()),
  aeroPkg719: zfd.text(z.string().optional()),
  subject: zfd.text(z.string().optional()),
  customContent: zfd.text(z.string().optional()),
  author: zfd.text(z.string().optional()),
  customerId: zfd.text(z.string().optional()),
  contactMethod: zfd.text(z.string().optional()),
  apptDay: zfd.text(z.string().optional()),
  apptTime: zfd.text(z.string().optional()),
  appointment: zfd.text(z.string().optional()),
  completed: zfd.text(z.string().optional()),
  apptStatus: zfd.text(z.string().optional()),

  lastContact: zfd.text(z.string().optional()),
  customerState: zfd.text(z.string().optional()),
  result: zfd.text(z.string().optional()),
  timesContacted: zfd.text(z.string().optional()),
  nextAppointment: zfd.text(z.string().optional()),
  completeCall: zfd.text(z.string().optional()),
  followUpDay: zfd.text(z.string().default("3")).optional(),
  state: z.string().default("Pending").optional(),

  notes: zfd.text(z.string().optional()),
  visits: zfd.text(z.string().optional()),
  progress: zfd.text(z.string().optional()),
  apptType: zfd.text(z.string().optional()),
  pending: zfd.text(z.string().optional()),
  pickUpDate: zfd.text(z.string().optional()),
  referral: zfd.text(z.string().optional()),
  visited: zfd.text(z.string().optional()),
  bookedApt: zfd.text(z.string().optional()),
  aptShowed: zfd.text(z.string().optional()),
  reached: zfd.text(z.string().optional()),
  attempted: zfd.text(z.string().optional()),
  aptNoShowed: zfd.text(z.string().optional()),
  testDrive: zfd.text(z.string().optional()),
  metService: zfd.text(z.string().optional()),
  metManager: zfd.text(z.string().optional()),
  metParts: zfd.text(z.string().optional()),
  sold: zfd.text(z.string().optional()),
  depositMade: zfd.text(z.string().optional()),
  refund: zfd.text(z.string().optional()),
  turnOver: zfd.text(z.string().optional()),
  financeApp: zfd.text(z.string().optional()),
  approved: zfd.text(z.string().optional()),
  signed: zfd.text(z.string().optional()),
  pickUpSet: zfd.text(z.string().optional()),
  demoed: zfd.text(z.string().optional()),
  delivered: zfd.text(z.string().optional()),
  metSalesperson: zfd.text(z.string().optional()),
  metFinance: zfd.text(z.string().optional()),
  financeApplication: zfd.text(z.string().optional()),
  docsSign: zfd.text(z.string().optional()),
  seenTrade: zfd.text(z.string().default("0").optional()),
  tradeRepairs: zfd.text(z.string().optional()),
  pickUpTime: zfd.text(z.string().optional()),
  urgentFinanceNote: zfd.text(z.string().optional()),

  tradeTrim: zfd.text(z.string().optional()),
  trim: zfd.text(z.string().optional()),
  vin: zfd.text(z.string().optional()),
  lastNote: zfd.text(z.string().optional()),
  dLCopy: zfd.text(z.string().optional()),
  insCopy: zfd.text(z.string().optional()),
  testDrForm: zfd.text(z.string().optional()),
  voidChq: zfd.text(z.string().optional()),
  loanOther: zfd.text(z.string().optional()),
  signBill: zfd.text(z.string().optional()),
  ucda: zfd.text(z.string().optional()),
  tradeInsp: zfd.text(z.string().optional()),
  customerWS: zfd.text(z.string().optional()),
  otherDocs: zfd.text(z.string().optional()),
  start: zfd.text(z.string().optional()),
  end: zfd.text(z.string().optional()),
  note: zfd.text(z.string().optional()),
  unit: zfd.text(z.string().optional()),
  phoneId: zfd.text(z.string().optional()),
  vehicleIdWanted: zfd.text(z.string().optional()),
  vehicleIdWTrade: zfd.text(z.string().optional()),
  emailId: zfd.text(z.string().optional()),
  todaysGoalGuest: zfd.text(z.string().optional()),
  todaysActualGuest: zfd.text(z.string().optional()),
  differenceGuest: zfd.text(z.string().optional()),
  monthsGoalGuest: zfd.text(z.string().optional()),
  todaysGoalTestDrives: zfd.text(z.string().optional()),
  todaysActualTestDrives: zfd.text(z.string().optional()),
  differenceTestDrives: zfd.text(z.string().optional()),
  monthsGoalTestDrives: zfd.text(z.string().optional()),
  todaysGoalWriteUps: zfd.text(z.string().optional()),
  todaysActualWriteUps: zfd.text(z.string().optional()),
  differenceWriteUps: zfd.text(z.string().optional()),
  monthsGoalWriteUps: zfd.text(z.string().optional()),
  whichVehicle: zfd.text(z.string().optional()),
  todaysGoalDeliveries: zfd.text(z.string().optional()),
  todaysActualDeliveries: zfd.text(z.string().optional()),
  differenceDeliveries: zfd.text(z.string().optional()),
  monthsGoalDeliveries: zfd.text(z.string().optional()),
  activixRoute: zfd.text(z.string().optional()),
  mileage: zfd.text(z.string().optional()),
  tradeMileage: zfd.text(z.string().optional()),
  expectedOn: zfd.text(z.string().optional()),
  orderStatus: zfd.text(z.string().optional()),
  seenOwnership: zfd.text(z.string().optional()),
  originalOwner: zfd.text(z.string().optional()),
  vinChecked: zfd.text(z.string().optional()),
  orignialVinPlate: zfd.text(z.string().optional()),
  registeredLien: zfd.text(z.string().optional()),
  totalLoss: zfd.text(z.string().optional()),
  theftRecovery: zfd.text(z.string().optional()),
  manuWarrCancelled: zfd.text(z.string().optional()),
  outOfProv: zfd.text(z.string().optional()),
  usVehicle: zfd.text(z.string().optional()),
  dailyRental: zfd.text(z.string().optional()),
  fireDmg: zfd.text(z.string().optional()),
  waterDmg: zfd.text(z.string().optional()),
  policeCruiser: zfd.text(z.string().optional()),
  paintedBodyPanels: zfd.text(z.string().optional()),
  absInoperable: zfd.text(z.string().optional()),
  polutionInoperable: zfd.text(z.string().optional()),
  repairsTransmission: zfd.text(z.string().optional()),
  repairsSuspSubframe: zfd.text(z.string().optional()),
  repairsFuelSystem: zfd.text(z.string().optional()),
  repairsPowerTrain: zfd.text(z.string().optional()),
  repairsECU: zfd.text(z.string().optional()),
  repairsElectrical: zfd.text(z.string().optional()),
  repairsStructuralFrameDamage: zfd.text(z.string().optional()),
  alteredOrRepaired: zfd.text(z.string().optional()),
  decalsBadges: zfd.text(z.string().optional()),
  dmgExcess3000: zfd.text(z.string().optional()),
  countsInPerson: zfd.text(z.string().optional()),
  countsPhone: zfd.text(z.string().optional()),
  countsSMS: zfd.text(z.string().optional()),
  countsEmail: zfd.text(z.string().optional()),
  countsOther: zfd.text(z.string().optional()),
  addFU: zfd.text(z.string().optional()),
  addDetailedFU: zfd.text(z.string().optional()),
  timeOfDayModal: zfd.text(z.string().optional()),
  titleModal: zfd.text(z.string().optional()),
  noteModal: zfd.text(z.string().optional()),
  contactMethodModal: zfd.text(z.string().optional()),
  dateModal: zfd.text(z.string().optional()),
  globalSearch: zfd.text(z.string().optional()),
})
export default financeFormSchema
