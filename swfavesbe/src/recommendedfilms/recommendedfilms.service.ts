import { Injectable } from '@nestjs/common';
import { CharactersService, ISWAPICharacter } from '../characters/characters.service';
import { FilmsService } from '../films/films.service';

@Injectable()
export class RecommendedFilmsService {
    constructor(private readonly filmsService: FilmsService, private readonly characterService: CharactersService){}

    async getUserFilmsByCharacters(id : number)
    {
        let userCharactersNames = this.characterService.getUserCharacters(id);
        let allCharacters = this.characterService.getAllCharacters();
        let allFilms = await this.filmsService.getAllFilms();

        let userCharacters = getCharactersFromName(await allCharacters, (await userCharactersNames).characters);

        allFilms.forEach((film : IFilmSuggestion) => {
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

        function getCharactersFromName(allCharacters: ISWAPICharacter[], userCharacters : string[]) : ISWAPICharacter[]
        {
            let characterURLs : ISWAPICharacter[] = []

            userCharacters.forEach((userCharacter) => {
                characterURLs.push(allCharacters.filter((character) => { return character.name == userCharacter; }).pop())
            });

            return characterURLs;
        }
    }
}

interface IFilmSuggestion{
    score: number,
    favoriteCharacters: string[],
    characters: string[],
}