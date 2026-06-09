import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdatePermissionsOverridesCommand } from "src/domain/port/in/permissions_overrides/update-permissions_overrides.interface.port";

export class UpdatePermissionsOverridesValidator {
validate(command: UpdatePermissionsOverridesCommand): void {
if (command.userId !== undefined && !command.userId.trim()) {
throw new BusinessError(CodesError.PERMISSION_NOT_FOUND);
}

if (command.permissionsId !== undefined && !command.permissionsId.trim()) {
throw new BusinessError(CodesError.PERMISSION_NOT_FOUND);
}

if (command.mode!== undefined && typeof command.mode !== "boolean") {
throw new BusinessError(CodesError.PERMISSION_OVERRIDE_NOT_FOUND);
}
if (command.note !== undefined && !command.note.trim()) {
throw new BusinessError(CodesError.PERMISSION_NOT_FOUND);
}
}
}
