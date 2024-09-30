import { json, type LoaderFunction } from "@remix-run/node";
import { prisma } from "~/libs";

export async function loader({ request, params }: LoaderFunction) {
  const dept = params.dept
  let getData = await prisma.accHandoff.findMany({
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      sendTo: true,
      handOffTime: true,
      status: true,
      sendToCompleted: true,
      completedTime: true,
      notes: true,
      AccOrderId: true,
      AccOrder: {
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
          clientfileId: true,
          workOrderId: true,
          financeId: true,
          note: true,
          AccessoriesOnOrders: {
            select: {
              id: true,
              quantity: true,
              accOrderId: true,
              status: true,
              orderNumber: true,
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
                  note: true,
                },
              },
            },
          },
          Payments: {
            select: {
              id: true,
              createdAt: true,
              accOrderId: true,
              paymentType: true,
              amountPaid: true,
              cardNum: true,
              receiptId: true,
            },
          },
          Finance: {
            select: {
              //
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
          Clientfile: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              financeId: true,
              userId: true,
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
            }
          },
          AccHandoff: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              sendTo: true,
              handOffTime: true,
              status: true,
              sendToCompleted: true,
              completedTime: true,
              notes: true,
              AccOrderId: true,
            }
          }
        }
      }
    },

  });

  // console.log(getData, 'getData')
  return getData
}
