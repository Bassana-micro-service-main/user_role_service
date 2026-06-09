import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateRolePermissionsCommand } from "src/domain/port/in/role_permissions/create-role_permissions.interface.port";

export class CreateRolePermissionsValidator {
validate(command: CreateRolePermissionsCommand): void {
if (!command.roleId?.trim()) {
throw new BusinessError(CodesError.PERMISSION_NAME_INVALID);
}

if (!command.permissionsId?.trim()) {
throw new BusinessError(CodesError.PERMISSION_DESCRIPTION_INVALID);
}
}
}