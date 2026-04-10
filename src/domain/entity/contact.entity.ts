
export interface contactProps {
    readonly id?: number;
    publicId: string;
    elementId: string;
    adress: string;
    email:string;
    whatsapp:string;
    phoneNumber:string;
    linkedln:string;
    readonly createdAt?:Date;
}

export class contactEntity {
    constructor(private readonly props: contactProps) { }

    get id(): number | undefined {
          return this.props.id;
    }
    
    get elementId(): string {
        return this.props.elementId;
    }
    get adress(): string {
        return this.props.adress;
    }

    get email(): string {
        return this.props.email;
    }

    get whatsapp(): string {
        return this.props.whatsapp;
    }

    get phoneNumber(): String {
        return this.props.phoneNumber;
    }
    get linkedln(): String {
        return this.props.linkedln;
    }

    update(updates: Partial<contactProps>): contactEntity {
        Object.assign(this.props, updates);
        return this;
    }
}