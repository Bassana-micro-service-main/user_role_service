import { levelEnum } from "../enums/level.enum";
export interface TalkLangageProps {
    readonly id?: number;
    publicId: string;
    name: string;
    stage: levelEnum;
    readonly createdAt?: Date;
}

export class TalkLangageEntity {
    constructor(private readonly props: TalkLangageProps) { }

    get id(): number | undefined {
        return this.props.id;
    }

    get publicId(): string {
        return this.props.publicId;
    }

    get name(): string {
        return this.props.name;
    }

    get stage(): levelEnum {
        return this.props.stage;
    }

    update(updates: Partial<TalkLangageProps>): TalkLangageEntity {
        Object.assign(this.props, updates);
        return this;
    }
}