import { IsString, IsArray, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  permissions: string[];

  @IsNumber()
  @Min(1)
  level: number;
}