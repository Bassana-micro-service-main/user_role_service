import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { RoleEntity } from "src/domain/entities/role.entity";
import { GetRoleQuery } from "src/domain/port/in/role/get-role.interface.port";
import { UpdateRoleCommand, UpdateRoleInterfacePort } from "src/domain/port/in/role/update-role.interface.port";
import { RoleRepositoryPort } from "src/domain/port/out/role.repository.port";
import { UpdateRoleValidator } from "src/domain/service/validators/role/update-role.validator";

export class UpdateRoleUseCase implements UpdateRoleInterfacePort {

    constructor(
        private readonly repository: RoleRepositoryPort,
        private readonly validator: UpdateRoleValidator,
    ) { }

    async execute(query: GetRoleQuery, command: UpdateRoleCommand): Promise<RoleEntity> {
        this.validator.validate(command);

        const entity = await this.repository.findByPublicId(query.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.ROLE_NOT_FOUND);
        }

        entity.update(command);

        return this.repository.save(entity);
    }
}
