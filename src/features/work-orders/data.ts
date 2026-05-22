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