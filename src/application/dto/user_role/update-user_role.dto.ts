import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class UpdateUserRoleDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  userId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  roleId?: string;
}