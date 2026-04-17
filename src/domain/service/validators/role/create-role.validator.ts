import { BusinessError } from "src/domain/errors/business.error";
import { CreateRoleCommand } from "src/domain/port/in/role/create-role.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class CreateRoleValidator {

    validate(command: CreateRoleCommand): void {

        if (!Utils.nameRegex.test(command.name)) {
            throw new BusinessError(CodesError.NAME_INVALID);
        }

        if (!Utils.descriptionRegex.test(command.description)) {
            throw new BusinessError(CodesError.DESCRIPTION_INVALID);
        }

        if (!Object.values(isSystem).includes(command.status)) {
            throw new BusinessError(CodesError.ISSYSTEM_INVALID);
        }
    }
}