import { PermissionsEntity } from "src/domain/entities/permissions.entity";

export interface CreatePermissionsCommand {
    name: string;
    description: string;
}

export interface CreatePermissionsInterfacePort {
    execute(command: CreatePermissionsCommand): Promise<PermissionsEntity>;
}