import { prisma } from "@/lib/prisma";
import { Priority, WorkOrderStatus } from "@/generated/prisma/enums";

export async function getDashboardData(organizationId: string) {
  const [organization, openToday, inProgress, urgentWorkOrders] =
    await Promise.all([
      prisma.organization.findUnique({
        where: {
          id: organizationId,
        },
        include: {
          workOrders: {
            include: {
              client: true,
              assignments: {
                include: {
                  user: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 3,
          },
          materials: {
            orderBy: {
              quantityOnHand: "asc",
            },
            take: 1,
          },
        },
      }),

      prisma.workOrder.count({
        where: {
          organizationId,
          status: {
            in: [
              WorkOrderStatus.SCHEDULED,
              WorkOrderStatus.ASSIGNED,
              WorkOrderStatus.IN_PROGRESS,
            ],
          },
        },
      }),

      prisma.workOrder.count({
        where: {
          organizationId,
          status: WorkOrderStatus.IN_PROGRESS,
        },
      }),

      prisma.workOrder.findMany({
        where: {
          organizationId,
          OR: [
            {
              priority: Priority.URGENT,
              status: {
                not: WorkOrderStatus.COMPLETED,
              },
            },
            {
              assignments: {
                none: {},
              },
              status: {
                in: [WorkOrderStatus.SCHEDULED, WorkOrderStatus.ASSIGNED],
              },
            },
          ],
        },
        select: {
          id: true,
        },
      }),
    ]);

  return {
    organization,
    metrics: {
      openToday,
      inProgress,
      needsAttention: urgentWorkOrders.length,
    },
  };
}