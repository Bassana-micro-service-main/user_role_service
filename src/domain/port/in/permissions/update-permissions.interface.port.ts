import { PermissionsEntity } from "src/domain/entities/permissions.entity";
import { GetPermissionsQuery } from "./get-permissions.interface.port";

export interface UpdatePermissionsCommand {
    name?: string;
    description?: string;
}

export interface UpdatePermissionsInterfacePort {
    execute(query: GetPermissionsQuery, command: UpdatePermissionsCommand): Promise<PermissionsEntity>;
}