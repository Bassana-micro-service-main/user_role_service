import { IsNotEmpty } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';

export class GetRolePermissionsDto {
  @IsNanoId()
  @IsNotEmpty()
  publicId!: string;
}