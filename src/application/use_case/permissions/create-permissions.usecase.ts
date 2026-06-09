import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { PermissionsEntity } from "src/domain/entities/permissions.entity";
import { CreatePermissionsCommand, CreatePermissionsInterfacePort } from "src/domain/port/in/permissions/create-permissions.interface.port";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { PermissionsRepositoryPort } from "src/domain/port/out/permissions.repository.port";
import { CreatePermissionsValidator } from "src/domain/service/validators/permissions/create-permissions.validator";
export class CreatePermissionsUseCase implements CreatePermissionsInterfacePort {

  constructor(
    private readonly repository: PermissionsRepositoryPort,
    private readonly validator: CreatePermissionsValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) { }

  async execute(command: CreatePermissionsCommand): Promise<PermissionsEntity> {
    this.validator.validate(command);

    const existing = await this.repository.findByName(command.name);
    if (existing) {
      throw new ApplicationError(CodesError.PERMISSION_NAME_ALREADY_EXISTS);
    }
    const permissions = new PermissionsEntity({
      publicId: this.publicIdGenerator.generateNanoid(),
      name: command.name,
      description:command.description,
    });

    return this.repository.save(permissions);
  }
}
