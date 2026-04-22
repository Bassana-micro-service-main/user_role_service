import { IsNotEmpty } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';

export class ResponseRoleDto {
    @IsNanoId()
    @IsNotEmpty()
    publicId!: string;

    @IsNanoId()
    @IsNotEmpty()
    name!: string;

    @IsNanoId()
    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    isSystem!: boolean;


}
