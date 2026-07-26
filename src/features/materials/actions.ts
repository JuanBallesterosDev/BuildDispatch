"use server";

import { redirect } from "next/navigation";
import { canManageWorkOrders } from "@/features/auth/policies";
import { getCurrentUserContext } from "@/features/auth/user-context";
import { prisma } from "@/lib/prisma";

export type CreateMaterialState = {
  error?: string;
};
export async function createMaterialAction(
  _previousState: CreateMaterialState,
  formData: FormData,
): Promise<CreateMaterialState> {
  const context = await getCurrentUserContext();

  if (!canManageWorkOrders(context.role)) {
    return {
      error: "You do not have permission to create materials.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const quantityOnHand = Number(formData.get("quantityOnHand") ?? 0);
  const reorderLevel = Number(formData.get("reorderLevel") ?? 0);

  if (!name || !unit) {
    return {
      error: "Material name and unit are required.",
    };
  }

  if (
    !Number.isInteger(quantityOnHand) ||
    quantityOnHand < 0 ||
    !Number.isInteger(reorderLevel) ||
    reorderLevel < 0
  ) {
    return {
      error: "Quantities must be valid non-negative whole numbers.",
    };
  }

  await prisma.material.create({
    data: {
      organizationId: context.organization.id,
      name,
      sku: sku || null,
      unit,
      quantityOnHand,
      reorderLevel,
    },
  });

  redirect("/materials");
}