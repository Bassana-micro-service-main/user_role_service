import { Module } from '@nestjs/common';
import { PermissionsRepositoryAdapter } from 'src/adapter/out/persistence/permissions.repository.adapter';
import { CreatePermissionsUseCase } from 'src/application/use_case/permissions/create-permissions.usecase';
import { UpdatePermissionsUseCase } from 'src/application/use_case/permissions/update-permissions.usecase';
import { GetPermissionsUseCase } from 'src/application/use_case/permissions/get-permissions.usecase';
import { ListPermissionsUseCase } from 'src/application/use_case/permissions/list-permissions.usecase';
import { DeletePermissionsUseCase } from 'src/application/use_case/permissions/delete-permissions.usecase';
import { CreatePermissionsValidator } from 'src/domain/service/validators/permissions/create-permissions.validator';
import { DeletePermissionsValidator} from 'src/domain/service/validators/permissions/delete-permissions.validator';
import { GetPermissionsValidator } from 'src/domain/service/validators/permissions/get-permissions.validator';
import { UpdatePermissionsValidator } from 'src/domain/service/validators/permissions/update-permissions.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { PermissionsControllerAdapter } from 'src/adapter/in/permissions/permissions.controller.adapter';
import { PublicIdGeneratorAdapter } from 'src/adapter/in/generate-public-id/generate.public-id.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [PermissionsControllerAdapter],
  providers: [
    {
      provide: 'RoleRepositoryPort',
      useClass: PermissionsRepositoryAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    // Validators
    CreatePermissionsValidator,
    UpdatePermissionsValidator,
    GetPermissionsValidator,
    DeletePermissionsValidator,

    // UseCases
    {
      provide: CreatePermissionsUseCase,
      useFactory: (repo, validator, idGenerator) =>
        new CreatePermissionsUseCase(repo, validator, idGenerator),
      inject: [
        'PermissionsRepositoryPort',
        CreatePermissionsValidator,
        'PublicIdGeneratorPort',
      ],
    },

    {
      provide: UpdatePermissionsUseCase,
      useFactory: (repo, validator) =>
        new UpdatePermissionsUseCase(repo, validator),
      inject: ['PermissionsRepositoryPort', UpdatePermissionsValidator],
    },

    {
      provide: GetPermissionsUseCase,
      useFactory: (repo, validator) =>
        new GetPermissionsUseCase(repo, validator),
      inject: ['UserRoleRepositoryPort', GetPermissionsValidator],
    },

    {
      provide: ListPermissionsUseCase,
      useFactory: (repo) =>
        new ListPermissionsUseCase(repo),
      inject: ['UserRoleRepositoryPort'],
    },

    {
      provide: DeletePermissionsUseCase,
      useFactory: (repo, validator) =>
        new DeletePermissionsUseCase(repo, validator),
      inject: ['UserRoleRepositoryPort', DeletePermissionsValidator],
    },
  ],
  exports: [
    CreatePermissionsUseCase,
    UpdatePermissionsUseCase,
    GetPermissionsUseCase,
    ListPermissionsUseCase,
    DeletePermissionsUseCase,
  ],
})
export class PermissionsModule { }