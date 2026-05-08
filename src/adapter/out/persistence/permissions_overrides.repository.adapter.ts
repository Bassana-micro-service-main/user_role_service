import { Injectable } from '@nestjs/common';
import { PermissionsOverridesRepositoryPort } from 'src/domain/port/out/permissions_overrides.repository.port';
import { PermissionsOverridesEntity } from 'src/domain/entities/permissions_overrides.entity';
import { ListPermissionsOverridesQuery } from 'src/domain/port/in/permissions_overrides/list-permissions_overrides.interface.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { PermissionsOverridesDbMapper } from 'src/application/mapper/permissions_overrides/permissions_overrides-bd.mapper';
import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
@Injectable()
export class PermissionsOverridesRepositoryAdapter implements PermissionsOverridesRepositoryPort {

  constructor(private readonly prisma: PrismaService) {}
  async findByUserId(userId: string): Promise<PermissionsOverridesEntity | null> {
    const userRole = await this.prisma.permissions_overridesTable.findFirst({
      where: { userId },
    });
    return userRole ? PermissionsOverridesDbMapper.toDomain(userRole) : null;
  }
  async findWithPermissionId(query:ListPermissionsOverridesQuery): Promise<PaginatedResponse<PermissionsOverridesEntity>> {
    const {userId, permissionsId,mode,note,limit, page}=query;
    const userRoles = await this.prisma.permissions_overridesTable.findMany({
      where: { permissionsId },
    });
    return userRoles.map(item => PermissionsOverridesDbMapper.toDomain(item));
  }
  async findBymode(mode: string): Promise<PermissionsOverridesEntity | null> {
    const userRole = await this.prisma.permissions_overridesTable.findFirst({
      where: { mode },
    });
    return userRole ? PermissionsOverridesDbMapper.toDomain(userRole) : null;
  }
  async findBynote(note: string): Promise<PermissionsOverridesEntity | null> {
    const userRole = await this.prisma.permissionsTable.findFirst({
      where: { note },
    });
    return userRole ? PermissionsOverridesDbMapper.toDomain(userRole) : null;
  }
  async findByPermissionsId(permissionsId: string): Promise<PermissionsOverridesEntity | null> {
    const userRole = await this.prisma.permissionsTable.findFirst({
      where: { permissionsId },
    });
    return userRole ? PermissionsOverridesDbMapper.toDomain(userRole) : null;
  }
  async save(entity: PermissionsOverridesEntity): Promise<PermissionsOverridesEntity> {

    const data = PermissionsOverridesDbMapper.toPersistence(entity);

    const saved = await this.prisma.permissions_overridesTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return PermissionsOverridesDbMapper.toDomain(saved);
  }

  async findById(id: string): Promise<PermissionsOverridesEntity | null> {
    const role = await this.prisma.permissionsTable.findUnique({
      where: { id },
    });

    return role ? PermissionsOverridesDbMapper.toDomain(role) : null;
  }

  async findByPublicId(public_id: string): Promise<PermissionsOverridesEntity | null> {
    const permissions_overrides = await this.prisma.permissionsTable.findUnique({

      where: { public_id },
    });

    return permissions_overrides ? PermissionsOverridesDbMapper.toDomain(permissions_overrides) : null;
  }

  async findByuserId(userId: string): Promise<PermissionsOverridesEntity | null> {

    const entity = await this.prisma.permissions_overridesTable.findUnique({
      where: { userId },
    });

    return entity ? PermissionsOverridesDbMapper.toDomain(entity) : null;
  }

  async findWithPagination(query: ListPermissionsOverridesQuery): Promise<PaginatedResponse<PermissionsOverridesEntity>> {

    const { page, limit, userId, permissionsId,mode,note} = query;

    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (permissionsId) {
      where.userId = {
        contains: permissionsId,
        mode: 'insensitive',
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.permissionsTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.permissionsTable.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
      data: data.map(PermissionsOverridesDbMapper.toDomain),
      total,
      page,
      limit,
      totalPages,
    };
  }

  async delete(public_id: string): Promise<void> {

    await this.prisma.permissions_overridesTable.delete({
      where: { public_id },
    });
  }
}