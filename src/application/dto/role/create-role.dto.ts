import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';

export class CreateRoleDto {
    @MinLength(8)
    @Matches(/(?=.*\d)/, { message: 'password must contain a number' })
    @Matches(/(?=.*[^A-Za-z0-9])/, { message: 'password must contain a special character' })
    publicId!:string;
    name!:string;
    description!: string;


    @IsNotEmpty()
    isSystem!: boolean;
}
