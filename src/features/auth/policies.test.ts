import { describe, expect, it } from "vitest";
import {
  canCreateClients,
  canGenerateServiceReports,
  canManageWorkOrders,
  canUpdateFieldWork,
  isReadOnlyRole,
} from "./policies";

describe("auth policies", () => {
  it("allows owner, admin, and dispatcher to manage work orders", () => {
    expect(canManageWorkOrders("OWNER")).toBe(true);
    expect(canManageWorkOrders("ADMIN")).toBe(true);
    expect(canManageWorkOrders("DISPATCHER")).toBe(true);
    expect(canManageWorkOrders("TECHNICIAN")).toBe(false);
    expect(canManageWorkOrders("VIEWER")).toBe(false);
  });

  it("allows field workers and managers to update field work", () => {
    expect(canUpdateFieldWork("OWNER")).toBe(true);
    expect(canUpdateFieldWork("ADMIN")).toBe(true);
    expect(canUpdateFieldWork("DISPATCHER")).toBe(true);
    expect(canUpdateFieldWork("TECHNICIAN")).toBe(true);
    expect(canUpdateFieldWork("VIEWER")).toBe(false);
  });

  it("allows only office roles to generate service reports", () => {
    expect(canGenerateServiceReports("OWNER")).toBe(true);
    expect(canGenerateServiceReports("ADMIN")).toBe(true);
    expect(canGenerateServiceReports("DISPATCHER")).toBe(true);
    expect(canGenerateServiceReports("TECHNICIAN")).toBe(false);
    expect(canGenerateServiceReports("VIEWER")).toBe(false);
  });

  it("allows office roles to create clients", () => {
    expect(canCreateClients("OWNER")).toBe(true);
    expect(canCreateClients("ADMIN")).toBe(true);
    expect(canCreateClients("DISPATCHER")).toBe(true);
    expect(canCreateClients("TECHNICIAN")).toBe(false);
    expect(canCreateClients("VIEWER")).toBe(false);
  });

  it("identifies viewer as read-only", () => {
    expect(isReadOnlyRole("VIEWER")).toBe(true);
    expect(isReadOnlyRole("TECHNICIAN")).toBe(false);
    expect(isReadOnlyRole("OWNER")).toBe(false);
  });
});