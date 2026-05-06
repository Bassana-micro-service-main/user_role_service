import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateRolePermissionsCommand } from "src/domain/port/in/role_permissions/update-role_permissions.interface.port";

export class UpdateRolePermissionsValidator {
validate(command: UpdateRolePermissionsCommand): void {
if (command.roleId !== undefined && !command.roleId.trim()) {
throw new BusinessError(CodesError.PERMISSION_NAME_INVALID);
}

if (command.permissionsId !== undefined && !command.permissionsId.trim()) {
throw new BusinessError(CodesError.PERMISSION_DESCRIPTION_INVALID);
}
}
}
