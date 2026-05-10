import { CreateRolePermissionsDto } from "src/application/dto/role_permissions/create-role_permissions.dto";
import { GetRolePermissionsDto } from "src/application/dto/role_permissions/get-role_permissions.dto";
import { ListRolePermissionsDto } from "src/application/dto/role_permissions/list-role_permissions.dto";
import { ResponseRolePermissionsDto } from "src/application/dto/role_permissions/response-role_permissions.dto";
import { UpdateRolePermissionsDto } from "src/application/dto/role_permissions/update-role_permissions.dto";
import { RolePermissionsEntity } from "src/domain/entities/role_permissions.entity";
import { CreateRolePermissionsCommand } from "src/domain/port/in/role_permissions/create-role_permissions.interface.port";
import { GetRolePermissionsQuery } from "src/domain/port/in/role_permissions/get-role_permissions.interface.port";
import { ListRolePermissionsQuery } from "src/domain/port/in/role_permissions/list-role_permissions.interface.port";
import { UpdateRolePermissionsCommand } from "src/domain/port/in/role_permissions/update-role_permissions.interface.port";

export class RolePermissionsHttpMapper {
  static toCreateCommand(dto: CreateRolePermissionsDto): CreateRolePermissionsCommand {
    return {
      roleId: dto.roleId,
      permissionsId: dto.permissionsId,
    };
  }

   static toUpdateCommand(dto: UpdateRolePermissionsDto): UpdateRolePermissionsCommand {
    return {
      roleId: dto.roleId,
      permissionsId: dto.permissionsId,
    };
  }

  static toGetQuery(dto: GetRolePermissionsDto): GetRolePermissionsQuery {
    return {
      publicId: dto.publicId,
    };
  }

  static toListQuery(dto: ListRolePermissionsDto): ListRolePermissionsQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      roleId: dto.roleId,
      permissionsId:dto.permissionsId,

    };
  }

  static toResponse(entity: RolePermissionsEntity): ResponseRolePermissionsDto {
    return {
      publicId: entity.publicId,
      roleId: entity.roleId,
      permissionsId: entity.permissionsId,
    }
}
}
