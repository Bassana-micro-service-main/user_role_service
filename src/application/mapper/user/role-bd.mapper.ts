import {RoleProps } from "src/domain/entities/role.entity";
import { RoleEntity } from "src/domain/entities/role.entity";
export class RoleDbMapper {

  static toDomain(prisma: RoleProps): RoleEntity {
    return new RoleEntity({
      id: prisma.id,
      publicId: prisma.publicId,
      name: prisma.name,
      description: prisma.description,
      isSystem: prisma.isSystem as boolean,
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
    });
  }

  static toPersistence(entity: RoleEntity) {
    return {
      public_id: entity.publicId,
      name: entity.name,
      description: entity.description,
      is_system: entity.isSystem,
    };
  }
}

// Backward compatibility for existing imports.
export const UserDbMapper = RoleDbMapper;
