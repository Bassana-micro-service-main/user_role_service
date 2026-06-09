export interface DeletePermissionsOverridesCommand {
    publicId: string;
}

export interface DeletePermissionsOverridesInterfacePort {
    execute(command: DeletePermissionsOverridesCommand): Promise<void>;
}