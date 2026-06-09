import { PermissionsEntity } from "src/domain/entities/permissions.entity";

export interface GetPermissionsQuery {
    publicId: string;
}

export interface GetPermissionsResponse {
    publicId: string;
    name: string;
    description: string;
}

export interface GetPermissionsInterfacePort {
    execute(query: GetPermissionsQuery): Promise<PermissionsEntity>;
}