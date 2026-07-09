"use server";

import { redirect } from "next/navigation";
import { getCurrentUserContext } from "@/features/auth/user-context";
import { hasAnyRole } from "@/features/auth/permissions";
import { prisma } from "@/lib/prisma";
import { canCreateClients } from "@/features/auth/policies";

export async function createClientAction(formData: FormData) {
  const context = await getCurrentUserContext();

  if (!canCreateClients(context.role)) {
    throw new Error("You do not have permission to create clients.");
  }

  const clientName = String(formData.get("clientName") ?? "").trim();
  const contactName = String(formData.get("contactName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  const siteName = String(formData.get("siteName") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const province = String(formData.get("province") ?? "").trim();
  const postalCode = String(formData.get("postalCode") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!clientName || !siteName || !address) {
    throw new Error("Client name, site name, and address are required.");
  }

  await prisma.client.create({
    data: {
      organizationId: context.organization.id,
      name: clientName,
      contactName: contactName || null,
      phone: phone || null,
      email: email || null,
      jobSites: {
        create: {
          organizationId: context.organization.id,
          name: siteName,
          address,
          city: city || null,
          province: province || null,
          postalCode: postalCode || null,
          notes: notes || null,
        },
      },
    },
  });

  redirect("/work-orders/new");
}