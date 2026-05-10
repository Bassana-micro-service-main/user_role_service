import { CreatePermissionsOverridesDto } from "src/application/dto/permissions_overrides/create-permissions_overrides.dto";
import { GetPermissionsOverridesDto } from "src/application/dto/permissions_overrides/get-permissions_overrides.dto";
import { ListPermissionsOverridesDto } from "src/application/dto/permissions_overrides/list-permissions_overrides.dto";
import { ResponsePermissionsOverridesDto } from "src/application/dto/permissions_overrides/response-permissions_overrides.dto";
import { UpdatePermissionsOverridesDto } from "src/application/dto/permissions_overrides/update-permissions_overrides.dto";
import { PermissionsOverridesEntity } from "src/domain/entities/permissions_overrides.entity";
import { CreatePermissionsOverridesCommand } from "src/domain/port/in/permissions_overrides/create-permissions_overrides.interface.port";
import { GetPermissionsOverridesQuery } from "src/domain/port/in/permissions_overrides/get-permissions_overrides.interface.port";
import { ListPermissionsOverridesQuery } from "src/domain/port/in/permissions_overrides/list-permissions_overrides.interface.port";
import { UpdatePermissionsOverridesCommand } from "src/domain/port/in/permissions_overrides/update-permissions_overrides.interface.port";

export class PermissionsOverridesHttpMapper {
  static toCreateCommand(dto: CreatePermissionsOverridesDto): CreatePermissionsOverridesCommand {
    return {
      userId: dto.userId,
      permissionsId: dto.permissionsId,
      mode:dto.mode,
      note:dto.note,
    };
  }

   static toUpdateCommand(dto: UpdatePermissionsOverridesDto): UpdatePermissionsOverridesCommand {
    return {
      userId: dto.userId,
      permissionsId: dto.permissionsId,
      mode:dto.mode,
      note:dto.note,
    };
  }

  static toGetQuery(dto: GetPermissionsOverridesDto): GetPermissionsOverridesQuery {
    return {
      publicId: dto.publicId,
    };
  }

  static toListQuery(dto: ListPermissionsOverridesDto): ListPermissionsOverridesQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      userId: dto.userId,
      permissionsId:dto.permissionsId,
      mode:dto.mode,
      note:dto.note,

    };
  }

  static toResponse(entity: PermissionsOverridesEntity): ResponsePermissionsOverridesDto {
    return {
      publicId: entity.publicId,
      userId: entity.userId,
      permissionsId: entity.permissionsId,
      mode:entity.mode,
      note:entity.note,
    }
}
}
