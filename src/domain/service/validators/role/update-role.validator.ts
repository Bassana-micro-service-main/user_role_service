import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateRoleCommand } from "src/domain/port/in/role/update-role.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class UpdateRoleValidator {

    validate(command: UpdateRoleCommand): void {

        if (!Utils.nameRegex.test(command.name!)) {
            throw new BusinessError(CodesError.NAME_INVALID);
        }

        if (!Utils.descriptionRegex.test(command.description!)) {
            throw new BusinessError(CodesError.DESCRIPTION_INVALID);
        }

        if (!Object.values(Boolean).includes(command.isSystem!)) {
            throw new BusinessError(CodesError.ISSYSTEM_INVALID);
        }
    }
}