import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { UserRoleEntity } from "src/domain/entities/user_role.entity";
import { CreateUserRoleCommand, CreateUserRoleInterfacePort } from "src/domain/port/in/user_role/create-user_role.interface.port";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { UserRoleRepositoryPort } from "src/domain/port/out/user_role.repository.port";
import { CreateUserRoleValidator } from "src/domain/service/validators/role/user_role/create-user_role.validator";
export class CreateUserRoleUseCase implements CreateUserRoleInterfacePort {

  constructor(
    private readonly repository: UserRoleRepositoryPort,
    private readonly validator: CreateUserRoleValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) { }

  async execute(command: CreateUserRoleCommand): Promise<UserRoleEntity> {
    this.validator.validate(command);

    const existing = await this.repository.findByUserId(command.userId);
    if (existing) {
      throw new ApplicationError(CodesError.USER_ROLE_ALREADY_EXISTS);
    }
    const user_role = new UserRoleEntity({
      publicId: this.publicIdGenerator.generateNanoid(),
      userId: command.userId,
      roleId:command.roleId,
    });

    return this.repository.save(user_role);
  }
}
