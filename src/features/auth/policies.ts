import type { Role } from "@/generated/prisma/enums";
import { hasAnyRole } from "./permissions";

export function canManageWorkOrders(role: Role) {
  return hasAnyRole(role, ["OWNER", "ADMIN", "DISPATCHER"]);
}

export function canUpdateFieldWork(role: Role) {
  return hasAnyRole(role, ["OWNER", "ADMIN", "DISPATCHER", "TECHNICIAN"]);
}

export function canGenerateServiceReports(role: Role) {
  return hasAnyRole(role, ["OWNER", "ADMIN", "DISPATCHER"]);
}

export function canCreateClients(role: Role) {
  return hasAnyRole(role, ["OWNER", "ADMIN", "DISPATCHER"]);
}

export function isReadOnlyRole(role: Role) {
  return role === "VIEWER";
}