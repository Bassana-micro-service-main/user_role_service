import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePermissionsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description!: string;

}
