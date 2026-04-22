import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { RoleEntity } from "src/domain/entities/role.entity";
import { GetRoleInterfacePort, GetRoleQuery } from "src/domain/port/in/role/get-role.interface.port";
import { RoleRepositoryPort } from "src/domain/port/out/role.repository.port";
import { GetRoleValidator } from "src/domain/service/validators/role/get-role.validator";

export class GetRoleUseCase implements GetRoleInterfacePort {

  constructor(
    private readonly repository: RoleRepositoryPort,
    private readonly validator: GetRoleValidator,
  ) { }

  async execute(query: GetRoleQuery): Promise<RoleEntity | null> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.ROLE_NOT_FOUND);
    }

    return entity;
  }
}
