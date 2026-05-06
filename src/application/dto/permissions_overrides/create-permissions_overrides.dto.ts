import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ModeEnum } from "src/domain/enums/mode.enum";
export class CreatePermissionsOverridesDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  userId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  permissionsId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  mode!: ModeEnum;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  note!: string;

}
