import { Schema, Document } from 'mongoose'

interface characterEpisodes {
  id: Schema.Types.ObjectId
  apiID: number
  name: string
  episode: string
}
export interface ICharacterInfoDto extends Document {
  apiID?: number;
  name: string;
  img?: string;
  status: string;
  species?: string;
  gender?: string;
  origin: {
    id?: Schema.Types.ObjectId;
    name?: string;
  };
  location: {
    id?: Schema.Types.ObjectId;
    name?: string;
  };
  episodes: [characterEpisodes];
}
