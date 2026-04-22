import { RoleEntity } from "src/domain/entities/role.entity";

export interface CreateRoleCommand {
    publicId:string;
    name: string;
    description: string;
    isSystem: boolean;
}

export interface CreateRoleInterfacePort {
    execute(command: CreateRoleCommand): Promise<RoleEntity>;
}