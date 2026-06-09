import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { RolePermissionsEntity } from "src/domain/entities/role_permissions.entity";
import { CreateRolePermissionsCommand, CreateRolePermissionsInterfacePort } from "src/domain/port/in/role_permissions/create-role_permissions.interface.port";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { RolePermissionsRepositoryPort } from "src/domain/port/out/role_permissions.repository.port";
import { CreateRolePermissionsValidator } from "src/domain/service/validators/role_permissions/create-role_permissions.validator";
export class CreateRolePermissionsUseCase implements CreateRolePermissionsInterfacePort {

  constructor(
    private readonly repository: RolePermissionsRepositoryPort,
    private readonly validator: CreateRolePermissionsValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) { }

  async execute(command: CreateRolePermissionsCommand): Promise<RolePermissionsEntity> {
    this.validator.validate(command);

    const existing = await this.repository.findByRoleIdAndPermissionsId(
      command.roleId,
      command.permissionsId,
    );
    if (existing) {
      throw new ApplicationError(CodesError.ROLE_PERMISSION_ALREADY_EXISTS);
    }
    const role_permissions = new RolePermissionsEntity({
      publicId: this.publicIdGenerator.generateNanoid(),
      roleId: command.roleId,
      permissionsId:command.permissionsId,
    });

    return this.repository.save(role_permissions);
  }
}
