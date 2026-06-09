export interface UserRoleProps{
    readonly id?:string;
    publicId:string;
    userId:string;
    roleId:string;
    readonly createdAt?:Date;
}
export class UserRoleEntity {
    constructor(private readonly props: UserRoleProps){}
    
    get id(): string | undefined {
            return this.props.id;
        }
    
        get publicId(): string {
            return this.props.publicId;
        }
    
        get userId(): string {
            return this.props.userId;
        }
    
        get roleId(): string {
            return this.props.roleId;
        }
        update(updates: Partial<UserRoleProps>): UserRoleEntity {
            Object.assign(this.props, updates);
            return this;
        }
    }
