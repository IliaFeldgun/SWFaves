import { Injectable } from '@nestjs/common';
import { getAllPeople } from './Access';

@Injectable()
export class CharactersService {
    async getAllCharacters() : Promise<string[]>
    {
        return await getAllPeople() 
    }
}
