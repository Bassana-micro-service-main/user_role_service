import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRoleRepository } from '../../domain/port/role.repository.interface';
import { Role } from '../../domain/entity/role.entity';
import { RoleOrmEntity } from './role.orm-entity';
import { Repository,Like } from 'typeorm';
@Injectable()
export class TypeOrmRoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleOrmEntity)
    private readonly repository: Repository<RoleOrmEntity>,
  ) {}

  async save(role: Role): Promise<Role> {
    const ormRole = this.repository.create(role as any);
    const savedRole = await this.repository.save(ormRole);
    console.log(`Rôle ${role.name} sauvegardé en base de données.`);
    return savedRole as unknown as Role;
  }

  async findByName(name: string): Promise<Role | null> {
    const ormRole = await this.repository.findOneBy({ name } as any);
    return ormRole ? (ormRole as unknown as Role) : null;
  }

  async findById(id: string): Promise<Role | null> {
    const ormRole = await this.repository.findOneBy({ id } as any);
    return ormRole ? (ormRole as unknown as Role) : null;
  }

  async findAll(): Promise<Role[]> {
    const ormRoles = await this.repository.find();
    return ormRoles as unknown as Role[];
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async update(role: Role): Promise<Role> {
    const ormRole = this.repository.create(role as any);
    const updatedRole = await this.repository.save(ormRole);
    return updatedRole as unknown as Role;
  }

  async exists(name: string): Promise<boolean> {
    const count = await this.repository.countBy({ name } as any);
    return count > 0;
  }

  async findAllPaginated(page: number, limit: number): Promise<Role[]> {
    const ormRoles = await this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return ormRoles as unknown as Role[];
  }
  async findByPermission(permission: string): Promise<Role[]> {
    const ormRoles = await this.repository.find({
      where: { permissions: Like(`%${permission}%`) }
    });
    return ormRoles as unknown as Role[];
  }

  async search(query: string): Promise<Role[]> {
    const ormRoles = await this.repository.find({
      where: { name: Like(`%${query}%`) }
    });
    return ormRoles as unknown as Role[];
  }
}
