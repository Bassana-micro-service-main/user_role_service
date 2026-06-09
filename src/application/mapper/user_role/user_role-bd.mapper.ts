import { UserRoleEntity } from "src/domain/entities/user_role.entity";

interface UserRoleRow {
  id?: string;
  public_id: string;
  userId: string;
  roleId: string;
  created_at?: Date;
}
export class UserRoleDbMapper {

  static toDomain(prisma: UserRoleRow): UserRoleEntity {
    return new UserRoleEntity({
      id: prisma.id,
      publicId: prisma.public_id,
      userId: prisma.userId,
      roleId: prisma.roleId,
      createdAt: prisma.created_at,
    });
  }

  static toPersistence(entity: UserRoleEntity) {
    return {
      public_id: entity.publicId,
      userId: entity.userId,
      roleId: entity.roleId,
    };
  }
}

// Backward compatibility for existing imports.
export const UserDbMapper = UserRoleDbMapper;
