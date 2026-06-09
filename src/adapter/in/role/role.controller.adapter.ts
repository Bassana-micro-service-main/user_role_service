import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateRoleDto } from "src/application/dto/role/create-role.dto";
import { ListRoleDto } from "src/application/dto/role/list-role.dto";
import { UpdateRoleDto } from "src/application/dto/role/update-role.dto";
import { PaginatedResponseMapper } from "src/application/mapper/paginate/paginated-response.mapper.dto";
import { RoleHttpMapper } from "src/application/mapper/role/role-http.mapper";
import { CreateRoleUseCase } from "src/application/use_case/role/create-role.usecase";
import { DeleteRoleUseCase } from "src/application/use_case/role/delete-role.usecase";
import { GetRoleUseCase } from "src/application/use_case/role/get-role.usecase";
import { ListRoleUseCase } from "src/application/use_case/role/list-role.usecase";
import { UpdateRoleUseCase } from "src/application/use_case/role/update-role.usecase";


@Controller('roles')
export class RoleControllerAdapter {
  constructor(
    private readonly createRole: CreateRoleUseCase,
    private readonly getRole: GetRoleUseCase,
    private readonly deleteUser: DeleteRoleUseCase,
    private readonly updateUser: UpdateRoleUseCase,
    private readonly listUser: ListRoleUseCase,
  ) { }

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    const result = await this.createRole.execute(
      RoleHttpMapper.toCreateCommand(dto)
    );

    return RoleHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {

    const result = await this.getRole.execute({ publicId });

    return RoleHttpMapper.toResponse(result!);
  }

  @Get()
  async list(@Query() dto: ListRoleDto) {
    const query = RoleHttpMapper.toListQuery(dto);

    const result = await this.listUser.execute(query);

    return PaginatedResponseMapper.toPaginatedDto(
      result, 
      RoleHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(
    @Param('publicId') publicId: string,
    @Body() dto: UpdateRoleDto) {
    const command = RoleHttpMapper.toUpdateCommand(dto);
    const result = await this.updateUser.execute({ publicId }, command);

    return RoleHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    this.deleteUser.execute({ publicId });

    return { message: "role deleted successfully" };
  }
}
