import { IsNotEmpty } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';

export class GetPermissionsDto {
  @IsNanoId()
  @IsNotEmpty()
  publicId!: string;
}
