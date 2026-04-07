import { Controller, Post, Body } from '@nestjs/common';
import { CreateRoleUseCase } from '../application/use_case/create-role.use-case';
@Controller('roles')
export class RoleController {
  constructor(private readonly createRoleUseCase: CreateRoleUseCase) {}
  @Post()
  async create(@Body() body: { name: string; permissions: string[] }) {
    return await this.createRoleUseCase.execute(body.name, body.permissions);
  }
}