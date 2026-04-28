import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateUserRoleCommand } from "src/domain/port/in/user_role/create-user_role.interface.port";

export class CreateUserRoleValidator {
validate(command: CreateUserRoleCommand): void {
if (!command.userId?.trim()) {
throw new BusinessError(CodesError.USER_ROLE_NOT_FOUND);
}

if (!command.roleId?.trim()) {
throw new BusinessError(CodesError.USER_ROLE_NOT_FOUND);
}
}
}