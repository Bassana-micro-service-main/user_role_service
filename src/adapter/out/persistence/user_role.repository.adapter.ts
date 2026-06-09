import { Injectable } from '@nestjs/common';
import { UserRoleRepositoryPort } from 'src/domain/port/out/user_role.repository.port';
import { UserRoleEntity } from 'src/domain/entities/user_role.entity';
import { ListUserRoleQuery } from 'src/domain/port/in/user_role/list-user_role.interface.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { UserRoleDbMapper } from 'src/application/mapper/user_role/user_role-bd.mapper';
import { PaginatedResponse } from 'src/domain/entities/paginated-response.entity';
@Injectable()
export class UserRoleRepositoryAdapter implements UserRoleRepositoryPort {

  constructor(private readonly prisma: PrismaService) {}
  async findByUserId(userId: string): Promise<UserRoleEntity | null> {
    const userRole = await this.prisma.user_roleTable.findFirst({
      where: { userId },
    });
    return userRole ? UserRoleDbMapper.toDomain(userRole) : null;
  }
  async findWithRoleId(query: ListUserRoleQuery): Promise<PaginatedResponse<UserRoleEntity>> {
    const where: Record<string, unknown> = {};
    if (query.roleId) where.roleId = query.roleId;
    if (query.userId) where.userId = query.userId;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user_roleTable.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user_roleTable.count({ where }),
    ]);

    const totalPages = Math.ceil(total / query.limit);
    return {
      data: data.map(UserRoleDbMapper.toDomain),
      total,
      page: query.page,
      limit: query.limit,
      totalPages,
    };
  }
  async save(entity: UserRoleEntity): Promise<UserRoleEntity> {

    const data = UserRoleDbMapper.toPersistence(entity);

    const saved = await this.prisma.user_roleTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });

    return UserRoleDbMapper.toDomain(saved);
  }

  async findById(id: string): Promise<UserRoleEntity | null> {
    const role = await this.prisma.user_roleTable.findUnique({
      where: { id },
    });

    return role ? UserRoleDbMapper.toDomain(role) : null;
  }

  async findByPublicId(public_id: string): Promise<UserRoleEntity | null> {
    const role = await this.prisma.user_roleTable.findUnique({

      where: { public_id },
    });

    return role ? UserRoleDbMapper.toDomain(role) : null;
  }

  async findWithPagination(query: ListUserRoleQuery): Promise<PaginatedResponse<UserRoleEntity>> {

    const { page, limit, userId, roleId} = query;

    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (roleId) {
      where.roleId = roleId;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user_roleTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.user_roleTable.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);
    return {
      data: data.map(UserRoleDbMapper.toDomain),
      total,
      page,
      limit,
      totalPages,
    };
  }

  async delete(public_id: string): Promise<void> {

    await this.prisma.user_roleTable.delete({
      where: { public_id },
    });
  }
}