import { prisma } from "@/lib/prisma";

export async function getMaterials(organizationId: string) {
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