import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { DeleteUserRoleCommand, DeleteUserRoleInterfacePort } from "src/domain/port/in/user_role/delete-user_role.interface.port";
import { UserRoleRepositoryPort } from "src/domain/port/out/user_role.repository.port";
import { DeleteUserRoleValidator } from "src/domain/service/validators/role/user_role/delete-user_role.validator";

export class DeleteUserRoleUseCase implements DeleteUserRoleInterfacePort {

    constructor(
        private readonly repository: UserRoleRepositoryPort,
        private readonly validator: DeleteUserRoleValidator,
    ) { }

    async execute(command: DeleteUserRoleCommand): Promise<void> {
        this.validator.validate(command);


        const entity = await this.repository.findByPublicId(command.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.USER_ROLE_NOT_FOUND);
        }

        await this.repository.delete(command.publicId);
    }
}
