import {
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class UpdateRolePermissionsDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  roleId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  permissionsId?: string;

}