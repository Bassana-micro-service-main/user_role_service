import { Module } from '@nestjs/common';
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
import { RoleRepositoryAdapter } from 'src/adapter/out/persistence/role.repository.adapter';
import { RoleControllerAdapter } from 'src/adapter/in/role/role.controller.adapter';
import { PublicIdGeneratorAdapter } from 'src/adapter/in/generate-public-id/generate.public-id.adapter';


@Module({
  imports: [PrismaModule],
  controllers: [RoleControllerAdapter],
  providers: [
    {
      provide: 'RoleRepositoryPort',
      useClass: RoleRepositoryAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    // Validators
    CreateRoleValidator,
    UpdateRoleValidator,
    GetRoleValidator,
    DeleteRoleValidator,

    // UseCases
    {
      provide: CreateRoleUseCase,
      useFactory: (repo, validator, idGenerator) =>
        new CreateRoleUseCase(repo, validator, idGenerator),
      inject: [
        'RoleRepositoryPort',
        CreateRoleValidator,
        'PublicIdGeneratorPort',
      ],
    },

    {
      provide: UpdateRoleUseCase,
      useFactory: (repo, validator) =>
        new UpdateRoleUseCase(repo, validator),
      inject: ['RoleRepositoryPort', UpdateRoleValidator],
    },

    {
      provide: GetRoleUseCase,
      useFactory: (repo, validator) =>
        new GetRoleUseCase(repo, validator),
      inject: ['RoleRepositoryPort', GetRoleValidator],
    },

    {
      provide: ListRoleUseCase,
      useFactory: (repo) =>
        new ListRoleUseCase(repo),
      inject: ['RoleRepositoryPort'],
    },

    {
      provide: DeleteRoleUseCase,
      useFactory: (repo, validator) =>
        new DeleteRoleUseCase(repo, validator),
      inject: ['RoleRepositoryPort', DeleteRoleValidator],
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