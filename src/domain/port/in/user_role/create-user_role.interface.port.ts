import { UserRoleEntity } from "src/domain/entities/user_role.entity";

export interface CreateUserRoleCommand {
    userId: string;
    roleId: string;
}

export interface CreateUserRoleInterfacePort {
    execute(command: CreateUserRoleCommand): Promise<UserRoleEntity>;
}