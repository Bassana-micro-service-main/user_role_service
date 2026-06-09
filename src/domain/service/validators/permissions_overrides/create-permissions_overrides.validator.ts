import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreatePermissionsOverridesCommand } from "src/domain/port/in/permissions_overrides/create-permissions_overrides.interface.port";

export class CreatePermissionsOverridesValidator {
validate(command: CreatePermissionsOverridesCommand): void {
if (!command.userId?.trim()) {
throw new BusinessError(CodesError.PERMISSION_NOT_FOUND);
}

if (!command.permissionsId?.trim()) {
throw new BusinessError(CodesError.PERMISSION_DESCRIPTION_INVALID);
}
if (command.note !== undefined && !command.note.trim()) {
throw new BusinessError(CodesError.PERMISSION_NOT_FOUND);
}
if (typeof command.mode !== "boolean") {
throw new BusinessError(CodesError.PERMISSION_NOT_FOUND);
}
}
}