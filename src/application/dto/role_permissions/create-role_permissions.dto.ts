import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateRolePermissionsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  roleId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  permissionsId!: string;

}
