import { Injectable } from '@nestjs/common';
import { getAllSWAPIPeople } from '../SWAPIAccess';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserCharacters } from './UserCharacters.interface';
import { UserCharactersDTO } from './UserCharactersDTO'

@Injectable()
export class CharactersService {
    constructor(@InjectModel('UserCharacters') private readonly UserCharacterModel: Model<UserCharacters>) {}
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
