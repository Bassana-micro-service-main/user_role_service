import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { RolePermissionsEntity } from "src/domain/entities/role_permissions.entity";

export interface ListRolePermissionsQuery {
    page: number;
    limit: number;
    roleId?: string;
    permissionsId?: string;
}

export interface ListRolePermissionsInterfacePort {
    execute(query: ListRolePermissionsQuery): Promise<PaginatedResponse<RolePermissionsEntity>>;
}