import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';

export class ResponseRoleDto {
    @IsNanoId()
    @IsNotEmpty()
    publicId!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsBoolean()
    isSystem!: boolean;

    @IsBoolean()
    isActive!: boolean;


}
