import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { DeletePermissionsOverridesCommand } from "src/domain/port/in/permissions_overrides/delete-permissions_overrides.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class DeletePermissionsOverridesValidator {

validate(command: DeletePermissionsOverridesCommand): void {

if (!Utils.nanoidRegex.test(command.publicId)) {
throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
}
}
}