import { UserRoleEntity } from "src/domain/entities/user_role.entity";

export interface GetUserRoleQuery {
    publicId: string;
}

export interface GetUserRoleResponse {
    publicId: string;
    userId: string;
    roleId: string;
}

export interface GetUserRoleInterfacePort {
    execute(query: GetUserRoleQuery): Promise<UserRoleEntity>;
}