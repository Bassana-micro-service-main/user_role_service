import { statusEnum } from "../enums/status.enum";
export interface messageProps {
    readonly id?:number;
    publicId:string;
    name:string;
    message:string;
    status:statusEnum;
    subject:string;
    ipAdress:string;
    readonly createdAt?:Date;
}
export class messageEntity {
    constructor(private readonly props: messageProps){}
    
    get id(): number | undefined {
            return this.props.id;
        }
    
        get publicId(): string {
            return this.props.publicId;
        }
    
        get name(): string {
            return this.props.name;
        }
    
        get message(): string {
            return this.props.message;
        }
    
        get status(): string {
            return this.props.status;
        }
        get subject(): string {
            return this.props.subject;
        }
        get ipAdress(): string {
            return this.props.ipAdress;
        }
    
        update(updates: Partial<messageProps>): messageEntity {
            Object.assign(this.props, updates);
            return this;
        }
    }
