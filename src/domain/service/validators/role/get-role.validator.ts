import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { GetRoleQuery } from "src/domain/port/in/role/get-role.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class GetRoleValidator {

    validate(command: GetRoleQuery): void {

        if (!Utils.nanoidRegex.test(command.publicId)) {
            throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
        }
    }
}