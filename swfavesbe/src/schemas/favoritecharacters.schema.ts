import * as mongoose from 'mongoose';

export const UserCharacterSchema = new mongoose.Schema({
  _id: Number,
  characters: [String],
});