import { currencyEnum } from "../enums/currency.enum";
import { logsStatusEnum } from "../enums/logs.status.enum";
export interface paymentsProps {
    readonly id?:number;
    publicId:string;
    userId:string;
    paymentId:string;
    amount:number;
    currency:currencyEnum;
    status:logsStatusEnum;
    gateway:string;
    responsePayload:JSON;
    readonly createdAt?:Date;
}
export class paymentsEntity {
    constructor(private readonly props: paymentsProps){}
    
    get id(): number | undefined {
            return this.props.id;
        }
    
        get publicId(): string {
            return this.props.publicId;
        }
    
        get userId(): string {
            return this.props.userId;
        }
    
        get paymentId(): string {
            return this.props.paymentId;
        }
    
        get amount(): number {
            return this.props.amount;
        }
        get currency(): currencyEnum{
            return this.props.currency;
        }
        get status(): logsStatusEnum{
            return this.props.status;
        }
        get gateway(): string {
            return this.props.gateway;
        }
        get responsePayload(): JSON {
            return this.props.responsePayload;
        }
        
    
        update(updates: Partial<paymentsProps>): paymentsEntity {
            Object.assign(this.props, updates);
            return this;
        }
    }
