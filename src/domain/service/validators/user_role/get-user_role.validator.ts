import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { GetUserRoleQuery } from "src/domain/port/in/user_role/get-user_role.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class GetUserRoleValidator {

    validate(command: GetUserRoleQuery): void {

        if (!Utils.nanoidRegex.test(command.publicId)) {
            throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
        }
    }
}