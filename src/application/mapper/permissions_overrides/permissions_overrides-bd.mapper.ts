import { PermissionsOverridesEntity } from "src/domain/entities/permissions_overrides.entity";
import { ModeEnum } from "src/domain/enums/mode.enum";
interface PermissionsOverridesRow {
  id?: string;
  public_id: string;
  userId: string;
  permissionsId: string;
  mode:ModeEnum;
  note:string;
  created_at?: Date;
}
export class PermissionsOverridesDbMapper {

  static toDomain(prisma: PermissionsOverridesRow): PermissionsOverridesEntity {
    return new PermissionsOverridesEntity({
      id: prisma.id,
      publicId: prisma.public_id,
      userId: prisma.userId,
      permissionsId: prisma.permissionsId,
      mode:prisma.mode,
      note:prisma.note,
      createdAt: prisma.created_at,
    });
  }

  static toPersistence(entity: PermissionsOverridesEntity) {
    return {
      public_id: entity.publicId,
      userId: entity.userId,
      permissionsId: entity.permissionsId,
      mode:entity.mode,
      note:entity.note,
    };
  }
}

// Backward compatibility for existing imports.
export const UserDbMapper = PermissionsOverridesDbMapper;
