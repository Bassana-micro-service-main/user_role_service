import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { PermissionsEntity } from "src/domain/entities/permissions.entity";

export interface ListPermissionsQuery {
    page: number;
    limit: number;
    name?: string;
    description?: string;
}

export interface ListPermissionsInterfacePort {
    execute(query: ListPermissionsQuery): Promise<PaginatedResponse<PermissionsEntity>>;
}