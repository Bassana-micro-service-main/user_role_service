import { RoleEntity } from "src/domain/entity/role.entity";
import { ListRoleQuery } from "../in/role/list-role.interface.port";

export interface RoleRepositoryPort {

    save(user: RoleEntity): Promise<RoleEntity>;

    findById(id: number): Promise<RoleEntity | null>;

    findByPublicId(publicId: string): Promise<RoleEntity | null>;

    findByName(name: string): Promise<RoleEntity | null>;
    findWithDescription(query: ListRoleQuery): Promise<{ data: RoleEntity[]; total: number }>;
    delete(publicId: string): Promise<void>
}

export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');