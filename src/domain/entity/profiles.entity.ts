export interface ProfileProps {
    readonly id?: number;
    publicId: string;
    firstName: string;
    talkLangageId:string;
    lastName: string;
    phoneNumber: string;
    address: string;
    avatarUrl:string
    dateOfBirth: Date;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
export class ProfileEntity {
    constructor(private readonly props: ProfileProps) { }

    get id(): number | undefined {
        return this.props.id;
    }

    get publicId(): string {
        return this.props.publicId;
    }

    get firstName(): string {
        return this.props.firstName;
    }
    get talkLangageId(): string {
        return this.props.talkLangageId;
    }

    get lastName(): string {
        return this.props.lastName;
    }

    get phoneNumber(): string {
        return this.props.phoneNumber;
    }

    get address(): string {
        return this.props.address;
    }

    get avatarUrl(): string | undefined {
        return this.props.avatarUrl;
    }

    get dateOfBirth(): Date {
        return this.props.dateOfBirth;
    }

    updates(updates: Partial<ProfileProps>): ProfileEntity {
        Object.assign(this.props, updates);
        return this;
    }
}
