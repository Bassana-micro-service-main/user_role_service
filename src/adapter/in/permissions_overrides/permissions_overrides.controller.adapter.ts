import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreatePermissionsOverridesDto } from "src/application/dto/permissions_overrides/create-permissions_overrides.dto";
import { ListPermissionsOverridesDto } from "src/application/dto/permissions_overrides/list-permissions_overrides.dto";
import { UpdatePermissionsOverridesDto } from "src/application/dto/permissions_overrides/update-permissions_overrides.dto";
import { PaginatedResponseMapper } from "src/application/mapper/paginate/paginated-response.mapper.dto";
import { PermissionsOverridesHttpMapper } from "src/application/mapper/permissions_overrides/permissions_overrides-http.mapper";
import { CreatePermissionsOverridesUseCase } from "src/application/use_case/permissions_overrides/create-permissions_overrides.usecase";
import { DeletePermissionsOverridesUseCase } from "src/application/use_case/permissions_overrides/delete-permissions_overrides.usecase";
import { GetPermissionsOverridesUseCase } from "src/application/use_case/permissions_overrides/get-permissions_overrides.usecase";
import { ListPermissionsOverridesUseCase } from "src/application/use_case/permissions_overrides/list-permissions_overrides.usecase";
import { UpdatePermissionsOverridesUseCase } from "src/application/use_case/permissions_overrides/update-permissions_overrides.usecase";


@Controller('roles')
export class PermissionsOverridesControllerAdapter {
  constructor(
    private readonly createRole: CreatePermissionsOverridesUseCase,
    private readonly getRole: GetPermissionsOverridesUseCase,
    private readonly deleteUser: DeletePermissionsOverridesUseCase,
    private readonly updateUser: UpdatePermissionsOverridesUseCase,
    private readonly listUser: ListPermissionsOverridesUseCase,
  ) { }

  @Post()
  async create(@Body() dto: CreatePermissionsOverridesDto) {
    const result = await this.createRole.execute(
      PermissionsOverridesHttpMapper.toCreateCommand(dto)
    );

    return PermissionsOverridesHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {

    const result = await this.getRole.execute({ publicId });

    return PermissionsOverridesHttpMapper.toResponse(result!);
  }

  @Get()
  async list(@Query() dto: ListPermissionsOverridesDto) {
    const query = PermissionsOverridesHttpMapper.toListQuery(dto);

    const result = await this.listUser.execute(query);

    return PaginatedResponseMapper.toPaginatedDto(
      result, 
      PermissionsOverridesHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(
    @Param('publicId') publicId: string,
    @Body() dto: UpdatePermissionsOverridesDto) {
    const command = PermissionsOverridesHttpMapper.toUpdateCommand(dto);
    const result = await this.updateUser.execute({ publicId }, command);

    return PermissionsOverridesHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    this.deleteUser.execute({ publicId });

    return { message: "permissions_overrides deleted successfully" };
  }
}
