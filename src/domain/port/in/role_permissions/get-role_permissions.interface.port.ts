import { RolePermissionsEntity } from "src/domain/entities/role_permissions.entity";

export interface GetRolePermissionsQuery {
    publicId: string;
}

export interface GetRolePermissionsResponse {
    publicId: string;
    roleId: string;
    permissionsId: string;
}

export interface GetRolePermissionsInterfacePort {
    execute(query: GetRolePermissionsQuery): Promise<RolePermissionsEntity>;
}