import { RoleEntity } from "src/domain/entity/role.entity";
import { GetRoleQuery } from "./get-role.interface.port";

export interface UpdateRoleCommand {
    name:string;
    description:string;
    isSystem:boolean;
    }

export interface UpdateUserInterfacePort {
    execute(query: GetRoleQuery, command: UpdateRoleCommand): Promise<RoleEntity>
}