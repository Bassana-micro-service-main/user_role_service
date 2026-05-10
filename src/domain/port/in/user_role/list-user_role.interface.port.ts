import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { UserRoleEntity } from "src/domain/entities/user_role.entity";

export interface ListUserRoleQuery {
    page: number;
    limit: number;
    userId?: string;
    roleId?: string;
}

export interface ListUserRoleInterfacePort {
    execute(query: ListUserRoleQuery): Promise<PaginatedResponse<UserRoleEntity>>;
}