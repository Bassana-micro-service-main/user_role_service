import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { PermissionsEntity } from "src/domain/entities/permissions.entity";
import { GetPermissionsInterfacePort, GetPermissionsQuery } from "src/domain/port/in/permissions/get-permissions.interface.port";
import { PermissionsRepositoryPort } from "src/domain/port/out/permissions.repository.port";
import { GetPermissionsValidator } from "src/domain/service/validators/permissions/get-permissions.validator";

export class GetPermissionsUseCase implements GetPermissionsInterfacePort {

  constructor(
    private readonly repository: PermissionsRepositoryPort,
    private readonly validator: GetPermissionsValidator,
  ) { }

  async execute(query: GetPermissionsQuery): Promise<PermissionsEntity> {
    this.validator.validate(query);

    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) {
      throw new ApplicationError(CodesError.PERMISSION_NOT_FOUND);
    }

    return entity;
  }
}
