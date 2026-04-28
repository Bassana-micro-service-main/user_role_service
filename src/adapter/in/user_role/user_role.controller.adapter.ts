import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateUserRoleDto } from "src/application/dto/user_role/create-user_role.dto";
import { ListUserRoleDto } from "src/application/dto/user_role/list-user_role.dto";
import { UpdateUserRoleDto } from "src/application/dto/user_role/update-user_role.dto";
import { PaginatedResponseMapper } from "src/application/mapper/paginate/paginated-response.mapper.dto";
import { CreateUserRoleUseCase } from "src/application/use_case/user_role/create-user_role.usecase";
import { DeleteUserRoleUseCase } from "src/application/use_case/user_role/delete-user_role.usecase";
import { GetUserRoleUseCase } from "src/application/use_case/user_role/get-user_role.usecase";
import { ListUserRoleUseCase } from "src/application/use_case/user_role/list-user_role.usecase";
import { UpdateUserRoleUseCase } from "src/application/use_case/user_role/update-user_role.usecase";
import { UserRoleHttpMapper } from "src/application/mapper/user_role/user_role-http.mapper";

@Controller('user_roles')
export class UserRoleControllerAdapter {
  constructor(
    private readonly createUserRole: CreateUserRoleUseCase,
    private readonly getUserRole: GetUserRoleUseCase,
    private readonly deleteUserRole: DeleteUserRoleUseCase,
    private readonly updateUserRole: UpdateUserRoleUseCase,
    private readonly listUserRole: ListUserRoleUseCase,
  ) { }

  @Post()
  async create(@Body() dto: CreateUserRoleDto) {
    const result = await this.createUserRole.execute(
    UserRoleHttpMapper.toCreateCommand(dto)
    );

    return UserRoleHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {

    const result = await this.getUserRole.execute({ publicId });

    return UserRoleHttpMapper.toResponse(result!);
  }

  @Get()
  async list(@Query() dto: ListUserRoleDto) {
    const query = UserRoleHttpMapper.toListQuery(dto);

    const result = await this.listUserRole.execute(query);

    return PaginatedResponseMapper.toPaginatedDto(
      result, 
      UserRoleHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(
    @Param('publicId') publicId: string,
    @Body() dto: UpdateUserRoleDto) {
    const command = UserRoleHttpMapper.toUpdateCommand(dto);
    const result = await this.updateUserRole.execute({ publicId }, command);

    return UserRoleHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    this.deleteUserRole.execute({ publicId });

    return { message: "user_role deleted successfully" };
  }
}
