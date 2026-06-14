"use server";

import { redirect } from "next/navigation";
import { Priority, WorkOrderStatus } from "@/generated/prisma/enums";
import { getCurrentUserContext } from "@/features/auth/user-context";
import { hasAnyRole } from "@/features/auth/permissions";
import { prisma } from "@/lib/prisma";

export async function createWorkOrderAction(formData: FormData) {
  const context = await getCurrentUserContext();

  const canCreateWorkOrders = hasAnyRole(context.role, [
    "OWNER",
    "ADMIN",
    "DISPATCHER",
  ]);

  if (!canCreateWorkOrders) {
    throw new Error("You do not have permission to create work orders.");
  }

  const title = String(formData.get("title") ?? "").trim();
  const clientId = String(formData.get("clientId") ?? "");
  const jobSiteId = String(formData.get("jobSiteId") ?? "");
  const assignedUserId = String(formData.get("assignedUserId") ?? "");
  const priority = String(formData.get("priority") ?? "NORMAL") as Priority;
  const description = String(formData.get("description") ?? "").trim();
  const scheduledForValue = String(formData.get("scheduledFor") ?? "");

  if (!title || !clientId || !jobSiteId) {
    throw new Error("Title, client, and job site are required.");
  }

  const jobSite = await prisma.jobSite.findFirst({
    where: {
      id: jobSiteId,
      clientId,
      organizationId: context.organization.id,
    },
  });

  if (!jobSite) {
    throw new Error("Invalid job site for this organization.");
  }

  if (assignedUserId) {
    const assignableUser = await prisma.user.findFirst({
        where: {
        id: assignedUserId,
        memberships: {
            some: {
            organizationId: context.organization.id,
            },
        },
        },
    });

    if (!assignableUser) {
        throw new Error("Invalid assignee for this organization.");
    }
  }

  await prisma.workOrder.create({
    data: {
        organizationId: context.organization.id,
        clientId,
        jobSiteId,
        title,
        description: description || null,
        priority,
        status: assignedUserId
        ? WorkOrderStatus.ASSIGNED
        : WorkOrderStatus.SCHEDULED,
        scheduledFor: scheduledForValue ? new Date(scheduledForValue) : null,
        assignments: assignedUserId
        ? {
            create: {
                userId: assignedUserId,
            },
            }
        : undefined,
    },
  });

  redirect("/");
}

export async function addFieldNoteAction(formData: FormData) {
  const context = await getCurrentUserContext();

  const canAddFieldNotes = hasAnyRole(context.role, [
    "OWNER",
    "ADMIN",
    "DISPATCHER",
    "TECHNICIAN",
  ]);

  if (!canAddFieldNotes) {
    throw new Error("You do not have permission to add field notes.");
  }

  const workOrderId = String(formData.get("workOrderId") ?? "");
  const body = String(formData.get("body") ?? "").trim();

  if (!workOrderId || !body) {
    throw new Error("Work order and note body are required.");
  }

  const workOrder = await prisma.workOrder.findFirst({
    where: {
      id: workOrderId,
      organizationId: context.organization.id,
    },
  });

  if (!workOrder) {
    throw new Error("Work order not found for this organization.");
  }

  await prisma.fieldNote.create({
    data: {
      workOrderId,
      authorId: context.user.id,
      body,
    },
  });

  redirect(`/work-orders/${workOrderId}`);
}