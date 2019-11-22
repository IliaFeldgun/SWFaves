import { peopleURL } from "./config"

export async function getAllPeople()
{
    let peopleResult = await fetch(peopleURL);
        
    return await peopleResult.json();
}

async function postFavorites(list: string[], userID: number)
{
    let parameters = {
        characterList: list,
        id: userID
    }

    var response = await fetch(peopleURL, {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(parameters)
    })

    return response.json();
}

async function moveToRecommendedMoviesPage(userID: number)
{

}

export async function getRecommendedMovies(list: string[])
{
    let userID = 0
    // userID = document.cookie.......
    await postFavorites(list,userID);

    moveToRecommendedMoviesPage(userID);
}