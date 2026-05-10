export interface DeleteUserRoleCommand {
    publicId: string;
}

export interface DeleteUserRoleInterfacePort {
    execute(command: DeleteUserRoleCommand): Promise<void>;
}