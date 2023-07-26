import { Schema, Document } from 'mongoose'

interface EpisodeCharacter {
    id: Schema.Types.ObjectId
    apiID?: number
    name: string
}

export interface IEpisodeInfoDto extends Document {
    apiID: number;
    img?: string;
    name: string;
    airDate: string;
    episode: string;
    characters?: EpisodeCharacter[];
    createdAt?: Date;
    updatedAt?: Date;
}
