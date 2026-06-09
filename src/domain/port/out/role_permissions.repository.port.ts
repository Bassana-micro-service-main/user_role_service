import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { RolePermissionsEntity } from "src/domain/entities/role_permissions.entity";
import { ListRolePermissionsQuery } from "../in/role_permissions/list-role_permissions.interface.port";

export interface RolePermissionsRepositoryPort {
    save(role: RolePermissionsEntity): Promise<RolePermissionsEntity>;

    findById(id: string): Promise<RolePermissionsEntity | null>;

    findByPublicId(publicId: string): Promise<RolePermissionsEntity | null>;

    findByRoleId(roleId: string): Promise<RolePermissionsEntity | null>;
    findByRoleIdAndPermissionsId(
        roleId: string,
        permissionsId: string,
    ): Promise<RolePermissionsEntity | null>;
    findByPermissionsId(permissionsId: string): Promise<RolePermissionsEntity | null>;
    findWithPagination(query: ListRolePermissionsQuery): Promise<PaginatedResponse<RolePermissionsEntity>>;
    delete(publicId: string): Promise<void>;
}

export const ROLE_PERMISSION_REPOSITORY = Symbol('ROLE_PERMISSIONS_REPOSITORY');