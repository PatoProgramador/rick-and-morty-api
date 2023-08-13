import { Schema, Document } from 'mongoose'

interface LocationCharacter {
    id: Schema.Types.ObjectId
    apiId?: number
    name: string
}

export interface ILocationIndoDto extends Document {
    apiID: number;
    name: string;
    type: string;
    dimension: string;
    residents: [LocationCharacter]
}
