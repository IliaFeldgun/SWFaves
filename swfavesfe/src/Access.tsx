import { peopleURL, cookieName } from "./config"
import * as cookiesjs from "cookies-js" 

export async function getAllPeople()
{
    let peopleResult = await fetch(peopleURL);
        
    return await peopleResult.json();
}

async function postFavorites(list: string[], userID: number)
{
    let parameters = {
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
    let filmResult = await fetch(peopleURL + "/" + userID);

    return await filmResult.json();
}

export async function getRecommendedMovies(list: string[])
{
    let userID = +cookiesjs.get(cookieName)
    
    await postFavorites(list,userID);
}
export function getQueryString(param : string) : string
{
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param)!;
}