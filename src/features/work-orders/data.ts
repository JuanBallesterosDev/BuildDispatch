import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export async function getWorkOrderFormData(organizationId: string) {
  const [clients, assignableUsers] = await Promise.all([
    prisma.client.findMany({
      where: {
        organizationId,
      },
      include: {
        jobSites: {
          orderBy: {
            name: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    }),

    prisma.user.findMany({
      where: {
        memberships: {
          some: {
            organizationId,
            role: {
              in: [Role.ADMIN, Role.DISPATCHER, Role.TECHNICIAN],
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return {
    clients,
    assignableUsers,
  };
}

export async function getWorkOrders(organizationId: string) {
  const workOrders = await prisma.workOrder.findMany({
    where: {
      organizationId,
    },
    include: {
      client: true,
      jobSite: true,
      assignments: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return workOrders;
}

export async function getWorkOrderById(
  organizationId: string,
  workOrderId: string,
) {
  const workOrder = await prisma.workOrder.findFirst({
    where: {
      id: workOrderId,
      organizationId,
    },
    include: {
      client: true,
      jobSite: true,
      assignments: {
        include: {
          user: true,
        },
      },
      fieldNotes: {
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      materialUsages: {
        include: {
          material: true,
        },
        orderBy: {
          usedAt: "desc",
        },
      },
      serviceReports: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return workOrder;
}

export async function getMaterialsForOrganization(organizationId: string) {
  const materials = await prisma.material.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      name: "asc",
    },
  });

  return materials;
}