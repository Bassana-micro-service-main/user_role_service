import { PermissionsEntity } from "src/domain/entities/permissions.entity";

interface PermissionsRow {
  id?: string;
  public_id: string;
  name: string;
  description: string;
  created_at?: Date;
}
export class PermissionsDbMapper {

  static toDomain(prisma: PermissionsRow): PermissionsEntity {
    return new PermissionsEntity({
      id: prisma.id,
      publicId: prisma.public_id,
      name: prisma.name,
      description: prisma.description,
      createdAt: prisma.created_at,
    });
  }

  static toPersistence(entity: PermissionsEntity) {
    return {
      public_id: entity.publicId,
      name: entity.name,
      description: entity.description,
    };
  }
}

// Backward compatibility for existing imports.
export const UserDbMapper = PermissionsDbMapper;
