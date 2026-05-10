import { Injectable } from '@nestjs/common';
import { RolePermissionsRepositoryPort } from 'src/domain/port/out/role_permissions.repository.port';
import { RolePermissionsEntity } from 'src/domain/entities/role_permissions.entity';
import { ListRolePermissionsQuery } from 'src/domain/port/in/role_permissions/list-role_permissions.interface.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { RolePermissionsDbMapper } from 'src/application/mapper/role_permissions/role_permissions-bd.mapper';
import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
@Injectable()
export class RolePermissionsRepositoryAdapter implements RolePermissionsRepositoryPort {

  constructor(private readonly prisma: PrismaService) {}
  async findByPermissionsId(permissionsId: string): Promise<RolePermissionsEntity | null> {
    const userRole = await this.prisma.role_permissionsTable.findFirst({
      where: { permissionsId },
    });
    return userRole ? RolePermissionsDbMapper.toDomain(userRole) : null;
  }
  async findByRoleId(roleId: string): Promise<RolePermissionsEntity | null> {
      const userRole = await this.prisma.role_permissionsTable.findFirst({
        where: { roleId },
      });
      return userRole ? RolePermissionsDbMapper.toDomain(userRole) : null;
    }
  async findWithRoleId(query:ListRolePermissionsQuery): Promise<PaginatedResponse<RolePermissionsEntity>> {
    const {roleId, permissionsId,limit, page}=query;
    const userRoles = await this.prisma.role_permissionsTable.findMany({
      where: { name },
    });
    return userRoles.map(item => RolePermissionsDbMapper.toDomain(item));
  }
  async save(entity: RolePermissionsEntity): Promise<RolePermissionsEntity> {

    const data = RolePermissionsDbMapper.toPersistence(entity);

    const saved = await this.prisma.role_permissionsTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return RolePermissionsDbMapper.toDomain(saved);
  }

  async findById(id: string): Promise<RolePermissionsEntity | null> {
    const role = await this.prisma.role_permissionsTable.findUnique({
      where: { id },
    });

    return role ? RolePermissionsDbMapper.toDomain(role) : null;
  }

  async findByPublicId(public_id: string): Promise<RolePermissionsEntity | null> {
    const role = await this.prisma.role_permissionsTable.findUnique({

      where: { public_id },
    });

    return role ? RolePermissionsDbMapper.toDomain(role) : null;
  }

  async findByName(name: string): Promise<RolePermissionsEntity | null> {

    const entity = await this.prisma.role_permissionsTable.findUnique({
      where: { name },
    });

    return entity ? RolePermissionsDbMapper.toDomain(entity) : null;
  }

  async findWithPagination(query: ListRolePermissionsQuery): Promise<PaginatedResponse<RolePermissionsEntity>> {

    const { page, limit, roleId, permissionsId} = query;

    const where: any = {};

    if (roleId) {
      where.name = roleId;
    }

    if (permissionsId) {
      where.roleId = {
        contains: permissionsId,
        mode:'insensitive',
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.role_permissionsTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.role_permissionsTable.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
      data: data.map(RolePermissionsDbMapper.toDomain),
      total,
      page,
      limit,
      totalPages,
    };
  }

  async delete(public_id: string): Promise<void> {

    await this.prisma.role_permissionsTable.delete({
      where: { public_id },
    });
  }
}