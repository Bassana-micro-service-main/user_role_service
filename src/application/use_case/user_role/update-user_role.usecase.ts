import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { UserRoleEntity } from "src/domain/entities/user_role.entity";
import { GetUserRoleQuery } from "src/domain/port/in/user_role/get-user_role.interface.port";
import { UpdateUserRoleCommand, UpdateUserRoleInterfacePort } from "src/domain/port/in/user_role/update-user_role.interface.port";
import { UserRoleRepositoryPort } from "src/domain/port/out/user_role.repository.port";
import { UpdateUserRoleValidator } from "src/domain/service/validators/user_role/update-user_role.validator";

export class UpdateUserRoleUseCase implements UpdateUserRoleInterfacePort {

    constructor(
        private readonly repository: UserRoleRepositoryPort,
        private readonly validator: UpdateUserRoleValidator,
    ) { }

    async execute(query: GetUserRoleQuery, command: UpdateUserRoleCommand): Promise<UserRoleEntity> {
        this.validator.validate(command);

        const entity = await this.repository.findByPublicId(query.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.USER_ROLE_NOT_FOUND);
        }

        entity.update(command);

        return this.repository.save(entity);
    }
}
