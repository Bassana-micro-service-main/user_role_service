export interface PermissionsProps{
    readonly id?:string;
    publicId:string;
    name:string;
    description:string;
    readonly createdAt?:Date;
}
export class PermissionsEntity {
    constructor(private readonly props: PermissionsProps){}
    
    get id(): string | undefined {
            return this.props.id;
        }
    
        get publicId(): string {
            return this.props.publicId;
        }
    
        get name(): string {
            return this.props.name;
        }
    
        get description(): string {
            return this.props.description;
        }
        update(updates: Partial<PermissionsProps>): PermissionsEntity {
            Object.assign(this.props, updates);
            return this;
        }
    }
