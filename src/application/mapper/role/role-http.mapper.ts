import { CreateRoleDto } from "src/application/dto/role/create-role.dto";
import { GetRoleDto } from "src/application/dto/role/get-role.dto";
import { ListRoleDto } from "src/application/dto/role/list-role.dto";
import { ResponseRoleDto } from "src/application/dto/role/response-role.dto";
import { UpdateRoleDto } from "src/application/dto/role/update-role.dto";
import { RoleEntity } from "src/domain/entities/role.entity";
import { CreateRoleCommand } from "src/domain/port/in/role/create-role.interface.port";
import { GetRoleQuery } from "src/domain/port/in/role/get-role.interface.port";
import { ListRoleQuery } from "src/domain/port/in/role/list-role.interface.port";
import { UpdateRoleCommand } from "src/domain/port/in/role/update-role.interface.port";

export class RoleHttpMapper {
  static toCreateCommand(dto: CreateRoleDto): CreateRoleCommand {
    return {
      name: dto.name,
      description: dto.description,
      isSystem: dto.isSystem,
      isActive: dto.isActive,
    };
  }

  static toUpdateCommand(dto: UpdateRoleDto): UpdateRoleCommand {
    const command: UpdateRoleCommand = {};
    if (dto.name !== undefined) command.name = dto.name;
    if (dto.description !== undefined) command.description = dto.description;
    if (dto.isSystem !== undefined) command.isSystem = dto.isSystem;
    if (dto.isActive !== undefined) command.isActive = dto.isActive;
    return command;
  }

  static toGetQuery(dto: GetRoleDto): GetRoleQuery {
    return {
      publicId: dto.publicId,
    };
  }

  static toListQuery(dto: ListRoleDto): ListRoleQuery {
    return {
      page: dto.page,
      limit: dto.limit,
      isSystem: dto.isSystem,
      isActive: dto.isActive,
      name: dto.name,
    };
  }

  static toResponse(entity: RoleEntity): ResponseRoleDto {
    return {
      publicId: entity.publicId,
      name: entity.name,
      description: entity.description,
      isSystem:entity.isSystem,
      isActive: entity.isActive,
    };
  }
}

