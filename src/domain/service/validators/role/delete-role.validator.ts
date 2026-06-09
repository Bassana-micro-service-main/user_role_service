import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { DeleteRoleCommand } from "src/domain/port/in/role/delete-role.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class DeleteRoleValidator {

validate(command: DeleteRoleCommand): void {

if (!Utils.nanoidRegex.test(command.publicId)) {
throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
}
}
}