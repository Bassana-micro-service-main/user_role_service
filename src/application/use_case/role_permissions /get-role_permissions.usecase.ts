import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { RolePermissionsEntity } from "src/domain/entities/role_permissions.entity";
import { GetRolePermissionsInterfacePort, GetRolePermissionsQuery } from "src/domain/port/in/role_permissions/get-role_permissions.interface.port";
import { RolePermissionsRepositoryPort } from "src/domain/port/out/role_permissions.repository.port";
import { GetRolePermissionsValidator } from "src/domain/service/validators/role_permissions/get-role_permissions.validator";

export class GetRolePermissionsUseCase implements GetRolePermissionsInterfacePort {

  constructor(
    private readonly repository: RolePermissionsRepositoryPort,
    private readonly validator: GetRolePermissionsValidator,
  ) { }

  async execute(query: GetRolePermissionsQuery): Promise<RolePermissionsEntity> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.PERMISSION_NOT_FOUND);
    }

    return entity;
  }
}
