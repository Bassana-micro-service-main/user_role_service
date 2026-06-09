import { RoleEntity } from "src/domain/entities/role.entity";

export interface CreateRoleCommand {
    name: string;
    description: string;
    isSystem: boolean;
    isActive?: boolean;
}

export interface CreateRoleInterfacePort {
    execute(command: CreateRoleCommand): Promise<RoleEntity>;
}