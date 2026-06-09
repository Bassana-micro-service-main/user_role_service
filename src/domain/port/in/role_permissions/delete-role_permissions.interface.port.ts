export interface DeleteRolePermissionsCommand {
    publicId: string;
}

export interface DeleteRolePermissionsInterfacePort {
    execute(command: DeleteRolePermissionsCommand): Promise<void>;
}