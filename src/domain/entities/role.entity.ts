
export interface RoleProps{
    readonly id?:number;
    publicId:string;
    name:string;
    description:string;
    isSystem:boolean;
    readonly createdAt?:Date;
    readonly updatedAt?:Date;
}
export class RoleEntity {
    constructor(private readonly props: RoleProps){}
    
    get id(): number | undefined {
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
    
        get isSystem(): boolean {
            return this.props.isSystem;
        }
    
        update(updates: Partial<RoleProps>): RoleEntity {
            Object.assign(this.props, updates);
            return this;
        }
    }
