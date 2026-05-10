import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { UserRoleEntity } from "src/domain/entities/user_role.entity";
import { ListUserRoleInterfacePort, ListUserRoleQuery } from "src/domain/port/in/user_role/list-user_role.interface.port";
import { UserRoleRepositoryPort } from "src/domain/port/out/user_role.repository.port";

export class ListUserRoleUseCase implements ListUserRoleInterfacePort {

  constructor(
    private readonly repository: UserRoleRepositoryPort,
  ) {}

  async execute(query: ListUserRoleQuery): Promise<PaginatedResponse<UserRoleEntity>> {

    const { data, total } = await this.repository.findWithPagination(query);

    const totalPages = Math.ceil(total / query.limit);

    return {
      data,
      total,
      page: query.page,
      limit: query.limit,
      totalPages,
    };
  }
}