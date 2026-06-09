import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { DeleteRoleCommand, DeleteRoleInterfacePort } from "src/domain/port/in/role/delete-role.interface.port";
import { RoleRepositoryPort } from "src/domain/port/out/role.repository.port";
import { DeleteRoleValidator } from "src/domain/service/validators/role/delete-role.validator";

export class DeleteRoleUseCase implements DeleteRoleInterfacePort {

    constructor(
        private readonly repository: RoleRepositoryPort,
        private readonly validator: DeleteRoleValidator,
    ) { }

    async execute(command: DeleteRoleCommand): Promise<void> {
        this.validator.validate(command);


        const entity = await this.repository.findByPublicId(command.publicId);

        if (!entity) {
            throw new ApplicationError(CodesError.ROLE_NOT_FOUND);
        }

        await this.repository.delete(command.publicId);
    }
}
