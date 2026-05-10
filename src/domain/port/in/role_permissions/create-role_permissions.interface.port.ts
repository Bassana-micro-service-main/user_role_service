import { RolePermissionsEntity } from "src/domain/entities/role_permissions.entity";

export interface CreateRolePermissionsCommand {
    roleId: string;
    permissionsId: string;
}

export interface CreateRolePermissionsInterfacePort {
    execute(command: CreateRolePermissionsCommand): Promise<RolePermissionsEntity>;
}