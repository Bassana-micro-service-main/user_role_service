import { Injectable } from '@nestjs/common';
import { PermissionsRepositoryPort } from 'src/domain/port/out/permissions.repository.port';
import { PermissionsEntity } from 'src/domain/entities/permissions.entity';
import { ListPermissionsQuery } from 'src/domain/port/in/permissions/list-permissions.interface.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { PermissionsDbMapper } from 'src/application/mapper/permissions/permissions-bd.mapper';
import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
import { ModeEnum } from "src/domain/enums/mode.enum";
@Injectable()
export class PermissionsOverridesRepositoryAdapter implements PermissionsRepositoryPort {

  constructor(private readonly prisma: PrismaService) {}
  async findByName(name: string): Promise<PermissionsEntity | null> {
    const userRole = await this.prisma.permissionsTable.findFirst({
      where: { name },
    });
    return userRole ? PermissionsDbMapper.toDomain(userRole) : null;
  }
  async findByDescription(description: string): Promise<PermissionsEntity | null> {
    const userRole = await this.prisma.permissionsTable.findFirst({
      where: { description},
    });
    return userRole ? PermissionsDbMapper.toDomain(userRole) : null;
  }
  
  async findWithDescription(query:ListPermissionsQuery): Promise<PaginatedResponse<PermissionsEntity>> {
    const { description,name,limit, page}=query;
    const userRoles = await this.prisma.permissionsTable.findMany({
      where: { description },
    });
    return userRoles.map(item => PermissionsDbMapper.toDomain(item));
  }
  async save(entity: PermissionsEntity): Promise<PermissionsEntity> {

    const data = PermissionsDbMapper.toPersistence(entity);

    const saved = await this.prisma.permissionsTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return PermissionsDbMapper.toDomain(saved);
  }

  async findById(id: string): Promise<PermissionsEntity | null> {
    const role = await this.prisma.permissionsTable.findUnique({
      where: { id },
    });

    return role ? PermissionsDbMapper.toDomain(role) : null;
  }

  async findByPublicId(public_id: string): Promise<PermissionsEntity | null> {
    const role = await this.prisma.permissionsTable.findUnique({

      where: { public_id },
    });

    return role ? PermissionsDbMapper.toDomain(role) : null;
  }
  async findWithPagination(query: ListPermissionsQuery): Promise<PaginatedResponse<PermissionsEntity>> {

    const { page, limit,name, description} = query;

    const where: any = {};

    if (name) {
      where.name = name;
    }

    if (description) {
      where.name = {
        contains:description,
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
      data: data.map(PermissionsDbMapper.toDomain),
      total,
      page,
      limit,
      totalPages,
    };
  }

  async delete(public_id: string): Promise<void> {

    await this.prisma.permissionsTable.delete({
      where: { public_id },
    });
  }
}