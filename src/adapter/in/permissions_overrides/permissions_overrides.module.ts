import { Module } from '@nestjs/common';
import { PermissionsOverridesRepositoryAdapter } from 'src/adapter/out/persistence/permissions_overrides.repository.adapter';
import { CreatePermissionsOverridesUseCase } from 'src/application/use_case/permissions_overrides/create-permissions_overrides.usecase';
import { UpdatePermissionsOverridesUseCase } from 'src/application/use_case/permissions_overrides/update-permissions_overrides.usecase';
import { GetPermissionsOverridesUseCase } from 'src/application/use_case/permissions_overrides/get-permissions_overrides.usecase';
import { ListPermissionsOverridesUseCase } from 'src/application/use_case/permissions_overrides/list-permissions_overrides.usecase';
import { DeletePermissionsOverridesUseCase } from 'src/application/use_case/permissions_overrides/delete-permissions_overrides.usecase';
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
      provide: 'PermissionsOverridesRepositoryPort',
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
        'PermissionsOverridesRepositoryPort',
        CreatePermissionsOverridesValidator,
        'PublicIdGeneratorPort',
      ],
    },

    {
      provide: UpdatePermissionsOverridesUseCase,
      useFactory: (repo, validator) =>
        new UpdatePermissionsOverridesUseCase(repo, validator),
      inject: ['PermissionsOverridesRepositoryPort', UpdatePermissionsOverridesValidator],
    },

    {
      provide: GetPermissionsOverridesUseCase,
      useFactory: (repo, validator) =>
        new GetPermissionsOverridesUseCase(repo, validator),
      inject: ['PermissionsOverridesRepositoryPort', GetPermissionsOverridesValidator],
    },

    {
      provide: ListPermissionsOverridesUseCase,
      useFactory: (repo) =>
        new ListPermissionsOverridesUseCase(repo),
      inject: ['PermissionsOverridesRepositoryPort'],
    },

    {
      provide: DeletePermissionsOverridesUseCase,
      useFactory: (repo, validator) =>
        new DeletePermissionsOverridesUseCase(repo, validator),
      inject: ['PermissionsOverridesRepositoryPort', DeletePermissionsOverridesValidator],
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
export class PermissionsOverridesModule { }