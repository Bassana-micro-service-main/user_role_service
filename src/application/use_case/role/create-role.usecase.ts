import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { RoleEntity } from "src/domain/entities/role.entity";
import { CreateRoleCommand, CreateRoleInterfacePort } from "src/domain/port/in/role/create-role.interface.port";
import { RoleRepositoryPort } from "src/domain/port/out/role.repository.port";
import { CreateRoleValidator } from "src/domain/service/validators/role/create-role.validator";
export class CreateUserUseCase implements CreateRoleInterfacePort {

  constructor(
    private readonly repository: RoleRepositoryPort,
    private readonly validator: CreateRoleValidator,
  ) { }

  async execute(command: CreateRoleCommand): Promise<RoleEntity> {
    this.validator.validate(command);

    const existing = await this.repository.findByName(command.name);
    if (existing) {
      throw new ApplicationError(CodesError.ROLE_NAME_ALREADY_EXISTS);
    }
    const role = new RoleEntity({
      publicId:command.publicId,
      name: command.name,
      description:command.description,
      isSystem: command.isSystem,
    });

    return this.repository.save(role);
  }
}
