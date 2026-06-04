import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { RoleRepositoryAdapter } from "src/adapter/out/persistence/role.repository.adapter";
import { CreateRoleUseCase } from "src/application/use_case/role/create-role.usecase";
import { GetRoleUseCase } from "src/application/use_case/role/get-role.usecase";
import { CreateRoleValidator } from "src/domain/service/validators/role/create-role.validator";
import { GetRoleValidator } from "src/domain/service/validators/role/get-role.validator";

describe("Core use case integration", () => {
  const prisma = new PrismaService();
  const roleRepository = new RoleRepositoryAdapter(prisma);
  const publicIdGenerator = { generateNanoid: () => "role_public_id_123456789012" };

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.roleTable.deleteMany();
  });

  afterAll(async () => {
    await prisma.roleTable.deleteMany();
    await prisma.$disconnect();
  });

  it("creates then gets a role", async () => {
    const createRoleUseCase = new CreateRoleUseCase(roleRepository, new CreateRoleValidator(), publicIdGenerator);
    const getRoleUseCase = new GetRoleUseCase(roleRepository, new GetRoleValidator());

    const created = await createRoleUseCase.execute({
      name: "admin",
      description: "System admin",
      isSystem: true,
    });

    const found = await getRoleUseCase.execute({ publicId: created.publicId });

    expect(found.publicId).toBe(created.publicId);
    expect(found.name).toBe("admin");
  });
});
