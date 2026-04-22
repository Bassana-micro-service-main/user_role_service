import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateRoleCommand } from "src/domain/port/in/role/update-role.interface.port";

export class UpdateRoleValidator {
  validate(command: UpdateRoleCommand): void {
    if (command.name !== undefined && !command.name.trim()) {
      throw new BusinessError(CodesError.ROLE_NAME_INVALID);
    }

    if (command.description !== undefined && !command.description.trim()) {
      throw new BusinessError(CodesError.ROLE_DESCRIPTION_INVALID);
    }

    if (command.isSystem !== undefined && typeof command.isSystem !== "boolean") {
      throw new BusinessError(CodesError.ROLE_IS_SYSTEM_INVALID);
    }
  }
}