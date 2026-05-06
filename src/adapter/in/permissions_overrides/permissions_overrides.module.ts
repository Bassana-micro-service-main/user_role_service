import { Module } from '@nestjs/common';
import { PermissionsOverridesRepositoryAdapter } from 'src/adapter/out/persistence/permissions_overrides.repository.adapter';
import { CreateRolePermissionsUseCase } from 'src/application/use_case/role_permissions/create-role_permissions.usecase';
import { UpdateUserRoleUseCase } from 'src/application/use_case/user_role/update-user_role.usecase';
import { GetUserRoleUseCase } from 'src/application/use_case/user_role/get-user_role.usecase';
import { ListUserRoleUseCase } from 'src/application/use_case/user_role/list-user_role.usecase';
import { DeleteUserRoleUseCase } from 'src/application/use_case/user_role/delete-user_role.usecase';
import { CreatePermissionsOverridesValidator } from 'src/domain/service/validators/permissions_overrides/create-permissions_overrides.validator';
import { DeletePermissionsOverridesValidator} from 'src/domain/service/validators/permissions_overrides/delete-permissions_overrides.validator';
import { GetPermissionsOverridesValidator } from 'src/domain/service/validators/permissions_overrides/get-permissions_overrides.validator';
import { UpdatePermissionsOverridesValidator } from 'src/domain/service/validators/permissions_overrides/update-permissions_overrides.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { PermissionsOverridesControllerAdapter } from 'src/adapter/in/permissions_overrides/permissions_overrides.controller.adapter';
import { PublicIdGeneratorAdapter } from 'src/adapter/in/generate-public-id/generate.public-id.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [PermissionsOverridesControllerAdapter],
  providers: [
    {
      provide: 'RoleRepositoryPort',
      useClass: PermissionsOverridesRepositoryAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    // Validators
    CreatePermissionsOverridesValidator,
    UpdatePermissionsOverridesValidator,
    GetPermissionsOverridesValidator,
    DeletePermissionsOverridesValidator,

    // UseCases
    {
      provide: CreatePermissionsOverridesUseCase,
      useFactory: (repo, validator, idGenerator) =>
        new CreatePermissionsOverridesUseCase(repo, validator, idGenerator),
      inject: [
        'PermissionsRepositoryPort',
        CreatePermissionsOverridesValidator,
        'PublicIdGeneratorPort',
      ],
    },

    {
      provide: UpdatePermissionsOverridesUseCase,
      useFactory: (repo, validator) =>
        new UpdatePermissionsOverridesUseCase(repo, validator),
      inject: ['PermissionsRepositoryPort', UpdatePermissionsOverridesValidator],
    },

    {
      provide: GetPermissionsOverridesUseCase,
      useFactory: (repo, validator) =>
        new GetPermissionsOverridesUseCase(repo, validator),
      inject: ['UserRoleRepositoryPort', GetPermissionsOverridesValidator],
    },

    {
      provide: ListPermissionsOverridesUseCase,
      useFactory: (repo) =>
        new ListPermissionsOverridesUseCase(repo),
      inject: ['UserRoleRepositoryPort'],
    },

    {
      provide: DeletePermissionsOverridesUseCase,
      useFactory: (repo, validator) =>
        new DeletePermissionsOverridesUseCase(repo, validator),
      inject: ['UserRoleRepositoryPort', DeletePermissionsOverridesValidator],
    },
  ],
  exports: [
    CreatePermissionsOverridesUseCase,
    UpdatePermissionsOverridesUseCase,
    GetPermissionsOverridesUseCase,
    ListPermissionsOverridesUseCase,
    DeletePermissionsOverridesUseCase,
  ],
})
export class RoleModule { }