import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateRolePermissionsDto } from "src/application/dto/role_permissions/create-role_permissions.dto";
import { ListRolePermissionsDto } from "src/application/dto/role_permissions/list-role_permissions.dto";
import { UpdateRolePermissionsDto } from "src/application/dto/role_permissions/update-role_permissions.dto";
import { PaginatedResponseMapper } from "src/application/mapper/paginate/paginated-response.mapper.dto";
import { CreateRolePermissionsUseCase } from 'src/application/use_case/role_permissions/create-role_permissions.usecase';
import { UpdateRolePermissionsUseCase } from 'src/application/use_case/role_permissions/update-role_permissions.usecase';
import { GetRolePermissionsUseCase } from 'src/application/use_case/role_permissions/get-role_permissions.usecase';
import { ListRolePermissionsUseCase } from 'src/application/use_case/role_permissions/list-role_permissions.usecase';
import { DeleteRolePermissionsUseCase } from 'src/application/use_case/role_permissions/delete-role_permissions.usecase';
import { RolePermissionsHttpMapper } from "src/application/mapper/role_permissions/role_permissions-http.mapper";

@Controller('user_roles')
export class RolePermissionsControllerAdapter {
  constructor(
    private readonly createUserRole: CreateRolePermissionsUseCase,
    private readonly getUserRole: GetRolePermissionsUseCase,
    private readonly deleteUserRole: DeleteRolePermissionsUseCase,
    private readonly updateRolePermissions: UpdateRolePermissionsUseCase,
    private readonly listRolePermissions: ListRolePermissionsUseCase,
  ) { }

  @Post()
  async create(@Body() dto: CreateRolePermissionsDto) {
    const result = await this.createUserRole.execute(
    RolePermissionsHttpMapper.toCreateCommand(dto)
    );

    return RolePermissionsHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {

    const result = await this.getUserRole.execute({ publicId });

    return RolePermissionsHttpMapper.toResponse(result!);
  }

  @Get()
  async list(@Query() dto: ListRolePermissionsDto) {
    const query = RolePermissionsHttpMapper.toListQuery(dto);

    const result = await this.listRolePermissions.execute(query);

    return PaginatedResponseMapper.toPaginatedDto(
      result, 
      RolePermissionsHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(
    @Param('publicId') publicId: string,
    @Body() dto: UpdateRolePermissionsDto) {
    const command = RolePermissionsHttpMapper.toUpdateCommand(dto);
    const result = await this.updateRolePermissions.execute({ publicId }, command);

    return RolePermissionsHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    this.deleteUserRole.execute({ publicId });

    return { message: "user_role deleted successfully" };
  }
}
