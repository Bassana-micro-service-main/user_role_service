import { describe, expect, it, vi } from "vitest";
import { CreateRoleUseCase } from "src/application/use_case/role/create-role.usecase";
import { CreatePermissionsUseCase } from "src/application/use_case/permissions/create-permissions.usecase";
import { CreateUserRoleUseCase } from "src/application/use_case/user_role/create-user_role.usecase";
import { CreatePermissionsOverridesUseCase } from "src/application/use_case/permissions_overrides/create-permissions_overrides.usecase";
import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { ModeEnum } from "src/domain/enums/mode.enum";

describe("Core use cases", () => {
  it("creates a role", async () => {
    const repository: any = {
      findByName: vi.fn().mockResolvedValue(null),
      save: vi.fn().mockImplementation(async (entity) => entity),
    };
    const validator: any = { validate: vi.fn() };
    const publicIdGenerator: any = { generateNanoid: vi.fn().mockReturnValue("role_public_id_123456789012") };

    const useCase = new CreateRoleUseCase(repository, validator, publicIdGenerator);
    const result = await useCase.execute({ name: "admin", description: "system role", isSystem: true });

    expect(validator.validate).toHaveBeenCalled();
    expect(repository.findByName).toHaveBeenCalledWith("admin");
    expect(result.name).toBe("admin");
  });

  it("rejects duplicate role names", async () => {
    const repository: any = {
      findByName: vi.fn().mockResolvedValue({ publicId: "existing" }),
      save: vi.fn(),
    };
    const validator: any = { validate: vi.fn() };
    const publicIdGenerator: any = { generateNanoid: vi.fn() };

    const useCase = new CreateRoleUseCase(repository, validator, publicIdGenerator);

    await expect(
      useCase.execute({ name: "admin", description: "system role", isSystem: true }),
    ).rejects.toThrow(ApplicationError);
    await expect(
      useCase.execute({ name: "admin", description: "system role", isSystem: true }),
    ).rejects.toMatchObject({ code: CodesError.ROLE_NAME_ALREADY_EXISTS });
  });

  it("creates a permission", async () => {
    const repository: any = {
      findByName: vi.fn().mockResolvedValue(null),
      save: vi.fn().mockImplementation(async (entity) => entity),
    };
    const validator: any = { validate: vi.fn() };
    const publicIdGenerator: any = { generateNanoid: vi.fn().mockReturnValue("perm_public_id_123456789012") };

    const useCase = new CreatePermissionsUseCase(repository, validator, publicIdGenerator);
    const result = await useCase.execute({ name: "users.read", description: "Read users" });

    expect(result.name).toBe("users.read");
    expect(repository.save).toHaveBeenCalledOnce();
  });

  it("creates a user-role mapping", async () => {
    const repository: any = {
      findByUserId: vi.fn().mockResolvedValue(null),
      save: vi.fn().mockImplementation(async (entity) => entity),
    };
    const validator: any = { validate: vi.fn() };
    const publicIdGenerator: any = { generateNanoid: vi.fn().mockReturnValue("user_role_public_id_12345") };

    const useCase = new CreateUserRoleUseCase(repository, validator, publicIdGenerator);
    const result = await useCase.execute({ userId: "user_123456789012345", roleId: "role_123456789012345" });

    expect(result.userId).toBe("user_123456789012345");
    expect(result.roleId).toBe("role_123456789012345");
  });

  it("creates a permission override", async () => {
    const repository: any = {
      findByUserId: vi.fn().mockResolvedValue(null),
      save: vi.fn().mockImplementation(async (entity) => entity),
    };
    const validator: any = { validate: vi.fn() };
    const publicIdGenerator: any = { generateNanoid: vi.fn().mockReturnValue("override_public_id_123456") };

    const useCase = new CreatePermissionsOverridesUseCase(repository, validator, publicIdGenerator);
    const result = await useCase.execute({
      userId: "user_123456789012345",
      permissionsId: "perm_123456789012345",
      mode: ModeEnum.allow,
      note: "granted for onboarding",
    });

    expect(result.mode).toBe(ModeEnum.allow);
    expect(result.note).toBe("granted for onboarding");
  });
});
