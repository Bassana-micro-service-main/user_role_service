import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { RolePermissionsRepositoryPort } from "src/domain/port/out/role_permissions.repository.port";
import { DeleteRolePermissionsValidator } from "src/domain/service/validators/role_permissions/delete-role_permissions.validator";
import { DeleteRolePermissionsInterfacePort,DeleteRolePermissionsCommand } from "src/domain/port/in/role_permissions/delete-role_permissions.interface.port";
export class DeleteRolePermissionsUseCase implements DeleteRolePermissionsInterfacePort {

    constructor(
        private readonly repository: RolePermissionsRepositoryPort,
        private readonly validator: DeleteRolePermissionsValidator,
    ) { }

    async execute(command: DeleteRolePermissionsCommand): Promise<void> {
        this.validator.validate(command);


        const entity = await this.repository.findByPublicId(command.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.PERMISSION_NOT_FOUND);
        }

        await this.repository.delete(command.publicId);
    }
}