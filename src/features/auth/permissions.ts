import type { Role } from "@/generated/prisma/enums";

export const roleLabels: Record<Role, string> = {
  OWNER: "Owner",
  ADMIN: "Admin",
  DISPATCHER: "Dispatcher",
  TECHNICIAN: "Technician",
  VIEWER: "Viewer",
};

const roleRank: Record<Role, number> = {
  OWNER: 5,
  ADMIN: 4,
  DISPATCHER: 3,
  TECHNICIAN: 2,
  VIEWER: 1,
};

export function hasRoleAtLeast(userRole: Role, requiredRole: Role) {
  return roleRank[userRole] >= roleRank[requiredRole];
}

export function hasAnyRole(userRole: Role, allowedRoles: Role[]) {
  return allowedRoles.includes(userRole);
}