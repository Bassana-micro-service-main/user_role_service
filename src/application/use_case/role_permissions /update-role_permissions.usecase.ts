import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { RolePermissionsEntity } from "src/domain/entities/role_permissions.entity";
import { GetRolePermissionsQuery } from "src/domain/port/in/role_permissions/get-role_permissions.interface.port";
import { UpdateRolePermissionsCommand, UpdateRolePermissionsInterfacePort } from "src/domain/port/in/role_permissions/update-role_permissions.interface.port";
import { RolePermissionsRepositoryPort } from "src/domain/port/out/role_permissions.repository.port";
import { UpdateRolePermissionsValidator } from "src/domain/service/validators/role_permissions/update-role_permissions.validator";

export class UpdateRolePermissionsUseCase implements UpdateRolePermissionsInterfacePort {

    constructor(
        private readonly repository: RolePermissionsRepositoryPort,
        private readonly validator: UpdateRolePermissionsValidator,
    ) { }

    async execute(query: GetRolePermissionsQuery, command: UpdateRolePermissionsCommand): Promise<RolePermissionsEntity> {
        this.validator.validate(command);

        const entity = await this.repository.findByPublicId(query.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.PERMISSION_NOT_FOUND);
        }

        entity.update(command);

        return this.repository.save(entity);
    }
}
