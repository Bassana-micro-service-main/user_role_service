import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateRoleCommand } from "src/domain/port/in/role/create-role.interface.port";

export class CreateRoleValidator {
validate(command: CreateRoleCommand): void {
if (!command.name?.trim()) {
throw new BusinessError(CodesError.ROLE_NAME_INVALID);
}

if (!command.description?.trim()) {
throw new BusinessError(CodesError.ROLE_DESCRIPTION_INVALID);
}

if (typeof command.isSystem !== "boolean") {
throw new BusinessError(CodesError.ROLE_IS_SYSTEM_INVALID);
}
}
}