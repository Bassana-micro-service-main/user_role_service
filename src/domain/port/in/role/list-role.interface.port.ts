import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { RoleEntity } from "src/domain/entities/role.entity";

export interface ListRoleQuery {
    page: number;
    limit: number;
    description?: string;
    isSystem?: boolean;
    name?: string;
}

export interface ListRoleInterfacePort {
    execute(query: ListRoleQuery): Promise<PaginatedResponse<RoleEntity>>;
}