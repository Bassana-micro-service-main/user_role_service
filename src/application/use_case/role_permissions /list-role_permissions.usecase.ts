import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { RolePermissionsEntity } from "src/domain/entities/role_permissions.entity";
import { ListRolePermissionsInterfacePort, ListRolePermissionsQuery } from "src/domain/port/in/role_permissions/list-role_permissions.interface.port";
import { RolePermissionsRepositoryPort } from "src/domain/port/out/role_permissions.repository.port";

export class ListRolePermissionsUseCase implements ListRolePermissionsInterfacePort {

  constructor(
    private readonly repository: RolePermissionsRepositoryPort,
  ) {}

  async execute(query: ListRolePermissionsQuery): Promise<PaginatedResponse<RolePermissionsEntity>> {

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