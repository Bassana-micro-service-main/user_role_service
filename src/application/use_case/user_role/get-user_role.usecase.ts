import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { UserRoleEntity } from "src/domain/entities/user_role.entity";
import { GetUserRoleInterfacePort, GetUserRoleQuery } from "src/domain/port/in/user_role/get-user_role.interface.port";
import { UserRoleRepositoryPort } from "src/domain/port/out/user_role.repository.port";
import { GetUserRoleValidator } from "src/domain/service/validators/user_role/get-user_role.validator";

export class GetUserRoleUseCase implements GetUserRoleInterfacePort {

  constructor(
    private readonly repository: UserRoleRepositoryPort,
    private readonly validator: GetUserRoleValidator,
  ) { }

  async execute(query: GetUserRoleQuery): Promise<UserRoleEntity> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.USER_ROLE_NOT_FOUND);
    }

    return entity;
  }
}
