import { peopleURL } from "./config"

export async function getAllPeople()
{
    let peopleResult = await fetch(peopleURL);
        
    return await peopleResult.json();
}

async function postFavorites(list: string[], userID: number)
{

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