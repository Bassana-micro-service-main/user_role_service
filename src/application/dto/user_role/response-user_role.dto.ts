import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';

export class ResponseUserRoleDto {
    @IsNanoId()
    @IsNotEmpty()
    publicId!: string;

    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsString()
    @IsNotEmpty()
    roleId!: string;


}
