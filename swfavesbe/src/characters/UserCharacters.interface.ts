import { Document } from 'mongoose'
export interface UserCharacters extends Document {
    readonly _id: number;
    characters: Array<String>;
}