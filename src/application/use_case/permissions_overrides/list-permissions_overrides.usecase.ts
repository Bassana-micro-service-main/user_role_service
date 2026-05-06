import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { PermissionsOverridesEntity } from "src/domain/entities/permissions_overrides.entity";
import { ListPermissionsOverridesInterfacePort, ListPermissionsOverridesQuery } from "src/domain/port/in/permissions_overrides/list-permissions_overrides.interface.port";
import { PermissionsOverridesRepositoryPort } from "src/domain/port/out/permissions_overrides.repository.port";

export class ListPermissionsOverridesUseCase implements ListPermissionsOverridesInterfacePort {

  constructor(
    private readonly repository: PermissionsOverridesRepositoryPort,
  ) {}

  async execute(query: ListPermissionsOverridesQuery): Promise<PaginatedResponse<PermissionsOverridesEntity>> {

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