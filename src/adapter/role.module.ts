import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from '../adapter/role.controller';
import { CreateRoleUseCase } from '../application/use_case/create-role.use-case';
import { RoleOrmEntity } from '../infrastructure/database/role.orm-entity';
import { TypeOrmRoleRepository } from '../infrastructure/database/typeorm-role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleOrmEntity])],
  controllers: [RoleController],
  providers: [
    CreateRoleUseCase,
    {
      provide: 'IRoleRepository',
      useClass: TypeOrmRoleRepository,
    },
  ],
})
export class RoleModule {}