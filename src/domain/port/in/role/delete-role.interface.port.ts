export interface DeleteRoleCommand {
    publicId: string;
}

export interface DeleteRoleInterfacePort {
    execute(command: DeleteRoleCommand): Promise<void>;
}