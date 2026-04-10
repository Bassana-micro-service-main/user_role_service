export interface permissionProps{
    readonly id?:number;
    publicId:string;
    name:string;
    description:string;
    readonly createdAt?:Date;
}
export class permissionEntity{
    constructor(private readonly props:permissionProps){}
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
    update(updates: Partial<permissionProps>): permissionEntity {
                Object.assign(this.props, updates);
                return this;
 }
}
    