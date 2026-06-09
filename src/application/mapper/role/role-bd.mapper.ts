import { RoleEntity } from "src/domain/entities/role.entity";

interface RoleRow {
  id?: string;
  public_id: string;
  name: string;
  description: string;
  is_system: boolean;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}
export class RoleDbMapper {

  static toDomain(prisma: RoleRow): RoleEntity {
    return new RoleEntity({
      id: prisma.id,
      publicId: prisma.public_id,
      name: prisma.name,
      description: prisma.description,
      isSystem: prisma.is_system,
      isActive: prisma.is_active,
      createdAt: prisma.created_at,
      updatedAt: prisma.updated_at,
    });
  }

  static toPersistence(entity: RoleEntity) {
    return {
      public_id: entity.publicId,
      name: entity.name,
      description: entity.description,
      is_system: entity.isSystem,
      is_active: entity.isActive,
    };
  }
}

// Backward compatibility for existing imports.
export const UserDbMapper = RoleDbMapper;
