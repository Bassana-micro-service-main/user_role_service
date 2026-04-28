import { CreateUserRoleDto } from "src/application/dto/user_role/create-user_role.dto";
import { GetUserRoleDto } from "src/application/dto/user_role/get-user_role.dto";
import { ListUserRoleDto } from "src/application/dto/user_role/list-user_role.dto";
import { ResponseUserRoleDto } from "src/application/dto/user_role/response-user_role.dto";
import { UpdateUserRoleDto } from "src/application/dto/user_role/update-user_role.dto";
import { UserRoleEntity } from "src/domain/entities/user_role.entity";
import { CreateUserRoleCommand } from "src/domain/port/in/user_role/create-user_role.interface.port";
import { GetUserRoleQuery } from "src/domain/port/in/user_role/get-user_role.interface.port";
import { ListUserRoleQuery } from "src/domain/port/in/user_role/list-user_role.interface.port";
import { UpdateUserRoleCommand } from "src/domain/port/in/user_role/update-user_role.interface.port";

export class UserRoleHttpMapper {
  static toCreateCommand(dto: CreateUserRoleDto): CreateUserRoleCommand {
    return {
      userId: dto.userId,
      roleId: dto.roleId,
    };
  }

  static toUpdateCommand(dto: UpdateUserRoleDto): UpdateUserRoleCommand {
    return {
      userId: dto.userId,
      roleId: dto.roleId,
    };
  }

  static toGetQuery(dto: GetUserRoleDto): GetUserRoleQuery {
    return {
      publicId: dto.publicId,
    };
  }

  static toListQuery(dto: ListUserRoleDto): ListUserRoleQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      userId: dto.userId,
      roleId: dto.roleId,
    };
  }

  static toResponse(entity: UserRoleEntity): ResponseUserRoleDto {
    return {
      publicId: entity.publicId,
      userId: entity.userId,
      roleId: entity.roleId,
    };
  }
}

