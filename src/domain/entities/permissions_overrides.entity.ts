import { ModeEnum } from "src/domain/enums/mode.enum";
export interface PermissionsOverridesProps{
    readonly id?:string;
    publicId:string;
    userId:string;
    permissionsId:string;
    mode:ModeEnum;
    note:string;
    readonly createdAt?:Date;
}
export class PermissionsOverridesEntity {
    constructor(private readonly props: PermissionsOverridesProps){}
    
    get id(): string | undefined {
            return this.props.id;
        }
    
        get publicId(): string {
            return this.props.publicId;
        }
    
        get userId(): string {
            return this.props.userId;
        }
    
        get permissionsId(): string {
            return this.props.permissionsId;
        }
        get mode(): ModeEnum {
            return this.props.mode;
        }
        get note(): string {
            return this.props.note;
        }
        update(updates: Partial<PermissionsOverridesProps>): PermissionsOverridesEntity {
            Object.assign(this.props, updates);
            return this;
        }
    }
