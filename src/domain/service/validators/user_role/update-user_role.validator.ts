import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateUserRoleCommand } from "src/domain/port/in/user_role/update-user_role.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class UpdateUserRoleValidator {

    validate(command: UpdateUserRoleCommand): void {

        if (!Utils.userIdRegex.test(command.userId!)) {
            throw new BusinessError(CodesError.USER_ID_INVALID);
        }

        if (!Utils.roleIdRegex.test(command.roleId!)) {
            throw new BusinessError(CodesError.USER_ROLE_NOT_FOUND);
        }
    }
}