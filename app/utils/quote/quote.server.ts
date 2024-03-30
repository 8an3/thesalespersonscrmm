import { GetUser } from "~/utils/loader.server";
import { prisma } from "~/libs";
import { CreateCommunications, CompleteTask, QuoteCreateLead, CreateTask, } from '../../routes/api.activix';
export async function QuoteServer(clientData, financeId, email, financeData, dashData) {
  const user = await prisma.user.findUnique({ where: { email: clientData.userEmail } })
  const formData = {
    ...clientData,
    ...dashData,
    ...financeData,
  }
  delete clientData.userEmail
  let createActivixLead
  if (user?.activixActivated === 'yes') { createActivixLead = await QuoteCreateLead(formData) }
  // console.log(createActivixLead.data.id, 'data.id')
  try {
    const existingClientFile = await prisma.clientfile.findUnique({ where: { email: email, }, });
    let clientFileId;
    if (existingClientFile) {
      clientFileId = existingClientFile.id;
      console.log(clientFileId, "ClientFile record already exists. Skipping creation.");
      const finance = await prisma.finance.create({ data: { ...financeData, }, });
      const dashboard = await prisma.dashboard.create({
        data: {
          ...dashData,
          clientfileId: clientFileId,
          financeId: finance.id, // Assuming the financeId is a foreign key in the dashboard table
        },
      });
      let addFinanceId
      let newActivix

      addFinanceId = await prisma.finance.update({
        where: { id: finance.id, },
        data: {
          dashboardId: dashboard.id,
          financeId: finance.id,
          clientfileId: clientFileId,
        },
      });
      return { finance, dashboard, addFinanceId, newActivix };
    }




    // If a clientFile with the given email does not exist, create a new one
    if (!existingClientFile) {
      console.log('!existingClientFile')
      const newClientFile = await prisma.clientfile.create({
        data: {
          ...clientData,
          userId: user.id,
        }
      });
      clientFileId = newClientFile.id;
      console.log(clientFileId, "ClientFile record created successfully");
      const finance = await prisma.finance.create({
        data: {
          ...financeData,
          userEmail: user.email,
        }
      });

      const dashboard = await prisma.dashboard.create({
        data: {
          ...dashData,
          userEmail: user.email,

          clientfileId: clientFileId,
          financeId: finance.id, // Assuming the financeId is a foreign key in the dashboard table
        },
      });

      const addFinanceId = await prisma.finance.update({
        where: {
          id: finance.id,
        },
        data: {
          userEmail: user?.email,
          dashboardId: dashboard.id,
          financeId: finance.id,
          clientfileId: newClientFile.id,
        },
      });
      console.log('addFinanceId', addFinanceId)
      const addFinanceId2 = await prisma.clientfile.update({
        where: {
          id: clientFileId
        },
        data: {
          userId: user.id,

          financeId: finance.id
        }
      })
      console.log('addFinanceId2', addFinanceId2)
      return { finance, dashboard, addFinanceId, addFinanceId2 };
    }
    // If a clientFile with the given email does not exist, create a new one
  } catch (error) {
    console.error("Error creating ClientFile record:", error);
    // Consider throwing the error or handling it in a way that's appropriate for your application
  }
}

export async function QuoteServerActivix(clientData, financeId, email, financeData, dashData) {
  const user = await prisma.user.findUnique({ where: { email: clientData.userEmail } })
  const formData = {
    ...clientData,
    ...dashData,
    ...financeData,
  }
  delete clientData.userEmail
  let createActivixLead
  createActivixLead = await QuoteCreateLead(formData)
  console.log(createActivixLead.data.id, 'data.id')
  const activixId = createActivixLead.data.id.toString()
  try {
    const existingClientFile = await prisma.clientfile.findUnique({ where: { email: email, }, });
    let clientFileId;
    if (existingClientFile) {
      clientFileId = existingClientFile.id;
      console.log(clientFileId, "ClientFile record already exists. Skipping creation.");
      const finance = await prisma.finance.create({ data: { activixId: activixId, ...financeData, }, });
      const dashboard = await prisma.dashboard.create({
        data: {
          ...dashData,
          clientfileId: clientFileId,
          financeId: finance.id, // Assuming the financeId is a foreign key in the dashboard table
        },
      });
      let addFinanceId
      let newActivix
      const data = createActivixLead.data
      newActivix = await prisma.activixLead.create({
        data: {
          activixId: activixId ?? null,
          account_id: data.account_id.toString() ?? null,
          customer_id: data.customer_id.toString() ?? null,
          phoneId: data.phones[0].id.toString() ?? null,
          vehicleIdWanted: data.vehicles[1].id.toString() ?? null,
          vehicleIdWTrade: data.vehicles[0].id.toString() ?? null,
          emailId: data.emails[0].id.toString() ?? null,
          appointment_date: data.appointment_date ?? null,
          phone_appointment_date: data.phone_appointment_date ?? null,
          available_date: data.available_date ?? null,
          be_back_date: data.be_back_date ?? null,
          call_date: data.call_date ?? null,
          created_at: data.created_at ?? null,
          csi_date: data.csi_date ?? null,
          delivered_date: data.delivered_date ?? null,
          deliverable_date: data.deliverable_date ?? null,
          delivery_date: data.delivery_date ?? null,
          paperwork_date: data.paperwork_date ?? null,
          presented_date: data.presented_date ?? null,
          //   promised_date: data.promised_date ?? null,
          financed_date: data.financed_date ?? null,
          road_test_date: data.road_test_date ?? null,
          home_road_test_date: data.home_road_test_date ?? null,
          sale_date: data.sale_date ?? null,
          updated_at: data.updated_at ?? null,
          address_line1: data.address_line1 ?? null,
          city: data.city ?? null,
          civility: data.civility ?? null,
          country: data.country ?? null,
          credit_approved: data.credit_approved ? data.credit_approved.toString() : null,
          dealer_tour: data.creditdealer_tour_approved ? data.dealer_tour.toString() : null,
          financial_institution: data.financial_institution ?? null,
          first_name: data.first_name ?? null,
          funded: data.funded ? data.funded.toString() : null,
          inspected: data.inspected ? data.inspected.toString() : null,
          last_name: data.last_name ?? null,
          postal_code: data.postal_code ?? null,
          province: data.province ?? null,
          result: data.result ?? null,
          status: data.status ?? null,
          type: data.type ?? null,
          walk_around: data.walk_around ? data.walk_around.toString() : null,
          comment: data.comment ?? null,
          delivered_by: data.delivered_by ?? null,
          emails: data.emails[0].address ?? null,
          phones: data.phones[0].number ?? null,
          financeId: data.financeId ?? null,
          userEmail: user?.email ?? null,
        }
      })
      addFinanceId = await prisma.finance.update({
        where: { id: finance.id, },
        data: {
          dashboardId: dashboard.id,
          financeId: finance.id,
          clientfileId: clientFileId,
          theRealActId: newActivix.id,
          activixId: activixId
        },
      });
      if (!existingClientFile) {
        console.log('!existingClientFile')
        const newClientFile = await prisma.clientfile.create({
          data: {
            ...clientData,
            userId: user.id,
          }
        });
        clientFileId = newClientFile.id;
        console.log(clientFileId, "ClientFile record created successfully");
        const finance = await prisma.finance.create({
          data: {
            ...financeData,
            userEmail: user.email,
          }
        });

        const dashboard = await prisma.dashboard.create({
          data: {
            ...dashData,
            userEmail: user.email,

            clientfileId: clientFileId,
            financeId: finance.id, // Assuming the financeId is a foreign key in the dashboard table
          },
        });

        const addFinanceId = await prisma.finance.update({
          where: {
            id: finance.id,
          },
          data: {
            userEmail: user?.email,
            dashboardId: dashboard.id,
            financeId: finance.id,
            clientfileId: newClientFile.id,
          },
        });
        console.log('addFinanceId', addFinanceId)
        const addFinanceId2 = await prisma.clientfile.update({
          where: {
            id: clientFileId
          },
          data: {
            userId: user.id,

            financeId: finance.id
          }
        })
        console.log('addFinanceId2', addFinanceId2)
        return { finance, dashboard, addFinanceId, addFinanceId2 };
      }

      return { finance, dashboard, addFinanceId, newActivix };
    }




    // If a clientFile with the given email does not exist, create a new one
    if (!existingClientFile) {
      console.log('!existingClientFile')
      const newClientFile = await prisma.clientfile.create({
        data: {
          ...clientData,
          userId: user.id,
        }
      });
      clientFileId = newClientFile.id;
      console.log(clientFileId, "ClientFile already exists. Skipping creation.");
      const finance = await prisma.finance.create({
        data: {
          ...financeData,
          userEmail: user.email,
          activixId: activixId,
        }
      });

      const dashboard = await prisma.dashboard.create({
        data: {
          ...dashData,
          userEmail: user.email,

          clientfileId: clientFileId,
          financeId: finance.id, // Assuming the financeId is a foreign key in the dashboard table
        },
      });

      let addFinanceId
      let newActivix
      const data = createActivixLead.data
      newActivix = await prisma.activixLead.create({
        data: {
          activixId: activixId,
          account_id: data.account_id.toString(),
          customer_id: data.customer_id.toString(),
          phoneId: data.phones[0]?.id?.toString() ?? null,
          vehicleIdWanted: data.vehicles[1]?.id?.toString() ?? null,
          vehicleIdWTrade: data.vehicles[0]?.id?.toString() ?? null,
          emailId: data.emails[0]?.id?.toString() ?? null,

          appointment_date: data.appointment_date ?? null,
          phone_appointment_date: data.phone_appointment_date ?? null,
          available_date: data.available_date ?? null,
          be_back_date: data.be_back_date ?? null,
          call_date: data.call_date ?? null,
          created_at: data.created_at ?? null,
          csi_date: data.csi_date ?? null,
          delivered_date: data.delivered_date ?? null,
          deliverable_date: data.deliverable_date ?? null,
          delivery_date: data.delivery_date ?? null,
          paperwork_date: data.paperwork_date ?? null,
          presented_date: data.presented_date ?? null,
          //   promised_date: data.promised_date ?? null,
          financed_date: data.financed_date ?? null,
          road_test_date: data.road_test_date ?? null,
          home_road_test_date: data.home_road_test_date ?? null,
          sale_date: data.sale_date ?? null,
          updated_at: data.updated_at ?? null,
          address_line1: data.address_line1 ?? null,
          city: data.city ?? null,
          civility: data.civility ?? null,
          country: data.country ?? null,
          credit_approved: data.credit_approved ? data.credit_approved.toString() : null,
          dealer_tour: data.creditdealer_tour_approved ? data.dealer_tour.toString() : null,
          financial_institution: data.financial_institution,
          first_name: data.first_name ?? null,
          funded: data.funded ? data.funded.toString() : null,
          inspected: data.inspected ? data.inspected.toString() : null,
          last_name: data.last_name ?? null,
          postal_code: data.postal_code ?? null,
          province: data.province ?? null,
          result: data.result ?? null,
          status: data.status ?? null,
          type: data.type ?? null,
          walk_around: data.walk_around ? data.walk_around.toString() : null,
          comment: data.comment ?? null,
          delivered_by: data.delivered_by ?? null,
          emails: data.emails[0].address ?? null,
          phones: data.phones[0].number ?? null,
          financeId: data.financeId ?? null,
          userEmail: user?.email ?? null,
        }
      })
      addFinanceId = await prisma.finance.update({
        where: { id: finance.id, },
        data: {
          dashboardId: dashboard.id ?? null,
          financeId: finance.id ?? null,
          clientfileId: clientFileId ?? null,
          theRealActId: newActivix.id ?? null,
          activixId: activixId ?? null,
        },
      });
      const addFinanceId2 = await prisma.clientfile.update({
        where: {
          id: clientFileId
        },
        data: {
          userId: user.id,
          financeId: finance.id
        }
      })
      console.log('addFinanceId2', addFinanceId2)
      return { finance, dashboard, addFinanceId, addFinanceId2, newActivix };
    }
    // If a clientFile with the given email does not exist, create a new one
  } catch (error) {
    console.error("Error creating ClientFile record:", error);
    // Consider throwing the error or handling it in a way that's appropriate for your application
  }
}
