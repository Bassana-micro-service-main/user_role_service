import { IsNotEmpty } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';

export class GetRoleDto {
  @IsNanoId()
  @IsNotEmpty()
  publicId!: string;
}
