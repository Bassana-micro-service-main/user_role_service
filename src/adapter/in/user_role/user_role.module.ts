import { Module } from '@nestjs/common';
import { UserRoleRepositoryAdapter } from 'src/adapter/out/persistence/user_role.repository.adapter';

import { CreateUserRoleUseCase } from 'src/application/use_case/user_role/create-user_role.usecase';
import { UpdateUserRoleUseCase } from 'src/application/use_case/user_role/update-user_role.usecase';
import { GetUserRoleUseCase } from 'src/application/use_case/user_role/get-user_role.usecase';
import { ListUserRoleUseCase } from 'src/application/use_case/user_role/list-user_role.usecase';
import { DeleteUserRoleUseCase } from 'src/application/use_case/user_role/delete-user_role.usecase';
import { CreateUserRoleValidator } from 'src/domain/service/validators/user_role/create-user_role.validator';
import { DeleteUserRoleValidator} from 'src/domain/service/validators/user_role/delete-user_role.validator';
import { GetUserRoleValidator } from 'src/domain/service/validators/user_role/get-user_role.validator';
import { UpdateUserRoleValidator } from 'src/domain/service/validators/user_role/update-user_role.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { UserRoleControllerAdapter } from 'src/adapter/in/user_role/user_role.controller.adapter';
import { PublicIdGeneratorAdapter } from 'src/adapter/in/generate-public-id/generate.public-id.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [UserRoleControllerAdapter],
  providers: [
    {
      provide: 'UserRoleRepositoryPort',
      useClass: UserRoleRepositoryAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    // Validators
    CreateUserRoleValidator,
    UpdateUserRoleValidator,
    GetUserRoleValidator,
    DeleteUserRoleValidator,

    // UseCases
    {
      provide: CreateUserRoleUseCase,
      useFactory: (repo, validator, idGenerator) =>
        new CreateUserRoleUseCase(repo, validator, idGenerator),
      inject: [
        'UserRoleRepositoryPort',
        CreateUserRoleValidator,
        'PublicIdGeneratorPort',
      ],
    },

    {
      provide: UpdateUserRoleUseCase,
      useFactory: (repo, validator) =>
        new UpdateUserRoleUseCase(repo, validator),
      inject: ['UserRoleRepositoryPort', UpdateUserRoleValidator],
    },

    {
      provide: GetUserRoleUseCase,
      useFactory: (repo, validator) =>
        new GetUserRoleUseCase(repo, validator),
      inject: ['UserRoleRepositoryPort', GetUserRoleValidator],
    },

    {
      provide: ListUserRoleUseCase,
      useFactory: (repo) =>
        new ListUserRoleUseCase(repo),
      inject: ['UserRoleRepositoryPort'],
    },

    {
      provide: DeleteUserRoleUseCase,
      useFactory: (repo, validator) =>
        new DeleteUserRoleUseCase(repo, validator),
      inject: ['UserRoleRepositoryPort', DeleteUserRoleValidator],
    },
  ],
  exports: [
    CreateUserRoleUseCase,
    UpdateUserRoleUseCase,
    GetUserRoleUseCase,
    ListUserRoleUseCase,
    DeleteUserRoleUseCase,
  ],
})
export class UserRoleModule { }