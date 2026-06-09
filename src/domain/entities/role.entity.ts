
export interface RoleProps{
    readonly id?:string;
    publicId:string;
    name:string;
    description:string;
    isSystem:boolean;
    isActive:boolean;
    readonly createdAt?:Date;
    readonly updatedAt?:Date;
}
export class RoleEntity {
    constructor(private readonly props: RoleProps){}
    
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
    
        get isSystem(): boolean {
            return this.props.isSystem;
        }

        get isActive(): boolean {
            return this.props.isActive;
        }
    
        update(updates: Partial<RoleProps>): RoleEntity {
            const defined = Object.fromEntries(
                Object.entries(updates).filter(([, value]) => value !== undefined),
            );
            Object.assign(this.props, defined);
            return this;
        }
    }
