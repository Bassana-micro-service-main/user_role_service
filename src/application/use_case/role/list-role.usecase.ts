import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { RoleEntity } from "src/domain/entities/role.entity";
import { ListRoleInterfacePort, ListRoleQuery } from "src/domain/port/in/role/list-role.interface.port";
import { RoleRepositoryPort } from "src/domain/port/out/role.repository.port";

export class ListRoleUseCase implements ListRoleInterfacePort {

  constructor(
    private readonly repository: RoleRepositoryPort,
  ) {}

  async execute(query: ListRoleQuery): Promise<PaginatedResponse<RoleEntity>> {

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
