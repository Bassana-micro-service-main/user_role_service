import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { GetPermissionsOverridesQuery } from "src/domain/port/in/permissions_overrides/get-permissions_overrides.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class GetPermissionsOverridesValidator {

validate(command: GetPermissionsOverridesQuery): void {

if (!Utils.nanoidRegex.test(command.publicId)) {
throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
}
}
}

