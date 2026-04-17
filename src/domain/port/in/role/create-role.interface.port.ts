import { RoleEntity } from "src/domain/entity/role.entity";

export interface CreateRoleCommand {
    name:string;
    description:string;
    isSystem:boolean;
}

export interface CreateRoleInterfacePort {
    execute(command: CreateRoleCommand): Promise<RoleEntity>;
}