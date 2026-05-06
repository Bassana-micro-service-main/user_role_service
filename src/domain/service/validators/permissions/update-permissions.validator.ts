import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdatePermissionsCommand } from "src/domain/port/in/permissions/update-permissions.interface.port";

export class UpdatePermissionsValidator {
validate(command: UpdatePermissionsCommand): void {
if (command.name !== undefined && !command.name.trim()) {
throw new BusinessError(CodesError.PERMISSION_NAME_INVALID);
}

if (command.description !== undefined && !command.description.trim()) {
throw new BusinessError(CodesError.PERMISSION_DESCRIPTION_INVALID);
}
}
}
