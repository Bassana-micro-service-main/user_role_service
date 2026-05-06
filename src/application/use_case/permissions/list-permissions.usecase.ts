import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { PermissionsEntity } from "src/domain/entities/permissions.entity";
import { ListPermissionsInterfacePort, ListPermissionsQuery } from "src/domain/port/in/permissions/list-permissions.interface.port";
import { PermissionsRepositoryPort } from "src/domain/port/out/permissions.repository.port";

export class ListPermissionsUseCase implements ListPermissionsInterfacePort {

  constructor(
    private readonly repository: PermissionsRepositoryPort,
  ) {}

  async execute(query: ListPermissionsQuery): Promise<PaginatedResponse<PermissionsEntity>> {

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