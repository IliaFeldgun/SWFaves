import { Injectable } from '@nestjs/common';
import { getAllSWAPIPeople } from '../SWAPIAccess';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserCharacters } from './UserCharacters.interface';
import { UserCharactersDTO } from './UserCharactersDTO'
import { FilmsService } from '../films/films.service'
import { FORMERR } from 'dns';

@Injectable()
export class CharactersService {
    constructor(@InjectModel('UserCharacters') private readonly UserCharacterModel: Model<UserCharacters>, private readonly filmsService: FilmsService) {}
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

    async getUserFilmsByCharacters(id : number)
    {
        let userCharactersNames = this.getUserCharacters(id);
        let allCharacters = getAllSWAPIPeople();
        let allFilms = await this.filmsService.getAllFilms();

        let userCharacters = getCharactersFromName(await allCharacters, (await userCharactersNames).characters);

        allFilms.forEach((film : {score: number, favoriteCharacters : string[], characters : string[]}) => {
            userCharacters.forEach((userCharacter) => {
                
                // Sets up a score property
                if (film.score == null || film.score == undefined)
                {
                    film.score = 0
                }

                // Sets up favorite character property
                if (film.favoriteCharacters == null || film.favoriteCharacters == undefined)
                {
                    film.favoriteCharacters = []
                }

                // Checks if film has current character
                if (film.characters.indexOf(userCharacter.url) != -1)
                {
                    film.score++;
                    film.favoriteCharacters.push(userCharacter.name);
                }
            })
        });
        
        allFilms.sort((filmA, filmB) => {
            return filmB.score - filmA.score 
        })

        return allFilms;

        function getCharactersFromName(allCharacters: {name: string, url: string}[], userCharacters : string[]) : {name: string, url: string}[]
        {
            let characterURLs : {name: string, url: string}[] = []

            userCharacters.forEach((userCharacter) => {
                characterURLs.push(allCharacters.filter((character) => { return character.name == userCharacter; }).pop())
            });

            return characterURLs;
        }
    }
}
