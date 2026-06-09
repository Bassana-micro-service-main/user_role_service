import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { PermissionsOverridesEntity } from "src/domain/entities/permissions_overrides.entity";
import { ListPermissionsOverridesQuery } from "../in/permissions_overrides/list-permissions_overrides.interface.port";
import { ModeEnum } from "src/domain/enums/mode.enum";
export interface PermissionsOverridesRepositoryPort {
    save(role: PermissionsOverridesEntity): Promise<PermissionsOverridesEntity>;

    findById(id: string): Promise<PermissionsOverridesEntity | null>;
findByUserId(userId: string): Promise<PermissionsOverridesEntity | null>;
    findWithPagination(query: ListPermissionsOverridesQuery): Promise<PaginatedResponse<PermissionsOverridesEntity>>;
    findByPublicId(publicId: string): Promise<PermissionsOverridesEntity | null>;
    findByPermissionsId(permissionsId: string): Promise<PermissionsOverridesEntity | null>;
    findBymode(mode: ModeEnum): Promise<PermissionsOverridesEntity | null>;
    findBynote(note: string): Promise<PermissionsOverridesEntity | null>;

    
    delete(publicId: string): Promise<void>;
}

export const PERMISSION_OVERRIDES_REPOSITORY = Symbol('PERMISSIONS_OVERRIDES_REPOSITORY');