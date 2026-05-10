import { PermissionsOverridesEntity } from "src/domain/entities/permissions_overrides.entity";
import { GetPermissionsOverridesQuery } from "./get-permissions_overrides.interface.port";
import { ModeEnum } from "src/domain/enums/mode.enum";
export interface UpdatePermissionsOverridesCommand {
    userId: string;
    permissionsId: string;
    mode:ModeEnum;
    note:string;
}

export interface UpdatePermissionsOverridesInterfacePort {
    execute(query: GetPermissionsOverridesQuery, command: UpdatePermissionsOverridesCommand): Promise<PermissionsOverridesEntity>;
}