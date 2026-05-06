import { RolePermissionsEntity } from "src/domain/entities/role_permissions.entity";
import { GetRolePermissionsQuery } from "./get-role_permissions.interface.port";

export interface UpdateRolePermissionsCommand {
    roleId?: string;
    permissionsId?: string;
}

export interface UpdateRolePermissionsInterfacePort {
    execute(query: GetRolePermissionsQuery, command: UpdateRolePermissionsCommand): Promise<RolePermissionsEntity>;
}