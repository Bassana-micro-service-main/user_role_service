import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { RoleRepositoryAdapter } from "src/adapter/out/persistence/role.repository.adapter";
import { RoleEntity } from "src/domain/entities/role.entity";

describe("Prisma persistence integration", () => {
  const prisma = new PrismaService();
  const roleRepository = new RoleRepositoryAdapter(prisma);

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

  it("saves and retrieves a role", async () => {
    const role = new RoleEntity({
      publicId: "role_public_id_123456789012",
      name: "admin",
      description: "System admin",
      isSystem: true,
    });

    await roleRepository.save(role);
    const found = await roleRepository.findByPublicId("role_public_id_123456789012");

    expect(found).not.toBeNull();
    expect(found?.name).toBe("admin");
  });
});
