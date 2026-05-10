import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { PermissionsEntity } from "src/domain/entities/permissions.entity";
import { GetPermissionsQuery } from "src/domain/port/in/permissions/get-permissions.interface.port";
import { UpdatePermissionsCommand, UpdatePermissionsInterfacePort } from "src/domain/port/in/permissions/update-permissions.interface.port";
import { PermissionsRepositoryPort } from "src/domain/port/out/permissions.repository.port";
import { UpdatePermissionsValidator } from "src/domain/service/validators/permissions/update-permissions.validator";

export class UpdatePermissionsUseCase implements UpdatePermissionsInterfacePort {

    constructor(
        private readonly repository: PermissionsRepositoryPort,
        private readonly validator: UpdatePermissionsValidator,
    ) { }

    async execute(query: GetPermissionsQuery, command: UpdatePermissionsCommand): Promise<PermissionsEntity> {
        this.validator.validate(command);

        const entity = await this.repository.findByPublicId(query.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.PERMISSION_NOT_FOUND);
        }

        entity.update(command);

        return this.repository.save(entity);
    }
}
