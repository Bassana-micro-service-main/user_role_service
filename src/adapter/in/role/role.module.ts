import { Module } from '@nestjs/common';
import { RoleRepositoryAdapter } from 'src/adapter/out/persistence/role.repository.adapter';

import { CreateRoleUseCase } from 'src/application/use_case/role/create-role.usecase';
import { UpdateRoleUseCase } from 'src/application/use_case/role/update-role.usecase';
import { GetRoleUseCase } from 'src/application/use_case/role/get-role.usecase';
import { ListRoleUseCase } from 'src/application/use_case/role/list-role.usecase';
import { DeleteRoleUseCase } from 'src/application/use_case/role/delete-role.usecase';

import { CreateRoleValidator } from 'src/domain/service/validators/role/create-role.validator';
import { UpdateRoleValidator } from 'src/domain/service/validators/role/update-role.validator';
import { GetRoleValidator } from 'src/domain/service/validators/role/get-role.validator';
import { DeleteRoleValidator } from 'src/domain/service/validators/role/delete-role.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { RoleControllerAdapter } from 'src/adapter/in/role/role.controller.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [RoleControllerAdapter],
  providers: [
    {
      provide: 'RoleRepositoryPort',
      useClass: RoleRepositoryAdapter,
    },
    // Validators
    CreateRoleValidator,
    UpdateRoleValidator,
    GetRoleValidator,
    DeleteRoleValidator,

    // UseCases
    {
      provide: CreateRoleUseCase,
      useFactory: (repo, validator, idGenerator, hasher) =>
        new CreateRoleUseCase(repo, validator, idGenerator),
      inject: [
        'RoleRepositoryPort',
        CreateRoleValidator,
        'PublicIdGeneratorPort',
        'PasswordHasherPort',
      ],
    },

    {
      provide: UpdateRoleUseCase,
      useFactory: (repo, validator) =>
        new UpdateRoleUseCase(repo, validator),
      inject: ['UserRepositoryPort', UpdateRoleValidator],
    },

    {
      provide: GetRoleUseCase,
      useFactory: (repo, validator) =>
        new GetRoleUseCase(repo, validator),
      inject: ['UserRepositoryPort', GetRoleValidator],
    },

    {
      provide: ListRoleUseCase,
      useFactory: (repo) =>
        new ListRoleUseCase(repo),
      inject: ['UserRepositoryPort'],
    },

    {
      provide: DeleteRoleUseCase,
      useFactory: (repo, validator) =>
        new DeleteRoleUseCase(repo, validator),
      inject: ['UserRepositoryPort', DeleteRoleValidator],
    },
  ],
  exports: [
    CreateRoleUseCase,
    UpdateRoleUseCase,
    GetRoleUseCase,
    ListRoleUseCase,
    DeleteRoleUseCase,
  ],
})
export class RoleModule { }