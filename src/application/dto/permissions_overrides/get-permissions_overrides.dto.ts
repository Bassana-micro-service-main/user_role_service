import { IsNotEmpty } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';

export class GetPermissionsOverridesDto {
  @IsNanoId()
  @IsNotEmpty()
  publicId!: string;
}