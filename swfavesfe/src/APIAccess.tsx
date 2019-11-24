import { peopleURL, suggestionsURL } from "./config"
import { ICharacter } from "./interfaces/ICharacter";
import { IUserCharactersDTO } from "./interfaces/IUserCharactersDTO";

export async function getAllPeople() : Promise<ICharacter[]>
{
    let peopleResult = await fetch(peopleURL);
        
    return peopleResult.json();
}

export async function postFavorites(list: string[], userID: number)
{
    let parameters: IUserCharactersDTO = {
        _id: userID,
        characters: list
    }

    var response = await fetch(peopleURL, {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(parameters)
    })

    return response.json();
}

export async function getSuggestedMovies(userID: number)
{
    let filmResult = await fetch(suggestionsURL + "/" + userID);

    return await filmResult.json();
}

export function getQueryString(param : string) : string
{
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param)!;
}