import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { DeletePermissionsOverridesCommand, DeletePermissionsOverridesInterfacePort } from "src/domain/port/in/permissions_overrides/delete-permissions_overrides.interface.port";
import { PermissionsOverridesRepositoryPort } from "src/domain/port/out/permissions_overrides.repository.port";
import { DeletePermissionsOverridesValidator } from "src/domain/service/validators/permissions_overrides/delete-permissions_overrides.validator";

export class DeletePermissionsOverridesUseCase implements DeletePermissionsOverridesInterfacePort {

    constructor(
        private readonly repository: PermissionsOverridesRepositoryPort,
        private readonly validator: DeletePermissionsOverridesValidator,
    ) { }

    async execute(command: DeletePermissionsOverridesCommand): Promise<void> {
        this.validator.validate(command);


        const entity = await this.repository.findByPublicId(command.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.PERMISSION_NOT_FOUND);
        }

        await this.repository.delete(command.publicId);
    }
}