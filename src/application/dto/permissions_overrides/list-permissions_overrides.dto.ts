import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Min, Max } from 'class-validator';
import { ModeEnum } from "src/domain/enums/mode.enum";
export class ListPermissionsOverridesDto {

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
  permissionsId!: string;

  @IsOptional()
  @IsString()
  userId!: string;

  @IsOptional()
  @IsString()
  mode!: ModeEnum;


  @IsOptional()
  @IsString()
  note!: string;

  
}
