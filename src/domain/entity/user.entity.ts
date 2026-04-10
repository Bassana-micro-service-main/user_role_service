import { userStatusEnum } from "./enums/user_status_enum";
export interface UserProps {
    readonly id?: number;
    publicId: string;
    email: string;
    passwordHash: string;
    status: userStatusEnum;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export class UserEntity {
    constructor(private readonly props: UserProps) { }

    get id(): number | undefined {
        return this.props.id;
    }

    get publicId(): string {
        return this.props.publicId;
    }

    get email(): string {
        return this.props.email;
    }

    get passwordHash(): string {
        return this.props.passwordHash;
    }

    get status(): userStatusEnum {
        return this.props.status;
    }

    update(updates: Partial<UserProps>): UserEntity {
        Object.assign(this.props, updates);
        return this;
    }
}