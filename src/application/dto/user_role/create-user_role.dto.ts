import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  userId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  roleId!: string;

}
