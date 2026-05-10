import {
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ModeEnum } from "src/domain/enums/mode.enum";
export class UpdatePermissionsOverridesDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  userId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  permissionsId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  mode!: ModeEnum;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note!: string;

}