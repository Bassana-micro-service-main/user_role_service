import { langageEnum } from "../enums/langage.enum";
import { themeEnum } from "../enums/theme.enum";
export interface SettingProps {
    readonly id?: number;
    publicId: string;
    userId:string;
    langage:langageEnum;
    profileId: string;
    timezone:string;
    theme:themeEnum;
    notificationEmail: string;
    notificationSms: string;
    twoFactorAuthEnabled: boolean;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export class SettingEntity {
    constructor(private readonly props: SettingProps) { }

    get publicId(): string {
        return this.props.publicId;
    }
    get userId(): string {
        return this.props.userId;
    }

    get profileId(): string {
        return this.props.profileId;
    }
    get langage(): string {
        return this.props.langage;
    }
    get theme(): string {
        return this.props.theme;
    }
    get timezone(): string {
        return this.props.timezone;
    }

    get notificationEmail():string {
        return this.props.notificationEmail;
    }

    get notificationSms(): string {
        return this.props.notificationSms;
    }

    get twoFactorAuthEnabled(): boolean {
        return this.props.twoFactorAuthEnabled;
    }

    update(updates: Partial<SettingProps>): SettingEntity {
        Object.assign(this.props, updates);
        return this;
    }
}