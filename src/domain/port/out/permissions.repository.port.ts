import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { PermissionsEntity } from "src/domain/entities/permissions.entity";
import { ListPermissionsQuery } from "../in/permissions/list-permissions.interface.port";

export interface PermissionsRepositoryPort {
    save(role: PermissionsEntity): Promise<PermissionsEntity>;

    findById(id: string): Promise<PermissionsEntity | null>;

    findByPublicId(publicId: string): Promise<PermissionsEntity | null>;

    findByName(name: string): Promise<PermissionsEntity | null>;
    findWithPagination(query: ListPermissionsQuery): Promise<PaginatedResponse<PermissionsEntity>>;
    findByDescription(description: string): Promise<PermissionsEntity | null>;
    delete(publicId: string): Promise<void>;
}

export const ROLE_REPOSITORY = Symbol('PERMISSIONS_REPOSITORY');