import { CreatePermissionsDto } from "src/application/dto/permissions/create-permissions.dto";
import { GetPermissionsDto } from "src/application/dto/permissions/get-permissions.dto";
import { ListPermissionsDto } from "src/application/dto/permissions/list-permissions.dto";
import { ResponsePermissionsDto } from "src/application/dto/permissions/response-permissions.dto";
import { UpdatePermissionsDto } from "src/application/dto/permissions/update-permissions.dto";
import { PermissionsEntity } from "src/domain/entities/permissions.entity";
import { CreatePermissionsCommand } from "src/domain/port/in/permissions/create-permissions.interface.port";
import { GetPermissionsQuery } from "src/domain/port/in/permissions/get-permissions.interface.port";
import { ListPermissionsQuery } from "src/domain/port/in/permissions/list-permissions.interface.port";
import { UpdatePermissionsCommand } from "src/domain/port/in/permissions/update-permissions.interface.port";

export class PermissionsHttpMapper {
  static toCreateCommand(dto: CreatePermissionsDto): CreatePermissionsCommand {
    return {
      name: dto.name,
      description: dto.description,
    };
  }

  static toUpdateCommand(dto: UpdatePermissionsDto): UpdatePermissionsCommand {
    return {
      name: dto.name,
      description: dto.description,
    };
  }

  static toGetQuery(dto: GetPermissionsDto): GetPermissionsQuery {
    return {
      publicId: dto.publicId,
    };
  }

  static toListQuery(dto: ListPermissionsDto): ListPermissionsQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      name: dto.name,
    };
  }

  static toResponse(entity: PermissionsEntity): ResponsePermissionsDto {
    return {
      publicId: entity.publicId,
      name: entity.name,
      description: entity.description,
    };
  }
}

