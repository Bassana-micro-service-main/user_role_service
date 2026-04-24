import { Injectable } from '@nestjs/common';
import { RoleRepositoryPort } from 'src/domain/port/out/role.repository.port';
import { RoleEntity } from 'src/domain/entities/role.entity';
import { ListRoleQuery } from 'src/domain/port/in/role/list-role.interface.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { RoleDbMapper } from 'src/application/mapper/role/role-bd.mapper';
import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
@Injectable()
export class RoleRepositoryAdapter implements RoleRepositoryPort {

  constructor(private readonly prisma: PrismaService) {}

  async save(entity: RoleEntity): Promise<RoleEntity> {

    const data = RoleDbMapper.toPersistence(entity);

    const saved = await this.prisma.roleTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return RoleDbMapper.toDomain(saved);
  }

  async findById(id: string): Promise<RoleEntity | null> {
    const role = await this.prisma.roleTable.findUnique({
      where: { id },
    });

    return role ? RoleDbMapper.toDomain(role) : null;
  }

  async findByPublicId(public_id: string): Promise<RoleEntity | null> {
    const role = await this.prisma.roleTable.findUnique({

      where: { public_id },
    });

    return role ? RoleDbMapper.toDomain(role) : null;
  }

  async findByName(name: string): Promise<RoleEntity | null> {

    const entity = await this.prisma.roleTable.findUnique({
      where: { name },
    });

    return entity ? RoleDbMapper.toDomain(entity) : null;
  }

  async findWithPagination(query: ListRoleQuery): Promise<PaginatedResponse<RoleEntity>> {

    const { page, limit, description, name} = query;

    const where: any = {};

    if (description) {
      where.description = description;
    }

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.roleTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.roleTable.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
      data: data.map(RoleDbMapper.toDomain),
      total,
      page,
      limit,
      totalPages,
    };
  }

  async delete(public_id: string): Promise<void> {

    await this.prisma.roleTable.delete({
      where: { public_id },
    });
  }
}