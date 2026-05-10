import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

export class ListUserRoleDto {

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  roleId?: string;
}
