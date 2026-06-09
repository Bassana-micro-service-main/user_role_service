import { IsNotEmpty, IsString } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';

export class ResponseRolePermissionsDto {
    @IsNanoId()
    @IsNotEmpty()
    publicId!: string;

    @IsString()
    @IsNotEmpty()
    roleId!: string;

    @IsString()
    @IsNotEmpty()
    permissionsId!: string;


}
