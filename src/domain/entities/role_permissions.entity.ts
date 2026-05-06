export interface RolePermissionsProps{
    readonly id?:string;
    publicId:string;
    roleId:string;
    permissionsId:string;
    readonly createdAt?:Date;
}
export class RolePermissionsEntity {
    constructor(private readonly props: RolePermissionsProps){}
    
    get id(): string | undefined {
            return this.props.id;
        }
    
        get publicId(): string {
            return this.props.publicId;
        }
    
        get roleId(): string {
            return this.props.roleId;
        }
    
        get permissionsId(): string {
            return this.props.roleId;
        }
        update(updates: Partial<RolePermissionsProps>): RolePermissionsEntity {
            Object.assign(this.props, updates);
            return this;
        }
    }
