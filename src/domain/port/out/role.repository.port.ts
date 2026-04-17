import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { RoleEntity } from "src/domain/entities/role.entity";
import { ListRoleQuery } from "../in/role/list-role.interface.port";

export interface RoleRepositoryPort {
    save(role: RoleEntity): Promise<RoleEntity>;

    findById(id: number): Promise<RoleEntity | null>;

    findByPublicId(publicId: string): Promise<RoleEntity | null>;

    findByName(name: string): Promise<RoleEntity | null>;
    findWithPagination(query: ListRoleQuery): Promise<PaginatedResponse<RoleEntity>>;
    delete(publicId: string): Promise<void>;
}

export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');