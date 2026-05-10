import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { PermissionsOverridesEntity } from "src/domain/entities/permissions_overrides.entity";
import { CreatePermissionsOverridesCommand, CreatePermissionsOverridesInterfacePort } from "src/domain/port/in/permissions_overrides/create-permissions_overrides.interface.port";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { PermissionsOverridesRepositoryPort } from "src/domain/port/out/permissions_overrides.repository.port";
import { CreatePermissionsOverridesValidator } from "src/domain/service/validators/permissions_overrides/create-permissions_overrides.validator";
export class CreatePermissionsOverridesUseCase implements CreatePermissionsOverridesInterfacePort {

  constructor(
    private readonly repository: PermissionsOverridesRepositoryPort,
    private readonly validator: CreatePermissionsOverridesValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) { }

  async execute(command: CreatePermissionsOverridesCommand): Promise<PermissionsOverridesEntity> {
    this.validator.validate(command);

    const existing = await this.repository.findByUserId(command.userId);
    if (existing) {
      throw new ApplicationError(CodesError.PERMISSION_NAME_ALREADY_EXISTS);
    }
    const permissions_overrides = new PermissionsOverridesEntity({
      publicId: this.publicIdGenerator.generateNanoid(),
      userId: command.userId,
      permissionsId:command.permissionsId,
      mode:command.mode,
      note:command.note,
    });

    return this.repository.save(permissions_overrides);
  }
}
