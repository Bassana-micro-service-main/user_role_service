import { typeEnum } from "../enums/type.enum";
export interface elementProps {
    readonly id?:number;
    publicId:string;
    name:string;
    readonly createdAt?:Date;
    type:typeEnum;
}
export class elementEntity {
    constructor(private readonly props: elementProps){}
    
    get id(): number | undefined {
            return this.props.id;
        }
    
        get publicId(): string {
            return this.props.publicId;
        }
    
        get name(): string {
            return this.props.name;
        }
    
        get type(): typeEnum{
            return this.props.type;
        }
    
        update(updates: Partial<elementProps>): elementEntity {
            Object.assign(this.props, updates);
            return this;
        }
    }
