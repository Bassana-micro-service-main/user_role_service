import { IsNotEmpty, IsString } from 'class-validator';
import { IsNanoId } from 'src/lib/decorators.commons';
import { ModeEnum } from "src/domain/enums/mode.enum";
export class ResponsePermissionsOverridesDto {
    @IsNanoId()
    @IsNotEmpty()
    publicId!: string;

    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsString()
    @IsNotEmpty()
    permissionsId!: string;

    @IsString()
    @IsNotEmpty()
    note!: string;

    @IsString()
    @IsNotEmpty()
    mode!: ModeEnum;


}
