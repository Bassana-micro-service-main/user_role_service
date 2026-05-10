import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { DeleteUserRoleCommand } from "src/domain/port/in/user_role/delete-user_role.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class DeleteUserRoleValidator {

    validate(command: DeleteUserRoleCommand): void {

        if (!Utils.nanoidRegex.test(command.publicId)) {
            throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
        }
    }
}