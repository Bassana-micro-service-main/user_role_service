import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreatePermissionsCommand } from "src/domain/port/in/permissions/create-permissions.interface.port";

export class CreatePermissionsValidator {
validate(command: CreatePermissionsCommand): void {
if (!command.name?.trim()) {
throw new BusinessError(CodesError.PERMISSION_NAME_INVALID);
}

if (!command.description?.trim()) {
throw new BusinessError(CodesError.PERMISSION_DESCRIPTION_INVALID);
}
}
}