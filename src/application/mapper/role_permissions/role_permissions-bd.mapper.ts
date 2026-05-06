import { RolePermissionsEntity } from "src/domain/entities/role_permissions.entity";
interface RolePermissionsRow {
  id?: string;
  public_id: string;
  roleId: string;
  permissionsId: string;
}
export class RolePermissionsDbMapper {

  static toDomain(prisma: RolePermissionsRow): RolePermissionsEntity {
    return new RolePermissionsEntity({
      id: prisma.id,
      publicId: prisma.public_id,
      roleId: prisma.roleId,
      permissionsId: prisma.permissionsId,
    });
  }

  static toPersistence(entity: RolePermissionsEntity) {
    return {
      public_id: entity.publicId,
      roleId: entity.roleId,
      permissionsId: entity.permissionsId,
    };
  }
}

// Backward compatibility for existing imports.
export const UserDbMapper = RolePermissionsDbMapper;
