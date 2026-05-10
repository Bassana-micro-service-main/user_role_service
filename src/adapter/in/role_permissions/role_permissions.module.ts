import { Module } from '@nestjs/common';
import { RolePermissionsRepositoryAdapter } from 'src/adapter/out/persistence/role_permissions.repository.adapter';
import { CreateRolePermissionsValidator } from 'src/domain/service/validators/role_permissions/create-role_permissions.validator';
import { DeleteRolePermissionsValidator} from 'src/domain/service/validators/role_permissions/delete-role_permissions.validator';
import { GetRolePermissionsValidator } from 'src/domain/service/validators/role_permissions/get-role_permissions.validator';
import { UpdateRolePermissionsValidator } from 'src/domain/service/validators/role_permissions/update-role_permissions.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { RolePermissionsControllerAdapter } from 'src/adapter/in/role_permissions/role_permissions.controller.adapter';
import { PublicIdGeneratorAdapter } from 'src/adapter/in/generate-public-id/generate.public-id.adapter';
import { CreateRolePermissionsUseCase } from 'src/application/use_case/role_permissions /create-role_permissions.usecase';
import { UpdateRolePermissionsUseCase } from 'src/application/use_case/role_permissions /update-role_permissions.usecase';
import { GetRolePermissionsUseCase } from 'src/application/use_case/role_permissions /get-role_permissions.usecase';
import { ListRolePermissionsUseCase } from 'src/application/use_case/role_permissions /list-role_permissions.usecase';
import { DeleteRolePermissionsUseCase } from 'src/application/use_case/role_permissions /delete-role_permissions.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [RolePermissionsControllerAdapter],
  providers: [
    {
      provide: 'RoleRepositoryPort',
      useClass: RolePermissionsRepositoryAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    // Validators
    CreateRolePermissionsValidator,
    UpdateRolePermissionsValidator,
    GetRolePermissionsValidator,
    DeleteRolePermissionsValidator,

    // UseCases
    {
      provide: CreateRolePermissionsUseCase,
      useFactory: (repo, validator, idGenerator) =>
        new CreateRolePermissionsUseCase(repo, validator, idGenerator),
      inject: [
        'RoleRepositoryPort',
        CreateRolePermissionsValidator,
        'PublicIdGeneratorPort',
      ],
    },

    {
      provide: UpdateRolePermissionsUseCase,
      useFactory: (repo, validator) =>
        new UpdateRolePermissionsUseCase(repo, validator),
      inject: ['UserRoleRepositoryPort', UpdateRolePermissionsValidator],
    },

    {
      provide: GetRolePermissionsUseCase,
      useFactory: (repo, validator) =>
        new GetRolePermissionsUseCase(repo, validator),
      inject: ['UserRoleRepositoryPort', GetRolePermissionsValidator],
    },

    {
      provide: ListRolePermissionsUseCase,
      useFactory: (repo) =>
        new ListRolePermissionsUseCase(repo),
      inject: ['UserRoleRepositoryPort'],
    },

    {
      provide: DeleteRolePermissionsUseCase,
      useFactory: (repo, validator) =>
        new DeleteRolePermissionsUseCase(repo, validator),
      inject: ['UserRoleRepositoryPort', DeleteRolePermissionsValidator],
    },
  ],
  exports: [
    CreateRolePermissionsUseCase,
    UpdateRolePermissionsUseCase,
    GetRolePermissionsUseCase,
    ListRolePermissionsUseCase,
    DeleteRolePermissionsUseCase,
  ],
})
export class RolePermissionsModule { }