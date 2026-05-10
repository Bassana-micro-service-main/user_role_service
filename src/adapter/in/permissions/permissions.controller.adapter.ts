import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreatePermissionsDto } from "src/application/dto/permissions/create-permissions.dto";
import { ListPermissionsDto } from "src/application/dto/permissions/list-permissions.dto";
import { UpdatePermissionsDto } from "src/application/dto/permissions/update-permissions.dto";
import { PaginatedResponseMapper } from "src/application/mapper/paginate/paginated-response.mapper.dto";
import { PermissionsHttpMapper } from "src/application/mapper/permissions/permissions-http.mapper";
import { CreatePermissionsUseCase } from "src/application/use_case/permissions/create-permissions.usecase";
import { DeletePermissionsUseCase } from "src/application/use_case/permissions/delete-permissions.usecase";
import { GetPermissionsUseCase } from "src/application/use_case/permissions/get-permissions.usecase";
import { ListPermissionsUseCase } from "src/application/use_case/permissions/list-permissions.usecase";
import { UpdatePermissionsUseCase } from "src/application/use_case/permissions/update-permissions.usecase";


@Controller('roles')
export class PermissionsControllerAdapter {
  constructor(
    private readonly createRole: CreatePermissionsUseCase,
    private readonly getRole: GetPermissionsUseCase,
    private readonly deleteUser: DeletePermissionsUseCase,
    private readonly updateUser: UpdatePermissionsUseCase,
    private readonly listUser: ListPermissionsUseCase,
  ) { }

  @Post()
  async create(@Body() dto: CreatePermissionsDto) {
    const result = await this.createRole.execute(
      PermissionsHttpMapper.toCreateCommand(dto)
    );

    return PermissionsHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {

    const result = await this.getRole.execute({ publicId });

    return PermissionsHttpMapper.toResponse(result!);
  }

  @Get()
  async list(@Query() dto: ListPermissionsDto) {
    const query = PermissionsHttpMapper.toListQuery(dto);

    const result = await this.listUser.execute(query);

    return PaginatedResponseMapper.toPaginatedDto(
      result, 
      PermissionsHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(
    @Param('publicId') publicId: string,
    @Body() dto: UpdatePermissionsDto) {
    const command = PermissionsHttpMapper.toUpdateCommand(dto);
    const result = await this.updateUser.execute({ publicId }, command);

    return PermissionsHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    this.deleteUser.execute({ publicId });

    return { message: "permissions deleted successfully" };
  }
}
