export interface DeletePermissionsCommand {
    publicId: string;
}

export interface DeletePermissionsInterfacePort {
    execute(command: DeletePermissionsCommand): Promise<void>;
}