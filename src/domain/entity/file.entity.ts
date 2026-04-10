export interface fileProps {
    readonly id?:number;
    publicId:string;
    name:string;
    path:string;
    type:string;
    size:BigInt;
    uploadedBy:string;
    readonly createdAt?:timestamp;
}
export class fileEntity {
    constructor(private readonly props: fileProps){}
    
    get id(): number | undefined {
            return this.props.id;
        }
    
        get publicId(): string {
            return this.props.publicId;
        }
    
        get name(): string {
            return this.props.name;
        }
    
        get path(): string {
            return this.props.path;
        }
    
        get type(): string {
            return this.props.type;
        }
    
        update(updates: Partial<fileProps>): fileEntity {
            Object.assign(this.props, updates);
            return this;
        }
    }
