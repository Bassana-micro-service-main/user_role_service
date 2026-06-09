import { IsNotEmpty } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';

export class GetUserRoleDto {
  @IsNanoId()
  @IsNotEmpty()
  publicId!: string;
}
