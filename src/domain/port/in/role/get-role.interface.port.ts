import { RoleEntity } from "src/domain/entity/role.entity";

export interface GetRoleQuery {
    publicId: string;
}

export interface GetRoleResponse {
    publicId:string;
    description:string;
    isSystem:boolean;
}

export interface GetRoleInterfacePort {
    execute(query: GetRoleQuery): Promise<RoleEntity | null>
}