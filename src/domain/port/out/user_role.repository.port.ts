import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { UserRoleEntity } from "src/domain/entities/user_role.entity";
import { ListUserRoleQuery } from "../in/user_role/list-user_role.interface.port";

export interface UserRoleRepositoryPort {
    save(role: UserRoleEntity): Promise<UserRoleEntity>;

    findById(id: string): Promise<UserRoleEntity | null>;

    findByPublicId(publicId: string): Promise<UserRoleEntity | null>;

    findByUserId(name: string): Promise<UserRoleEntity | null>;
    findWithRoleId(query: ListUserRoleQuery): Promise<PaginatedResponse<UserRoleEntity>>;
    findWithPagination(query: ListUserRoleQuery): Promise<PaginatedResponse<UserRoleEntity>>;
    delete(publicId: string): Promise<void>;
}

export const USER_ROLE_REPOSITORY = Symbol('USER_ROLE_REPOSITORY');