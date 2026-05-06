import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { DeleteRolePermissionsCommand } from "src/domain/port/in/role_permissions/delete-role_permissions.interface.port";
import { Utils } from "../../../../lib/utils.commons";

export class DeleteRolePermissionsValidator {

validate(command: DeleteRolePermissionsCommand): void {

if (!Utils.nanoidRegex.test(command.publicId)) {
throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
}
}
}