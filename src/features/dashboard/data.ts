import { prisma } from "@/lib/prisma";

export async function getDemoDashboard() {
  const organization = await prisma.organization.findUnique({
    where: {
      slug: "northline-mechanical-build",
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
  });

  return organization;
}
