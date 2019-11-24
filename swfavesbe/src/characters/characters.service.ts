import { Injectable } from '@nestjs/common';
import { getAllSWAPIPeople } from '../SWAPIAccess';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUserCharacters } from './IUserCharacters';
import { UserCharactersDTO } from './UserCharactersDTO'
import { ISWAPICharacter } from './ISWAPICharacter'

@Injectable()
export class CharactersService {
    constructor(@InjectModel('UserCharacters') private readonly UserCharacterModel: Model<IUserCharacters>) {}
    async getAllCharacters()
    {
        return getAllSWAPIPeople()
    }

    async putUserCharacters(toCreateDTO : UserCharactersDTO) 
    {
        return await this.UserCharacterModel.update({_id: toCreateDTO._id}, toCreateDTO, {upsert: true, overwrite: true,}).exec()
        
    }

    async getUserCharacters(id : number) : Promise<UserCharactersDTO>
    {
        return this.UserCharacterModel.findById(id).exec();
    }
}

export {ISWAPICharacter}