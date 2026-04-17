
import { RoleEntity } from "src/domain/entity/role.entity";

export interface ListRoleQuery {  
    description?:string;
    isSystem?:boolean;
}


export interface listUserInterfacePort {
    execute(query: ListRoleQuery): Promise<RoleEntity>
}