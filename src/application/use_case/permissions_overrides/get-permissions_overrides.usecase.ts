import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { PermissionsOverridesEntity } from "src/domain/entities/permissions_overrides.entity";
import { GetPermissionsOverridesInterfacePort, GetPermissionsOverridesQuery } from "src/domain/port/in/permissions_overrides/get-permissions_overrides.interface.port";
import { PermissionsOverridesRepositoryPort } from "src/domain/port/out/permissions_overrides.repository.port";
import { GetPermissionsOverridesValidator } from "src/domain/service/validators/permissions_overrides/get-permissions_overrides.validator";

export class GetPermissionsOverridesUseCase implements GetPermissionsOverridesInterfacePort {

  constructor(
    private readonly repository: PermissionsOverridesRepositoryPort,
    private readonly validator: GetPermissionsOverridesValidator,
  ) { }

  async execute(query: GetPermissionsOverridesQuery): Promise<PermissionsOverridesEntity> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.PERMISSION_NOT_FOUND);
    }

    return entity;
  }
}
