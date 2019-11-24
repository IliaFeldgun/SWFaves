import { Document } from 'mongoose'
export interface IUserCharacters extends Document {
    readonly _id: number;
    readonly characters: Array<string>;
}