import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { PermissionsOverridesEntity } from "src/domain/entities/permissions_overrides.entity";
import { GetPermissionsOverridesQuery } from "src/domain/port/in/permissions_overrides/get-permissions_overrides.interface.port";
import { UpdatePermissionsOverridesCommand, UpdatePermissionsOverridesInterfacePort } from "src/domain/port/in/permissions_overrides/update-permissions_overrides.interface.port";
import { PermissionsOverridesRepositoryPort } from "src/domain/port/out/permissions_overrides.repository.port";
import { UpdatePermissionsOverridesValidator } from "src/domain/service/validators/permissions_overrides/update-permissions_overrides.validator";
export class UpdatePermissionsOverridesUseCase implements UpdatePermissionsOverridesInterfacePort {

    constructor(
        private readonly repository: PermissionsOverridesRepositoryPort,
        private readonly validator: UpdatePermissionsOverridesValidator,
    ) { }

    async execute(query: GetPermissionsOverridesQuery, command: UpdatePermissionsOverridesCommand): Promise<PermissionsOverridesEntity> {
        this.validator.validate(command);

        const entity = await this.repository.findByPublicId(query.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.PERMISSION_NOT_FOUND);
        }

        entity.update(command);

        return this.repository.save(entity);
    }
}
