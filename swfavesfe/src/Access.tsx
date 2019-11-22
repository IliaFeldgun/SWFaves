import { peopleURL } from "./config"

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

async function moveToRecommendedMoviesPage(userID: number)
{

}

export async function getRecommendedMovies(list: string[])
{
    let userID = 101
    // userID = document.cookie.......
    await postFavorites(list,userID);
    await
    moveToRecommendedMoviesPage(userID);
}