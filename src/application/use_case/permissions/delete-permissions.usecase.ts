import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { DeletePermissionsCommand, DeletePermissionsInterfacePort } from "src/domain/port/in/permissions/delete-permissions.interface.port";
import { PermissionsRepositoryPort } from "src/domain/port/out/permissions.repository.port";
import { DeletePermissionsValidator } from "src/domain/service/validators/permissions/delete-permissions.validator";

export class DeletePermissionsUseCase implements DeletePermissionsInterfacePort {

    constructor(
        private readonly repository: PermissionsRepositoryPort,
        private readonly validator: DeletePermissionsValidator,
    ) { }

    async execute(command: DeletePermissionsCommand): Promise<void> {
        this.validator.validate(command);


        const entity = await this.repository.findByPublicId(command.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.PERMISSION_NOT_FOUND);
        }

        await this.repository.delete(command.publicId);
    }
}