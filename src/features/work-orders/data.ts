import { prisma } from "@/lib/prisma";

export async function getWorkOrderFormData(organizationId: string) {
  const clients = await prisma.client.findMany({
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
  });

  return {
    clients,
  };
}