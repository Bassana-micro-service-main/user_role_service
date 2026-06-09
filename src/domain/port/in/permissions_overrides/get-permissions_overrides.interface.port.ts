import { PermissionsOverridesEntity } from "src/domain/entities/permissions_overrides.entity";
import { ModeEnum } from "src/domain/enums/mode.enum";
export interface GetPermissionsOverridesQuery {
    publicId: string;
}

export interface GetPermissionsOverridesResponse {
    publicId: string;
    userId: string;
    permissionsId: string;
    mode:ModeEnum;
    note:string;
}

export interface GetPermissionsOverridesInterfacePort {
    execute(query: GetPermissionsOverridesQuery): Promise<PermissionsOverridesEntity>;
}