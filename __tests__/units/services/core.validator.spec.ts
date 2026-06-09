import { describe, expect, it } from "vitest";
import { BusinessError } from "src/domain/errors/business.error";
import { CreateRoleValidator } from "src/domain/service/validators/role/create-role.validator";
import { CreatePermissionsValidator } from "src/domain/service/validators/permissions/create-permissions.validator";
import { CreateUserRoleValidator } from "src/domain/service/validators/user_role/create-user_role.validator";
import { CreateRolePermissionsValidator } from "src/domain/service/validators/role_permissions/create-role_permissions.validator";
import { CreatePermissionsOverridesValidator } from "src/domain/service/validators/permissions_overrides/create-permissions_overrides.validator";

describe("Core validators", () => {
  it("validates role creation command", () => {
    const validator = new CreateRoleValidator();
    expect(() => validator.validate({ name: "admin", description: "system role", isSystem: true })).not.toThrow();
    expect(() => validator.validate({ name: "", description: "system role", isSystem: true })).toThrow(BusinessError);
  });

  it("validates permission creation command", () => {
    const validator = new CreatePermissionsValidator();
    expect(() => validator.validate({ name: "users.read", description: "Read users" })).not.toThrow();
    expect(() => validator.validate({ name: "users.read", description: "" })).toThrow(BusinessError);
  });

  it("validates user-role creation command", () => {
    const validator = new CreateUserRoleValidator();
    expect(() => validator.validate({ userId: "user_123", roleId: "role_123" })).not.toThrow();
    expect(() => validator.validate({ userId: "", roleId: "role_123" })).toThrow(BusinessError);
  });

  it("validates role-permissions creation command", () => {
    const validator = new CreateRolePermissionsValidator();
    expect(() => validator.validate({ roleId: "role_123", permissionsId: "perm_123" })).not.toThrow();
    expect(() => validator.validate({ roleId: "role_123", permissionsId: "" })).toThrow(BusinessError);
  });

  it("validates permissions override creation command", () => {
    const validator = new CreatePermissionsOverridesValidator();
    expect(() =>
      validator.validate({ userId: "user_123", permissionsId: "perm_123", mode: true as any, note: "manual allow" }),
    ).not.toThrow();
    expect(() =>
      validator.validate({ userId: "user_123", permissionsId: "perm_123", mode: true as any, note: "" }),
    ).toThrow(BusinessError);
  });
});
