import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { DeletePermissionsCommand } from "src/domain/port/in/permissions/delete-permissions.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class DeletePermissionsValidator {

validate(command: DeletePermissionsCommand): void {

if (!Utils.nanoidRegex.test(command.publicId)) {
throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
}
}
}