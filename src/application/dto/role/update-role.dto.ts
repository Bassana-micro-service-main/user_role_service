import {
    IsOptional,
    Matches,
    MinLength,
} from 'class-validator';

export class UpdateRoleDto {
    @IsOptional()
    @MinLength(8)
    @Matches(/(?=.*\d)/, { message: 'password must contain a number' })
    @Matches(/(?=.*[^A-Za-z0-9])/, { message: 'password must contain a special character' })
    publicId!:string;
    description!: string;
    name!: string; 
    isSystem!: boolean;
}