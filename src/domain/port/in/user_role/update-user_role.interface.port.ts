import { UserRoleEntity } from "src/domain/entities/user_role.entity";
import { GetUserRoleQuery } from "./get-user_role.interface.port";

export interface UpdateUserRoleCommand {
    userId?: string;
    roleId?: string;
}

export interface UpdateUserRoleInterfacePort {
    execute(query: GetUserRoleQuery, command: UpdateUserRoleCommand): Promise<UserRoleEntity>;
}