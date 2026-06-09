import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { PermissionsOverridesEntity } from "src/domain/entities/permissions_overrides.entity";
import { ModeEnum } from "src/domain/enums/mode.enum";
export interface ListPermissionsOverridesQuery {
    page: number;
    limit: number;
    userId: string;
    permissionsId: string;
    mode:ModeEnum;
    note:string;
}

export interface ListPermissionsOverridesInterfacePort {
    execute(query: ListPermissionsOverridesQuery): Promise<PaginatedResponse<PermissionsOverridesEntity>>;
}