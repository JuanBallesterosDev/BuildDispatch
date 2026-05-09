import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient, Priority, Role, WorkOrderStatus } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const demoPassword = process.env.SEED_DEMO_PASSWORD;

  if (!demoPassword) {
    throw new Error("SEED_DEMO_PASSWORD is required to seed demo users.");
  }

  const passwordHash = await bcrypt.hash(demoPassword, 12);

  await prisma.auditLog.deleteMany();
  await prisma.serviceReport.deleteMany();
  await prisma.photoEvidence.deleteMany();
  await prisma.fieldNote.deleteMany();
  await prisma.materialUsage.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.workOrder.deleteMany();
  await prisma.material.deleteMany();
  await prisma.jobSite.deleteMany();
  await prisma.client.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  const organization = await prisma.organization.create({
    data: {
      name: "Northline Mechanical & Build",
      slug: "northline-mechanical-build",
      industry: "HVAC_CONSTRUCTION",
    },
  });

  const owner = await prisma.user.create({
    data: {
      name: "Juan Ballesteros",
      email: "owner@builddispatch.dev",
      passwordHash,
      memberships: {
        create: {
          organizationId: organization.id,
          role: Role.OWNER,
        },
      },
    },
  });

  const technician = await prisma.user.create({
    data: {
      name: "Maria Gomez",
      email: "maria@builddispatch.dev",
      passwordHash,
      memberships: {
        create: {
          organizationId: organization.id,
          role: Role.TECHNICIAN,
        },
      },
    },
  });

  const dispatcher = await prisma.user.create({
    data: {
      name: "Daniel Park",
      email: "daniel@builddispatch.dev",
      passwordHash,
      memberships: {
        create: {
          organizationId: organization.id,
          role: Role.DISPATCHER,
        },
      },
    },
  });

  const client = await prisma.client.create({
    data: {
      organizationId: organization.id,
      name: "North York Community Centre",
      contactName: "Elena Ruiz",
      phone: "416-555-0142",
      email: "facilities@nycc.example",
    },
  });

  const jobSite = await prisma.jobSite.create({
    data: {
      organizationId: organization.id,
      clientId: client.id,
      name: "Main Facility",
      address: "1200 Finch Ave W",
      city: "Toronto",
      province: "ON",
      postalCode: "M3J 3K1",
      notes: "Use service entrance on west side.",
    },
  });

  const filters = await prisma.material.create({
    data: {
      organizationId: organization.id,
      name: "MERV 13 filters",
      sku: "FLT-MERV13-20X25",
      unit: "unit",
      quantityOnHand: 4,
      reorderLevel: 10,
    },
  });

  const copperElbows = await prisma.material.create({
    data: {
      organizationId: organization.id,
      name: "Copper elbows 3/4",
      sku: "COP-ELBOW-34",
      unit: "piece",
      quantityOnHand: 12,
      reorderLevel: 8,
    },
  });

  const urgentWorkOrder = await prisma.workOrder.create({
    data: {
      organizationId: organization.id,
      clientId: client.id,
      jobSiteId: jobSite.id,
      title: "Emergency furnace callback",
      description: "Client reported intermittent heat failure in the east wing.",
      status: WorkOrderStatus.ASSIGNED,
      priority: Priority.URGENT,
      scheduledFor: new Date(),
      assignments: {
        create: {
          userId: technician.id,
        },
      },
      fieldNotes: {
        create: {
          authorId: technician.id,
          body: "Initial inspection found weak ignition sequence and dirty filter housing.",
        },
      },
      materialUsages: {
        create: {
          materialId: filters.id,
          quantity: 2,
        },
      },
    },
  });

  await prisma.workOrder.create({
    data: {
      organizationId: organization.id,
      clientId: client.id,
      jobSiteId: jobSite.id,
      title: "Rooftop unit inspection",
      description: "Routine inspection before seasonal load increase.",
      status: WorkOrderStatus.IN_PROGRESS,
      priority: Priority.NORMAL,
      scheduledFor: new Date(),
      assignments: {
        create: {
          userId: technician.id,
        },
      },
    },
  });

  await prisma.workOrder.create({
    data: {
      organizationId: organization.id,
      clientId: client.id,
      jobSiteId: jobSite.id,
      title: "Basement framing walkthrough",
      description: "Review framing progress and document site conditions.",
      status: WorkOrderStatus.SCHEDULED,
      priority: Priority.HIGH,
      scheduledFor: new Date(),
      assignments: {
        create: {
          userId: dispatcher.id,
        },
      },
    },
  });

  await prisma.serviceReport.create({
    data: {
      workOrderId: urgentWorkOrder.id,
      summary:
        "Technician inspected furnace callback, replaced filters, and documented follow-up recommendations.",
    },
  });

  await prisma.auditLog.create({
    data: {
      organizationId: organization.id,
      actorId: owner.id,
      action: "SEED_DEMO_DATA",
      entityType: "Organization",
      entityId: organization.id,
      metadata: "Initial demo workspace created for BuildDispatch.",
    },
  });

  console.log("Seed completed.");
  console.log(`Organization: ${organization.name}`);
  console.log("Demo users:");
  console.log("- owner@builddispatch.dev");
  console.log("- maria@builddispatch.dev");
  console.log("- daniel@builddispatch.dev");

  void copperElbows;
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
