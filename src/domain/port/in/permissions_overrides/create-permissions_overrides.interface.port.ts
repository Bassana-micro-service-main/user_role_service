import { PermissionsOverridesEntity } from "src/domain/entities/permissions_overrides.entity";
import { ModeEnum } from "src/domain/enums/mode.enum"
export interface CreatePermissionsOverridesCommand {
    userId: string;
    permissionsId: string;
    mode:ModeEnum;
    note:string;
}

export interface CreatePermissionsOverridesInterfacePort {
    execute(command: CreatePermissionsOverridesCommand): Promise<PermissionsOverridesEntity>;
}