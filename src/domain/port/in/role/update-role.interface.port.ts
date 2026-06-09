import { RoleEntity } from "src/domain/entities/role.entity";
import { GetRoleQuery } from "./get-role.interface.port";

export interface UpdateRoleCommand {
    name?: string;
    description?: string;
    isSystem?: boolean;
    isActive?: boolean;
}

export interface UpdateRoleInterfacePort {
    execute(query: GetRoleQuery, command: UpdateRoleCommand): Promise<RoleEntity>;
}