import { describe, expect, it } from "vitest";
import { hasAnyRole, hasRoleAtLeast, roleLabels } from "./permissions";

describe("roleLabels", () => {
  it("maps role values to readable labels", () => {
    expect(roleLabels.OWNER).toBe("Owner");
    expect(roleLabels.ADMIN).toBe("Admin");
    expect(roleLabels.DISPATCHER).toBe("Dispatcher");
    expect(roleLabels.TECHNICIAN).toBe("Technician");
    expect(roleLabels.VIEWER).toBe("Viewer");
  });
});

describe("hasRoleAtLeast", () => {
  it("allows higher roles to satisfy lower role requirements", () => {
    expect(hasRoleAtLeast("OWNER", "VIEWER")).toBe(true);
    expect(hasRoleAtLeast("ADMIN", "TECHNICIAN")).toBe(true);
    expect(hasRoleAtLeast("DISPATCHER", "VIEWER")).toBe(true);
  });

  it("does not allow lower roles to satisfy higher role requirements", () => {
    expect(hasRoleAtLeast("VIEWER", "TECHNICIAN")).toBe(false);
    expect(hasRoleAtLeast("TECHNICIAN", "DISPATCHER")).toBe(false);
    expect(hasRoleAtLeast("DISPATCHER", "ADMIN")).toBe(false);
  });

  it("allows a role to satisfy its own requirement", () => {
    expect(hasRoleAtLeast("OWNER", "OWNER")).toBe(true);
    expect(hasRoleAtLeast("TECHNICIAN", "TECHNICIAN")).toBe(true);
  });
});

describe("hasAnyRole", () => {
  it("returns true when the role is in the allowed roles list", () => {
    expect(hasAnyRole("DISPATCHER", ["OWNER", "ADMIN", "DISPATCHER"])).toBe(
      true,
    );
  });

  it("returns false when the role is not in the allowed roles list", () => {
    expect(hasAnyRole("TECHNICIAN", ["OWNER", "ADMIN", "DISPATCHER"])).toBe(
      false,
    );
  });
});