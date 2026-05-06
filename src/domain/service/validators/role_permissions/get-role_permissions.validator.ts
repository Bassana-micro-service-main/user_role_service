import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { GetRolePermissionsQuery } from "src/domain/port/in/role_permissions/get-role_permissions.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class GetRolePermissionsValidator {

validate(command: GetRolePermissionsQuery): void {

if (!Utils.nanoidRegex.test(command.publicId)) {
throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
}
}
}